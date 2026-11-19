# AI PRD · Passport renewal guide agent

Scenario B · ICA passport applications and renewals. Everything here is made up. No real rules, people, photos or records.

This is a draft. It pulls together `day3-build/CLAUDE.md`, `day3-build/agent-control-panel.md`, `day2-validate/living-prd.md` and `day2-validate/handoff-note.md`. Four decisions are made (see the top of Open decisions). Every other choice that is yours is listed there too.

## Problem and user

**User:** citizens renewing a passport on the ICA site, on a first try or after several tries. Parents renewing a child's passport are the most confused group.

**Problem:** applicants do not know what is needed to apply, or what a complete application looks like. Officers return many submissions for errors or missing documents, and each return adds days.

**Target:** submission return rate under 17%.

**What the agent is for:** it guides one applicant through a renewal, step by step, and checks their application before they submit. The passport photo check is one job inside this one agent. It is not a second agent (decided).

**What the agent is not for:** deciding anything about an application. An ICA officer makes every final decision.

**Evidence base:** all made up. No real return rate, no real testers and no real ICA rules. The prototype and three scripted runs show the instructions are followable. They do not show real behaviour.

## Instructions

The full instructions are in `day3-build/CLAUDE.md`. In short, the agent must:

1. Ask who the passport is for: the applicant, or their child.
2. Show only the documents needed for that applicant type, and say the others are not needed.
3. Check each detail against the made-up formats, and say which field to fix.
4. Run the photo check, and say what it did and did not look at.
5. Say, at every key point, that submitting is not approval and an ICA officer decides.
6. Cite a source (S1 to S5 in `day2-validate/context-skill.md`) for every claim.
7. Use plain words, short sentences and one action per step.
8. If the source does not say, say so and send the applicant to customer service. Never guess.

**Photo wording** (from the change in PR 31): never call a passing photo good, fine or accepted. Say the check only looked at file type, size, dimensions, colour, date and background, that it did not look at the face, and that an officer can still return the photo.

## Tools

All tools are made up. The agent has no other tools.

| Tool | What it does | Limit |
|---|---|---|
| Made-up Singpass sign in | Returns a made-up profile, an error, or part of a profile | No real Singpass. Nothing is sent out. |
| Document list | Needed documents for self, or for a parent renewing for a child | Source S1. |
| Field checker | Checks name, date of birth, NRIC and passport number | Made-up formats only. |
| Photo checker | Checks file type (JPG, JPEG, HEIC, HEIF or PNG), size 8 MB or less, 400 x 514 pixels, in colour, file date within 6 months, and mostly white edges | Cannot judge a face or read the date inside a photo. Values from the ICA photo page. |
| Draft save | Keeps progress in the applicant's own browser | Never keeps the photo. |
| Customer service hand-over | Tells the applicant to contact customer service | The agent cannot contact anyone itself. |
| Run log | Writes one entry per session | Field names and reasons only. Never values or photos. |

**Decided to build, not built yet:** a face check and a date-tag check that look at the picture itself. They are built as fixed rules, with no language model (decided). What the rules are, and how accurate they must be, is Open decision 23.

**Not available to the agent:** the web, email, payments, any real service, and any photo editing tool.

**Facts to build from** (read from the prototype code, so this is what works today):

