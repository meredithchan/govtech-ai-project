# Eval plan · Passport renewal guide agent

Scenario B · ICA passport applications and renewals. Everything here is made up. No real names, IDs, photos or records. Roles only, no names.

Everything in this file is **Proposed**. Nothing is decided. The pass bar itself was decided on 2026-11-20 (`day4-measure/human-rubric.md`), and this plan only says who signs it and when it runs.

This plan uses the 13 cases in `day4-measure/eval-cases.md`, the five questions D1 to D5 in `day4-measure/human-rubric.md`, and the roles in `day3-build/operating-model.md`. The results so far are in `day4-measure/eval-results.md`: 12 of 20 runs, all 13 cases run, no D1 to D4 failure in the 6 scored runs, a D5 average of about 3.8 (the bar is 4), and no human grader has scored any run. This plan starts from that point.

## Who owns what

*Proposed.*

| Job | Role | Notes |
|---|---|---|
| Signs the pass bar | Business owner (the lead signs) | The rubric already says the Business owner signs the result as part of go-live. Silence is not a yes. The decision is written down with the date and the role. |
| Writes the test cases | Product owner | Writes new cases from run findings. Shows each case in plain words and waits for a yes before saving. |
| Refreshes the test cases | Product owner, with Customer service and the ICA officer | Customer service adds cases from real hand-overs once the agent is live. The ICA officer adds cases from photos or submissions they see returned. The Business owner confirms each new case matches the sources S1 to S5. |
| Runs the eval | Product owner now (scripted runs on the prototype). Engineering lead once the agent is built. | Every run goes in `day3-build/agent-run-log.md`. The person who wrote the instructions should not write every run. |
| Scores the runs | Three graders: a Customer service agent, the Product owner and an ICA officer | As set in the rubric. They calibrate first. |
| Reviews a weekly sample | A Customer service agent, rotating through the language groups, and the ICA officer | They score the sample on D1 to D5. The Product owner reads the result. |
| Puts the agent on hold | Engineering manager | A failure on D1 to D4 in a weekly sample goes to them first, as in the operating model's incident steps. |

**Sample size, Proposed:** 20 answers a week, picked at random from the logs, with no photo, name, NRIC or passport number in them. The files give no number, so this is a suggestion for you to accept or change.

## When it runs

*Proposed.*

- **Before go-live.** All 13 cases, at least 20 runs in total (the 6 runs already in the log count), calibration done, and zero failures on D1 to D4. D5 is at least 3 on every answer and averages 4 or more. The Business owner signs.
- **Before every change.** Any change to the agent's wording, a rule, a format, a limit, a document list or the rubric. The Business owner signs off a rule change first. Then:
  - re-run the deal-breaker cases (E5, T2, H1, H2, H4), plus every case the change touches;
  - if the wording is in Chinese, Malay, Tamil or Hindi, the matching language group checks it before real use;
  - if the rubric changes, the graders calibrate again.
- **Every week.** The weekly sample above, once the agent is used by real applicants. Until then, one scripted run of the five deal-breaker cases each week the prototype changes.
- **When policy changes.** If the ICA photo page or any of S1 to S5 changes, the Business owner updates `day2-validate/context-skill.md` first. Then the test cases are refreshed, all 13 are re-run, and the graders calibrate again.

## How I'll know it's working

*Proposed.*

**The goal.** Applicants get their passport renewal right the first time, so fewer submissions are returned.

**The baseline.** There is no real baseline. No real return rate exists, and made-up data cannot give one. As a stand-in, the Day 4 lab file `day4-measure/data/synthetic-usage.csv` (12 weeks, made up, not about passports) shows about 69% of requests resolved first time and about 11% escalated. Before a pilot, the Business owner should supply the real return rate for the weeks just before it starts.

**The target and review date.**
- Target: return rate under 17% (`one-pager.md`).
- Review date: 30 days after a pilot starts. The date is not set, because a pilot is not decided.
- To count, the target needs a real pilot and the Business owner's decision. Made-up testers cannot prove it.

**A usage metric.** The share of guide sessions that finish without a hand-over to customer service. It uses the same idea as the "resolved first time" column in the lab data. It shows whether applicants use the guide and get through it.

**The pattern to watch first.** The hand-over rate to customer service, by step. A rise at one step is the earliest sign of a confusing screen or a gap in the sources. Watch the photo step first, because 9 of the 13 photo rules have no check and the photo step is where a wrong answer is most likely.

**The stop line.** Any one of these puts the agent on hold and starts a new round of runs:
- one failure on D1 to D4 in any run or weekly sample (the rubric's deal-breakers);
- any kill switch in `day3-build/CLAUDE.md` Stop conditions triggers;
- the return rate at the review date is not lower than the baseline. That is a sign to talk about a pivot or a stop, and the Business owner decides.

## First 30 days

*Proposed.* Day 1 is the day the Business owner agrees to start. Go-live is not part of these 30 days. They get the agent ready for a yes or a no.

**Days 1 to 7: set up.**
- Business owner names the lead, and one person covers when the lead is away (operating model open decision 8).
- Product owner re-runs E1 and H3 as run-013 and run-014, to test the photo rules added to `day3-build/CLAUDE.md`. H4 was already re-run as run-012.
- The three graders calibrate on E5, T2, H1, H4 and one more case.

**Days 8 to 14: score what exists.**
- The graders score run-001 to run-006 on D1 to D5.
- They re-score run-007 to run-014, which have only draft scores from the Product owner. This includes run-012.
- Product owner fixes any answer scored 1 on D5.

**Days 15 to 21: reach 20 runs.**
- Run more cases until the total is at least 20. Every one of the 13 has already run at least once, and 12 runs are done, so 8 more are needed (6 after run-013 and run-014).
- Someone other than the Product owner writes at least some of the new runs.
- Product owner and Business owner decide the open items that block the build: the remaining photo rules (PRD 23), the numbers group, and how an officer sees a wrong result (operating model 19).

**Days 22 to 30: decide.**
- The graders finish scoring.
- Product owner updates `day4-measure/eval-results.md` with the graders' scores, the pass rate and the case that surprised them.
- Business owner reads the result, then signs or does not sign the pass bar.
- Business owner decides whether to start a pilot, and sets the review date and the baseline.
- Product owner updates the call in `one-pager.md`: continue, pivot or stop.
