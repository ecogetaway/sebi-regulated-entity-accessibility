# SEBI Regulated Entity Accessibility

Assessing digital accessibility across SEBI-regulated entities using an open,
evidence-based methodology — adapted from
[`oss-accessibility-inclusion`](https://github.com/ecogetaway/oss-accessibility-inclusion)
and re-aimed at a regulated financial-services context.

**Provenance.** Part of the **OSS Infrastructure Initiative** — an evidence-first portfolio
applying one method across under-served accessibility and inclusion domains. This repository
is the first application of that method to a regulated market.

_Status: rubric v0.1 drafted, harness built, August 2026 baseline captured and **not yet
hand-verified**. No published findings._

---

## The gap this fills

SEBI requires every Regulated Entity — brokers, mutual funds, depositories, exchanges,
advisers — to bring investor-facing digital platforms to WCAG 2.1, audit them through
certified professionals, and remediate the findings. The deadline is **31 October 2026**.
The obligation traces to the Supreme Court's judgment of 30 April 2025 in *Pragya Prasun &
Ors. v. Union of India*, which held digital access intrinsic to Article 21.

**But every compliance submission is private** — email to `digital_acc@sebi.gov.in`, or to
the entity's exchange or depository. No public register. No published audits. No
accessibility-statement obligation.

So the obligation is real, dated, and completely unverifiable from outside. A great deal has
been written explaining what SEBI requires; accessibility vendors got there first, because
the explainer is lead generation. **Nothing published measures what the market actually
looks like against it** — because the regulation gives nobody the means to look.

This repository measures. It publishes the rubric before the scores, keeps raw output so any
number can be re-run, and states plainly what it cannot see.

## What this is / is not

| What this is | What this is not |
|---|---|
| An external assessment of what entities disclose and how their platforms behave | A compliance determination — see below |
| A rubric derived traceably from prior open-source accessibility work | A generic accessibility checklist |
| A reproducible measurement harness with published raw output | An audit service or certification body |
| A research programme with a before/after design around the October deadline | Legal advice |

### It does not determine compliance

Compliance is reported privately to SEBI. **No outside party can determine whether a
Regulated Entity is compliant, and this repository never claims to.** An entity can score
badly here and have filed a satisfactory report. Findings are always phrased as barriers
observed against criteria *mapped to* SEBI's requirements — never as non-compliance.

## Structure

| Path | Contents |
|---|---|
| [`regulation/`](regulation/) | The six circulars, verified against primary text; the 24-obligation register with observability classes |
| [`rubric/`](rubric/) | The v0.1 rubric, and its traceable derivation from the OSS review rubric |
| [`methodology/`](methodology/) | The ten-step investor journey protocol; what the method cannot see |
| [`harness/`](harness/) | Playwright + axe-core scanner, PDF structure checker, scorer |
| [`entity-profiles/`](entity-profiles/) | Per-entity assessments — **hand-verified only** |
| [`findings/`](findings/) | Dated harness runs. Inputs, not results |

Start with [`regulation/obligations.md`](regulation/obligations.md) — it is the spine
everything else maps onto.

## The research design

The 31 July 2026 circular moved the audit and remediation deadline to 31 October 2026. That
creates a window:

- **August–October 2026** — establish the methodology, capture a baseline of what is
  publicly visible before the deadline
- **After 31 October 2026** — reassess, and compare

Which turns "we scored some websites" into a question worth asking: **are SEBI's digital
accessibility requirements translating into observable improvements in investor-facing
digital experiences?**

The August baseline is the only record of "before" that will exist. It is time-critical —
see [`findings/README.md`](findings/README.md).

## Reproducing

```bash
cd harness
npm install && npx playwright install chromium
node discover.mjs      # enumerate investor-facing surfaces from each home page
node scan.mjs          # measure
node pdfcheck.mjs --from-scan
node score.mjs
```

Authenticated surfaces need a real browser the account holder signs into themselves; see
[`harness/README.md`](harness/README.md). The scanner records no page text and no
screenshots from authenticated pages.

## Contributing

Corrections are the most useful contribution — particularly a
[disputed score](.github/ISSUE_TEMPLATE/dispute-a-score.yml) with evidence. Regulated
entities named in this repository have a standing right of reply, reproduced unedited. See
[`CONTRIBUTING.md`](CONTRIBUTING.md).

## Licence

Apache 2.0.
