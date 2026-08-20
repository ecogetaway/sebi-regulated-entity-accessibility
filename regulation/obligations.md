# Obligation register

Every obligation the circulars place on a Regulated Entity, with its source and — the
column that governs everything else — whether it can be observed from outside the entity.

## Observability classes

| Class | Meaning | Can it be scored? |
|---|---|---|
| **P** — Public | Determinable from published material: a website, a PDF, a charter, a statement | Yes |
| **A** — Artifact | Determinable by testing the live platform | Yes, with stated tooling limits |
| **C** — Client | Determinable only with an account on the platform | Yes, with an account; post-login data must never be recorded |
| **N** — Not observable | Filed privately to SEBI or internal to the entity | **No.** Report as unmeasured, never as failed |

The **N** class is not a gap in the method. It is a finding about the regulation: SEBI
designed a private reporting regime, so a large part of compliance is structurally
invisible to investors, journalists and researchers alike.

## Register

| ID | Obligation | Source | Class |
|---|---|---|---|
| O1 | All digital platforms to meet WCAG 2.1 (or latest), GIGW, IS 17802, RPwD Act provisions | C2 Annexure I §B | **A** |
| O2 | Compliance reviewed and approved by the MD / Managing Partner / Proprietor | C2 §1.1 | N (P if disclosed) |
| O3 | A senior officer designated Nodal Officer for digital accessibility; defaults to Compliance Officer or Proprietor | C2 §1.1 | **P** |
| O4 | Nodal Officer to ensure audits, mitigation, implementation and timely grievance redressal; acts as SEBI's contact point | C2 §1.2 | N (P if named) |
| O5 | An accessibility-specific grievance mechanism — email, helpline, web forms — usable by PwDs, with escalation to senior officers | C2 §1.3 | **P** |
| O6 | Platforms to include ISL video, closed captioning, descriptive audio, alt text | C2 §2.1 | **A** |
| O7 | Circulars, notices and investor documents in PDF to follow accessible document standards and the WCAG PDF techniques | C2 §2.2 | **P** |
| O8 | Accessibility training for staff and third-party content/development providers; platforms "accessible by design" | C2 §3.1 | N |
| O9 | Digital KYC, e-KYC and video KYC to include alternatives — human-assisted video KYC, scanned uploads, voice-assisted KYC | C2 §4.1, C1 | **C** |
| O10 | KYC and client registration forms to carry a mandatory disability-status field and facilitation options | C2 §4.2 | **C** |
| O11 | An application from a client with a disability to be rejected only after review by a designated human officer, empowered to override automated rejection | C2 §4.2 | N |
| O12 | Comprehensive accessibility audit of websites, apps and portals through IAAP, following latest WCAG, GIGW and the RPwD Act | C2 §5.1 | N (P if disclosed) |
| O13 | The audit to include **usability testing by persons with disabilities** | C2 §5.1 | N (P if disclosed) |
| O14 | A remediation plan prepared and implemented from the audit findings | C2 §5.2 | N (P if disclosed) |
| O15 | Existing platforms upgraded to meet the standards within the transition timeline | C2 §5.3 | **A** |
| O16 | Annual accessibility audits through IAAP-certified professionals, reports submitted per §1.4 | C2 §5.4 | N (P if disclosed) |
| O17 | Newly developed or procured solutions to conform; SaaS vendors to audit their own products; responsibility stays with the RE | C2 §6.1 | N |
| O18 | Accessibility requirements in all RFPs and procurement contracts, with weighting in evaluation criteria | C2 §6.2 | N |
| O19 | Inventory of investor-facing digital platforms submitted | C2 ¶5, C4 Table C1 | N |
| O20 | Readiness and compliance status per platform, Annexure B format, by 31 Mar 2026 | C5 ¶3(a)–(b) | N |
| O21 | "Investors' Right to have digital accessibility" included in Investor Charters | C5 ¶2 | **P** |
| O22 | Accessibility complaints lodgeable on SCORES; the RE must remediate the issue to close the complaint | C5 ¶3(c) | **P** (signposting) / N (resolution) |
| O23 | Periodic accessibility audits of websites, mobile apps and portals through certified professionals | C5 ¶3(d) | N (P if disclosed) |
| O24 | Audit and remediation complete by 31 October 2026 | C6 | N |

Circular references: C1 = 23 May 2025 · C2 = 31 Jul 2025 (2025/111) · C3 = 29 Aug 2025 ·
C4 = 25 Sep 2025 · C5 = 8 Dec 2025 · C6 = 31 Jul 2026. See
[`circular-chain.md`](circular-chain.md).

## What the register shows

Of 24 obligations, **7 are publicly observable, 4 are testable on the artifact, 2 require a
client account, and 11 are not observable from outside at all.**

Nine of those eleven become partially observable *if the entity chooses to publish* — an
audit summary naming its auditor and date, a remediation note, a training statement. None
is required to. That asymmetry is the research finding this repository exists to document:
the regulation created a substantial obligation and no public accountability surface.

## Open questions

Three obligations carry unresolved questions that affect how they are scored or worded.
They are tracked in [`open-questions.md`](open-questions.md):

| | Question | Affects |
|---|---|---|
| **OQ-1** | Has SEBI amended the model Investor Charter it publishes? | **O21** — criterion S3 is **held, not scored**, until this resolves |
| **OQ-2** | What do the SCORES accessibility complaint figures show? | nothing scored; would strengthen findings |
| **OQ-3** | Does the 23 May 2025 KYC circular add obligations not captured here? | **O9**, **O10**, **O11** |
| **OQ-4** | Are there enough IAAP-certified auditors in India to meet 31 Oct 2026? | nothing scored; affects how an absent audit is interpreted |
