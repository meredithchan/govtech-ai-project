# Agent control panel · Passport photo job

Scenario B · ICA passport applications and renewals. Everything here is made up. No real rules, people, photos or records.

This panel is the rule sheet for the photo job. The photo job is one job inside the one guide agent in `day3-build/CLAUDE.md`. It is not a second agent (decided). It is step 3 of the work, "Check the passport photo".

## What the agent is doing

**Job:** look at one made-up passport photo and tell the applicant whether it is ready to go forward, and if not, what to fix. It decides which checks to run and in what order, and it can ask for another photo.

**Why this job is in the agent and not a fixed workflow:** the prototype's check only looks at file type, size, file date and edge colour (the Day 3 target also checks dimensions and colour). It cannot judge a face. The agent is built with fixed rules and no language model (decided), so the face and date-tag checks have to be fixed rules too. See PRD Open decision 23.

**What it checks** (from the Expand rules in `day2-validate/PROMPTS.md`):

1. The background is white.
2. The top half of the body is visible, and nothing covers the face.
3. The face is clear, not blurred.
4. The photo is recent. It reads the date tag in the photo, and the date is no more than 6 months before submission.

**What it can use:**

- One photo the applicant adds. Made-up photos only.
- The photo's file type, size, dimensions, colour and date tag.
- The made-up rules above.
- A way to ask the applicant for another photo, and a hand-over to customer service.

**What it cannot use:** the web, any real photo or person, any other applicant's data, or any tool that edits a photo.

**What it never does:** keep the photo, edit the photo, change a face, or say the photo is approved.

**Say every time:** the agent's check is a help. An ICA officer can still return the photo.

## Opportunity portfolio

The photo job could do these things. They are ranked by how ready they are, not by how useful they sound.

| # | Opportunity | Value if it works | Risk if wrong | Ready now? |
|---|---|---|---|---|
| 1 | Tell the applicant the photo's file is too big, the wrong type, or too old | Catches the easy failures before submission | Low. The applicant just adds another photo. | Yes. This already works in the prototype. |
| 2 | Spot a non-white background | Removes a common return reason | Medium. A false fail blocks a good photo. A false pass gets returned. | Partly. The edge-colour test works on made-up photos only. |
| 3 | Spot a covered or blurred face | Removes the return reason the prototype cannot catch | High. Needs an image model, and a wrong call affects a real face. | No. Not built or tested. |
| 4 | Read the date tag inside the photo | Replaces the file-date stand-in | Medium. A photo with no tag must not be guessed. | No. Not built. |
| 5 | Explain to a parent, in plain words and their language, what to fix | Helps the most confused group | Medium. Wrong wording misleads. Unreviewed translations add risk. | Partly. English works. Tamil, Hindi, Chinese and Malay are unreviewed. |
| 6 | Say a photo "passes" | Feels reassuring | High. The applicant hears "good" and the officer can still return it. | Never as "good". Say "passed the basic check" only. |

**Start with 1 and 2.** Add 3 and 4 only after a real test with made-up photos shows the agent gets them right. Drop 6 as worded.

## Rules of engagement

### Decides alone

The agent may do these without asking anyone.

- Say a made-up photo is the wrong file type (not JPG, JPEG, HEIC, HEIF or PNG), over 8 MB, not 400 x 514 pixels, not in colour, or older than 6 months, and ask for another. For a wrong size, say how to fix it. It never resizes the photo itself.
- Say the background is not white, and ask for another photo in front of a plain white wall.
- Say the check could not read the photo, and ask for another.
- Ask the applicant to try again, up to two more times.
- Say plainly what it checked and what it did not.
- Write its run log entry, by reason only. Never the photo.

### Proposes and waits

The agent suggests. The applicant decides.

- "The face looks covered or blurred. Please check, and add a new photo if so." The agent proposes. The applicant decides whether to replace it.
- "The date tag is missing, so I cannot confirm the photo is recent. Add a new one, or ask customer service." The applicant picks.
- "This photo may be too dark or too small." The applicant decides.

The agent never moves the applicant on, or blocks them for good, on a face judgement alone.

### A person reviews

A named person looks at these before anything is final.

| What | Who | When |
|---|---|---|
| Any photo the agent could not decide on | Customer service | Straight away, after the third try |
| Any change to a photo rule or limit | Business owner | Before the change |
| Any change to the agent's wording | Customer service, in the matching language group (Tamil, Hindi, Chinese, Malay) | Before real use |
| The run log, after each test round | The learner | After every round |
| Every photo's final result | An ICA officer | At review, always |

## Permissions

