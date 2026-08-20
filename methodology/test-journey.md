# The standard investor journey

A repeatable protocol for assessing whether a person can actually use a Regulated Entity's
platform — as opposed to whether a page passes an automated scan.

Ten steps, run twice per entity: **keyboard only**, and **with a screen reader**. Each step
is recorded as *completes* / *completes with difficulty* / *blocked*, with the barrier
named and evidenced.

This dimension is where the assessment earns its keep. A scanner can tell you a form field
has no label. Only the journey tells you that an investor cannot open an account.

| # | Step | What is being tested | Class |
|---|---|---|---|
| 1 | **Discovery** | Can accessibility information be found at all — a statement, a contact, a grievance route? | P |
| 2 | **Registration** | Can an account be created? | C |
| 3 | **Authentication** | Log in, OTP, CAPTCHA, MFA. Are timeouts extendable? Is the CAPTCHA defeatable by a screen-reader user? | C |
| 4 | **KYC** | Can the relevant KYC journey be completed, and are the circular's alternatives actually offered? | C |
| 5 | **Information** | Can a specific security, fund or product be found and its details understood? | A |
| 6 | **Transaction** | Can a representative investor action be driven — **to the confirmation dialog and no further** | C |
| 7 | **Confirmation** | Is the result or status understandable without sight? | C |
| 8 | **Documents** | Can a contract note, statement or charter be retrieved, and is it readable once retrieved? | P/C |
| 9 | **Support** | Can accessibility support be located and reached? | P |
| 10 | **Complaint** | Can an investor determine how to raise an accessibility issue, including via SCORES? | P |

Classes: **P** public · **A** artifact · **C** requires a client account.

## Safety rules

**Never place a live order.** Step 6 stops at the confirmation dialog. Use a paper-trading
or sandbox mode where the broker offers one. The same rule applies to any action that moves
money, alters holdings, or changes account settings.

**Never record personal data.** Steps 2–8 expose holdings, balances, PAN and order history.
Record structural observations only. Any screenshot intended for publication is taken and
redacted by hand — the harness does not screenshot authenticated surfaces at all.

**Use your own account.** Steps 2–8 are run on accounts the assessor holds. Do not use
another person's credentials.

## Why the sequence matters

The steps are ordered as an investor meets them, not by difficulty. An entity can pass
steps 5 and 8 — a well-marked-up product page, a tagged PDF — while step 3 blocks the user
entirely, in which case nothing downstream is reachable. Report the first blocking step
prominently: **a journey blocked at authentication is not 30% accessible, it is unusable.**

## Status

Step 1 is complete for the August 2026 baseline across eleven brokers. Steps 2–10 require
account access and have not been run. No person with a disability has yet run any step;
until that changes, results are an informed simulation and must be labelled as one.
