# Four walkthroughs, and what they do to the rubric

Zerodha, Groww, HDFC Securities and SBI Securities — verified live 20 August 2026, using
only checks that can be asserted with certainty. No axe results. Every finding below was
produced by two independent methods.

**None of this is a compliance determination.** Compliance is filed privately with SEBI.

## Method

Page structure was read from the rendered DOM in headless Chromium **and** independently
from raw HTML retrieved by `curl --compressed`, with no browser involved. Both agree on
every value reported here.

PDFs were retrieved with decompression, checked for `%PDF` magic bytes before analysis, and
their tagging corroborated against `pdfinfo`'s own `Tagged:` verdict. Each is hashed.

*(Both precautions come from the Motilal Oswal walkthrough, where a request without
`--compressed` analysed gzip bytes and appeared to show three charters were unreadable
scanned images. They were not.)*

---

## Zerodha — rank 2

| Check | Result |
|---|---|
| `lang` on `<html>` | **absent** — home, investor charter, and support |
| Skip link | no |
| Charter PDFs | none — the charter is HTML |
| Accessibility statement | none |
| Nodal Officer discoverable | no |
| Accessibility grievance channel | no |

**The finding:** India's second-largest broker declares no page language anywhere checked.
That is **WCAG 3.1.1 Language of Page, Level A** — not AA, the base level — and the December
2025 clarification's own reporting format asks whether each platform meets "minimum level of
accessibility at AA level as per latest WCAG guidelines", which subsumes Level A.

Why it matters rather than being a technicality: without a declared language a screen reader
cannot select a pronunciation dictionary. English text may be read with Hindi phonetics, or
the reverse. It is one attribute, in one tag, and it is the single cheapest fix in
accessibility.

**What it does not support:** that the platform is unusable. It is one criterion of many.

---

## Groww — rank 1

| Check | Result |
|---|---|
| `lang` on `<html>` | `en` |
| Skip link | no |
| Charter PDFs | 4 retrieved — **3 tagged and pass, 1 fails** |
| Accessibility statement | none |
| Nodal Officer discoverable | no |
| Accessibility grievance channel | no |

Charter PDFs, retrieved 20 Aug 2026:

| Document | Pages | `pdfinfo` Tagged | Lang | Text | SHA-256 |
|---|---|---|---|---|---|
| sebi_investor_charter_stock_broker_6bc6314645.pdf | 7 | yes | yes | 9,386 | `453afebbf1a9b394` |
| Investor_Charter_Depository_Participant_7e0ba0900b.pdf | 12 | yes | yes | 20,395 | `3fb3ce93bb08bb94` |
| **sebi_investor_charter_mutual_funds_dc947e2b78.pdf** | 8 | **no** | no | 10,545 | `2c43a7e8c906fe49` |
| SEBI_investor_charter_research_analyst_caae48d99a.pdf | 6 | yes | yes | 8,328 | `5f888cab5c57a28b` |

**The finding:** three of four charters are properly tagged — someone did this deliberately
and well. The mutual funds charter is not, and declares no language. This is a gap in a
process that demonstrably exists, which is a different and more fixable problem than absence
of effort.

**Correction carried forward:** an earlier draft said Groww's stock-broker charter was
untagged. That was a **stale asset found through a search engine**; the copy linked from
Groww's own site passes. Only the mutual funds charter fails.

---

## HDFC Securities — rank 7

| Check | Result |
|---|---|
| `lang` on home | `en` |
| `lang` on investor charter page | **absent** |
| Skip link | no |
| Charter PDFs | none found on the charter page |
| Accessibility statement | none |
| Nodal Officer discoverable | no |
| Accessibility grievance channel | no |

**The finding:** the language declaration is present on the home page and missing on the
investor charter page — the same site, two different answers. Inconsistency within one
property is its own signal: it suggests page-level or template-level work rather than a
platform-wide standard, which is exactly what an audit would be expected to catch.

---

## SBI Securities — rank 8

| Check | Result |
|---|---|
| `lang` on `<html>` | `en`, both pages |
| Skip link | **yes** — the only one of the four |
| Charter PDFs | **3 retrieved, all tagged and passing** |
| Accessibility statement | none |
| Nodal Officer discoverable | no |
| Accessibility grievance channel | no |

Charter PDFs: Depository (7pp, `8e87ea4c868ae118`), Research Analyst (6pp,
`8d7c310f788f9dc7`), Stock Broker (7pp, `fb9ccebeac716d5d`) — all `pdfinfo Tagged: yes`,
all declaring a language.

Its grievance route points to SEBI's SCORES portal, a third-party destination, correctly
excluded from its score rather than counted against it.

**The finding, and it is the important one:** SBI Securities has the best measurable
accessibility of the four — a declared language, a working skip link, and every investor
charter properly tagged — while publishing **nothing at all**. No statement, no nodal
officer, no conformance claim.

---

## What these four do to the rubric

Set the two columns side by side.

| | Zerodha | Groww | HDFC Sec | SBI Sec |
|---|---|---|---|---|
| **Diagnostic** — does it work? | | | | |
| Page language declared | ✗ | ✓ | partial | ✓ |
| Skip link | ✗ | ✗ | ✗ | ✓ |
| Charter PDFs tagged | n/a | 3 of 4 | n/a | 3 of 3 |
| **Compliance / disclosure** | | | | |
| Accessibility statement | ✗ | ✗ | ✗ | ✗ |
| Nodal Officer discoverable | ✗ | ✗ | ✗ | ✗ |
| Accessibility grievance channel | ✗ | ✗ | ✗ | ✗ |

**The diagnostic column discriminates. The disclosure column does not.**

The diagnostic checks produce a real ordering — SBI Securities, then Groww, then HDFC
Securities, then Zerodha — and each difference traces to a specific attribute in a specific
document that anyone can re-check in a browser.

The disclosure checks produce four identical zeros. A column where every entity scores nil
carries no information about any of them. It is a fact about the **regime**, not about the
firms — and the reason is now plain: SEBI mandated the items that do not discriminate
(grievance channel, nodal officer) and left optional the ones that would (a conformance
claim, a published audit, a VPAT).

### Three consequences

**1. Score diagnostics per entity. Report disclosure per industry.**
"Zerodha declares no page language and SBI Securities does" is a finding about firms.
"None of ten brokers publishes an accessibility statement" is a finding about the regulation.
Presenting the second as a per-firm grade was the design error.

**2. An accessibility grievance channel is required but not diagnostic.**
Its absence is a breach of §1.3, in force since 31 July 2025. Its presence would tell a
disabled investor nothing about whether the platform works. It belongs in the compliance
register, never in the score.

**3. Documents are not paperwork.** A charter PDF is content a blind investor needs to read.
Tagged charters belong in the diagnostic column alongside the web pages, because that is what
they are — and they are the single most discriminating check available from outside.

### What SBI Securities proves

The entity with the best measurable accessibility publishes nothing. Any rubric that scores
disclosure as though it were accessibility would rank it near the bottom — alongside the
broker that fails a Level A criterion on every page.

That is the case against the rubric as I first built it, and it is why it changes.