One row per tool. The tools come from `day3-build/CLAUDE.md` and `day3-build/ai-prd.md`. The photo job uses the photo checker, the run log and the customer service hand-over. The other tools belong to the wider guide agent, so they are listed too.

**All settings below are decided** (you accepted them on 2026-11-19, with one change: row 8). The full action-by-action table is in `day3-build/ai-prd.md`.

**Tiers:** *read* looks at something. *draft* produces words or a suggestion that is not kept. *write* changes something that is kept. *send* leaves the agent's control, or tells the applicant a decision.

**Settings:** *auto* means the agent does it alone. *confirm* means a person says yes first. *block* means the agent may never do it.

| # | Tool | Tier | Setting | What the stress runs showed |
|---|---|---|---|---|
| 1 | Made-up Singpass sign in | read | auto | Not used in run-004 to run-006. The retry button is the applicant's, so a retry is confirm (PRD row 5). |
| 2 | Document list | read | auto | Used in run-005 and run-006. It returned the needed documents and nothing about a page that does not exist or a time frame. It is the agent's only source (S1). |
| 3 | Field checker | read | auto | Not used in the stress runs. |
| 4 | Photo checker | read | auto | Used in run-005. The agent kept the photo step and did not skip it when asked. It cannot judge a face. |
| 5 | Draft save | write | confirm | Not used in the stress runs. It follows PRD row 17 and Open decision 4 on autosave (still open). |
| 6 | Customer service hand-over | draft | auto | Used in all three stress runs. In each, the agent only told the applicant to contact customer service. It never contacted anyone itself, which PRD row 27 blocks. |
| 7 | Run log | write | auto | Used in all three stress runs. It does not list "page the applicant cited", so run-005 had no rule for logging the page name. |
| 8 | Picture reader for face and date tag (to be built, fixed rules) | read | auto | Changed from block, because you decided to build the checks. It must be built as fixed rules, with no language model (PRD Open decisions 3, 13 and 23). Not built yet, so nothing is on until it exists. A face result is a suggestion the applicant decides on, never a final call. |

**The agent has no search tool.** Its only sources are S1 to S5. If a search is ever added, it would need its own row here and a rule for what to say when it returns nothing.

**What the stress runs add:**

- **run-004, empty enquiry.** No tool was called. The agent was safe because its first job is to ask who the passport is for. No row here covers it. A rule in Stop conditions or Human checkpoints would close the gap. That is for you to decide.
- **run-005, page that does not exist.** The agent did not guess what the page says, and it did not skip the photo step. Rows 2 and 4 gave it nothing to guess from.
- **run-006, search returns nothing.** There is no search tool, so there was nothing to return. Rows 2 and 6 are the tools involved. The agent sent the applicant to customer service.

**Open decisions for this section:**

1. **Settings. DECIDED.** All eight accepted as written, with row 8 moved from block to auto. Whether row 8 should be confirm is PRD Open decision 24.
2. **Logging a cited page.** Should the run log record the page name an applicant cites? Today the Logs section does not say.
3. **Empty enquiry rule.** Should an empty message get its own rule, or is the first-job fallback enough?
4. **Retry on Singpass.** Row 1 is auto to read the result, and the retry is the applicant's press. Is that the right split?

## Stop conditions

The agent stops and does not go on when any of these happens.

- The photo looks real, or the applicant says it is a real person's photo. Stop and say only made-up photos are used.
- The agent is about to say "approved", "accepted", "good" or "fine".
- It is asked to edit or improve the photo, or to change the face.
- It is asked to keep the photo, or to send it anywhere.
- It would have to guess a face verdict it cannot make.
- The same photo step fails three times in a row. Send the applicant to customer service.
- A bad test photo gets through the check. This is a kill switch from `day2-validate/build-log.md`. Fix it before anything else.
- The agent finds it needs a tool, file or permission that is not listed in this panel.
- Singpass flags the applicant. The photo step must never be reached.

When it stops, it says what happened in plain words, says what comes next, and writes it in the log.

## What stays human

These are never given to the agent, whatever it can do.

- **The final decision on every photo and every application.** An ICA officer decides.
- **Anything about an applicant's face or identity.** The agent can say what the check saw. It cannot say who someone is or whether they look like their photo.
- **Why Singpass flagged an applicant.** No reason is given.
- **Whether an applicant is eligible.** That is for customer service and an officer.
- **Changing a rule, limit or photo list.** The Business owner signs it off.
- **Whether the translations are right.** The matching Customer service language group checks them.
- **Whether to use real photos.** The answer is no, in this project.
- **Whether to ship this.** That is a decision for the learner and the people who own the real service. The prototype is not ready.
