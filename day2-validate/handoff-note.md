# Handoff note · Day 2

Scenario B · ICA passport applications and renewals. Everything here is made up. No real rules, people or records.

This note is for whoever picks up the work next. It says what exists, what was proven, what was not, and what to do first.

## What exists

| File | What it is for |
|---|---|
| `one-pager.md` | The problem, the trust rules, the risks and the strategy. Several headings are still empty. |
| `day2-validate/prototype/` | The clickable guide. Open `index.html` in a browser. Keep `styles.css` and `js/` next to it. |
| `day2-validate/build-log.md` | Three imagined leaders, the kill switches, and the two riskiest assumptions. |
| `day2-validate/context-skill.md` | The 12 document rules, sources S1 to S5, and the answer key for the document quiz. |
| `day2-validate/PROMPTS.md` | The Expand, Behavior and Refine prompts, with what worked and what broke. |
| `day2-validate/living-prd.md` | The eight-block PRD read from the code. |
| `day3-build/CLAUDE.md` | The instruction file for the Day 3 agent. |
| `SCENARIO-PICK.md` | Scenario B. |

## What the prototype does

An applicant signs in with a made-up Singpass, says who the passport is for, ticks off the documents to gather, checks their details, adds a photo, checks their answers and submits. Every screen says submitting is not approval.

- It has a photo check, field formats, retries for Singpass and draft saving, and a flagged stop.
- It works in English, 简体中文, Bahasa Melayu, தமிழ் and हिन्दी.
- It has accessibility basics.
- The tester view at the bottom of the page (not for applicants) runs the made-up Singpass cases, the photo test files and the document quiz, and counts the results.

## What was proven

- The flow works end to end with made-up data, in a browser, with no errors.
- A flagged applicant is stopped before the form, with no reason given.
- Bad NRIC, passport number, name and date values are blocked. The bad test photos are stopped. All test photo verdicts were right.
- Retries keep what the applicant typed.
- All five languages have every piece of wording.
- The Behavior and Refine runs found real gaps, and the fixes were built and tested. The results are in `PROMPTS.md`.

## What was not proven

- **Nothing real.** There is no real Singpass, no real photo check and no real ICA rule. Every format, limit and number is made up.
- **No return rate.** The 17% target cannot be shown with made-up data.
- **No tester results.** The tester view was only used by hand. The 10-tester market test (7 of 10 follow the guide) has not been run, and the document quiz has not been given to testers.
- **Accessibility is only partly checked.** It was checked in code and by contrast numbers. There was no screen reader, keyboard-only, phone or zoom test.
- **Translations are unreviewed.** Tamil and Hindi are labelled as needing a native speaker. Chinese and Malay need one too.

## What would worry an engineer

1. The photo check is a stand-in. It looks at file type, size, file date and edge colour. It cannot read the date inside a photo or judge a face.
2. The files are split, but they share one global scope and one state object. The script order in `index.html` matters. There are no automated tests.
3. Two things are kept in step by hand: the quiz answer key and `context-skill.md`, and the wording across five languages.
4. Drafts sit in the browser's local storage. That is fine with made-up data and a privacy problem with real data.
5. The page loads the Inter font from Google Fonts. `build-log.md` says nothing leaves the browser, so one of the two needs fixing.

## Open issues

- `one-pager.md` still has empty headings: Build plan and handoff, Agent role and guardrails, Roles and operating model, Metrics plan and stop line, Evals and gates, Decision, and Open issues.
- `day2-validate/README.md` also names `validation-brief.md`, which does not exist.
- The business rules are a draft in chat only. They were never saved. The top five were BR-35, BR-06, BR-14, BR-15 and BR-31.
- The Refine edge cases in `PROMPTS.md` are empty, so none were tested.
- The Expand edge cases have no screen: no Singpass set up, an applicant not allowed to leave the country, a child in the state's care, and an applicant who cannot read forms.
- Two metrics from the one-pager are not counted in code: error rate per field and form completion rate.
- A "document is not up to expectation" check does not exist. The code only checks that the applicant ticked "Done".

## Decisions already made

- Singpass working is the riskiest assumption (Technical). Documents understood is the second (Comprehension).
- Kill switches: 30% or more of testers edit 2 or more Singpass fields. Under 70% of testers pick exactly the right documents. Any flagged applicant who reaches the form. Any bad photo that passes.
- Success: 90% or more of testers pick exactly the needed documents.
- An ICA officer always decides. The guide never promises approval.
- A flagged applicant gets no reason and is sent to customer service.
- Made-up data only. No real person, number or photo.

## Owners

- **Business owner** (a made-up team, no names) keeps sources S1 to S5, `context-skill.md` and the quiz key up to date. They sign off every change to those.
- **The learner** owns the prototype, the one-pager and the PRD.
- **A Customer service language group** is needed to check the Tamil, Hindi, Chinese and Malay wording.

## Do this first

1. Fill in the empty `one-pager.md` headings that Day 3 needs, starting with Agent role and guardrails.
2. Decide the font question: host the font, or change the build log.
3. Run the quiz and the Singpass cases with made-up testers, and write the results into `build-log.md`.
4. Run the keyboard-only and screen reader test.
5. Save the business rules if they are still wanted.
6. Check `day3-build/CLAUDE.md` against this note, and change it if anything above contradicts it.

## How to open and test

1. Open `day2-validate/prototype/index.html` in a browser.
2. Pick a made-up Singpass case in the tester view, then press "Sign in with Singpass".
3. Walk the steps. The photo step has four made-up test photos in the tester view.
4. Press "Record this test" at the end to add it to the counts.
5. Results stay on the page and are lost on reload. Nothing is saved or sent.
