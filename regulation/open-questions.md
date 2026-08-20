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
