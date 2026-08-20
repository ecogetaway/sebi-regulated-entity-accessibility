# Harness

Measurement tooling for the rubric in [`../rubric/rubric.md`](../rubric/rubric.md).

Node + Playwright + axe-core. Four passes:

```bash
npm install && npx playwright install chromium

node discover.mjs              # enumerate investor-facing surfaces from each home page
node scan.mjs                  # axe-core WCAG 2.1 A/AA + reflow, resize, text-spacing, focus
node pdfcheck.mjs --from-scan  # PDF structure tree / MarkInfo / Lang
node score.mjs                 # -> out/scorecard.md
```

Surfaces are **discovered**, not hand-listed: URL shapes differ per entity and change, a
hand-list biases the sample toward pages already known to exist, and what an entity does not
link from its own home page is itself a finding.

## Authenticated surfaces

The trading terminal is what the circular is really about, and it is behind a login.

```bash
node login.mjs <slug> https://example.com/    # opens a real browser; you sign in yourself
node scan-auth.mjs <slug> "<url>"
```

`login.mjs` opens a visible Chrome and waits. Credentials are never typed by or shown to the
tool; only the session cookie jar is written, to a gitignored `.auth/`. `scan-auth.mjs`
records structural counts and axe rule identifiers only — never page text, never screenshots
— because post-login pages carry holdings, balances and PAN.

## QA guards in `score.mjs`

Discovery matches links by text and href, which sometimes lands on the wrong page. Four
classes are excluded rather than scored, and every exclusion is printed with its reason:

- **offsite** — a third-party destination (`scores.sebi.gov.in`, `smartodr.in`). Pointing
  investors there is legitimate and is not the entity's artifact.
- **not_rendered** — under 150 DOM nodes or zero axe passes. Zero violations on a blank page
  is not a clean page.
- **duplicate** — two surfaces resolved to one URL.
- **blocked** — the entity returns 403 to automated agents. Tested by hand; **no workaround
  is attempted.**

Brand aliases live in `brokers.json`: several entities serve the retail platform from a
second registrable domain, and the offsite guard must not discard them.

## Output is input

`out/` is gitignored. A harness run is an input to an entity profile, not a finding. See
[`../CONTRIBUTING.md`](../CONTRIBUTING.md).
