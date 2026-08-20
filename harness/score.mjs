// Pass 3: apply rubric.md to out/scan.json.
//
// Band A items A3 (auditor + audit date) and A7 (tagged PDFs) are deliberately
// NOT auto-scored -- A3 needs a human to read the statement, A7 needs the PDF
// structure check. They are reported as pending rather than silently counted as
// failures, because scoring an unmeasured item as zero is how a rubric starts
// lying.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { classifyAccessibilityLink } from './lib/patterns.mjs';

const scan = JSON.parse(readFileSync('out/scan.json', 'utf8'));
const targets = JSON.parse(readFileSync('out/targets.json', 'utf8'));
// Aliases live in brokers.json (hand-maintained) and are merged in here so they
// take effect without re-running discovery.
const aliasByName = new Map(JSON.parse(readFileSync('brokers.json', 'utf8'))
  .brokers.map(b => [b.name, b.aliases || []]));
// A7: PDF structure results, if pdfcheck.mjs has been run.
const pdfResults = existsSync('out/pdfcheck.json')
  ? JSON.parse(readFileSync('out/pdfcheck.json', 'utf8')).results.filter(r => r.ok) : [];
const byBroker = new Map();
for (const r of scan.records) {
  if (!byBroker.has(r.broker)) byBroker.set(r.broker, []);
  byBroker.get(r.broker).push(r);
}

// --- QA guards, applied before anything is scored -------------------------
// Discovery matches links by text and href, which sometimes lands on a page
// that is not the surface it claimed, or not the broker's page at all. Three
// classes have to be excluded rather than scored, or the numbers are fiction:
//   offsite      - the link goes to a third party (SEBI SCORES, SMART ODR).
//                  Pointing investors there is legitimate; it is not a page
//                  the broker controls, so it cannot count for or against them.
//   not_rendered - fewer than 400 DOM nodes means the page did not come up.
//                  Zero violations on a blank page is not a clean page.
//   duplicate    - two surfaces resolved to the same final URL.
const registrable = (host) => host.replace(/^www\./, '').split('.').slice(-3).join('.');
function qaFlag(rec, hosts, seenUrls) {
  if (!rec.ok) return rec.blocked_to_automation ? 'blocked' : 'error';
  try {
    const h = registrable(new URL(rec.final_url || rec.url).hostname);
    if (!hosts.some(x => h.endsWith(x) || x.endsWith(h))) return 'offsite';
  } catch { return 'error'; }
  // A page that served almost no markup, or that axe could not evaluate at all,
  // is a non-render. Zero violations on a blank page is not a clean page.
  // Threshold kept low: zerodha.com is a genuinely lean static site at ~380
  // nodes and must not be discarded as a failure to load.
  if ((rec.structure?.dom_nodes ?? 0) < 150 || (rec.axe?.passes ?? 0) === 0) return 'not_rendered';
  const key = (rec.final_url || rec.url).split('#')[0];
  if (seenUrls.has(key)) return 'duplicate';
  seenUrls.add(key);
  return null;
}

const anyProbe = (recs, key) => recs.some(r => r.ok && r.probes?.[key]);
const surf = (recs, s) => recs.find(r => r.surface === s && r.qa === null);

