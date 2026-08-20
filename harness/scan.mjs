// Pass 2: measure. For each discovered surface, run axe-core against the WCAG
// 2.1 A/AA rulesets (the standard SEBI's 2025/111 Annexure I names as the
// baseline: "WCAG 2.1 or latest version"), plus a set of checks axe cannot make
// on its own -- reflow, resize, text spacing, focus visibility -- and the
// documentary probes the circulars require (nodal officer, accessibility
// grievance channel, the Investor Charter right).
//
// Nothing here produces a compliance verdict. See rubric.md: automated rules
// cover only a minority of WCAG success criteria, so a clean run is necessary
// but nowhere near sufficient.

import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { TEXT_PROBES } from './lib/patterns.mjs';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
const SURFACE_ORDER = ['home', 'investor_charter', 'grievance', 'account_opening', 'pricing', 'accessibility'];

// WCAG 1.4.12 Text Spacing: the values a user must be able to apply without
// loss of content or functionality.
const TEXT_SPACING_CSS = `* { line-height: 1.5 !important; letter-spacing: 0.12em !important;
  word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }`;

const { brokers } = JSON.parse(readFileSync('out/targets.json', 'utf8'));
const only = process.argv.slice(2).filter(a => !a.startsWith('-'));
const list = only.length ? brokers.filter(b => only.includes(b.name.toLowerCase().replace(/\s+/g, ''))) : brokers;
mkdirSync('out', { recursive: true });

function pagesFor(broker) {
  const pages = [];
  if (broker.home_ok) pages.push({ surface: 'home', url: broker.final_url || broker.home });
  for (const s of SURFACE_ORDER.slice(1)) {
    const hits = broker.surfaces?.[s] || [];
    const pick = s === 'accessibility'
      ? hits.find(h => h.kind === 'statement_candidate')
      : hits.find(h => /^https?:/.test(h.href) && !/\.pdf($|\?)/i.test(h.href));
    if (pick) pages.push({ surface: s, url: pick.href, link_text: pick.text });
    // PDF-only surfaces (several charters are PDFs) are recorded for the
    // separate PDF structure check rather than silently dropped.
    const pdf = hits.find(h => /\.pdf($|\?)/i.test(h.href));
    if (pdf && !pick) pages.push({ surface: s, url: pdf.href, link_text: pdf.text, is_pdf: true });
  }
  return pages;
}

async function structuralProbes(page) {
  return page.evaluate(() => {
    const q = (s) => Array.from(document.querySelectorAll(s));
    const firstLink = document.querySelector('a[href]');
    return {
      lang: document.documentElement.getAttribute('lang') || null,
      title: (document.title || '').trim() || null,
      dom_nodes: document.getElementsByTagName('*').length,
      h1_count: q('h1').length,
      heading_count: q('h1,h2,h3,h4,h5,h6').length,
      landmarks: {
        main: q('main,[role=main]').length,
        nav: q('nav,[role=navigation]').length,
        banner: q('header,[role=banner]').length,
        contentinfo: q('footer,[role=contentinfo]').length,
      },
      skip_link: !!(firstLink && /skip\s+(to|nav)/i.test(firstLink.textContent || '')),
      images_total: q('img').length,
      images_no_alt: q('img:not([alt])').length,
      video_no_track: q('video').filter(v => !v.querySelector('track')).length,
      iframes_no_title: q('iframe:not([title])').length,
      autoplay_media: q('video[autoplay],audio[autoplay]').length,
      positive_tabindex: q('[tabindex]').filter(e => Number(e.getAttribute('tabindex')) > 0).length,
      text: (document.body?.innerText || '').slice(0, 400000),
    };
  });
}

// WCAG 1.4.10 Reflow (320 CSS px) and 1.4.4 Resize text (200%, i.e. 640px of a
// 1280px layout). A horizontal scrollbar at these widths is the classic failure.
async function reflowProbe(page, width) {
  await page.setViewportSize({ width, height: 900 });
  await page.waitForTimeout(700);
  return page.evaluate(() => ({
    scroll_width: document.documentElement.scrollWidth,
    client_width: document.documentElement.clientWidth,
    overflows: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
  }));
}

async function textSpacingProbe(page, css) {
  await page.addStyleTag({ content: css });
  await page.waitForTimeout(500);
  return page.evaluate(() => {
    // Content clipped by a fixed height with hidden overflow is the 1.4.12 failure.
    let clipped = 0;
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (cs.overflow === 'hidden' || cs.overflowY === 'hidden') {
        if (el.scrollHeight > el.clientHeight + 4 && el.clientHeight > 0) clipped++;
      }
    }
    return { clipped_elements: clipped };
  });
}

