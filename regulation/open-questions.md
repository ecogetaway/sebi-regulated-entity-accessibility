# Open questions

Questions this repository cannot yet answer, and which affect how findings are scored or
worded. Each is numbered so it can be cited from a criterion, a profile or a published
piece. **A held criterion is not scored** — it is reported as held, with a link here.

Resolving one of these is among the most useful contributions anyone can make.

---

## OQ-1 — Has SEBI amended the model Investor Charter?

**Status:** Open, but substantially advanced · raised 20 August 2026 · evidence added 20 August 2026
**Affects:** criterion **S3** (dimension 7), obligation **O21**
**Effect:** S3 is **held — not scored against any entity** until this resolves.

### The question

The clarification of 8 December 2025 says, at ¶2:

> "The 'Investors' Right to have digital accessibility' will be included in the respective
> Investor Charters applicable to various REs, published by SEBI."

Two things about that sentence matter. It is in the **future tense**, and the charters are
**"published by SEBI"** — the model template is the regulator's to amend, not each entity's
to draft.

So: has SEBI actually issued a revised model Investor Charter carrying this right?

### Why it is held rather than scored

The August 2026 baseline found the right in **zero of eleven** brokers' Investor Charters.
Every charter checked was the standard SEBI template verbatim. The only adjacent item is
clause XVII, "Get access to products and services in a suitable manner even if differently
abled" — which predates the accessibility circulars entirely and says nothing about digital
platforms.

That result has two completely different readings, and we cannot yet tell which is right:

| If SEBI **has** amended the model charter | If SEBI **has not** |
|---|---|
| Eleven entities have failed to adopt an updated template that was available to them | Eleven entities are correctly using the template their regulator publishes |
| S3 is a finding about the entities | S3 is a finding about SEBI |
| Score it | Do not score it — reword it as a regulator finding |

Scoring S3 against entities while the second column might be true would be attributing a
regulator's omission to eleven firms. That is exactly the error this project's method exists
to prevent, so the criterion stays held until the question is settled.

### What would resolve it

Any one of:

- ~~SEBI's own published Investor Charter page~~ — **done, see the evidence table.**
- The SEBI circulars listing for **December 2025 – May 2026**, checked for any Investor
  Charter circular. This is the one remaining gap; SEBI's paginated listing and its POST
  search both resisted automated querying (the search endpoint returns HTTP 530).

### Reaching sebi.gov.in

`sebi.gov.in` is **not blocked** — it resolves fine through a public resolver and serves
normally. The failure was local DNS returning NXDOMAIN. Any fetch works with an explicit
resolve:

```bash
curl --resolve www.sebi.gov.in:443:202.191.181.158 https://www.sebi.gov.in/...
curl --resolve investor.sebi.gov.in:443:202.191.181.30 https://investor.sebi.gov.in/...
```

Re-check the addresses before relying on them; they are not guaranteed stable.
- A circular or press release amending the model charter after 8 December 2025.
- An Investor Charter published by *any* Regulated Entity that carries the right — which
  would prove an updated template exists.
- A reply from SEBI.

### When it resolves

Update this entry, then update criterion S3 in
[`../rubric/rubric.md`](../rubric/rubric.md) and
[`../rubric/mapping-from-oss-rubric.md`](../rubric/mapping-from-oss-rubric.md), and re-score
S3 across all existing entity profiles. **Do not backfill silently** — note the date the
question resolved and that scores changed as a result.

### Evidence gathered so far

All of it is negative, and none of it is conclusive. Recorded because absence of evidence
across specialist sources over six months is worth something, even though it proves nothing.

| Source | Date | What it says about the charter |
|---|---|---|
| SEBI clarification ¶2 | 08 Dec 2025 | "**will be** included … published by SEBI" — future tense, and SEBI's own act |
| BarrierBreak, "SEBI Issues Clarification…" | published 09 Dec 2025, **last updated 29 May 2026** | Still "will now be included in every Investor Charter applicable to REs". Cites no amended charter, and gives REs no instruction or deadline to update their own |
| Other vendor and law-firm coverage | Dec 2025 – Aug 2026 | Every instance traces back to the same December sentence. None cites an amended charter |
| This project's August 2026 baseline | 20 Aug 2026 | 0 of 11 broker charters carry the right; all are the standard SEBI template verbatim |
| **SEBI's own Investor Charter page**, `investor.sebi.gov.in/Investor-charter.html` | retrieved 20 Aug 2026 | **64,777 characters of charter text containing zero occurrences of "digital accessibility", "disability", or accessibility as a right.** The only matches for "access" are "access to clear and concise information" and an e-CAS reference |
| **SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2025/22, "Investor Charter for Stock Brokers"** | **21 Feb 2025** | The most recent Investor Charter circular for stock brokers that can be located. It **predates the December 2025 clarification by nine months** |
| SEBI circulars listing, May–Aug 2026 | retrieved 20 Aug 2026 | No Investor Charter circular of any kind in that window |

