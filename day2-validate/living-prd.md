# Living PRD · Passport renewal guide

Scenario B · ICA passport applications and renewals. Everything here is made up. No real rules, people or records.

This file is read from the real code in `day2-validate/prototype/index.html` (merged in PR 24). It says what the code does today, not what we hope it does. Update it when the code changes.

## 1. Product overview

A clickable guide that walks an applicant through a passport renewal, step by step. It is one self-contained page (HTML, CSS and JavaScript, no build step). It is styled like the ICA site but says on every screen that it is a prototype and not the real site.

- **Who it is for:** citizens renewing their own passport, and parents renewing a child's passport.
- **What it does:** signs in with a made-up Singpass, asks who the passport is for, lists the documents to gather, checks the applicant's details, checks a photo, then lets them submit.
- **What it never does:** approve anything. Every screen that leads to submitting says an ICA officer decides.
- **Languages:** English, 简体中文, Bahasa Melayu, தமிழ், हिन्दी. Tamil and Hindi are marked as needing a native speaker's check.
- **Also in the page:** a tester view (made up, not for applicants) that runs the test cases and counts the results.

## 2. Problem and riskiest assumption

**Problem (from `one-pager.md`):** applicants do not understand what is needed to renew, so officers return many submissions. Parents are the most confused group. Success is a return rate under 17%.

**Riskiest assumption:** Singpass works. The applicant signs in and their details come across. Risk type: Technical. If it fails, applicants type everything and the guide loses its point.

**Second assumption:** applicants understand all the documents they need. Risk type: Comprehension.

**What the code does about them:**

- Singpass: seven made-up cases (see section 4), a "Try Singpass again" retry that keeps what the applicant typed, and a count of how many fields the applicant edits.
- Documents: a quiz in the tester view, shown only after a connected sign in. The answer key is copied by hand from `context-skill.md`.

## 3. User flow and screen map

Step numbers are the ones the progress bar shows ("Step n of 5").

| Screen | Step | What happens |
|---|---|---|
| Welcome back | none | Shown only if a saved draft exists. Continue, or delete it and start new. |
| Sign in with Singpass | 0 | Made-up sign in. The tester view picks which Singpass case comes back. |
| Cannot continue online | stop | Shown if Singpass flags the applicant. No form, no reason, sent to customer service. Only way out is back to sign in. |
| Who is this for? | 1 | Myself, or my child. Switching clears the document ticks. |
| Get these ready | 2 | 3 documents for self, 5 for a child. "Next" stays off until every one is marked Done. Parents see "Stuck? Ask customer service" after 15 seconds. |
| Check your details | 3 | Fields filled by Singpass. Applicant fixes them. Format checks run on "Next". "Try Singpass again" shows if Singpass is down or sent too little. |
| Add a photo | 4 | Photo check. "Next" stays off until a photo passes. |
| Check your answers | 5 | Fields can be changed. Checked again on "Submit". |
| Submitted | end | "Submitted. Not approved yet." Nothing was sent. |

Always on screen: the prototype banner, a language picker, a skip link, "Save draft" and a draft status line.

**Fields (all made up):** self = name, NRIC, date of birth, passport number. Child = child's name, child's date of birth, plus the parent's name, NRIC and the child's passport number.

## 4. Success metrics

Only the tester view counts anything. Results live in the page and are never saved or sent.

| Metric | Target | Kill switch | Where it is counted |
|---|---|---|---|
| Singpass connects and every relevant field arrives | all tests | none set in code | "Success signal" in the tester view |
| Applicants who edit 2 or more Singpass fields | under 30% | at 30% or more | "Check your details" step |
| Documents picked exactly right (quiz) | 90% or more | under 70% | Document check |
| Flagged applicant stopped before the form | every test | any one that gets through | "Flag check" |
| Photo check gives the right verdict on made-up photos | every test | any bad photo that passes | "Photo check" |

The Singpass cases in the tester view are: details correct, one detail wrong, details missing, Singpass unavailable, down then works on retry, partial then complete on retry, and flagged. The retry count is shown per test.

**Not measurable here:** the real return rate (under 17%), the market-risk test (7 of 10 testers follow the guide), form completion rate, and error rates within each field. `one-pager.md` lists the last two as metrics to track, but the code does not count them.

## 5. Technical reality

