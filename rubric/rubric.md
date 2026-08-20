# Assessment rubric v0.1

For investor-facing digital accessibility at SEBI Regulated Entities. Derived from the
review rubric in `oss-accessibility-inclusion` — see
[`mapping-from-oss-rubric.md`](mapping-from-oss-rubric.md) for the derivation.

**Status: draft. Not yet applied to any published finding.**

---

## The rule that governs everything else

SEBI compliance is reported **privately** — by email to `digital_acc@sebi.gov.in`, or to
the entity's exchange, depository or BSE Ltd. Nothing in the six circulars requires an
entity to publish anything.

**No outside party can determine whether a Regulated Entity is compliant.** This rubric
does not attempt to. It measures two things that are observable: what an entity has
disclosed, and whether its platform works.

An entity can score badly here and have filed a satisfactory report with SEBI. An entity
can score well and still fail a real audit.

### Required language

Never write, and never let a finding be summarised as:

> ❌ "RE X is not SEBI compliant."

Write:

> ✅ "Our assessment identified accessibility barriers in X, Y and Z, against criteria
> mapped to SEBI's digital accessibility requirements."

This is not caution about phrasing. The compliance claim is *unavailable* — it depends on
material only SEBI holds. Asserting it would be asserting something we cannot know.

---

## Evidence ladder

Most criteria are scored on this ladder. The score is **the highest rung with evidence
behind it.** An accessibility statement that exists and says nothing verifiable is a 1, not
a 4 — the existence of a declaration is the weakest possible evidence of accessibility.

| Rung | Level | What it takes |
|---|---|---|
| 0 | **Absent** | Nothing published |
| 1 | **Declaration** | A statement of intent or commitment exists |
| 2 | **Process** | Documented testing, method, or standard-and-level named |
| 3 | **Independent validation** | An audit, with the auditor named, qualified and dated |
| 4 | **User validation** | Testing involving persons with disabilities, evidenced |
| 5 | **Outcome** | Specific barriers named as remediated, with what remains stated |

Rungs 3 and 4 are not optional refinements. Circular 2025/111 §5.1 requires an audit
through IAAP-certified professionals *and* that the audit "include usability testing by
persons with disabilities". They are obligations.

The ladder is why "our platform is accessible" earns a 1. The declaration exists; nothing
else does.

---

## Two scores, never summed

### A — Disclosed implementation

Governance, platform scope, documents, KYC provision, support and grievance, audit and
testing, training, procurement. Dimensions 1, 2, 5, 6, 7, 8, 9, 10.

**"Disclosed" is load-bearing.** Audit reports, testing records and remediation logs all go
to SEBI privately. Scoring what *exists* would score a private filing we cannot see; this
score measures what an entity has chosen to make public. Reported as a per-dimension
profile, not a single number.

### B — Investor experience

The live artifact and the journey through it. Dimensions 3 and 4.

Automated scan results, the four AA criteria automation can approximate, and the ten-step
journey protocol.

### Why they are not added

The two scores answer different questions from different evidence with different standing.
An entity with excellent governance documentation and an unusable trading terminal must not
be able to average its way to a good result — that failure mode is not hypothetical. In the
August 2026 baseline, the entity with the cleanest automated scan results published the
worst documents of any in the sample.

An **Overall Accessibility Benchmark** may eventually be derived from A and B — but only
after the methodology has been validated against entities that have completed their audits,
and never before.

---

## Dimensions

