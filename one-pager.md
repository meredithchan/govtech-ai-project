# One Pager

Use case: B: ICA passport applications and renewals

## Problem and user

**User:** Citizens renewing a passport on the ICA site, on their first try or after several tries. Parents renewing a child's passport are the most confused group.

**Problem:** Users cannot understand the information needed to apply for renewal successfully. They don't know what is needed at the time of application, or what a completed application should look like. Officers then return many submissions for errors or missing documents, and each return adds days.

## Opportunity and evidence

**Opportunity:** Reduce the number of rejected submissions.

**Success:** Submission return rate is less than 17%.

**Evidence (all made up):**

- "As a parent, I don't understand how do I successfully renew my child's passport."
- "As a parent, I find myself so confused with the instructions on the site."
- "As a user renewing my passport, I don't know what's needed during the time of application and how a completed application is supposed to be."

**Metrics to track:** application success rate, rejected fields and error rates within each field, engagement with instructions (such as media or video), form completion rate, and failed applications.

**Hypothesis:** Users will understand the instructions for passport renewal when guidance is step by step. This is a usability risk, so we build a clickable mockup first.

## Experience and trust

**Experience:** The assistant shows step by step guidance for each field and the documents needed. Users who hit an error see visual examples in a separate view, so their application is not interrupted. Guidance is filtered by type of applicant, with more precise information for parents.

**Trust:**

- National identity is confidential information.
- ICA officers decide the final approval for every renewal. The assistant only guides.
- The user cannot complete a submission until they have read the instructions and gathered all required materials.
- Parents who keep failing are directed to customer service.

**Trust gaps and how users stay in control:**

- Forms could be filled wrongly. Users can edit any field directly.
- The passport photo editor could change features of the face. Users can upload a photo from another source, such as their phone gallery or camera.

## Risks (market, technical, team)

All tests use made-up data and made-up testers.

**Market risk:** Applicants may ignore the step by step guide and go straight to the ICA form, so the return rate does not fall below 17%.
*How we will test it:* Give 10 made-up testers a made-up renewal task with the guide open and the plain ICA page also available. Count how many follow the guide to the end. If fewer than 7 of 10 do, the guide is not being used.

**Technical risk:** Singpass may not connect or may not send every relevant field.
*How we will test it:* The tester view in `day2-validate/prototype/` runs made-up Singpass cases. Success is a connection with all relevant fields ported. The kill switch triggers if 30% of testers edit at least 2 Singpass fields. See `day2-validate/build-log.md`.

**Team risk:** Only one owner keeps the document list up to date, and the list drifts from the real rules.
*How we will test it:* Check the document list against `day2-validate/context-skill.md` each time a source changes. If the quiz and the file ever disagree, the review trigger in that file applies.

## Build plan and handoff
## Agent role and guardrails
## Roles and operating model
## Strategy and roadmap

### Strategy kernel

**Diagnosis:** Users who are submitting passport renewals cannot understand the information needed to successfully apply for renewal.

**Guiding policy:** Provide step by step instructions for passport renewals.

**Coherent actions:**

1. Users should be shown guidance to fill up fields and provide necessary artefacts to apply for renewal.
2. Users who face errors when filling up each field of the passport renewal application should be shown visual examples as a separate experience so that it doesn't interrupt their existing application.
3. Filter different types of people applying for passport renewal with more precise information for parents.

## Metrics plan and stop line
## Evals and gates
## Decision: continue, pivot or stop
## Open issues

