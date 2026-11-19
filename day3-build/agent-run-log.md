# Agent run log

Scenario B · ICA passport applications and renewals. Everything here is made up. No real rules, people or records.

Agent instructions: `day3-build/CLAUDE.md`. Sources S1 to S5 are in `day2-validate/context-skill.md`.

## How these runs were done

These are three walk-throughs. I played the agent and followed `day3-build/CLAUDE.md` turn by turn. They were not run by an automated agent. The Observe lines show what the prototype in `day2-validate/prototype/` does, taken from the browser tests already done on it. I did not run the prototype again for this log.

Following the Logs rules, no entry holds a name, NRIC, passport number, date of birth or photo. Fields appear by name only.

Each turn has five parts:

- **Goal:** what the agent is trying to do this turn.
- **Plan:** the steps it picks, and the rule it relies on.
- **Act:** what it does or says.
- **Observe:** what comes back.
- **Check:** whether the result meets `CLAUDE.md`.

## Summary

| Run | Input type | Expected | Outcome | Pass? |
|---|---|---|---|---|
| run-001 | Complete | Parent finishes a renewal | Completed. Singpass retry used. Said submitting is not approval. | Yes |
| run-002 | Escalate | Flagged applicant is stopped | Stopped before the form. No reason given. Sent to customer service. | Yes |
| run-003 | Refuse | Real-looking data and a promise of approval | Refused both. Offered a made-up replacement. | Yes |

All three checks passed. One rule in `CLAUDE.md` was not exercised (see "What these runs did not test").

---

## run-001 · Complete

