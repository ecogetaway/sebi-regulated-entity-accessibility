# Assessment walkthrough — Motilal Oswal Financial Services Limited

A line-by-line account of every finding recorded against one entity: what was done, what was
found, what it supports, and — as importantly — what it does not.

**Entity:** Motilal Oswal Financial Services Limited · rank 10 of 10 by NSE active clients
**Assessed:** 20 August 2026 · re-verified live the same day
**Method:** `harness/` at commit on `main`; rubric v0.1

**This is not a determination that the entity is or is not compliant with SEBI's digital
accessibility circulars.** Compliance is reported privately to SEBI and cannot be observed
externally. What follows is what was published, and what was observed.

---

## What is due now, and what is not

This governs every finding below, and it is where most challenges will begin.

Circular 2025/111 ¶7: *"Applicability: The provisions of this circular shall be applicable to
all REs **with effect from the date of this circular**"* — 31 July 2025.

Only §5.3, upgrading existing platforms, runs to "the transition timeline". The extension of
31 July 2026 moved **the accessibility audit and the remediation of its findings** to
31 October 2026. It did not move the provisions.

| Obligation | In force since | Extended to Oct 2026? |
|---|---|---|
| §1.1–1.2 Nodal Officer designated | 31 Jul 2025 | No |
| §1.3 Accessibility grievance mechanism | 31 Jul 2025 | No |
| §2.2 Investor documents to accessible-document standards | 31 Jul 2025 | No |
| §5.1 Audit through certified professionals | — | **Yes** |
| §5.2 Remediation of audit findings | — | **Yes** |

So an outstanding audit is **not** a finding against this entity today. An untagged investor
document is a different matter.

---

## Item 1 — Accessibility statement (criterion A1)

**What SEBI requires:** *nothing*. No circular obliges a Regulated Entity to publish an
accessibility statement, a conformance claim, or an audit report. This is stated plainly so
it cannot be misrepresented.

**What was done:** enumerated every `<a href>` on `https://www.motilaloswal.com/` (492 links)
and `https://www.motilaloswal.com/investor-charter` (469 links), matched against
`/accessibilit|a11y|divyang|differently[-\s]?abled/i` on both link text and href.

**What was found:** no match on either page. The strings "accessibility" and "disability" do
not appear in the rendered text of either page.

**What this supports:** an investor cannot find an accessibility statement, a conformance
claim, or accessibility information from this entity's home page or investor charter page.

**What this does NOT support:** any breach. There is no obligation to publish one. It also
does not establish absence site-wide — two pages were checked, not the whole site.

**Conceded in advance:** if such a page exists elsewhere and is simply not linked from these
two pages, the finding is one of discoverability only, and we will say so.

---

## Item 2 — Nodal Officer for digital accessibility (criterion A4)

**What SEBI requires:** §1.1 — a senior officer designated as Nodal Officer for digital
accessibility; absent a designation, the Compliance Officer or Proprietor is deemed to hold
it. §1.2 — that officer is the contact point for SEBI. **In force since 31 July 2025.**

**What was done:** searched the rendered text of both pages for `nodal officer`, and for any
co-occurrence of a nodal officer with accessibility or disability within 140 characters.

**What was found:** no occurrence of "nodal officer" on either page.

**What this supports:** no Nodal Officer for digital accessibility is discoverable by an
investor from the home page or the investor charter page.

**What this does NOT support:** that no officer has been designated. The circular requires
*designation* and names SEBI as the contact point; it does not in terms require publication
to investors. The designation may well exist and have been reported to SEBI privately — which
is precisely the visibility problem this project documents.

**Conceded in advance:** this is a discoverability finding, not a designation finding. We
cannot see designations.

---

## Item 3 — Accessibility grievance mechanism (criterion A5)

**What SEBI requires:** §1.3 — *"A grievance redressal mechanism specific to accessibility
issues shall be institutionalized within the REs. Channels such as email, helpline, and web
forms must be user-friendly for PwDs. The system must include provisions for escalation to
senior officers."* **In force since 31 July 2025 — not extended.**

**What was done:** enumerated grievance-related links and searched for any co-occurrence of
accessibility or disability with grievance, complaint or helpline within 160 characters.

**What was found:** three grievance addresses — `grievances@`, `dpgrievances@` and
`commoditygrievances@motilaloswal.com` — segmented by product line. No accessibility-specific
channel. No co-occurrence match on either page.

**What this supports:** **this is the strongest live finding against the entity.** A grievance
mechanism *specific to accessibility issues* is required, has been required for thirteen
months, and no deadline extension applies to it. None is discoverable.

**What this does NOT support:** that an accessible investor cannot complain at all. The
generic channels exist and presumably accept accessibility complaints. The circular asks for
something narrower — a specific mechanism with escalation — and that is what is absent.

**Conceded in advance:** if the entity operates an accessibility-specific channel that is not
linked from these pages, this becomes a discoverability finding. We would correct it.

---

## Item 4 — Investor Charter PDFs (criterion A7)

**What SEBI requires:** §2.2 — investor documents published in PDF *"must follow accessible
document standards"*, and the RE *"shall follow the PDF techniques covered in WCAG 2.1"*.
**In force since 31 July 2025 — not extended.**

