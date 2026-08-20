# Claim verification log

Every factual claim this project makes in public, with its source and its status. Verified
20 August 2026.

The point of this file is that a claim you cannot source should not survive contact with it.
Four claims did not, and are recorded below as corrected.

**Status key:** ✅ verified against primary text · ⚠️ verified but narrower than first stated
· ❌ found wrong, corrected · ⏳ not yet verified

---

## The regulation

| # | Claim | Status | Source |
|---|---|---|---|
| R1 | Supreme Court, 30 April 2025, held the right to digital access an intrinsic component of the right to life and personal liberty | ✅ | Quoted in circular 2025/111 Annexure I §A |
| R2 | The case is *Pragya Prasun & Ors. v. Union of India*, heard with a *Jain* matter | ⚠️ | 2025/111 names "Pragya Prasun & Ors. Vs. Union of India and Ors." and "Jain vs. Union of India & Ors." The first name **"Amar"** comes from secondary coverage only — write "*Jain v. Union of India*" or attribute the fuller name |
| R3 | Standards are WCAG "2.1 or latest version", GIGW latest, IS 17802, RPwD Act provisions | ✅ | 2025/111 Annexure I §B, verbatim |
| R4 | SEBI never writes WCAG 2.2, GIGW 3.0, or a year for IS 17802 | ✅ | Full text of 2025/111, 2025/121, 2025/131 and the Dec 2025 clarification searched |
| R5 | A Nodal Officer for digital accessibility is mandatory; defaults to Compliance Officer/Proprietor | ✅ | §1.1–1.2 |
| R6 | An accessibility-specific grievance mechanism with escalation is required | ✅ | §1.3 |
| R7 | Investor PDFs must follow accessible document standards; the circular cites the WCAG PDF techniques | ✅ | §2.2 |
| R8 | ISL, captions, descriptive audio, alt text required | ✅ | §2.1 |
| R9 | Audits must "include usability testing by persons with disabilities" | ✅ | §5.1, verbatim |
| R10 | A disabled applicant may be rejected only after review by a designated human officer empowered to override automated rejection | ✅ | §4.2 |
| R11 | Accessibility required in RFPs and procurement; SaaS vendors must audit their products; **responsibility** stays with the RE | ⚠️ | §6.1–6.2. The circular says "responsibility", not "liability". **Do not write "liability"** — it is a legal term the circular does not use |
| R12 | Audit and remediation deadline is 31 October 2026 | ✅ | Circular HO/(411)2026-ITD-5_DIV2/I/17922/2026, via BSE Notice 20260731-17 which reproduces it |
| R13 | The 14 Dec 2025 auditor-appointment milestone was replaced, not supplemented | ✅ | Dec 2025 clarification ¶3(a), verbatim "Instead of…" |
| R14 | Compliance is filed by email to `digital_acc@sebi.gov.in` or to the exchange/depository/BSE Ltd | ✅ | 2025/131 Part B; Dec 2025 Annexure A |
| R15 | The circulars prescribe no penalty | ✅ | Issued under s.11(1); no penalty clause in any circular read |
| R16 | **"Six circulars"** | ❌ | Contestable. SEBI's own December clarification references **three** prior circulars, and the July 2026 extension references four. The 23 May 2025 KYC circular is a **different series** (MIRSD, not ITD). **Corrected to:** "five digital accessibility circulars, preceded by a KYC circular in May 2025" |
| R17 | "Nothing in *six* circulars requires publication" | ❌ | Cannot be asserted — the 23 May 2025 KYC circular has **not been read against primary text** (see OQ-3). **Corrected to** a claim about the five circulars actually read |
| R18 | 24 obligations: 7 public, 4 artifact, 2 client-side, 11 not observable | ✅ | Own classification, published in `regulation/obligations.md`. Presented as a classification, not a finding of fact |

## The Investor Charter finding