- **No language model, now or in the build (decided).** The agent is fixed rules and fixed wording. Every screen and message in the prototype is already fixed code. What the prototype proves is the rules, not an agent's behaviour.
- **Data handled.** Six fields, all made up: `name`, `dob`, `nric`, `passportNo`, `childName`, `childDob`. Someone renewing their own passport sees four: `name`, `dob`, `nric`, `passportNo`. A parent sees five: the child's name and date of birth, plus the parent's own name and NRIC and the child's passport number. The prototype assumes Singpass sends all six, including the child's details. Whether the real Singpass does is unknown.
- **Singpass result.** One of: connected (all fields), partial (some fields empty), down (no fields) or flagged. A retry replays the case. The prototype puts no limit on retries. What the applicant typed beats what Singpass sends.
- **Photo checker.** **Target (decided: page values):** JPG, JPEG, HEIC, HEIF or PNG; 8 MB or less; exactly 400 x 514 pixels; in colour; file-modified date within 6 months. **The prototype code does not do this yet.** It accepts any image type, allows 5 MB, and does not check size in pixels or colour. The 6-month rule and the background test below are as the prototype has them. If a file has no modified date, that check is skipped, so such a file passes it. The background test shrinks the picture to 48 by 48 pixels and looks at the top rows and the left and right edges, 6 pixels deep. The bottom is skipped. A pixel counts as white when each colour value is 200 or more and the three values are within 30 of each other. At least 85% white passes. Nothing else is checked.
- **Languages.** Five, chosen by the applicant and saved in the draft. If a word is missing in a language, English is shown. All five currently have every word.
- **Drafts.** Saved in the browser on every change, under one made-up key, with no expiry. A draft is deleted on submit or when the applicant starts again. The photo is never in it.
- **Submit.** Today it clears the draft and shows "Submitted. Not approved yet." Nothing is sent anywhere.
- **Sources S1 to S5.** They are named in `day2-validate/context-skill.md`, but their contents are not stored. Only the rules copied from them are.

## Context and memory

**Read at the start of every session:** `one-pager.md`, `day2-validate/context-skill.md`, `day2-validate/living-prd.md`, `day2-validate/build-log.md`, `day2-validate/handoff-note.md` and `SCENARIO-PICK.md`. Stay on Scenario B.

**Made-up formats the agent checks:**

- NRIC: S or T, then 7 digits, then a letter. Example: S0000001A.
- Passport number: a letter, 7 digits, then a letter. Example: E0000000X.
- Name: letters, spaces and `. ' - /`, at least 2 characters.
- Date: a real date in the past.

**Known limits the agent must respect:**

- The photo check is a stand-in.
- Every format, limit and number is made up. Never present any of them as a real ICA rule.
- Tamil, Hindi, Chinese and Malay wording is unreviewed. Do not call it final.
- The agent only knows an applicant ticked "Done". It cannot say a document is good or unexpired.

**Memory:**

- Within a session: applicant type, ticks, details and photo result.
- Across sessions: nothing about any applicant. A saved draft stays in the applicant's browser. The agent does not copy it.
- The photo is never stored, in memory or in a log.

## Permissions

Every action the agent takes is listed, with a tier and a setting. **The settings below are decided** (you accepted them on 2026-11-19, with one change forced by your other answers, row 4).

**Tiers:** *read* looks at something. *draft* produces words or a suggestion that is not kept. *write* changes something that is kept. *send* leaves the agent's control, or tells the applicant a decision.

**Settings:** *auto* means the agent does it alone. *confirm* means a person says yes first. *block* means the agent may never do it.

| # | Action | Tier | Setting | Note |
|---|---|---|---|---|
| 1 | Read the context files listed above | read | auto | |
| 2 | Read the made-up Singpass result | read | auto | |
| 3 | Read the photo's file type, size, dimensions, colour, date and edge colour | read | auto | Works today. |
| 4 | Read the picture itself, for face and date tag | read | auto | Changed from block, because you decided to build these checks. Fixed rules only. The result is a suggestion the applicant decides on (row 10), never a final call. |
| 5 | Try Singpass again | read | confirm | The applicant presses the button. |
| 6 | Show the needed documents for the applicant type | draft | auto | |
| 7 | Say which field has an error and how to fix it | draft | auto | |
| 8 | Answer an applicant's question, with a source | draft | auto | Say so if the source does not cover it. |
| 9 | Report a photo result in the required wording | draft | auto | Never "good", "fine" or "accepted". |
| 10 | Suggest a fix the applicant decides on, such as a face that may be covered | draft | auto | The agent proposes and waits. |
| 11 | Ask for another photo, up to two more times | draft | auto | Accepted. The count is two more tries. |
| 12 | Say "submitting is not approval" | draft | auto | Required. |
| 13 | Tell the applicant to contact customer service | draft | auto | |
| 14 | Write wording in Tamil, Hindi, Chinese or Malay | draft | confirm | The matching Customer service language group checks it before real use. |
| 15 | Stop the applicant moving to the next step until it is done | write | auto | For example, "Next" stays off. |
| 16 | Stop a flagged applicant before the form, with no reason | write | auto | |
| 17 | Save a draft in the applicant's own browser | write | confirm | The prototype also saves as the applicant types. See Open decisions. |
| 18 | Write a run log entry | write | auto | Reasons and field names only. |
| 19 | Change any course file or `one-pager.md` | write | confirm | The learner says yes first. |
| 20 | Change a format, limit, photo rule or document list | write | confirm | The Business owner signs off. |
| 21 | Add a document to the needed list | write | confirm | Same sign-off. |
| 22 | Keep or store a photo | write | block | |
| 23 | Edit a photo or change a face | write | block | |
| 24 | Store a real name, NRIC, passport number or photo | write | block | Offer a made-up replacement. |
| 25 | Put a key, password or token in any file | write | block | |
| 26 | Let the applicant submit the application | send | confirm | The applicant confirms on the review screen and presses Submit. The agent never submits on its own. Allowed only when every document is ticked, every field is valid, the photo has passed the check, and the applicant has checked their answers. The message "submitting is not approval" is shown before and after. |
| 27 | Contact customer service or an officer itself | send | block | It can only tell the applicant to. |
| 28 | Say or imply an application is, or will be, approved or rejected | send | block | |
| 29 | Give a reason for a Singpass flag | send | block | |
| 30 | Send any data out of the browser or the repo | send | block | |
| 31 | Ask for a document that is not on the needed list | draft | block | Say it is not needed instead. |

