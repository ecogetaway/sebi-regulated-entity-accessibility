# Claim verification log

Every factual claim this project makes in public, with its source and its status. Verified
20 August 2026.

The point of this file is that a claim you cannot source should not survive contact with it.
Four claims did not, and are recorded below as corrected.

**On dates.** This file carries several. The measurement evidence — the scan, the charter
corpora, the PDF checks — was retrieved on **20 August 2026**, and those stamps are the
retrieval dates recorded in `out/scan.json` and `out/charter-verification.json`. Practitioner
and entity responses arrived later and are dated when received. Where a date appears against a
claim it is the date that claim's evidence was obtained, never the date it was written up.

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

## EU comparison — added 31 August 2026

| # | Claim | Status | Evidence |
|---|---|---|---|
| E1 | **"as the EU's Web Accessibility Directive does"** | ❌ | **Wrong instrument.** The WAD (2016/2102) covers **public sector bodies**. For a financial-services comparison the correct law is the **European Accessibility Act, Directive (EU) 2019/882**. Corrected in the article |
| E2 | The EAA covers consumer banking services | ✅ | Article 13; consumer banking named explicitly in scope |
| E3 | The EAA requires public information on how a service meets accessibility requirements | ✅ | Annex V — included in general terms and conditions or equivalent, publicly available, in accessible formats |
| E4 | The EAA points at WCAG 2.1 AA | ⚠️ | **Indirectly**, via EN 301 549, the harmonised standard. Do not write that the EAA "names WCAG"; it does not. Say it resolves to WCAG 2.1 AA through EN 301 549 |
| E5 | The EAA has applied since 28 June 2025 | ✅ | |
| E6 | "Europe has solved this" | ❌ | **Never claim it.** EAA statements are self-declared; enforcement varies by member state; transposition was uneven. WebAIM Million 2026 reports 95.9% of top-million homepages with detected WCAG failures. Any claim that a jurisdiction *meets* the standard is falsifiable in one search. The defensible claim is about **visibility**, not outcomes |
| E7 | A statement obligation would fix the Indian gap | ⚠️ | Our own data limits this. **Kotak published a statement voluntarily, with no obligation, and it still names no conformance level and no audit date.** A statement requirement produces statements; whether it produces accessible platforms is unanswered |

## Entity responses — received 31 August 2026