// WCAG 2.4.7 Focus Visible: walk the first N focusable elements and check that
// focusing actually changes the rendered style. Cheap heuristic, not a proof.
async function focusProbe(page, n = 20) {
  return page.evaluate((limit) => {
    const sel = 'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])';
    const els = Array.from(document.querySelectorAll(sel))
      .filter(e => e.offsetParent !== null).slice(0, limit);
    let checked = 0, invisible = 0;
    for (const el of els) {
      const before = getComputedStyle(el);
      const b = { o: before.outlineStyle + before.outlineWidth + before.outlineColor, s: before.boxShadow, bg: before.backgroundColor, bd: before.border };
      el.focus();
      const after = getComputedStyle(el);
      const a = { o: after.outlineStyle + after.outlineWidth + after.outlineColor, s: after.boxShadow, bg: after.backgroundColor, bd: after.border };
      checked++;
      if (b.o === a.o && b.s === a.s && b.bg === a.bg && b.bd === a.bd) invisible++;
      el.blur();
    }
    return { focusable_checked: checked, no_visible_focus_change: invisible };
  }, n);
}

function textProbeResults(text) {
  const out = {};
  for (const [k, re] of Object.entries(TEXT_PROBES)) out[k] = re.test(text);
  return out;
}

const browser = await chromium.launch();
const records = [];

for (const broker of list) {
  for (const target of pagesFor(broker)) {
    const rec = {
      broker: broker.name, rank: broker.rank, surface: target.surface,
      url: target.url, link_text: target.link_text || null, is_pdf: !!target.is_pdf,
      ok: false, error: null,
    };
    if (target.is_pdf) {
      // Handled by pdfcheck.mjs; recorded here so the surface is not lost.
      rec.note = 'PDF surface - see pdfcheck.mjs';
      records.push(rec);
      console.log(`pdf  ${broker.name} / ${target.surface}`);
      continue;
    }
    const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    try {
      const resp = await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      rec.http_status = resp?.status() ?? null;
      await page.waitForTimeout(2500);
      rec.final_url = page.url();

      if (rec.http_status && rec.http_status >= 400) {
        rec.error = `HTTP ${rec.http_status}`;
        rec.blocked_to_automation = rec.http_status === 403;
      } else {
        const axe = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
        const byImpact = { critical: 0, serious: 0, moderate: 0, minor: 0 };
        let nodes = 0;
        for (const v of axe.violations) {
          byImpact[v.impact || 'minor'] = (byImpact[v.impact || 'minor'] || 0) + v.nodes.length;
          nodes += v.nodes.length;
        }
        rec.axe = {
          violation_rules: axe.violations.length,
          violation_nodes: nodes,
          by_impact: byImpact,
          passes: axe.passes.length,
          incomplete: axe.incomplete.length,
          rules: axe.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, wcag: v.tags.filter(t => /^wcag\d/.test(t)) })),
        };

        const struct = await structuralProbes(page);
        rec.probes = textProbeResults(struct.text);
        delete struct.text;
        rec.structure = struct;
        rec.axe.nodes_per_1k_dom = struct.dom_nodes ? +(nodes / struct.dom_nodes * 1000).toFixed(2) : null;

        rec.focus = await focusProbe(page);
        rec.reflow_320 = await reflowProbe(page, 320);
        rec.resize_200 = await reflowProbe(page, 640);
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.waitForTimeout(400);
        rec.text_spacing = await textSpacingProbe(page, TEXT_SPACING_CSS);

        rec.pdf_links = await page.$$eval('a[href$=".pdf"], a[href*=".pdf?"]',
          as => Array.from(new Set(as.map(a => a.href))).slice(0, 40));
        rec.ok = true;
      }
    } catch (err) {
      rec.error = String(err.message || err).slice(0, 300);
    }
    await ctx.close();
    records.push(rec);
    const a = rec.axe;
    console.log(`${rec.ok ? 'ok  ' : 'FAIL'} ${broker.name.padEnd(17)} ${rec.surface.padEnd(17)} ${a ? `rules=${String(a.violation_rules).padStart(2)} nodes=${String(a.violation_nodes).padStart(4)} crit=${a.by_impact.critical} ser=${a.by_impact.serious}` : (rec.error || '')}`);
  }
}

await browser.close();
writeFileSync('out/scan.json', JSON.stringify({
  scanned_at: new Date().toISOString(),
  standard: 'WCAG 2.1 A + AA (axe-core rulesets ' + WCAG_TAGS.join(',') + ')',
  engine: 'axe-core via @axe-core/playwright, headless Chromium',
  records,
}, null, 2));
console.log(`\nwrote out/scan.json (${records.length} page records)`);