| # | Dimension | Score | Criteria |
|---|---|---|---|
| 1 | Accessibility governance | A | G1 Nodal Officer named · G2 accountability level stated · G3 ownership discoverable |
| 2 | Digital platform coverage | A | P1 scope of the accessibility claim published |
| 3 | Technical accessibility | B | T1 standard and level named · T2 automated WCAG 2.1 A/AA scan · T3 reflow, resize, text spacing, focus · T4 direct language |
| 4 | Investor journey | B | J1–J10, the standard journey |
| 5 | Documents and content | A | D1 investor PDFs tagged · D2 Investor Charter accessible · D3 captions and ISL |
| 6 | KYC and onboarding | A | K1 accessible alternatives published · K2 disability-status field present |
| 7 | Support and grievance | A | S1 accessibility grievance channel · S2 SCORES route signposted · S3 charter right — **held, [OQ-1](../regulation/open-questions.md#oq-1--has-sebi-amended-the-model-investor-charter)** |
| 8 | Audit, testing, remediation | A | A1 user testing evidenced · A2 auditor named and qualified · A3 findings in user terms · A4 remediation status · A5 cadence |
| 9 | Training and awareness | A | TR1 training commitment published |
| 10 | Procurement and vendors | A | V1 procurement policy published |

Criterion definitions and their circular sources are in
[`mapping-from-oss-rubric.md`](mapping-from-oss-rubric.md).

---

## Rules for applying it

**1. Score only published evidence.** Inherited from the OSS rubric, where it reads: *score
each criterion using the PR thread as the only evidence source — do not infer intent that
isn't recorded.* Here: do not credit an audit you assume was commissioned, a nodal officer
you assume exists, or remediation you assume happened.

**2. Absence of evidence is absence of evidence.** It is scored as a 0 on the ladder. It is
never reported as non-compliance.

**3a. Held is not zero either.** A criterion whose *interpretation* is unresolved — as
opposed to one that could not be tested — is marked **held**, linked to its entry in
[`../regulation/open-questions.md`](../regulation/open-questions.md), and excluded from the
profile. S3 is held under OQ-1: eleven of eleven entities lack the Investor Charter right,
but SEBI may not have amended the template it publishes, in which case the finding belongs
to the regulator. Scoring it against entities meanwhile would attribute a regulator's
omission to eleven firms.

**3. Unmeasured is not zero.** A criterion that could not be tested — no account, blocked to
automation, internal process — is reported as *unmeasured* and excluded from the profile.
Scoring an untested item as a failure is how a rubric starts lying.

**4. Score the live artifact.** Score the version discovery finds on the entity's own site,
never one found through a search engine. Stale assets stay served at old URLs; in the
August baseline one entity's Investor Charter appeared to fail the tagging check on a copy
that was no longer linked, while its live copy passed.

**5. Third-party destinations do not count.** Several entities point their grievance link at
`scores.sebi.gov.in` or `smartodr.in`. Directing investors to SEBI's own portal is
legitimate and is not the entity's artifact. Exclude, do not score.

**6. Never work around bot protection.** An entity that blocks automated agents is recorded
as `blocked_to_automation` and tested by hand. The method's credibility is the asset.

**7. Reproduce before publishing.** Every failure that reaches a published finding must be
reproduced manually and evidenced. Automated rules cover only a minority of WCAG success
criteria and the harness's heuristics — particularly focus visibility — produce false
positives.

**8. Never place a live order.** In journey step 6, drive the order pad to the confirmation
dialog and stop, or use a paper-trading mode where one exists. The same applies to anything
that moves money or alters a real account.

**9. Record no personal data.** Post-login surfaces carry holdings, balances and PAN. The
authenticated scanner records structural counts and rule identifiers only — never page
text, never screenshots.

---

## Known limits

- Automated rules cover a minority of WCAG success criteria. A clean scan is necessary and
  nowhere near sufficient. *(Replace with a cited figure from axe-core's own documentation
  before publication.)*
- **Mobile apps are out of scope in v0.1.** Every major broker ships native iOS and Android
  apps that no web scanner reaches. Testing them needs devices and a screen-reader user.
- Eleven of the twenty-four obligations in the register are not observable from outside at
  all.
- No person with a disability has yet tested anything in this repository. Until that
  changes, the Investor Journey dimension is an informed simulation, and must be labelled
  as one.
