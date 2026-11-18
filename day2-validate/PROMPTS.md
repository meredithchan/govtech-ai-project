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

**Result:** _fill in after you run it: what worked, what broke._

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
