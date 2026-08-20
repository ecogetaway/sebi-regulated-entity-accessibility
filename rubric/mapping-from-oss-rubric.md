# From the OSS review rubric to the SEBI rubric

The mapping this repository's rubric is derived from. Source:
[`review-rubric.md`](https://github.com/ecogetaway/oss-accessibility-inclusion/blob/main/review-rubric.md)
in `ecogetaway/oss-accessibility-inclusion` — six criteria, 0–2 each, scoring how an
open-source project's *review process* handled an accessibility pull request.

This is deliberately a derivation, not a fresh checklist. The research proposition is that
an existing open accessibility methodology adapts to a regulated financial-services
context — which is only interesting if the adaptation is traceable.

## What changes, structurally

| | OSS review rubric | This rubric |
|---|---|---|
| Unit scored | one pull request | one Regulated Entity |
| Evidence corpus | the public PR thread, and nothing else | published material, the live platform, and the client-side journey |
| What is judged | how the review process handled a fix | what the entity discloses, and whether the platform works |
| Artifact tested | never — explicitly out of scope | yes; the artifact is the obligation |
| Output | one total, 0–12, in a band | two scores, never summed — see [`rubric.md`](rubric.md) |

Four of the six criteria carry over with their meaning intact once the corpus is swapped.
One loses its referent. The circulars add obligations open source has no analogue for,
because open source has no regulator.

## The mapping

Treatments: **Reuse** — carries over as written · **Modify** — same idea, SEBI wording ·
**New** — no OSS analogue · **Retain** — general accessibility criterion kept unchanged.

Obligation IDs are from [`../regulation/obligations.md`](../regulation/obligations.md).
Evidence classes: **P** public · **A** artifact · **C** client account · **N** not observable.

### Dimension 1 — Accessibility governance

| Existing criterion | SEBI provision | Treatment | New/modified criterion | Evidence | Proposed score |
|---|---|---|---|---|---|
| 4. Reviewer confidence signal | O3, O4 — Nodal Officer designated, acts as SEBI's contact point | **Modify** | G1. A Nodal Officer for digital accessibility is named, with role and contact details | Website, statement — **P** | Ladder |
| — | O2 — compliance approved by MD / Managing Partner / Proprietor | **New** | G2. Accountability is stated at the level the circular requires | Statement — **P** | Ladder |
| 6. Outcome clarity | O3, O5 | **Modify** | G3. A reader can determine who owns accessibility and how to reach them | Website — **P** | Ladder |

### Dimension 2 — Digital platform coverage

| Existing criterion | SEBI provision | Treatment | New/modified criterion | Evidence | Proposed score |
|---|---|---|---|---|---|
| — | O19 — inventory of investor-facing platforms | **New** | P1. The entity publishes which platforms its accessibility claim covers | Statement — **P** | Ladder |
| — | O19 | — | *The inventory itself is filed privately.* Not scored | — **N** | Unmeasured |

The scored criterion is scope *declaration*, not scope. An accessibility claim that does
not say what it covers cannot be checked, and a claim covering only the marketing site
while the trading terminal is excluded is the failure mode this criterion exists to catch.

### Dimension 3 — Technical accessibility

| Existing criterion | SEBI provision | Treatment | New/modified criterion | Evidence | Proposed score |
|---|---|---|---|---|---|
| 2. WCAG mapping | O1 — WCAG 2.1 or latest, GIGW, IS 17802, RPwD Act | **Reuse**, retargeted | T1. The entity names a standard **and** a conformance level | Statement — **P** | Ladder |
| — | O1, O15 | **New** | T2. Automated WCAG 2.1 A/AA scan of investor-facing pages | axe-core, `harness/` — **A** | Density, not ladder |
| — | O1 | **New** | T3. Reflow at 320px, resize to 200%, text spacing, focus visible | `harness/` + manual — **A** | Pass/fail per criterion |
| 5. Direct language | — | **Retain** | T4. Accessibility claims name affected users, not "inclusion" in the abstract | Statement — **P** | Ladder |

T2 is the significant addition. The OSS rubric never tests the artifact — here the artifact
is the whole obligation.

### Dimension 4 — Investor journey accessibility

| Existing criterion | SEBI provision | Treatment | New/modified criterion | Evidence | Proposed score |
|---|---|---|---|---|---|
| — | O1, O15 | **New** | J1–J10. The ten-step standard journey completes with keyboard only, and with a screen reader | Manual protocol — **A**/**C** | Per step: completes / completes with difficulty / blocked |

The protocol is in [`../methodology/test-journey.md`](../methodology/test-journey.md).
This dimension is where the project is distinctive: automated scanning cannot tell you
whether a person can open an account or place an order.

### Dimension 5 — Documents and content

| Existing criterion | SEBI provision | Treatment | New/modified criterion | Evidence | Proposed score |
|---|---|---|---|---|---|
| — | O7 — accessible document standards, WCAG PDF techniques | **New** | D1. Investor PDFs are tagged: structure tree, Marked flag, document language | `harness/pdfcheck.mjs` — **P** | Proportion passing |
| — | O7, O21 | **New** | D2. The Investor Charter specifically is a tagged PDF or accessible HTML | `harness/pdfcheck.mjs` — **P** | Ladder |
| — | O6 — ISL video, captions, descriptive audio, alt text | **New** | D3. Multimedia carries captions; explainer video carries ISL | Page inspection — **A** | Ladder |

### Dimension 6 — KYC and onboarding

| Existing criterion | SEBI provision | Treatment | New/modified criterion | Evidence | Proposed score |
|---|---|---|---|---|---|
| — | O9 — accessible alternatives to e-KYC / video KYC | **New** | K1. Accessible KYC alternatives are published and reachable | Website — **P** | Ladder |
| — | O10 — disability-status field and facilitation options | **New** | K2. The registration form carries the field the circular requires | Account opening — **C** | Ladder |
| — | O11 — human review before rejecting a disabled applicant | **New** | *Not scored — internal process* | — **N** | Unmeasured |

### Dimension 7 — Support and grievance

| Existing criterion | SEBI provision | Treatment | New/modified criterion | Evidence | Proposed score |
|---|---|---|---|---|---|
| 6. Outcome clarity | O5 — accessibility-specific grievance mechanism with escalation | **Modify** | S1. An accessibility grievance channel exists, distinct from the generic one, with an escalation path | Website — **P** | Ladder |
| — | O22 — SCORES accessibility complaint category | **New** | S2. The SCORES accessibility route is signposted to investors | Website — **P** | Ladder |
| — | O21 — the right in the Investor Charter | **New** | S3. The Investor Charter carries the digital accessibility right | Charter — **P** | Ladder · **held, see below** |

**S3 is held — not scored.** Pending confirmation that SEBI has amended the model Investor
Charter it publishes. Full reasoning, and what would resolve it, in
[`../regulation/open-questions.md`](../regulation/open-questions.md#oq-1--has-sebi-amended-the-model-investor-charter).

### Dimension 8 — Audit, testing and remediation

| Existing criterion | SEBI provision | Treatment | New/modified criterion | Evidence | Proposed score |
|---|---|---|---|---|---|
| 3. AT testing evidence | O13 — audit "shall include usability testing by persons with disabilities" | **Reuse** | A1. Testing with disabled users is evidenced: who, what, what was found | Statement — **P** | Ladder |
| 4. Reviewer confidence signal | O12, O16, O23 — audit by IAAP-certified professionals | **Modify** | A2. The auditor is named, dated, and its qualification stated | Statement — **P** | Ladder |
| 1. User impact stated | O14 | **Modify** | A3. Findings are described in terms of affected users and blocked tasks | Statement — **P** | Ladder |
| — | O14 — remediation plan implemented | **New** | A4. Remediation status is published: fixed, outstanding, and by when | Statement — **P** | Ladder |
| — | O16 — annual audits | **New** | A5. An audit cadence is stated | Statement — **P** | Ladder |

Criterion 3 is the strongest single transfer in the mapping. The OSS work found empirically
that **assistive-technology testing evidence — not WCAG citation — predicts review
quality**; SEBI independently requires exactly that evidence in §5.1. The same signal is
load-bearing in both domains.

### Dimension 9 — Training and awareness *(added)*

| Existing criterion | SEBI provision | Treatment | New/modified criterion | Evidence | Proposed score |
|---|---|---|---|---|---|
| — | O8 — training for staff and third-party providers, "accessible by design" | **New** | TR1. A training commitment covering third-party developers is published | Statement — **P** | Ladder |

### Dimension 10 — Procurement and vendors *(added)*

| Existing criterion | SEBI provision | Treatment | New/modified criterion | Evidence | Proposed score |
|---|---|---|---|---|---|
| — | O17, O18 — accessibility in RFPs; SaaS vendors audit their own products; liability stays with the RE | **New** | V1. A published procurement policy carries accessibility requirements | Statement — **P** | Ladder |
| — | O17 | — | *Contract terms are not public.* Not scored | — **N** | Unmeasured |

Dimensions 9 and 10 are almost entirely unobservable. They are in the rubric so the gap is
explicit. A rubric that silently drops the obligations it cannot reach implies those
obligations do not exist.

## What did not carry over

OSS criterion **4, reviewer confidence signal**, has no direct equivalent: there is no
public reviewer thread for a regulated entity's accessibility work. Its underlying
question — *did anyone competent actually engage, or was this rubber-stamped?* — survives
as A2, auditor independence and qualification.

## Where the OSS rubric must not be copied

The OSS rubric totals six criteria into one 0–12 score. That works because every criterion
draws on one corpus with one epistemic status.

Here, criteria draw on four classes of evidence with different standing, and summing them
produces a number that looks authoritative and is not — and that a reader will hear as a
compliance score, which nobody outside SEBI can produce. The rubric therefore reports two
scores and never adds them. See [`rubric.md`](rubric.md) §Scoring.