The two strongest rows are SEBI's own. **SEBI's published Investor Charter contains no
accessibility right at all**, and the most recent model charter circular for stock brokers
predates the clarification that promised the right by nine months.

Taken together the evidence now points clearly one way: **SEBI appears not to have amended
the Investor Charter it publishes.** If that holds, the finding is about the regulator —
eleven brokers are correctly using the template their regulator gives them, and a right
SEBI announced in December 2025 has not reached a single investor charter eight months
later, ten weeks before the compliance deadline.

**S3 stays held.** One window is unchecked — December 2025 to May 2026 — and the claim is
strong enough that it deserves to be closed properly rather than assumed. But the entry has
moved from "no evidence either way" to "substantial evidence in one direction".

### Evidence that cuts the other way

A compliance practitioner writing publicly on the December 2025 clarification (CS Kruti
Gogri, LinkedIn, seen 20 Aug 2026) describes it as requiring that **Regulated Entities add**
an "Investors' Right to Digital Accessibility" section to their Investor Charters — an
entity obligation, not a regulator one.

That is one practitioner reading, retrieved through a page that may not have rendered fully,
so it is indicative rather than quotable. But it shows the ambiguity is genuine and read both
ways by people whose job is to read it. **It weakens the confidence of the "this is SEBI's
omission" reading**, and is a reason to close OQ-1 properly rather than settle it by
inference.

### Note on secondary coverage

Several published guides state that SEBI "updated its Investor Charters", in the past tense.
Every one traced back to the December clarification's future-tense sentence above. None
cites an amended charter. **Treat the past-tense claim as unsupported** until OQ-1 resolves.

---

## OQ-2 — What do the SCORES accessibility complaint figures show?

**Status:** Open, but substantially advanced · raised 20 August 2026 · evidence added 20 August 2026
**Affects:** nothing scored; would materially strengthen published findings

The December 2025 clarification confirms an "Accessibility" complaint category already
exists on SCORES, and obliges an entity to remediate the underlying issue before a complaint
can be closed. So the data is being collected.

It is not published in a form broken down by that category. Complaint counts would be direct
evidence of investors hitting barriers, independent of anything this repository measures.

**What would resolve it:** SEBI's published SCORES data, if the category is broken out; or
an RTI request.

---

## OQ-3 — Does the 23 May 2025 KYC circular add obligations not captured here?

**Status:** Open, but substantially advanced · raised 20 August 2026 · evidence added 20 August 2026
**Affects:** obligations **O9**, **O10**, **O11**; possibly adds new ones

SEBI/HO/MIRSD/SECFATF/P/CIR/2025/74 is the first of the six circulars and the only one not
yet read against primary text. The obligation register currently derives its KYC entries
from Annexure I §4 of the 31 July 2025 circular alone.

**What would resolve it:** reading the circular. A mirror is at
`nsdl.co.in/downloadables/pdf/2025-0064-Policy-SEBI_circular_regarding_Accessibility_and_Inclusiveness_of_Digital_KYC_to_Persons_with_Disabilities.pdf`
— the host refused connections during the initial pass; retry, or use another mirror.

---

## OQ-4 — Are there enough IAAP-certified auditors in India to meet 31 October 2026?

**Status:** Open · raised 20 August 2026
**Affects:** nothing scored. Potentially the strongest finding in the project.

### The question — reframed 20 August 2026

The first framing was "are there enough accessibility auditors in India?" That is probably
the wrong question. A scan of Indian accessibility practitioners on LinkedIn shows a workforce
holding a **mix of credentials**: IAAP CPACC and WAS, **DHS Trusted Tester** (a US Department
of Homeland Security certification), and **DEPwD empanelment** under India's own Department
of Empowerment of Persons with Disabilities. Kotak Securities' published statement names a
DEPwD-empanelled auditor; enabled.in advertises IAAP; two practitioners in a single search
page hold DHS Trusted Tester.

So the sharper question is: **does §5.1's wording admit only one of the several credentials
the Indian market actually holds?** If competent, certified accessibility professionals in
India are largely credentialled under DEPwD or DHS rather than IAAP, the bottleneck is not a
shortage of skill — it is a drafting choice that narrows the eligible pool.

That is a constructive finding rather than a critical one: it is something SEBI could fix by
recognising DEPwD empanelment alongside IAAP, and it would matter most to the smaller
regulated entities with the least procurement leverage.

Circular 2025/111 §5.1 requires the accessibility audit to be conducted "through
International Association of Accessibility Professionals ('IAAP')", and §5.4 requires
annual audits "through IAAP certified accessibility professionals". The December 2025
clarification softened the appointment *deadline* but kept the requirement for certified
professionals.