| # | Claim | Status | Evidence |
|---|---|---|---|
| C1 | SEBI's own published Investor Charter contains no digital accessibility right | ✅ | `investor.sebi.gov.in/Investor-charter.html` retrieved 20 Aug 2026. 64,777 characters. Zero matches for "digital accessib", "disabilit". Only "access" matches are "access to clear and concise information" and an e-CAS reference |
| C2 | The most recent Investor Charter circular for stock brokers is 21 Feb 2025 | ⚠️ | SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2025/22 located. **Dec 2025 – May 2026 not exhaustively searched** — SEBI's paginated listing did not page, and its POST search returns HTTP 530. Keep the hedge "that I can locate" |
| C3 | **"Eleven brokers' charters"** | ❌ | **Ten.** 5paisa returns HTTP 403 to automated agents and no charter link was retrievable. **Corrected throughout** |
| C4 | None of the charters contains the right | ✅ | 32 charter documents (HTML + linked charter PDFs) across 10 brokers, 414,000 characters of text, whitespace-normalised. **Zero** matches for "digital accessib" |
| C5 | **"Every charter is the standard SEBI template, word for word"** | ❌ | Unsupported. Only **7 of 10** carry the legacy clause XVII (whitespace-normalised count). **Corrected to** the claim actually evidenced: none contains the right |
| C6 | Corpus adequacy | ⚠️ | Kotak (2,728 chars) and HDFC Securities (5,874) returned thin corpora — likely a landing page rather than the full charter. The other eight range from 22,183 to 91,533 characters. **Treat those two as less conclusive** and say so |
| C7 | "In one broker's charter neither 'accessib' nor 'disab' appears" | ✅ | Angel One, 34,416 characters, neither string present. (HDFC Securities also, but see C6) |

**A methodology note worth keeping.** The first run of this check reported 6 of 10 carrying
clause XVII. It was 7. `pdftotext` line-wraps, and the phrase "…even if / differently abled"
broke the regex across a newline. Normalise whitespace before matching any multi-word phrase
in extracted PDF text. The stored `charter-verification.json` has since been recomputed.

## Claims made in working discussion, checked and mostly withdrawn

These were never published. They are recorded because a claim that fails should leave a trace.

| # | Claim | Status | Evidence |
|---|---|---|---|
| K1 | "Kotak has the lowest critical-violation density" | ❌ | **False.** Four brokers sit at 0.00/1k; Kotak is fifth at 0.21 |
| K2 | "Kotak has no failing charter PDFs" | ❌ | **Misleading.** Kotak had **zero** charter PDFs tested. 0/0 is not a pass — same for Zerodha, HDFC and Dhan |
| K3 | Kotak has the lowest serious-violation density | ✅ | 2.21/1k, lowest of ten — but subject to S1 below |
| K4 | Kotak is the only broker with a published accessibility statement | ✅ | Link enumeration across ten home pages |
| K5 | **"Kotak is best at nearly everything"** | ❌ | Two of four supporting claims fail. Only K3 and K4 survive. **Withdrawn** |
| K6 | "Disclosure does not predict artifact quality" | ⏳ | Spearman ρ = 0.30, weakly *positive*. Band A has near-zero variance — 7 of 10 measured brokers score nil — so the correlation is not interpretable at n=10. **Hypothesis not supported** |
| K7 | Band A cannot carry a scored article | ✅ | Range 0/6 to 1/6; seven of ten score zero |
| K8 | Band B has a fortyfold spread in serious-violation density | ✅ | 2.21 to 89.69 per 1,000 DOM nodes — subject to S1 |
| X1 | **This project's own verification workbook, first build** | ❌ | Three errors on review: carried the un-normalised clause count; computed the untagged-PDF share on the wrong basis; and **counted 5paisa's unmeasured Band A as a zero** — the exact error the rubric forbids. All three corrected |
| S1 | All axe, reflow, text-spacing and focus-visibility results | ⏳ | **No manual reproduction pass has been run. Nothing from the scan may be published until it has** |

## Disclosure findings