**Runtime or build time.** Rows 14 and 19 to 21 are about changing the system, not serving an applicant. They happen before release, and a named person confirms: the product owner, the Business owner or a Customer service language group. Every other row happens while an applicant is using the guide. For the runtime "confirm" rows (#5, #17 and #26), I have read the person who confirms as the applicant. That is my reading, so it is in Open decisions.

## Human checkpoints

| When | Who | What happens |
|---|---|---|
| Final decision on any application or photo | ICA officer | The agent says an officer decides. It never decides. |
| Singpass flags the applicant | Customer service | Stop before the form. Give no reason. |
| A parent keeps failing the document check | Customer service | Send them to customer service (S2). |
| The applicant cannot find a document | Customer service | Say "Ask customer service". Suggest no substitute. |
| The source does not cover the question | Customer service | Say the source does not say. |
| No Singpass, cannot leave the country, a child in the state's care, or cannot read the form | Customer service | Give no reason or advice. Send them there. These cases have no screen yet. |
| A photo the agent could not decide on | Customer service | After the third try. |
| A rule, format, limit or document list changes | Business owner | Sign-off before the change. |
| New or changed Tamil, Hindi, Chinese or Malay wording | Customer service (language group) | Check before real use. |
| Before any course file is saved | The learner | Show the change in plain words and wait for a yes. |
| After each test round | The learner | Read the run log. |

## Stop conditions

The agent stops and does not go on when any of these happens.

- Singpass flags the applicant.
- The applicant gives something that looks real: a real name, NRIC, passport number or photo.
- The agent is about to say or imply approval, or call a photo good, fine or accepted.
- The agent is asked to skip a step, to edit or keep a photo, or to send anything out.
- It would have to guess a face verdict or a source it does not have.
- The same step fails three times in a row.
- A source is missing, out of date or in conflict with another.
- It would need a tool, file or permission not listed here.
- A kill switch triggers (see Business rules).

When it stops, it says what happened in plain words, says what comes next, and writes it in the log.

## Logs

One entry per session, in `day3-build/agent-run-log.md`.

**Each entry holds:** a made-up session ID, applicant type, the Singpass case, steps reached and failed, field errors by field name, the photo result by reason, any stop or hand-over and why, the source IDs cited, and whether "submitting is not approval" was said.

**Never log:** an NRIC or passport number (real or made up), a name, a date of birth, a photo, or any key or password.

**Review:** the learner reads the log after each test round. A promise of approval, an extra document or a missed stop is a failure and is fixed before the next round.

**Honest limit:** the current log has three scripted walk-throughs and one rerun. They were written by the same person who wrote the instructions.

## Business rules

These are rules the agent must follow. All are made up. The sources are in `day2-validate/context-skill.md` (S1 to S5), `day2-validate/build-log.md` and `day2-validate/PROMPTS.md`.

**Content rules**

- An ICA officer decides every outcome. Never say or imply approval.
- Needed documents for someone renewing their own passport: current passport, recent photo, and check it has not expired (S1).
- Needed documents for a parent renewing a child's passport: child's passport, child's birth certificate, recent photo of the child, the parent's own ID, and check expiry (S1).
- Not needed: printed NRIC copy, proof of address, marriage certificate, printed Singpass summary (S1). Say so if asked.
- Singpass fills in details, not documents. The applicant still gathers the documents (S3).
- If Singpass flags the applicant as not eligible, stop before the form, give no reason, and send them to customer service (S3, S2, S5).
- A parent who keeps failing goes to customer service (S2).
- Never ask for real data. Use made-up examples only.

**Photo rules** (from `day2-validate/PROMPTS.md`)

- The background must be white.
- The top half of the body must be visible and nothing may cover the face.
- The face must be clear.
- The photo must be recent, with a date tag no more than 6 months before submission.
- Exactly 6 months passes in the prototype. This is unconfirmed.

**Field rules:** the made-up formats under Context and memory. All fields are required.

**Success and kill switches** (from `day2-validate/build-log.md`)

| Measure | Target | Kill switch |
|---|---|---|
| Submission return rate | under 17% | not measurable with made-up data |
| Singpass connects and every field arrives | all tests | none set in code |
| Testers who edit 2 or more Singpass fields | under 30% | 30% or more |
| Testers who pick exactly the needed documents | 90% or more | under 70% |
| Flagged applicant stopped before the form | every test | any one that gets through |
| Bad test photo stopped by the photo check | every test | any one that gets through |

**Not saved anywhere:** the longer business rules list (`business-rules.md`) was kept as a draft in chat and was never saved. Whether to save it is under Open decisions.

## What engineering decides

These are for the engineering team. Nothing here is decided in this document.

- How to connect to the real Singpass, and what it sends.
- Where the real ICA rules live, and how the agent reads them so they stay current.
- What image model, if any, does the face and date-tag checks, and how its accuracy is measured.
- How the photo is handled in memory so it is never kept, including temporary copies.
- Where applicant data and drafts are stored if not in the browser, and for how long. Drafts in local storage are only safe with made-up data.
- Where logs are stored, who can read them, and how long they are kept.
- How to enforce the five-language wording and the document answer key automatically, instead of by hand.
- Whether to host the Inter font, since the page makes one outside request.
- How to split the prototype into modules and add automated tests for formats, photo verdicts, retries and the flagged stop.
- How the settings in the Permissions table are enforced in the system, and not only in written instructions.
- A real accessibility test with a screen reader, keyboard only, a phone and zoom.
- A security review before any real data is used.
- Whether any part runs on a language model, which one, and how its prompt is built from `day3-build/CLAUDE.md` and kept to the rules. Today none of the prototype does.
- Where the contents of sources S1 to S5 are stored, so the agent can read and cite them. Today only the copied rules exist.
- Expected volume, speed and uptime. The scenario says "large volume" and gives no number.
- What "Submit" hands off to, and how an ICA officer receives it. Today nothing is sent.
- How a session ID is made, and how a log entry is linked to a session without holding personal data.
- How the agent's answers are tested against the rules, and how often.

## Open decisions

These are yours. Four are now decided. The rest are open.

1. **One agent or two? DECIDED: one agent.** The photo check is one job inside the guide agent. The control panel and one pager are updated to match.
2. **Permissions. DECIDED.** Every setting in the table is accepted as written, with one change: #4 (read the picture itself) moved from block to auto, because you decided to build the face and date-tag checks. Whether #4 should be confirm instead is Open decision 24.
3. **Build the face and date-tag checks? DECIDED: yes, as fixed rules.** Open decision 23 asks what the rules are.
4. **Autosave.** The prototype saves a draft as the applicant types. #17 proposes confirm. Which do you want?
5. **Three tries.** The "three failures, then customer service" rule and the "two more photo tries" are numbers I chose. Keep, change or drop?
6. **Photo date rule.** Does exactly 6 months pass? Is a photo with no date tag asked for again, or sent to customer service?
7. **Edge cases with no screen:** no Singpass, cannot leave the country, a child in the state's care, and an applicant who cannot read forms. Build a route for each, or keep the hand-over to customer service?
8. **Business rules.** Save the longer `business-rules.md` draft to the repo, or leave it in chat?
9. **Singpass kill switch.** The build log sets the 30% edit trigger but no number for Singpass failing to connect. Set one?
10. **Logs.** Is "field names and reasons only" the right level, or does the team need more?
11. **Who owns what.** The Business owner is a made-up team. Name a real team for the rules and the service, and a Customer service language group for each language.
12. **When is it ready? DECIDED: two meanings, each with its own list.** The handoff note says the prototype is not ready. Ready means two different things. Each item below says where it comes from. "Number not set" means your files give no number, so one is needed before the item can be checked.

    **A. Ready to build.** An engineer can start without asking you anything. This is true when:
    1. Every open decision that blocks the build is answered. Today the ones that block are: 23 (rules for the face and date-tag checks), 7 (edge cases), 5 and 15 (tries and retry limit), 6 and 17 (photo date rule), 14 (child details from Singpass) and 21 (who supplies S1 to S5).
    2. Every setting in Permissions is accepted. **Done.**
    3. The business rules are written down and in one saved place. Today the longer `business-rules.md` is still a chat draft (decision 8).
    4. Who decides what is written down in `day3-build/operating-model.md`. **Done**, with open items listed there.

    **B. Ready to go live.** The Business owner says yes, in writing, to real applicants. This is true when all of these hold:
    1. **No kill switch has triggered** in the last test round (from `day2-validate/build-log.md`): under 30% of testers edit 2 or more Singpass fields, at least 70% pick exactly the needed documents (success is 90%), no flagged applicant reaches the form, and no bad test photo passes.
    2. **The agent's own answers pass your bar.** Every run in the log follows every rule. The log counts a promise of approval, an extra document or a missed stop as a failure. How many runs, and what share must pass: number not set (decision 20).
    3. **The photo checks are accurate enough.** Both the background check that works today and the face and date-tag checks still to be built, tested on made-up photos. How accurate: number not set (decision 23).
    4. **The wording is checked.** Tamil, Hindi, Chinese and Malay wording is checked by the matching Customer service language group.
    5. **Accessibility is tested for real:** screen reader, keyboard only, phone and zoom. The target is decision 19.
    6. **A security review of the system and its APIs** is done by the Engineering lead before any real data is used.
    7. **The incident steps work.** There is an off switch ("on hold"), monitoring alerts the team, and the API check validates applications while the agent is on hold. Today none of these exist.
    8. **An ICA officer can see the agent's result and report a wrong one** (operating model decision 19). Not decided yet.
    9. **Submission return rate is below 17%** (`one-pager.md`). This cannot be shown with made-up data. It needs a real pilot, which is the Business owner's decision.
    10. **The Business owner's written yes** is recorded in the decision log.

    **Where we are now.** Ready to build: not yet. Ready to go live: no. Items B2, B3, B7, B8 and B9 are the furthest away.

**Found when reading as the engineering lead.** These are gaps an engineer could not build from. I did not decide any of them.

13. **What is the agent made of? DECIDED: fixed rules, no language model.** This means the face check must be done with fixed rules too, which is Open decision 23.
14. **Child details from Singpass.** The prototype assumes Singpass sends the child's name and date of birth. If the real one does not, the parent types them. Which is true, and who confirms it?
15. **Singpass retry limit.** The prototype lets the applicant retry without a limit. Cap it, and at what number, or leave it open?
16. **Draft expiry.** Drafts never expire, and they are removed only on submit or "start new". How long should a draft live? This ties to question 4 on autosave.
17. **Photo with no date.** The code skips the date check when a file has no modified date, so such a file passes. That conflicts with question 6. What should happen instead?
18. **Who confirms a runtime "confirm"?** I read it as the applicant for #5, #17 and #26. Is that right, or is it someone else?
19. **Accessibility target.** The prototype was built to WCAG 2.2 AA basics, which is my reading of "best practice". Is that the target, and who tests it before release?
20. **Pass bar for the agent.** The kill switches cover the prototype. There is none for the agent's own answers, such as how many test runs must follow every rule. The run log counts a promise of approval, an extra document or a missed stop as a failure. What share of runs must pass, and out of how many?
21. **Who supplies S1 to S5?** Their contents are not stored anywhere. Who writes or provides them, and in what form?
22. **Volume and speed.** How many applicants a day, how fast must the agent answer, and how much downtime is acceptable?
23. **What are the fixed rules for the face and date-tag checks? PARTLY ANSWERED.** With no language model, a check cannot "look" at a face the way a person does. It can only measure things. Your reference is the ICA page `https://www.ica.gov.sg/photo-guidelines`, read on 2026-11-19. The page says the photo follows ISO and ICAO specifications.

    **What the page states, and the fixed rule it allows** (all can be checked by measuring the file, no face needed):

    | Page says | Fixed rule | Measurable? | Today's prototype |
    |---|---|---|---|
    | File types JPG, JPEG, HEIC, HEIF and PNG | The file type must be one of the five. Anything else: ask for another photo. | Yes | Accepts any image type. **Differs.** |
    | Maximum file size 8 MB | Over 8 MB: ask for another photo. | Yes | Limit is 5 MB. **Differs.** |
    | 400 x 514 pixels when uploaded online | Width and height must be exactly 400 x 514. Otherwise say the size is wrong and ask for another. | Yes | Not checked. **New.** |
    | "A new, coloured photograph" | A black and white or greyscale photo fails. | Yes (colour values) | Not checked. **New.** |
    | "New" | Needs a number of months to measure. The page gives none. | Only with a number | Uses 6 months from the file date. The number is made up. |
    | Only resizing is allowed. No changing facial features. No photo filters. | Cannot be measured by a fixed rule. | No | Not checked. |
    | Selfies usually do not meet the requirements | Cannot be measured by a fixed rule. | No | Not checked. |

    **What the page text does not state** (its "Dos and Don'ts" section is an image, so this was not read). I have written no rule for these:

    - Background colour and how plain it must be. The prototype's white-edge test is made up.
    - Head position and size in the frame.
    - Expression, glasses, headwear, lighting and shadows.
    - What counts as "new".

    **What a fixed rule cannot do.** Judge whether the face is clear, covered, or the right size in the frame. Doing that needs a face detector or an image model, and you decided on fixed rules. So the face part of the photo job is not covered by these rules. The agent says it did not look at the face, as now.

    **Logic when the checks run, in order** (a proposal, not decided):

    1. Check the file type. Fail: say the type is wrong and ask for another photo.
    2. Check the file size. Fail: say it is too big and ask for another photo.
    3. Check the dimensions. Fail: say the size is wrong, say it must be 400 x 514 pixels, and say a photo editing program can resize it and change nothing else. The agent never resizes the photo itself. Ask for another photo.
    4. Check the colour. Fail: say the photo must be in colour and ask for another.
    5. Check the background. The prototype test is made up and stays until the real rule is known.
    6. If every step passes, say what was checked and what was not (the face, the head position, glasses and lighting). Never say the photo is good, fine or accepted, as in `day3-build/CLAUDE.md`.
    7. A failed photo gets up to two more tries. After three fails, hand over to Customer service.

    **How accurate must it be?** Every rule above is a yes or no on a number, so it should be right every time. What the page does not state (background, head position, "new") has no rule yet. Whether to use the page values is decision 25.
24. **Row 4 setting.** It moved from block to auto because the checks are now to be built. Should it be confirm, so the applicant says yes before a face result is shown?
25. **Page values or made-up values? DECIDED: use the page values** (file types, 8 MB, 400 x 514 pixels, colour). The Business owner confirms them before go-live. The prototype code and its five-language error wording still need to change, which is not done yet. The ICA page gives 8 MB, 400 x 514 pixels and five file types. Your files use 5 MB and any image type, and say every number is made up. Should the agent use the page values, keeping them as a reference that the Business owner confirms? Using real page values is also a change from "made-up numbers only", so this is your call.