| # | Claim | Status | Evidence |
|---|---|---|---|
| Z1 | Zerodha serves no `lang` attribute | ✅ | Two independent methods, **and not disputed by the firm on notice** |
| Z2 | Zerodha has no accessibility-specific grievance channel | ✅ | **Admitted verbatim**: "while we do not currently have a separate portal solely for accessibility". §1.3, in force since 31 Jul 2025, not extended. Confirmed by the entity, not inferred |
| Z3 | Zerodha committed to fixing the `lang` attribute | ❌ | **Do not claim this.** The reply says the teams will "examine the feasibility" and that it is on an "internal feedback list for future web platform improvement updates". No date, no commitment |
| Z4 | No Nodal Officer for digital accessibility at Zerodha | ⚠️ | The question was **not answered**. Remains a discoverability finding only; absence of an answer is not evidence of absence of an officer |
| P1 | 5paisa responded substantively | ⚠️ | A reply was received **27 August 2026**. It states the firm is "actively working towards compliance", is reviewing "digital platforms, processes, grievance-handling framework, and investor-facing documents", and that it has "taken note" of the PDF observations. **None of the four questions was answered** — no nodal officer named, no accessibility grievance channel described, no auditor or audit date given, and no answer on which production route generates client documents |
| P2 | 5paisa cited the October extension in reply to standing-obligation questions | ✅ | The reply notes SEBI "has extended the timeline for completion of accessibility audits and remediation activities up to 31 October 2026". **Accurate in itself.** But the questions it answers concerned the nodal officer (§1.1), the accessibility grievance channel (§1.3) and document accessibility (§2.2) — provisions in force since 31 July 2025 that the extension did not move. The reply does not distinguish between the two. Whether that is a considered position or customer-service phrasing cannot be told from one email, and should not be asserted either way |
| P3 | 5paisa's PDFs changed after the enquiry | ❌ | **No.** Re-retrieved 31 August 2026: all three byte-identical to 20 August — `3bdadab85da34649` (charter, tagged), `f7a018995fa78a86` and `d7badd846f19c1ea` (both Annexure B, untagged). **Report this neutrally.** Four days is not a reasonable remediation window, and the firm committed only to considering it as part of ongoing work. The value is a dated hashed baseline for 31 October, not a criticism |
| H1 | HDFC Securities responded substantively | ✅ | **Yes — the most complete reply of the four.** Received by 10 September 2026 (date to be confirmed from the email header). All ten questions answered. The reply apologised for delay |
| H2 | HDFC Securities has designated a Nodal Officer for digital accessibility | ✅ | **Named in the reply**, reachable at `complianceofficer@hdfcsec.com`. The individual's name is held in the private correspondence log and is **not** to be published. This is the first firm to name one. Our earlier "not discoverable" finding stands as a discoverability finding only — the officer exists |
| H3 | HDFC Securities has an accessibility-specific grievance mechanism | ⚠️ | **In progress, by its own account.** Staff "sensitized", training modules "being arranged", and the firm is "in the process of updating our dedicated escalation matrix for accessibility grievances" — interim route is the general matrix. §1.3 in force since 31 Jul 2025. An honest statement that it is not yet in place |
| H4 | HDFC Securities has completed an IAAP-certified accessibility audit | ✅ (firm's statement) | Verbatim: "An IAAP-certified auditor has completed the preliminary accessibility audit, and the report was submitted on 30 April 2026. The next accessibility audit cycle is underway and will be completed by 31 October 2026." **The first evidence anywhere in this project of a completed audit.** 30 April 2026 was the original deadline. Not independently verifiable — which is the article's point |
| H5 | Usability testing by persons with disabilities is being carried out | ⚠️ | Stated: "included in the audit plan and is being carried out as prescribed". Not verifiable from outside |
| H6 | HDFC Securities' investor PDFs are tagged | ❌ (by admission) | "We are currently working towards implementing PDF tagging." §2.2 in force since 31 Jul 2025 |
| H7 | HDFC Securities' KYC accommodates persons with disabilities | ⚠️ | Verbatim: persons with disabilities "may complete the KYC journey independently or with assistance. **Limitations currently arise only in cases where selfie verification fails, such as with blind users, severe burn cases, or similar situations.**" That names, as the exception, precisely the population *Pragya Prasun* and the *Jain* petition protected — blind petitioners and acid-attack survivors. An assisted route exists, and §4.2's human-review requirement would apply; whether it does in practice is not stated. **Quote exactly if used; do not characterise it as a breach** |
| H8 | Captions on explainer videos | ✅ (firm's statement) | "Yes, our investor-education and KYC explainer videos currently include captions." ISL not mentioned |
| H9 | Procurement clauses | ⚠️ | "being incorporated" — in progress |
| H10 | **HDFC Securities on the Investor Charter right** | ✅ | Verbatim: "The Investor Charter will be updated to incorporate 'Investors' Right to have digital accessibility' **as per SEBI's model text or guidance**." **The first regulated entity to state its reading: it is waiting for SEBI's model.** Directly relevant to OQ-1 |
| H11 | Mobile app covered | ✅ (firm's statement) | "Digital accessibility obligations apply to both our website and mobile application." |
| I1 | ICICI Securities has responded substantively | ❌ | **Not yet.** A holding acknowledgement was received **29 August 2026** from ICICI Bank's Office of Head Service Quality, stating the complaint concerns ICICI Securities and that "we are arranging for our official from ICICI Securities to revert". No question answered. The 21-day clock from the enquiry has **not** stopped |
| I2 | The enquiry reached the right entity first time | ❌ | It did not. The reply confirms it was routed via **ICICI Bank**, then referred internally to ICICI Securities. Worth noting neutrally: for a group with a bank and a broker, an accessibility enquiry crossing entity boundaries is a routing question, not a finding against either |
| Z5 | **The four-entity diagnostic ranking reflects accessibility** | ❌ | **Materially misleading and corrected.** Zerodha ships an Accessibility mode on the Kite app — a Settings toggle from v3.1.3 improving TalkBack/VoiceOver compatibility, verified on Zerodha's own support documentation. Mobile is out of scope in rubric v0.1, so the firm ranked last on what we measure while having shipped a deliberate accessibility feature on the surface we cannot see. Label the ranking **web-surface only**, everywhere |

## Article v3 — new claims, 10 September 2026

v3 removes every named regulated entity except Kotak (credited, critique moved off it) and
adds a three-jurisdiction comparison plus anonymised broker correspondence.

| # | Claim | Status | Evidence |
|---|---|---|---|
| U1 | No US financial regulator — SEC or FINRA — has issued a digital accessibility rule for broker-dealers | ✅ | Searched 10 Sep 2026; none found. The SEC has referenced "applicable accessibility-related requirements under the ADA" in an adopting release, which is deference, not a rule |
| U2 | DOJ withdrew its Title III web-accessibility rulemaking in December 2017 and never revived it | ✅ | Federal Register, 26 Dec 2017, "Notice of Withdrawal of Four Previously Announced Rulemaking Actions" |
| U3 | The 2024 Title II rule sets WCAG 2.1 AA and applies only to state and local government | ✅ | Federal Register 24 Apr 2024; ADA.gov fact sheet |
| U4 | Title II compliance deadlines were pushed to 2027–28 | ✅ | Federal Register 20 Apr 2026, interim final rule extending by one year: large entities 26 Apr 2027, small 26 Apr 2028 |
| U5 | *Robles v. Domino's* established that the ADA reaches websites | ✅ | 9th Cir. Jan 2019; cert denied Oct 2019; district court ordered WCAG 2.0 compliance Jun 2021; settled Jun 2022 |
| U6 | Title III web suits reached a three-year high in 2025 | ⚠️ | From law-firm commentary (Morgan Lewis, Nov 2024 onward). **Cite the source in the piece or soften to "rose sharply"** |
| U7 | "Same standard, three times" | ⚠️ | India names WCAG 2.1; EU reaches WCAG 2.1 AA via EN 301 549; US courts reference WCAG 2.0/2.1 without a rule. **Defensible as shorthand; do not write that the US "mandates" WCAG** |
| B1 | All four brokers asked replied within their charter windows | ✅ | Z, P, I (holding), H — all by 10 Sep. ICICI's substantive reply had not arrived; the holding note counts as a reply, and the piece says "a holding note and nothing further within the window" |
| B2 | "One of these firms appears to have done exactly what the circular asks" | ⚠️ | HDFC's own statement (H4). **Not independently verifiable**, and the piece says "appears". Never harden to "has done" |
| B3 | Anonymised identities are not recoverable | ⚠️ | "One of India's two largest brokers" narrows to Groww or Zerodha. The `lang` defect and Kite accessibility mode identify Zerodha to anyone who checks. **Accepted**: every fact is verified and one is the firm's own admission; anonymity here is courtesy, not concealment |
| PR1 | Practitioner paraphrase on IAAP not being the norm in India | ⏳ | **ATTRIBUTION CONSENT NOT YET RECEIVED.** Paraphrased as background with no name. Confirm before publication or remove |
| K2 | The vendor-guide critique is anonymised singular, not "several guides" | ✅ | Only one guide was verified as carrying the stale date after the extension. "Several" would be false |

## Outstanding

- **OQ-3** — the 23 May 2025 KYC circular is still unread against primary text. Until it is,
  no claim may be made about "all the circulars".
- **OQ-1** — the Dec 2025 – May 2026 window for a revised model Investor Charter.
- **OQ-4** — IAAP certified-practitioner numbers in India.
- The scan results (axe, reflow, focus) remain **unverified by hand** and appear in no
  published claim.