const rows = [];
for (const t of targets.brokers) {
  const recs = byBroker.get(t.name) || [];
  const hosts = [];
  try { hosts.push(registrable(new URL(t.home).hostname)); } catch {}
  for (const a of (t.aliases || aliasByName.get(t.name) || [])) hosts.push(registrable(a));
  const seenUrls = new Set();
  for (const r of recs) r.qa = qaFlag(r, hosts, seenUrls);
  const ok = recs.filter(r => r.ok && r.qa === null);
  const excluded = recs.filter(r => r.qa && r.qa !== 'error');
  const a11yLinks = (t.surfaces?.accessibility || []);
  const statementLink = a11yLinks.find(l => (l.kind || classifyAccessibilityLink(l)) === 'statement_candidate');
  const widget = a11yLinks.some(l => (l.kind || classifyAccessibilityLink(l)) === 'widget');
  const skipLink = a11yLinks.some(l => (l.kind || classifyAccessibilityLink(l)) === 'skip_link');
  const charter = surf(recs, 'investor_charter');
  const a11yPage = surf(recs, 'accessibility');

  const A = {
    A1_statement: !!statementLink,
    A2_standard_and_level: !!(a11yPage?.ok && a11yPage.probes?.wcag_claim && a11yPage.probes?.conformance_level),
    A3_auditor_and_date: null,           // manual
    A4_nodal_officer: anyProbe(recs, 'nodal_officer_digital'),
    A5_a11y_grievance: anyProbe(recs, 'a11y_grievance'),
    A6_charter_right: !!(charter?.ok && charter.probes?.charter_digital_right),
    A7_tagged_pdfs: null,                // set below if pdfcheck has run
  };

  // A7 is scored on the Investor Charter PDFs specifically: they are the
  // statutory investor-facing document, and 2025/111 Annexure I s.2.2 names
  // exactly this class of file. A broker with no charter PDF is left unscored
  // rather than credited.
  const myPdfs = pdfResults.filter(r => {
    try { const h = registrable(new URL(r.source).hostname); return hosts.some(x => h.endsWith(x) || x.endsWith(h)); }
    catch { return false; }
  });
  const charterPdfs = myPdfs.filter(r => /charter/i.test(r.source));
  if (charterPdfs.length) A.A7_tagged_pdfs = charterPdfs.every(r => r.accessible_minimum);
  const pdfSummary = {
    pdfs_checked: myPdfs.length,
    pdfs_untagged: myPdfs.filter(r => !r.struct_tree).length,
    charter_pdfs: charterPdfs.length,
    charter_pdfs_failing: charterPdfs.filter(r => !r.accessible_minimum).length,
    charter_failures: charterPdfs.filter(r => !r.accessible_minimum).map(r => r.source),
  };
  const scored = Object.entries(A).filter(([, v]) => v !== null);
  const aScore = scored.filter(([, v]) => v).length;
  const aMax = scored.length;

  // Band B: worst surface, and the mean across surfaces, on density.
  const dens = ok.filter(r => r.axe).map(r => ({
    surface: r.surface,
    crit: r.axe.by_impact.critical / (r.structure.dom_nodes / 1000),
    ser: r.axe.by_impact.serious / (r.structure.dom_nodes / 1000),
    nodes: r.axe.violation_nodes, rules: r.axe.violation_rules, dom: r.structure.dom_nodes,
  }));
  const mean = (xs) => xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
  const B = {
    surfaces_scanned: dens.length,
    critical_per_1k: dens.length ? +mean(dens.map(d => d.crit)).toFixed(2) : null,
    serious_per_1k: dens.length ? +mean(dens.map(d => d.ser)).toFixed(2) : null,
    worst_surface: dens.length ? dens.slice().sort((a, b) => (b.crit + b.ser) - (a.crit + a.ser))[0].surface : null,
    total_violation_nodes: dens.reduce((a, d) => a + d.nodes, 0),
    distinct_rules: dens.length ? Math.max(...dens.map(d => d.rules)) : null,
  };

  const frac = (pred) => ok.length ? `${ok.filter(pred).length}/${ok.length}` : '-';
  const C = {
    C1_reflow_320_pass: frac(r => r.reflow_320 && !r.reflow_320.overflows),
    C2_resize_200_pass: frac(r => r.resize_200 && !r.resize_200.overflows),
    C3_text_spacing_pass: frac(r => r.text_spacing && r.text_spacing.clipped_elements === 0),
    C4_focus_visible_pass: frac(r => r.focus && r.focus.no_visible_focus_change === 0),
    C5_lang_pass: frac(r => r.structure?.lang),
    C5_single_h1_pass: frac(r => r.structure?.h1_count === 1),
    C5_main_landmark_pass: frac(r => r.structure?.landmarks.main > 0),
    C5_skip_link_pass: frac(r => r.structure?.skip_link),
  };

  rows.push({
    rank: t.rank, broker: t.name, entity: t.entity,
    pages_ok: ok.length, pages_attempted: recs.length,
    blocked: recs.some(r => r.blocked_to_automation) || (t.home_ok && t.links_seen === 0),
    A, aScore, aMax, grade: gradeFor(aScore, aMax),
    accessibility_widget: widget, skip_link_only: skipLink && !statementLink,
    charter_legacy_clause_only: !!(charter?.ok && charter.probes?.charter_legacy_clause && !charter.probes?.charter_digital_right),
    B, C,
    pdf: pdfSummary,
    excluded: excluded.map(r => ({ surface: r.surface, reason: r.qa, url: (r.final_url || r.url) })),
  });
}

function gradeFor(score, max) {
  if (max === 0) return '-';
  const pct = score / max;
  if (pct === 1) return 'A';
  if (pct >= 0.7) return 'B';
  if (pct >= 0.45) return 'C';
  if (pct > 0) return 'D';
  return 'E';
}

rows.sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));