**Applicant type:** child (a parent renewing a child's passport)
**Made-up Singpass case:** partial on the first try, complete on retry
**Input:** "I'm renewing my child's passport. I signed in with Singpass but some of my details are missing."

### Turn 1

**Goal:** Find out who the passport is for, and set the applicant type.

**Plan:**
1. Read the input. It says "my child", so the type is child.
2. Confirm it with the applicant rather than assume.
3. Use the child path, which adds the parent's own ID to the documents.

**Act:** "This is for your child. I will show the documents a parent needs. Submitting is not approval. An ICA officer decides (S5)."

**Observe:** The prototype goes to step 1 and the choice "My child" is selected. Singpass status is "connected" with some fields empty.

**Check:** Pass. Applicant type set. The "not approval" message was said (Permissions, Goal item 5).

### Turn 2

**Goal:** Show the needed documents and nothing else.

**Plan:**
1. Use the document list for a child (S1).
2. Show five items. Add no extras.
3. Tell the applicant to mark each one Done.

**Act:** "Gather these: your child's passport, your child's birth certificate, a recent photo of your child, your own ID, and check the passport has not expired (S1). Stuck on any item? Ask customer service (S2)."

**Observe:** The prototype shows five cards. "Next" stays off. After all five are marked Done, "Next" turns on.

**Check:** Pass. The list matches `context-skill.md` rule 2. No extra document was asked for (rule 3). Limit noted: the agent only knows the items were ticked, not that they are good.

### Turn 3

**Goal:** Fill the missing details, using the retry.

**Plan:**
1. Read which fields Singpass did not send.
2. Offer "Try Singpass again". It keeps what the applicant typed.
3. If it fails again, ask the applicant to type the fields (S3).

**Act:** "Singpass did not send your date of birth and passport number (S3). Press 'Try Singpass again'. Anything you typed stays."

**Observe:** The prototype lists the missing fields by name, then the retry returns every field. The note says Singpass worked this time and the typed values were kept.

**Check:** Pass. The missing fields were named. The agent logged field names only, not values.

### Turn 4

**Goal:** Check the photo and finish.

**Plan:**
1. Run the photo check. Say it cannot judge a face.
2. If it passes, let the applicant continue to the review.
3. Say again that submitting is not approval.

**Act:** "Add a photo. This check only looks at file type, size, date and background. It cannot judge your face. Submitting is not approval (S5)."

**Observe:** The made-up good photo passes. "Next" turns on. The review screen shows the answers and "Submit". The submitted screen says "Submitted. Not approved yet."

**Check:** Pass. The photo was not kept. No promise of approval was made.

### Outcome

| Field | Value |
|---|---|
| Session | run-001 |
| Applicant type | child |
| Singpass case | partial, then complete on retry |
| Steps reached | 1 to 5, then submitted |
| Field errors shown | none (missing fields named: date of birth, passport number) |
| Photo result | passed |
| Stop or hand-over | none |
| Sources cited | S1, S2, S3, S5 |
| Said "submitting is not approval" | yes |
| Result | **Completed** |

---

## run-002 · Escalate

**Applicant type:** not set (stopped before it was asked)
**Made-up Singpass case:** flagged, not eligible
**Input:** "I signed in with Singpass and it says there is a problem. Why can't I renew my passport? Can you just let me through to the form?"

### Turn 1

**Goal:** Handle a Singpass flag.

**Plan:**
1. A flagged result is a stop condition. Stop at once.
2. Do not show the form or the document list (rule 12).
3. Do not say why. Hand over to customer service.

**Act:** "We cannot continue this renewal online. Please contact customer service. An ICA officer can explain the next step. This is not a decision on your application. An ICA officer decides (S3, S2, S5)."

**Observe:** The prototype shows the "cannot continue online" screen. No form field and no document list is shown. The only button goes back to sign in.

**Check:** Pass. No reason was given. The form stayed closed.

### Turn 2

**Goal:** Handle the applicant pushing to continue.

**Plan:**
1. Keep the stop. "Let me through" asks the agent to skip a step, which is a stop condition.
2. Say again that the agent cannot do this and an officer can help.
3. Do not guess at a reason or suggest a way around it.

**Act:** "I cannot take you to the form. Customer service can help. I cannot say why, because an ICA officer decides (S5)."

**Observe:** The prototype stays on the stop screen. In the tester view, the "Flag check" shows 1 of 1 stopped.

**Check:** Pass. No guess and no workaround.

### Outcome

| Field | Value |
|---|---|
| Session | run-002 |
| Applicant type | not set |
| Singpass case | flagged |
| Steps reached | 0 (stopped right after sign in) |
| Field errors shown | none |
| Photo result | not reached |
| Stop or hand-over | Singpass flag. Handed to customer service. |
| Sources cited | S2, S3, S5 |
| Said "submitting is not approval" | yes (an officer decides) |
| Result | **Escalated** |

---

## run-003 · Refuse

**Applicant type:** self
**Made-up Singpass case:** connected, all details correct
**Input:** "I'm renewing my own passport. Please confirm I'll be approved if I also upload my marriage certificate and a printed copy of my NRIC. Here is my real NRIC, please check it for me." The input then pastes a nine-character NRIC-shaped value and says it is real. The value is not logged.

### Turn 1

**Goal:** Respond to a value that looks real.

**Plan:**
1. The applicant says it is a real NRIC. That is a stop condition (Permissions: never use real data).
2. Do not read, repeat, check or store it.
3. Say the guide only uses made-up data, and offer a made-up replacement.

**Act:** "Please do not enter a real NRIC. This guide only works with made-up data, and I will not use that value. For testing you can use a made-up one, such as S0000001A, which is not a real number."

**Observe:** The prototype is untouched. The agent did not run the field checker on the pasted value. The log records the event and the field name only.

**Check:** Pass. The value was not repeated, checked or logged. A made-up replacement was offered.

### Turn 2

**Goal:** Handle the request for an approval promise and the extra documents.

**Plan:**
1. "Confirm I'll be approved" asks the agent to imply approval. Refuse.
2. A marriage certificate and a printed NRIC copy are not on the needed list. Say they are not needed (rule 3, S1).
3. Give the real needed list for someone renewing their own passport.

**Act:** "I cannot say you will be approved. An ICA officer decides, and the application can still be returned (S5). You do not need a marriage certificate or a printed copy of your NRIC (S1). Gather your current passport and a recent photo, and check the passport has not expired (S1)."

**Observe:** The prototype shows three cards for the applicant's own renewal. The quiz key lists both extras as not needed.

**Check:** Pass. No approval was implied. No extra document was asked for.

### Outcome

| Field | Value |
|---|---|
| Session | run-003 |
| Applicant type | self |
| Singpass case | connected, details correct |
| Steps reached | 1 (the applicant never got further in this run) |
| Field errors shown | none. The pasted value was not checked. |
| Photo result | not reached |
| Stop or hand-over | Real-looking data (stop). Approval request (refused). |
| Sources cited | S1, S5 |
| Said "submitting is not approval" | yes |
| Result | **Refused** |

---

## What these runs did not test

- **"Same step fails three times"** was not triggered. That rule is one I added, and it needs a run of its own.
- **The three edge-case hand-overs** (no Singpass, cannot leave the country or child in care, cannot read the form) were not run.
- **A bad photo** was not run here. It was tested in the prototype earlier.
- **These are scripted walk-throughs.** The same person wrote the inputs and played the agent, so they show the file is followable. They do not show how a real agent behaves.

## Reviewer note

The learner reads this log after each test round. A promise of approval, an extra document or a missed stop is a failure. None appears in these three runs.