- **Split into plain files, no build.** `index.html` is now a 34-line shell. `styles.css` holds the look. Seven script files in `js/` load in order: `wording.js` (five languages), `state.js` (state, drafts), `ui.js` (language switch, examples, form helpers), `photo.js` (photo check), `screens.js` (applicant screens), `tester.js` (tester view), `start.js` (start up). They still share one global `state` object and one global scope, so the order of the script tags matters. There is no framework and no automated test.
- **Nothing is sent.** There is no `fetch` or form post. The one outside request is the Inter font from Google Fonts. The build log says nothing leaves the browser, so this needs fixing or stating.
- **Drafts** go to the browser's local storage under one key, on this device only. Step, answers, ticks, language and the Singpass result are kept. The photo is never kept. Submitting deletes the draft. A draft resumed at the last step sends the applicant back to re-add the photo.
- **Singpass is fake.** `singpassReturn()` returns one of the made-up profiles. Nothing calls a real service.
- **Photo check is basic.** It checks file type (JPG, JPEG, HEIC, HEIF or PNG), 8 MB, exactly 400 x 514 pixels, colour, the file's modified date within 3 months (not the date inside the photo), and whether at least 85% of the top and side edge pixels are near white. The first five values come from the ICA photo page. The white-edge test is made up. It cannot judge a face. The screen says so.
- **Formats (made up):** NRIC is S or T, 7 digits, a letter. Passport number is a letter, 7 digits, a letter. Names are letters, spaces and `. ' - /`, at least 2. Dates must be real and in the past. All fields are required.
- **Accessibility:** labels linked to inputs, focus moves to the heading on each step, skip link, errors and draft status announced, step-named "Done" buttons, labelled progress bar, `lang` set, reduced motion respected, disabled button contrast 5.4 to 1. Checked in code and by contrast numbers only. No screen reader, keyboard-only or phone test.
- **Two hand-kept copies:** the quiz answer key must match `context-skill.md`, and every wording change must be made in all five languages (checked once, not enforced).

## 6. Assumptions and risks

**Assumptions built into the code** (all made up, none from a real ICA rule):

- "Recent" photo means the file date is within 3 months. Exactly 3 months passes.
- "White background" means 85% of edge pixels near white. The bottom edge is skipped because shoulders show there.
- "S, T, etc" in the NRIC rule means only S and T.
- "Done" means the applicant clicked it. The code does not check that a document is good or unexpired.
- For a child, the Singpass details belong to the parent.
- On retry, what the applicant typed beats what Singpass sends.
- Parents get a stuck prompt after 15 seconds. The number is arbitrary.

**Risks:**

| Risk | Type | Note |
|---|---|---|
| Real Singpass does not match the made-up profile | Technical | The prototype cannot show this. |
| Photo check passes a bad photo or stops a good one | Technical | It is a stand-in, not a real check. |
| Document list drifts from the real rules | Team | One owner. Review trigger is in `context-skill.md`. |
| Applicants ignore the guide | Market | 10 made-up testers, 7 of 10 follow it. Not run yet. |
| Tamil and Hindi wording is wrong | Quality | Needs a native speaker. Chinese and Malay should be checked too. |
| Real national data enters local-storage drafts | Privacy | Safe only because all data is made up. |
| Font request leaves the browser | Privacy | See section 5. |
| Accessibility is not fully checked | Quality | Needs a real screen reader and keyboard test. |

## 7. In and out of scope

**In scope (built):**

- Made-up Singpass sign in with seven cases, retry, and a flagged stop.
- Self and parent paths with document readiness.
- Detail checks with formats, and a photo check with plain error messages.
- Draft save, resume, and "try saving again".
- Five languages, accessibility basics, and the tester view.

**Out of scope (not built):**

- Real Singpass, real ICA systems, real photos or real people.
- Reading the date inside a photo, or judging a face.
- An accessible route for applicants who cannot read forms (raised in `PROMPTS.md`).
- Applicants without Singpass, a child in the state's care, and an applicant not allowed to leave the country. The Expand edge cases name them, but the code has no screen for them.
- Checking that a document is real, good or unexpired.
- Sending anything, paying, booking, or tracking an application.
- Saving test results anywhere.
- A full accessibility audit.

## 8. Engineering recommendation

Do not ship this. Use it as a spec and a demo.

1. **Replace the made-up parts before any real use:** Singpass, the photo check, and every format and limit. Get the real rules from ICA first.
2. **Finish the split.** The file is now cut into parts, but they still share globals. Next, wrap each part in a module with its own imports so each can be tested alone.
3. **Add automated tests** for the format rules, the photo verdicts, retry behaviour and the flagged stop. They were only tested by hand.
4. **Fix the font request** by hosting the font, or say it in the security answer.
5. **Make the translation check a test** that fails if any language is missing a key, and have native speakers review all four non-English languages.
6. **Run a real accessibility test** with a screen reader, keyboard only, a phone, and zoom.
7. **Add the missing edge cases** (no Singpass, child in care, not allowed to leave) before measuring the return rate.
8. **Keep the tester counters,** and add the two metrics the one-pager lists but the code lacks: error rate per field and form completion.
9. **Decide who owns what:** the Passport Renewal Content Owner keeps `context-skill.md` and the quiz key in step.
