// Band A item A7: are the PDFs an entity publishes to investors actually
// accessible documents?
//
// 2025/111 Annexure I §2.2 is unusually specific: circulars, notices and
// investor documents in PDF "must follow accessible document standards", and
// names the WCAG PDF techniques. The minimum machine-checkable signals of a
// tagged PDF are a structure tree, a MarkInfo/Marked true flag, and a document
// language. An untagged PDF is unreadable in any meaningful order by a screen
// reader regardless of how good the surrounding website is.
//
// Usage: node pdfcheck.mjs <url-or-path> [...]
//        node pdfcheck.mjs --from-scan     (every PDF found during the scan)

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { inflateSync } from 'node:zlib';

const MARKERS = {
  struct_tree: /\/StructTreeRoot/,
  marked_true: /\/Marked\s+true/,
  lang: /\/Lang\s*[({]/,
  tagged_pdf_suite: /\/Suspects\s+true/,
};

function searchAll(buf) {
  const raw = buf.toString('latin1');
  const found = {};
  for (const [k, re] of Object.entries(MARKERS)) found[k] = re.test(raw);
  if (found.struct_tree && found.marked_true && found.lang) return found;

  // Modern PDFs put the catalog inside a compressed object stream, so the
  // markers are not visible in the raw bytes. Inflate every FlateDecode stream
  // and look again before concluding the document is untagged.
  const re = /stream\r?\n?/g;
  let mres;
  while ((mres = re.exec(raw)) !== null) {
    const start = mres.index + mres[0].length;
    const end = raw.indexOf('endstream', start);
    if (end < 0) continue;
    try {
      const chunk = inflateSync(buf.subarray(start, end)).toString('latin1');
      for (const [k, r] of Object.entries(MARKERS)) if (!found[k] && r.test(chunk)) found[k] = true;
    } catch { /* not flate, or corrupt: skip */ }
    if (found.struct_tree && found.marked_true && found.lang) break;
  }
  return found;
}

async function load(src) {
  if (existsSync(src)) return readFileSync(src);
  const res = await fetch(src, { headers: { 'user-agent': 'Mozilla/5.0' }, redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

let sources = process.argv.slice(2);
if (sources[0] === '--from-scan') {
  const scan = JSON.parse(readFileSync('out/scan.json', 'utf8'));
  const set = new Set();
  for (const r of scan.records) {
    for (const u of r.pdf_links || []) set.add(u);
    if (r.is_pdf) set.add(r.url);
  }
  sources = [...set];
}

const results = [];
for (const src of sources) {
  const row = { source: src, ok: false };
  try {
    const buf = await load(src);
    row.bytes = buf.length;
    const f = searchAll(buf);
    Object.assign(row, f);
    row.tagged = !!(f.struct_tree && f.marked_true);
    row.accessible_minimum = !!(f.struct_tree && f.marked_true && f.lang);
    row.ok = true;
  } catch (err) {
    row.error = String(err.message || err).slice(0, 200);
  }
  results.push(row);
  console.log(`${row.ok ? (row.accessible_minimum ? 'PASS' : (row.tagged ? 'PART' : 'FAIL')) : 'ERR '}  ${row.ok ? `tree=${+row.struct_tree} marked=${+row.marked_true} lang=${+row.lang}` : row.error}  ${src.slice(0, 110)}`);
}
writeFileSync('out/pdfcheck.json', JSON.stringify({ checked_at: new Date().toISOString(), results }, null, 2));
console.log(`\nwrote out/pdfcheck.json (${results.length})`);
