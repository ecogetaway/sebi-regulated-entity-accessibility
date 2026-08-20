// Pass 1: visit each broker's home page, enumerate every link, and classify it
// into the investor-facing surfaces the SEBI circulars touch. Writes
// targets.json, which scan.mjs then consumes.
//
// Discovery rather than hand-written URLs: the URL shapes differ per broker and
// change, and a hand-list quietly biases the sample toward pages we already know
// exist. What a broker does NOT link from its own home page is itself a finding.

import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { SURFACE_PATTERNS, classifyAccessibilityLink } from './lib/patterns.mjs';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const { brokers } = JSON.parse(readFileSync('brokers.json', 'utf8'));
const only = process.argv.slice(2).filter(a => !a.startsWith('-'));
const list = only.length ? brokers.filter(b => only.includes(b.name.toLowerCase().replace(/\s+/g, ''))) : brokers;

mkdirSync('out', { recursive: true });

const browser = await chromium.launch();
const results = [];

for (const broker of list) {
  const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const entry = { ...broker, surfaces: {}, home_ok: false, links_seen: 0, error: null };

  try {
    await page.goto(broker.home, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(2500); // let client-rendered footers settle
    entry.home_ok = true;
    entry.final_url = page.url();

    const links = await page.$$eval('a[href]', as => as.map(a => ({
      href: a.href,
      text: (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120),
    })));
    entry.links_seen = links.length;

    for (const [surface, re] of Object.entries(SURFACE_PATTERNS)) {
      const hits = links.filter(l => re.test(l.text) || re.test(l.href));
      // Dedupe by href, keep the first few; prefer same-origin over third party.
      const seen = new Set();
      const picked = hits
        .filter(l => (seen.has(l.href) ? false : (seen.add(l.href), true)))
        .sort((a, b) => Number(new URL(b.href).hostname.endsWith(new URL(page.url()).hostname)) -
                        Number(new URL(a.href).hostname.endsWith(new URL(page.url()).hostname)))
        .slice(0, 3);
      entry.surfaces[surface] = surface === 'accessibility'
        ? picked.map(l => ({ ...l, kind: classifyAccessibilityLink(l) }))
        : picked;
    }
  } catch (err) {
    entry.error = String(err.message || err).slice(0, 300);
  }

  await ctx.close();
  const a11y = entry.surfaces.accessibility || [];
  entry.has_statement_candidate = a11y.some(l => l.kind === 'statement_candidate');
  const found = Object.entries(entry.surfaces).filter(([, v]) => v.length)
    .map(([k, v]) => k === 'accessibility' ? `accessibility(${v.map(l => l.kind).join('/')})` : k);
  console.log(`${entry.home_ok ? 'ok  ' : 'FAIL'} ${broker.name.padEnd(18)} links=${String(entry.links_seen).padStart(4)}  surfaces: ${found.join(', ') || '(none)'}${entry.error ? '  ' + entry.error : ''}`);
  results.push(entry);
}

await browser.close();
writeFileSync('out/targets.json', JSON.stringify({ generated_at: new Date().toISOString(), brokers: results }, null, 2));
console.log(`\nwrote out/targets.json (${results.length} brokers)`);
