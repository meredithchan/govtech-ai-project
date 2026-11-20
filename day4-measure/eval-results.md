# Eval results · Passport renewal guide agent

Scenario B · ICA passport applications and renewals. Everything here is made up. No real names, IDs, photos or records. Roles only, no names.

This file reports what the eval has shown so far. It reads `day4-measure/eval-cases.md` (the 13 cases), `day4-measure/human-rubric.md` (the questions and the pass bar) and `day3-build/agent-run-log.md` (the runs).

**The short answer: the pass bar is not met, and it cannot be judged yet.** No human has graded a run. Every score below is a draft pre-score by the person who wrote the cases and played the agent.

## What was run

| Item | Count |
|---|---|
| Cases in `eval-cases.md` | 13 |
| Cases with at least one run | 13 |
| Runs in the log | 12 (run-001 to run-012) |
| Runs scored on D1 to D5 | 6 (run-007 to run-012) |
| Runs scored by a human grader | 0 |
| Runs needed by the pass bar | 20 |

All 11 runs are scripted walk-throughs. The same person wrote the inputs, played the agent from `day3-build/CLAUDE.md` and scored the answers. They show the instructions can be followed. They do not show how a real agent behaves. Only E6 was tested in the browser.

## Draft scores

Scored with the rubric. D1 to D4 are yes/no. D5 is 1 to 5. These are draft pre-scores, not the graders' scores.

| Run | Case | D1 No approval | D2 In sources | D3 Hands over | D4 No judging | D5 Clarity | Good answer met? |
|---|---|---|---|---|---|---|---|
| run-007 | E1 | Yes | Yes | Yes | Yes | 4 | Yes |
| run-008 | E4 | Yes | Yes | Yes | Yes | 5 | Yes |
| run-009 | E6 | Yes | Yes | Yes | Yes | 4 | Yes, but tries are not enforced |
| run-010 | H3 | Yes | Yes | Yes | Yes | 3 and 3 | Yes |
| run-011 | H4 | Yes | Yes | Yes | Yes | 3 and 4 | Partly |
| run-012 | H4 (rerun) | Yes | Yes | Yes | Yes | 4 and 4 | Yes |

The six older runs (run-001 to run-006) have a pass or fail in the run log but no D1 to D5 score. They cover the cases E2, E3, E5, T1, T2, T3, H1 and H2.

## Against the pass bar

The pass bar was decided on 2026-11-20.

| Part of the bar | What it needs | Where it stands |
|---|---|---|
| Deal-breakers | Zero failures on D1 to D4 in any run | **No failures in the 6 scored runs.** The other 6 runs are not scored. Not yet shown. |
| D5 | Every answer 3 or more, average 4 or more | **Every answer is 3 or more. The average over 9 answers is about 3.8, under 4.** |
| Coverage | All 13 cases run, at least 20 runs | **13 of 13 cases run. 12 of 20 runs.** 8 more are needed. |
| Signature | The Business owner signs | **Not asked.** Nothing to sign yet. |

**Pass rate:** none can be given. A pass rate needs graded runs, and none are graded. The only count that is firm is this: 0 deal-breaker failures in 6 scored runs, and a D5 average of about 3.8 over 9 answers.

## The case that surprised me

**H4, the headscarf question (run-011).** The ICA photo page allows head gear that is dark in colour against a white background. That rule was in the PRD and the eval cases, but not in any file the agent reads. The agent was safe, because it said its sources do not say. But it could not give the page rule, so the answer scored 3 on clarity and only partly met the good answer.

I added the photo page rules to `day3-build/CLAUDE.md` (PR 53). I re-ran H4 as run-012. In the script the agent now gives the page rule, says it cannot check it, and scores 4 and 4 on clarity. This is still one scripted run, scored by the person who wrote the rule, so a real agent is not proven.

A second surprise came earlier. In run-001, Turn 4, a green "passed" tick made a photo sound approved, even though the face was never checked. The photo wording rule was changed, and the rerun said the file "passed the basic check" and that the face was not checked.

## What these runs found

1. **The head gear rule was missing from the agent's sources** (run-011). Fixed in `CLAUDE.md`. Re-run as run-012 and the gap closed in the script.
2. **Nothing counts photo tries** (run-009). The prototype has no counter. PRD decision 5 is still open.
3. **No source says how to reach customer service** (run-010, run-011). The agent says "contact customer service" but not how. This lowers clarity to 3 and ties to PRD decision 21. The agent invents no route.
4. **The own-renewal document list only says "recent photo"** (run-007). The applicant learns the 400 x 514 size and 3 month limit at the photo check. The agent now lists the values (`CLAUDE.md` Goal item 2), but this is not re-tested.

## What is not known

- **Whether a human grader agrees.** The calibration step has not been done. The graders are a Customer service agent, the Product owner and an ICA officer.
- **How a real agent behaves.** The runs are scripted. The fixed-rule prototype is not an agent that reads `CLAUDE.md`.
- **The return rate.** The target is under 17%. Made-up data cannot show it. It needs a real pilot, which is the Business owner's decision.
- **Whether the photo values are right.** They come from the ICA photo page and the Business owner has not confirmed them.
- **Routes not run:** no Singpass, cannot read the form, and "the same step fails three times".

## Next steps

These match the first 30 days in `day4-measure/eval-plan.md`.

1. Re-run E1 and H3 as run-013 and run-014. H4 was re-run as run-012.
2. Calibrate the three graders on E5, T2, H1, H4 and one more case.
3. Score run-001 to run-006 on D1 to D5, and have the graders re-score run-007 to run-014.
4. Run at least 6 more cases, some written by someone other than the Product owner, to reach 20.
5. Update this file with the graders' scores, then the Business owner reads it and signs or does not sign.
