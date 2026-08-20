# Contributing

## The rule that matters most

**Nothing that names a Regulated Entity is published until it has been reproduced by hand.**

A harness run is an input. Automated accessibility rules cover only a minority of WCAG
success criteria, and several of this harness's heuristics — focus visibility especially —
produce false positives. Publishing an unverified scan result about a named company would
be both wrong and unfair, and it would destroy the only asset this project has.

Every finding in an entity profile carries a manual reproduction record: what was
reproduced, when, by what method, with what evidence.

## Disputing a score

Open a [score dispute](.github/ISSUE_TEMPLATE/dispute-a-score.yml). A dispute with evidence
is more valuable than agreement. If you are the entity assessed, say so — your response is
reproduced in full and unedited in the profile, and a demonstrated error is corrected with
the correction noted, not silently.

## Adding an entity profile

1. Run the harness against the entity's surfaces.
2. Reproduce every failure by hand.
3. Copy [`entity-profiles/TEMPLATE.md`](entity-profiles/TEMPLATE.md) and fill it.
4. Record unmeasured criteria as unmeasured. Never score an untested item as a failure.
5. Contact the entity and record the date, whether or not they reply.

## Rules that are not negotiable

- **Never claim an entity is or is not SEBI compliant.** Compliance is filed privately; the
  claim is unavailable to us.
- **Never work around bot protection.** An entity that blocks automated agents is recorded
  as blocked and tested by hand.
- **Never place a live order** during journey testing, or take any action that moves money
  or alters a real account.
- **Never record personal data** from authenticated surfaces — holdings, balances, PAN,
  order history. Structural observations only.
- **Cite the circular, not the coverage.** Several widely-read guides carry a superseded
  deadline and standards versions SEBI never wrote. See
  [`regulation/circular-chain.md`](regulation/circular-chain.md).

## Terminology

- **a11y** — accessibility · **AT** — assistive technology · **RE** — Regulated Entity ·
  **MII** — Market Infrastructure Institution
