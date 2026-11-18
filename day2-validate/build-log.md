# Build log

## Three leaders

These three leaders are imagined, with no real names. Their objections are made up to test the idea.

### 1. Director of Operations

**Objection:** "Officers already have a backlog and the vendor leaves on a date that won't move. Another guide won't cut returns by the 17% target fast enough, and my team can't keep its wording up to date every time the rules change."

**My reply:** The key problem the prototype is trying to solve is a step by step method that enables applicants to easily gather information before submission, so that we can reduce the return rate.

**The prototype must prove:** Applicants can gather everything before they submit. A tester can follow the step by step path to the end without help, and "Submit" stays out of reach until every step is done.
*How to check:* Give testers a made-up task, such as "Renew your child's passport." Count how many reach "Submit" and how many hesitate or take a wrong turn on each screen.

### 2. Leadership for the immigration agency

**Objection:** "Final approval must stay with ICA officers. If this guide tells a parent they are ready and the application is still returned, people will think we promised approval, and we will be blamed."

**My reply:** Then we will need to manage the expectation on the UI to communicate to applicants that submission doesn't mean approval.

**The prototype must prove:** Applicants understand that submitting is not approval. The prototype says so before they start, on the review screen, and after they submit.
*How to check:* After the task, ask each tester, "What happens after you press Submit?" They should say an ICA officer decides and the application can still be returned.

### 3. Director for Security

**Objection:** "Applications contain national identity data. A new tool that handles photos and personal details widens what we have to protect, and I won't accept it unless it is clear what data it keeps."

**My reply:** We are adopting the applicant's details from Singpass, so we are not handling any other information. The passport photo is already required information, so no added information is managed.

**The prototype must prove:** No extra information is collected. It asks only for details that come from Singpass, plus the passport photo, and it sends or keeps nothing else.
*How to check:* List every field on every screen. Each one must be a Singpass detail or the photo. Confirm that nothing leaves the browser and that the photo is not kept in a draft.

### What the prototype cannot prove

It uses made-up data, so it cannot show that the real return rate falls below 17%, and it does not connect to the real Singpass. It only shows that applicants can follow the steps and understand the message.

## Kill switch

**Kill switch:** Users continue to face errors before submission.

**Kill-switch signal:** High error rates on each page during submission.

**Trigger:** The kill switch is triggered if the Singpass information ported into the form is edited in 3 out of 10 cases.