const L = [];
L.push('# Scorecard — investor-facing digital accessibility, Indian brokers');
L.push('');
L.push(`Scanned ${scan.scanned_at} · ${scan.standard} · rubric v0.1`);
L.push('');
L.push('> **This is not a compliance determination.** SEBI compliance is reported privately');
L.push('> and cannot be observed from outside. Band A measures what each entity has *disclosed*.');
L.push('> Bands B and C measure barriers present on public pages, using automated checks that');
L.push('> cover only a minority of WCAG success criteria. See rubric.md.');
L.push('');
L.push('## Band A — disclosure');
L.push('');
L.push('| # | Broker | Statement | Std+level | Nodal officer | A11y grievance | Charter right | Tagged PDFs | Score | Grade |');
L.push('|---|---|---|---|---|---|---|---|---|---|');
const m = (v) => v === null ? '–' : (v ? 'yes' : 'no');
for (const r of rows) {
  L.push(`| ${r.rank ?? '–'} | ${r.broker} | ${m(r.A.A1_statement)}${r.accessibility_widget ? ' *(widget)*' : ''} | ${m(r.A.A2_standard_and_level)} | ${m(r.A.A4_nodal_officer)} | ${m(r.A.A5_a11y_grievance)} | ${m(r.A.A6_charter_right)}${r.charter_legacy_clause_only ? ' *(legacy cl. XVII only)*' : ''} | ${m(r.A.A7_tagged_pdfs)} | ${r.aScore}/${r.aMax} | ${r.grade} |`);
}
L.push('');
L.push('A3 (auditor named + audit date) is pending manual verification and is excluded from the');
L.push('score rather than counted as a failure.');
L.push('');
L.push('## A7 — Investor Charter PDFs (2025/111 Annexure I §2.2)');
L.push('');
L.push('A tagged PDF has a structure tree, a Marked flag and a document language. Without them a');
L.push('screen reader cannot establish reading order, no matter how good the surrounding website is.');
L.push('');
L.push('| # | Broker | Charter PDFs | Failing | All PDFs checked | Untagged |');
L.push('|---|---|---|---|---|---|');
for (const r of rows) {
  L.push(`| ${r.rank ?? '–'} | ${r.broker} | ${r.pdf.charter_pdfs} | ${r.pdf.charter_pdfs_failing} | ${r.pdf.pdfs_checked} | ${r.pdf.pdfs_untagged} |`);
}
L.push('');
L.push('## Band B — automated WCAG 2.1 A/AA, violation nodes per 1,000 DOM nodes');
L.push('');
L.push('| # | Broker | Surfaces | Critical/1k | Serious/1k | Worst surface | Total nodes | Rules |');
L.push('|---|---|---|---|---|---|---|---|');
for (const r of rows) {
  L.push(`| ${r.rank ?? '–'} | ${r.broker} | ${r.B.surfaces_scanned} | ${r.B.critical_per_1k ?? '–'} | ${r.B.serious_per_1k ?? '–'} | ${r.B.worst_surface ?? '–'} | ${r.B.total_violation_nodes} | ${r.B.distinct_rules ?? '–'} |`);
}
L.push('');
L.push('## Band C — checks axe cannot decide (pages passing / pages scanned)');
L.push('');
L.push('| # | Broker | Reflow 320 | Resize 200% | Text spacing | Focus visible | lang | one h1 | main | skip link |');
L.push('|---|---|---|---|---|---|---|---|---|---|');
for (const r of rows) {
  L.push(`| ${r.rank ?? '–'} | ${r.broker} | ${r.C.C1_reflow_320_pass} | ${r.C.C2_resize_200_pass} | ${r.C.C3_text_spacing_pass} | ${r.C.C4_focus_visible_pass} | ${r.C.C5_lang_pass} | ${r.C.C5_single_h1_pass} | ${r.C.C5_main_landmark_pass} | ${r.C.C5_skip_link_pass} |`);
}
const anyExcluded = rows.filter(r => r.excluded.length);
if (anyExcluded.length) {
  L.push('## Surfaces excluded by QA (not scored)');
  L.push('');
  L.push('| Broker | Surface | Reason | Resolved to |');
  L.push('|---|---|---|---|');
  for (const r of anyExcluded) for (const e of r.excluded) {
    L.push(`| ${r.broker} | ${e.surface} | ${e.reason} | ${e.url.slice(0, 70)} |`);
  }
  L.push('');
}

const blocked = rows.filter(r => r.blocked);
if (blocked.length) {
  L.push('');
  L.push('## Not measurable by automation');
  L.push('');
  for (const r of blocked) L.push(`- **${r.broker}** — blocked to automated agents (edge returns 403 or serves no markup). Requires manual testing; no workaround attempted.`);
}
L.push('');

writeFileSync('out/scorecard.md', L.join('\n'));
writeFileSync('out/scorecard.json', JSON.stringify({ rubric: 'v0.1', scanned_at: scan.scanned_at, rows }, null, 2));
console.log(L.join('\n'));
