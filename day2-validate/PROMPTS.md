# Prompt chain

**Scenario:** B · ICA passport applications
**Prototype today:** Guides an applicant through the required documentation and fields needed for the passport renewal process

All data is synthetic and labelled as made up.

## 1. Expand

**Prompt:** Evaluate if the passport photo is sufficient for submission, enable for key languages for Singaporeans (English, Simplified Chinese, Bahasa Melayu, Tamil, Hindi)

**Business rules:**
- Background for Passport photo has to be white
- Applicant Top half of body has to be visible without anything covering person's face
- Face has to be clear in the photo
- Has to be a recent photo, detect any meta tagging of dates for the photo that is not longer than 6 months of submission

**Edge cases:**
- Applicant does not have singpass set up
- Applicant is not allowed to renew their passport as they are not allowed to leave the country
- Child does not have an official parent and is in state's care
- Applicant is disabled and cannot read forms, require an accessible form to aid interaction

**Result:** Ran in chat on 18 Nov 2026 with five made-up photo descriptions. No real photo or person.

*What worked:*
- The four photo rules gave a clear verdict for four of the five made-up photos: A passed, B failed on background, C failed on a covered and blurry face, D failed on age.
- The pass and background messages were written in English, Simplified Chinese, Bahasa Melayu, Tamil and Hindi. None promised approval.
- Three edge cases fit existing rules: no Singpass goes to customer service, not allowed to leave the country is a stop with no reason, and a child in the state's care goes to customer service.

*What broke or is unclear:*
- The guide cannot view a real image. It judged text descriptions. A real check needs an image tool the prototype does not have.
- "Top half of body visible" is wider than a usual passport photo. To confirm.
- Does exactly 6 months old pass? Counted as passing. To confirm.
- A photo with no date data is not covered by the rules. Proposed: say it cannot be confirmed and offer a new photo or customer service.
- Tamil and Hindi wording needs a native speaker to check.
- An accessible route for applicants who cannot read forms is missing from the prototype.

## 2. Behavior

**Prompt:** Singpass connection fails and information cannot be brought over
Singpass connection was intermittent and only some information was brought over
Saving of the draft fails
Passport photo shows error

**Forced failure:** Passport photo submission fails

**Business rules:**
- Any outcome An ICA officer decides. Never say or imply approval
- Singpass flags the applicant as not eligible	Stop before the form. Give no reason. Send them to customer service
- A parent renews a child’s passport	Needed: child’s passport, birth certificate, recent photo of the child, the parent’s own ID. Check expiry
- A document is not on the needed list	Do not ask for it. Say it is not needed
- Use Singpass data. Any step	Send nothing. Keep nothing else.

**Edge cases:**
- When Singpass returns error, show error message and applicant has to reload to check on status
- If Singpass information wasn't complete, allow for retry to bring information over
- Reload save  draft option

**Result:** _fill in after you run it: what worked, what broke._

## 3. Refine

**Prompt:** Applicant should be able to verify if documents  and fields are accurate

**Business rules:**
- if document is not up to expectation, applicant cannot move on to next screen
- Each field has a format (e.g. NRIC should start with letter S, T, etc and end with letter, containing 9 characters

**Edge cases:**

**Result:** _fill in after you run it: what worked, what broke._