| # | Claim | Status | Evidence |
|---|---|---|---|
| D1 | Of the brokers checked, one publishes an accessibility statement | ✅ | Kotak Securities, `kotakneo.com/disclaimer/web-accessibility-statement/`, retrieved 20 Aug 2026 |
| D2 | Kotak's statement names its auditor | ✅ | Verbatim: "We have engaged Pivotal Accessibility, a DEPwD empaneled auditor, to conduct a formal audit of our platform." |
| D3 | Kotak names no conformance standard or level | ✅ | Verbatim: "recognised accessibility standards" — no standard, no level, no date |
| D4 | **Kotak's statement is thin** | ⚠️ | **Ungenerous and corrected.** It also declares scope (Kotak Neo App, website pre- and post-login, DIY account opening, KINSITE), states a phased remediation roadmap, carries a **Known Limitations** section for third-party components, and gives a feedback route. That is a materially better disclosure than the sample's, and the piece must say so before noting what is missing |
| D5 | SEBI's circular specifies IAAP; Pivotal is described as DEPwD-empanelled | ✅ | Both verbatim from their respective sources. **State the difference; do not imply Pivotal is unqualified** — DEPwD empanelment is a real credential, simply not the one §5.1 names |
| D6 | UTI AMC's BRSR says it is "progressively working towards enhancing digital accessibility in line with the Web Content Accessibility Guidelines (WCAG)" | ✅ | Verbatim from the filed PDF, ref UTI/AMC/CS/SE/2026-27/0682, 24 June 2026, with independent assurance |
| D7 | ~a third of investor PDFs are untagged | ⚠️ | **State the basis.** 25 of 76 (32.9%) counting only PDFs hosted on the brokers' own domains — the basis the article's wording implies. 31 of 84 (36.9%) including third-party hosts |
| D8 | SEBI's own circular PDFs are tagged | ⚠️ | **Three** checked (2025/111, 2025/131, Dec 2025 clarification): all have structure tree, Marked flag and language. Say "the circulars I checked", not "SEBI's circulars" |

## Claims about other people's work

Held to a higher bar than the rest, because they name organisations.

| # | Claim | Status | Evidence |
|---|---|---|---|
| V1 | Vendors cite "WCAG 2.1/2.2 AA", "GIGW 3.0", "IS 17802:2021" | ✅ | BarrierBreak readiness guide (all three); enabled.in markets "WCAG 2.2 AA" and "IS 17802 (Part 1 & 2)" |
| V2 | **"A seven-thousand-word readiness document"** | ❌ | ~12,000–13,000 words. **Corrected** |
| V3 | **That guide "still lists 31 July 2026… three weeks after it moved"** | ❌ | The page shows **no publication or last-updated date**, so no claim can be made about *when* it was written or whether it was updated after the extension. **Corrected to** the verifiable form: "as retrieved on 20 August 2026, it lists…" — which is fair, since it is live and says so today |
| V4 | The same guide lists the cancelled 14 Dec 2025 milestone as live while describing the substitution correctly elsewhere | ✅ | Both sections confirmed on the live page |
| V5 | enabled.in advertises "IAAP Certified" as a corporate credential, though IAAP certifies individuals | ✅ | Page text confirmed. **Frame as a precision point, not an accusation** — the firm may well employ certified individuals |

## Framing risks that are not factual errors

| # | Risk | Action |
|---|---|---|
| F1 | The opening scene reads as a reported case | It is a **composite illustration**, not a person interviewed. Label it as such in the text. Presenting a constructed scene as reportage in a piece whose whole argument is about evidentiary standards would be self-refuting |
| F2 | "Two provisions go further than anything I know of in comparable regimes" | Opinion, hedged. Keep the hedge |
| F3 | Naming firms | Kotak and UTI are named only for what they chose to publish, quoted verbatim. No firm is named in connection with an unverified scan result |

## Outstanding

- **OQ-3** — the 23 May 2025 KYC circular is still unread against primary text. Until it is,
  no claim may be made about "all the circulars".
- **OQ-1** — the Dec 2025 – May 2026 window for a revised model Investor Charter.
- **OQ-4** — IAAP certified-practitioner numbers in India.
- The scan results (axe, reflow, focus) remain **unverified by hand** and appear in no
  published claim.