**What was done:** downloaded all three Investor Charter PDFs linked from the entity's own
investor charter page, **with content-encoding decompression**, and checked each for a
structure tree, a Marked flag and a document language — corroborated against `pdfinfo`,
which reports its own `Tagged:` verdict independently of our code.

**What was found**, retrieved 20 August 2026:

| Document | Pages | Producer | `pdfinfo` Tagged | StructTreeRoot | Marked true | Lang | Extractable text | SHA-256 (first 16) |
|---|---|---|---|---|---|---|---|---|
| investor-charter-for-stock-brokers-dt-27-02-2025.pdf | 3 | Corel PDF Engine 19.0.0.328 | **no** | no | no | no | 9,960 chars | `7918741368bc14a0` |
| dp-charter-mar-2025.pdf | 3 | Microsoft Word 2016 | **no** | yes | no | yes | 5,681 chars | `21bc0c41e5a09bc2` |
| investor-charter-research-analyst.pdf | 3 | Corel PDF Engine 19.0.0.328 | **no** | no | no | no | 6,494 chars | `71776b3c051a79b6` |

**What this supports:** all three Investor Charter PDFs are untagged. Two declare no document
language. A screen reader cannot determine heading structure, table relationships, list
semantics or reading order from any of them, and cannot select a pronunciation dictionary for
two of the three. These are the statutory documents describing investors' rights.

**What this does NOT support — and this matters:** these are **not** scanned images. Text is
extractable from all three: 9,960, 5,681 and 6,494 characters respectively. A screen reader
will read words. What it will not get is structure. Any claim that these documents are
"unreadable" or "pictures of pages" would be **false**, and we do not make it.

The `dp-charter` is a partial case: Microsoft Word emitted a structure tree and a language,
but the document is not marked as tagged, so assistive technology will not use the tree. That
is a production-pipeline defect rather than an absence of effort.

**Conceded in advance:** §2.2 does not name PDF/UA or ISO 14289; it names the WCAG PDF
techniques. Our check tests the minimum machine-verifiable signals of a tagged PDF, not
conformance to PDF/UA. A document could fail our check and still have been produced in good
faith by a standard office tool — which is exactly what the Word-produced file shows.

---

## Item 5 — Digital accessibility right in the Investor Charter (criterion S3)

**Not scored. Held under [OQ-1](../../regulation/open-questions.md).**

The right is absent from this entity's charter, as it is from all ten checked. But the
December 2025 clarification says the right will appear in the charters *"published by SEBI"* —
the model template is the regulator's to amend, and SEBI's own published Investor Charter does
not contain it either. Scoring this against the entity would attribute a regulator's omission
to it.

---

## Item 6 — Automated scan results (Band B)

**Recorded, not published, and not assertable.**

Three surfaces scanned: 0 critical and 12.92 serious violation nodes per 1,000 DOM elements;
zero axe violations on the home page and the investor charter page — the cleanest automated
result in the sample.

**No manual reproduction pass has been run.** Under rubric rule 7 nothing from the scan may
be published until each finding is reproduced by hand. That applies to the favourable numbers
above as much as to any adverse one.

---

## Summary of what would survive challenge

| Finding | Standing |
|---|---|
| No accessibility-specific grievance mechanism discoverable | **Strong.** Obligation in force 13 months, not extended, and investor-facing by its own terms |
| Three Investor Charter PDFs untagged | **Strong.** Obligation in force 13 months; corroborated by an independent tool; documents retrieved, hashed and dated |
| No accessibility statement | **Weak as a compliance point** — none is required. Meaningful only as a transparency observation |
| No Nodal Officer discoverable | **Moderate.** Designation required; publication is not, in terms |
| Charter lacks the digital accessibility right | **Held.** Points at the regulator, not the entity |
| Automated scan results | **Not assertable.** Unverified by hand |

---

## A methodology failure caught in the course of this walkthrough

The first live re-verification of the three PDFs reported zero fonts, zero images and zero
extractable text — which would have supported a claim that they are unreadable scanned
images. That claim would have been **false**.

The cause was ours: the request omitted `--compressed`, the server returned gzip-encoded
responses, and the analysis ran against compressed bytes. The tell was that `file` reported
`gzip compressed data, original size 862316` — matching the earlier scan's byte count exactly.

Two rules follow, and both are now in the harness notes:
1. Always send `--compressed`, and assert the `%PDF` magic bytes before analysing a PDF.
2. Corroborate any adverse document finding with a second, independent tool before it leaves
   the building. `pdfinfo`'s `Tagged:` field is what confirms the real result here.

---

## Right of reply — status, stated accurately

Motilal Oswal Financial Services Limited has **not been contacted** as at 20 August 2026.

This document is published as **working evidence**, not as a finished assessment: it exists
so that the method can be inspected and disputed before any conclusion is drawn from it. It
carries no score and no compliance determination.

**Before any of this appears as a scored entity profile, or in any article, the entity will
be given notice and an opportunity to respond**, and any response will be reproduced in full
and unedited alongside the findings. That step has not yet been taken and is recorded here
as outstanding.

Corrections may be raised at any time via the
[score dispute form](../../.github/ISSUE_TEMPLATE/dispute-a-score.yml). A demonstrated error
is corrected with the correction noted, never silently.