SEBI regulates several thousand entities — every stock broker, depository participant,
mutual fund, AMC, portfolio manager, investment adviser, research analyst, RTA, KRA,
merchant banker, credit rating agency, AIF and custodian, plus the MIIs. Each needs an
audit of every investor-facing platform by **31 October 2026**.

IAAP certifies **individuals** — CPACC, WAS, CPABE — and publishes a certificant directory.

**How many IAAP-certified professionals are there in India, and is the arithmetic
survivable?**

If the ratio of entities to certified auditors is extreme, the deadline was not
achievable at the moment it was set, regardless of any entity's diligence. That reframes
the whole compliance question and is checkable against two public numbers.

### Why it matters for how findings are worded

If audit capacity is the binding constraint, an entity without a completed audit may be
constrained rather than negligent. The rubric already refuses to call anyone
non-compliant; this would add a second reason to be careful about *inferring* indifference
from an absent audit.

### What would resolve it

- IAAP's public certificant directory, filtered to India, with a retrieval date.
- The DEPwD list of empanelled accessibility auditors, for comparison.
- SEBI's published count of registered intermediaries by category.
- Vendors' own disclosures of team size and certification.
- **Practitioners themselves.** The people doing this work know what the market holds and
  whether IAAP certification is the norm or the exception in India. One conversation with a
  working auditor would answer more than a directory count.

### Supply-side observations so far

Three firms marketing SEBI accessibility audits have been identified. This is not a
market survey and the list is certainly incomplete.

| Firm | Claim | Notes |
|---|---|---|
| Pivotal Accessibility | "DEPwD empanelled auditor" | Named by Kotak Securities in its published accessibility statement. **DEPwD empanelment is not IAAP certification** — the circular names IAAP |
| BarrierBreak | IAAP organisational member | Publishes the most complete SEBI explainer in the field; that guide carries the superseded July deadline |
| Enabled (an initiative of TenthPlanet, Chennai) | "IAAP Certified" | Maps its service to SEBI's Table C3 / C4 formats, which is accurate. But **IAAP certifies individuals, not companies**, so a corporate "IAAP Certified" claim does not by itself evidence what §5.1 requires. Markets "WCAG 2.2 AA"; SEBI names 2.1 or latest |

The recurring pattern is worth noting on its own: **vendors advertise a standard SEBI does
not name.** WCAG 2.2, GIGW 3.0 and IS 17802 with a year attached all appear in marketing
copy; none appears in the circulars.

---

## OQ-5 — Does the regime scale to the entities it actually covers?

**Status:** Open · raised 20 August 2026
**Affects:** who the research is about, and who the findings should be about

### The finding that prompts it

**There is no proportionality provision anywhere in the circulars.** Searched across
2025/111, 2025/121, 2025/131 and the December 2025 clarification for *exempt, proportion,
threshold, turnover, net worth, small, micro*: **zero matches.**

Circular 2025/111 ¶7 applies the provisions to "all REs". Table D of 2025/131 lists the
categories reporting directly to SEBI; Investment Advisers and Research Analysts report to
BSE Ltd. No size threshold appears in any of it.

### Why that matters

SEBI regulates several thousand entities. The ten largest brokers — the sample this project
has measured — are the **least affected group**: they have engineering teams, compliance
departments and procurement budgets.

The population is dominated by small entities. Individual Investment Advisers. Research
Analysts operating alone or in twos. Small brokers, small portfolio managers. For each of
them the obligation is identical to the National Stock Exchange's: an accessibility audit
through IAAP-certified professionals, **including usability testing by persons with
disabilities**, remediation, and an annual re-audit thereafter.

Combined with [OQ-4](#oq-4--are-there-enough-iaap-certified-auditors-in-india-to-meet-31-october-2026)
— where §5.1's IAAP-only wording may exclude most of the credentialled Indian market — the
burden lands hardest on the entities least able to carry it, and with the fewest suppliers
to choose from.

### The question

1. How many entities does SEBI actually regulate, by category? The directory at
   `sebi.gov.in/sebiweb/other/OtherAction.do?doRecognised=yes` is reachable and lists every
   category with counts as at 19 August 2026. **Not yet extracted — this should be done.**
2. What does an IAAP-certified audit with PwD usability testing cost in India?
3. Is that proportionate for a one-person Research Analyst with a single website?

### Why this changes the project

The story so far has been "large brokers have not done the work". That framing is
defensible but it targets the group best able to comply, and it misses the harder question:
**a regulation written for institutions, applied without modification to thousands of
one-person registrations.**

That is a more useful piece, a fairer one, and it points at something SEBI could act on —
a proportionate regime, or recognition of DEPwD empanelment alongside IAAP, or a shared audit
facility for small intermediaries.

**It also changes who is worth talking to.** A large broker routes an enquiry to legal. A
sole-practitioner Research Analyst facing an audit bill they cannot justify will very likely
tell you exactly what they think.
