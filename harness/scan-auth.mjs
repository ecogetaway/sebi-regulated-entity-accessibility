// Measures authenticated surfaces using a session saved by login.mjs.
//
// PRIVACY: post-login broker pages carry holdings, balances, PAN and order
// history. This scanner therefore records ONLY structural counts, axe rule ids
// and node counts. It never captures page text, never screenshots, and strips
// query strings from stored URLs. If you want a screenshot for an article,
// take it yourself and redact it yourself.

import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
const [name, ...urls] = process.argv.slice(2);
if (!name || !urls.length) {
  console.error('usage: node scan-auth.mjs <broker-slug> <url> [url...]');
  process.exit(1);
}
const statePath = `.auth/${name}.json`;
if (!existsSync(statePath)) {
  console.error(`no saved session at ${statePath} -- run: node login.mjs ${name} <start-url>`);
  process.exit(1);
}

const browser = await chromium.launch({ channel: 'chrome', headless: false });
const ctx = await browser.newContext({
  storageState: JSON.parse(readFileSync(statePath, 'utf8')),
  viewport: { width: 1280, height: 900 },
});
const records = [];

for (const url of urls) {
  const page = await ctx.newPage();
  const rec = { broker: name, url_path: new URL(url).origin + new URL(url).pathname, ok: false };
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(3500);
    const axe = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    const byImpact = { critical: 0, serious: 0, moderate: 0, minor: 0 };
    let nodes = 0;
    for (const v of axe.violations) { byImpact[v.impact || 'minor'] += v.nodes.length; nodes += v.nodes.length; }
    const struct = await page.evaluate(() => ({
      dom_nodes: document.getElementsByTagName('*').length,
      lang: document.documentElement.getAttribute('lang') || null,
      h1_count: document.querySelectorAll('h1').length,
      main_landmarks: document.querySelectorAll('main,[role=main]').length,
      inputs_total: document.querySelectorAll('input,select,textarea').length,
    }));
    rec.axe = {
      violation_rules: axe.violations.length, violation_nodes: nodes, by_impact: byImpact,
      nodes_per_1k_dom: +(nodes / struct.dom_nodes * 1000).toFixed(2),
      rules: axe.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })),
    };
    rec.structure = struct;
    rec.ok = true;
  } catch (err) {
    rec.error = String(err.message || err).slice(0, 200);
  }
  await page.close();
  records.push(rec);
  console.log(`${rec.ok ? 'ok  ' : 'FAIL'} ${rec.url_path}  ${rec.axe ? `rules=${rec.axe.violation_rules} nodes=${rec.axe.violation_nodes} crit=${rec.axe.by_impact.critical} ser=${rec.axe.by_impact.serious}` : rec.error}`);
}

await browser.close();
writeFileSync(`out/scan-auth-${name}.json`, JSON.stringify({ scanned_at: new Date().toISOString(), records }, null, 2));
console.log(`\nwrote out/scan-auth-${name}.json`);
