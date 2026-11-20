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

**Agent:** one guide agent, with the passport photo check as one job inside it (decided: one agent, not two). For the photo job, it looks at one made-up passport photo and tells the applicant whether it is ready to go forward, and what to fix if not. It is step 3 of the work, "Check the passport photo". Full rules are in `day3-build/agent-control-panel.md`. The wider guide agent is in `day3-build/CLAUDE.md`.

**Why this job is in the agent:** the current check only reads file type, size, file date and edge colour (the target also checks dimensions and colour). It cannot judge a face. The agent is built with fixed rules and no language model (decided), so the face and date-tag checks are to be built as fixed rules.

**It checks:** white background, face visible and not covered, face clear, and a photo date within 3 months.

**Decides alone:** a wrong file type, size or dimensions, a black and white photo, an old photo, a non-white background, an unreadable file. It asks for another photo, up to two more tries.

**Proposes and waits:** a face that looks covered or blurred, a missing date tag, a photo that may be too dark. The applicant decides.

**A person reviews:** photos it cannot decide on (customer service), rule changes (business owner), new wording (customer service language group), and every photo's final result (an ICA officer).

**Guardrails:**

- Made-up photos only. It never keeps, edits or sends a photo.
- It never says a photo is approved, good or accepted. It says "passed the basic check", and that an officer can still return it.
- It never judges who someone is, and never gives a reason when Singpass flags an applicant.
- It stops after three failed tries and sends the applicant to customer service.
- A bad photo that gets through is a kill switch.

**Not ready yet:** it is not built as the real agent. The prototype photo check now does the file type (JPG, JPEG, HEIC, HEIF, PNG), 8 MB, 400 x 514 pixels, colour, date (3 months, by file date) and background checks, on made-up photos. The face and date-tag checks are decided to be built, as fixed rules, but are not built or tested.

## Roles and operating model

Full detail is in `day3-build/operating-model.md`. Roles only, no names. Entries marked Proposed are suggestions, not decisions.

**Roles:**

- **Product owner (the learner):** owns the project and the course files. Decides scope and permissions while this is a prototype.
- **Business owner (a team):** owns the real service and the rules. Signs off any rule, format, limit, photo rule or document list change. Decides vendor and model, go-live and retire. One lead signs every decision.
- **Engineering manager:** puts the agent on hold alone to limit damage, and emails the Business owner lead.
- **Engineering lead:** builds and runs the agent, and owns the security check of the system and its APIs.
- **Customer service:** takes every hand-over the agent cannot settle. Agents are grouped by language, and each group checks wording in its language before real use.
- **ICA officer:** decides every application and every photo's final result. Never the agent.
- **Applicant:** confirms their own answers and presses Submit.

**The agent decides nothing** about an application, a photo's final result, who is eligible, or its own permissions.

**Who decides what:**

| Part | Decides | Consulted |
|---|---|---|
| Scope | Product owner | Engineering lead, Business owner, Customer service |
| Permissions | Product owner, after Business owner sign-off on any rule change | Engineering lead, Business owner |
| Vendor and model | Business owner | Engineering lead, Product owner |
| Go-live | Business owner | Product owner, Engineering lead, Customer service |
| Incident | Engineering manager puts the agent on hold. Product owner decides the fix now. Business owner once live. | Engineering lead, Customer service |
| Retire | Business owner | Product owner, Engineering lead, Customer service |

**If the agent gives a wrong answer:** monitoring alerts the whole Engineering team. The Engineering manager puts the agent on hold. Applicants carry on, and an API check validates their applications. The Business owner lead is told by email. ICA officers re-check affected submissions.

**Not decided yet:** how an ICA officer sees the agent's result and reports a wrong one, and whether the Engineering lead and Engineering manager are one role or two.

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

**Call: Continue.**

**Why:** In 11 scripted runs the guide broke none of the four deal-breaker rules, and the open issues are decisions and tests still to do, not signs the idea cannot work. The runs were written and scored by the same person, so human graders still have to confirm this.

## Open issues

Full lists are in `day3-build/ai-prd.md` (Open decisions) and `day3-build/operating-model.md` (Open decisions). None of these is decided yet.

**Blocks the build:**

- **Photo rules a fixed rule cannot check.** 9 of the ICA photo page's 13 rules have no check: expression, hair and shoulders, head gear, glasses, eyes, frontal view, flipped, edited and brightness. The agent only reminds the applicant of them. (PRD 23)
- **Numbers to set.** Tries before customer service (5), what to do with a photo that has no date (6 and 17), a Singpass retry limit (15), a kill switch for Singpass failing to connect (9), draft expiry (16) and autosave (4).
- **Child details from Singpass.** It is not known whether Singpass sends the child's name and date of birth, or who confirms it. (14)
- **Routes with no screen.** No Singpass and cannot read the form have no route yet. They only hand over to customer service. (7)
- **S1 to S5 are not stored anywhere**, and no source gives a way to reach customer service. (21)

**Blocks go-live:**

- **Not enough evidence yet.** 11 of the 20 runs are done. All are scripted walk-throughs written and scored by the same person. No human grader has scored any run. The clarity score averages about 3.7, under the bar of 4.
- **The return rate target (under 17%) cannot be shown with made-up data.** It needs a real pilot, which is the Business owner's decision.
- **An ICA officer cannot yet see the agent's result or report a wrong one.** The "on hold" switch, the monitoring alert and the API check do not exist. (operating model 13, 14 and 19)
- **Not done:** the accessibility test, the wording check by each language group, and the security review.
- **Not confirmed:** the real Business owner team (11), the ICA page photo values, and volume and speed (22).

