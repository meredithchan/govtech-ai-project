# Operating model · Passport renewal guide agent

Scenario B · ICA passport applications and renewals. Everything here is made up. No real rules, people or records.

This file says who decides what about the agent. It uses roles, not names. It pulls from `SCENARIO-PICK.md`, `one-pager.md`, `day3-build/agent-control-panel.md` and `day3-build/ai-prd.md`.

Where a role already decides something in those files, this table repeats it. Where they say nothing, the entry is marked **Proposed**. Proposed entries are suggestions for you to accept, change or reject. They are listed again under Open decisions.

## Roles

| Role | What this role does | Where it comes from |
|---|---|---|
| Product owner (the learner, you) | Owns this project and the course files. Says yes before any file is saved. Reads the run log after each test round. | Control panel, PRD |
| Business owner | A team that owns the real service and the rules the agent uses. Signs off any change to a rule, format, limit, photo rule or document list. Keeps sources S1 to S5, `day2-validate/context-skill.md` and the quiz key up to date. Decides whether anything ships. Made-up team in this project. The rules it works by are below. | Handoff note: "the people who own the real service". The team and its name are **Proposed**. Merging in the old Passport Renewal Content Owner role is **Proposed**. |
| Engineering manager | A person (named outside this file) who puts the agent on hold to limit damage and close vulnerabilities, without waiting for the Business owner. Tells the Business owner lead by email. Switches the agent back on after a written yes. | Your answer. Whether this is a separate role from the Engineering lead is Open decision 21. |
| Engineering lead | Builds and runs the agent. Decides how settings are enforced, how logs are kept and which tools exist. Also owns the security review of the system and its APIs before any real data is used. This is a check on the system, not a separate role. | PRD, "What engineering decides" |
| Customer service | Takes every hand-over the agent cannot settle. Agents are grouped by language: English, Chinese, Malay, Tamil and Hindi. The agents in a language group also check any new or changed wording in that language before real use. This replaces the separate Native speaker role. | Control panel, PRD. Merging the roles is **Proposed**. |
| ICA officer | Decides every application and every photo's final result. Never the agent. | One pager, PRD |
| Applicant | Uses the guide. Confirms their own answers and presses Submit. Decides whether to replace a photo the agent has doubts about. | PRD, Permissions |

**Never a decider:** the agent. It decides nothing about an application, a photo's final result, who is eligible, or its own permissions.

### Rules the Business owner team works by

All of these are **Proposed**. Your files do not state them.

1. **One lead signs every decision.** The team has one lead role. The lead signs, and the rest of the team is consulted. A decision is not made until the lead has signed it.
2. **Every decision is written down.** Each entry says what was decided, the date, and the role that signed. Roles only, no names.
3. **A rule change needs written sign-off before it happens.** This covers formats, limits, photo rules and document lists. Nobody changes them first and asks afterwards.
4. **Small fixes are separate from rule changes.** A typo or spacing fix that changes no rule and no meaning needs the lead's yes only, not the whole team.
5. **Go-live, retire and a live incident need the lead's written yes.** Go-live also needs the readiness evidence from Open decision 12 in `day3-build/ai-prd.md`.
6. **Silence is not a yes.** If the team does not answer, the change does not go ahead. An incident is the exception: the agent stops itself first, as in its Stop conditions.
7. **Source changes are kept in step.** If sources S1 to S5 change, the team updates `day2-validate/context-skill.md` and the quiz key before the agent uses the new rule.

## Decision rights

| Harness part | Who decides | Who is consulted | Who is told |
|---|---|---|---|
| **Scope.** What the agent does and does not do. Decided: one agent, fixed rules, and the face and date-tag checks are built. | Product owner | Engineering lead, Business owner, Customer service | ICA officer |
| **Permissions.** The tier and setting for every action (read, draft, write, send; auto, confirm, block). | Product owner. A change to a format, limit, photo rule or document list needs the Business owner's written sign-off first. | Engineering lead (can it be enforced), Business owner | Customer service, ICA officer |
| **Vendor and model.** The agent is fixed rules with no language model (decided), so this is about who builds and hosts the fixed rules, including the face and date-tag checks. **Proposed.** | Business owner | Engineering lead, Product owner | Customer service, ICA officer |
| **Go-live.** Whether the agent is used with real applicants. **Proposed** for the decider. | Business owner, using the readiness evidence the Product owner sets | Product owner, Engineering lead, Customer service | ICA officer, Applicant (a plain notice) |
| **Incident.** A kill switch triggers, a bad photo passes, a flagged applicant reaches the form, or the agent promises approval. | The agent stops itself first (Stop conditions). The Engineering manager puts it on hold, alone. Then the Product owner decides the fix while it is a prototype. The Business owner decides once it is live, including any fix to a rule that was wrong. **Proposed** | Engineering lead, Customer service | Business owner lead (by email), ICA officer, Applicant (if their case was affected) |
| **Retire.** Turning the agent off for good, and what happens to its logs and drafts. **Proposed** | Business owner | Product owner, Engineering lead, Customer service | ICA officer, Applicant |

**Incident, first hour.** See the next section. Every step in it is **Proposed**.

**How to read it.** "Decides" is one role, or one role per stage where the table says so. "Consulted" is asked before the decision and can disagree. "Told" hears the result and does not vote.

**What the files already say** (not Proposed):

- Scope and permissions: the Product owner says yes before any course file is saved. The Business owner signs off any rule change.
- Wording in Tamil, Hindi, Chinese and Malay is checked before real use. The control panel gave this to a native speaker. Here it goes to the matching Customer service language group, which is **Proposed**.
- Go-live: shipping is for "the learner and the people who own the real service". The prototype is not ready.
- Incident: the kill switches in `day2-validate/build-log.md` apply, and "fix it before anything else". A photo it cannot decide goes to Customer service.

## Incident: the first hour

Where a step says **Your answer**, it comes from you. Everything else here is **Proposed**. Your files do not say who does these steps.

**What counts as a wrong answer (Your answer).** The agent has allowed an applicant to submit with errors in key fields, for example a Singpass field that is wrong or missing.

**Made-up example.** At 08:00 on Monday the agent lets a made-up applicant submit with the name from Singpass wrong ("Tan Mei Lin" instead of "Tan Mei Ling"). The submission reaches an ICA officer.

**Also treated as wrong (Proposed).** Any one of these:

- A document that is not on the needed list, or a needed document missing.
- A promise or hint that an application is, or will be, approved or rejected.
- A photo called good, fine or accepted, or a bad photo that passed the check.
- A reason given for a Singpass flag, or a flagged applicant reaching the form.
- Wording that is wrong, or in a language group's view misleading.

**What "switch off" means (Your answer).** The agent is put on hold. Its checks are routed through other means. The applicant can still fill in and submit the application. The API check validates it instead of the agent. The applicant is not sent away. Customer service still takes hand-overs.

**Who is on duty (Your answer).** No single person. Monitoring alerts the whole Engineering team by notification, so 08:00 on a Monday is covered the same as any other time.

**Who can put the agent on hold alone (Your answer).** The Engineering manager. They can act to limit the damage and close vulnerabilities without waiting for the Business owner.

**How the Business owner lead is told (Your answer).** In writing, by email. The email is the record. The Engineering manager also adds it to the decision log.

**Who the Engineering manager is (Your answer).** One person, assumed. The name is not written here, because this file uses roles only.

**Not answered yet.** How an ICA officer sees the agent's result, and how they report a wrong one. Your files say the agent never contacts an officer itself. Steps 1 and 7 use "an officer tells Customer service or the Engineering team". That is **Proposed**. It is in Open decisions.

**Who does what, in order:**

| Step | Who | What they do |
|---|---|---|
| 1. Alert | Monitoring alerts the whole Engineering team by notification. Anyone who sees it first (an ICA officer, Customer service) also tells the Engineering team. | Notes the time and the field that was wrong. No name, NRIC, passport number or photo. |
| 2. Act first | Engineering manager | Confirms quickly that a key field was wrong in a submitted application. If not sure, treats it as wrong. |
| 3. Put on hold | Engineering manager | Puts the agent on hold. The API check validates applications meanwhile. Does not wait for the Business owner. |
| 4. Tell | Engineering manager | Emails the Business owner lead straight after step 3: what happened, when, and how far it reached. Tells Customer service and the ICA officers' team by notification, so they can re-check submissions made since the problem began. |
| 5. Hold the line | Customer service, in the matching language group | Answers applicants. Says only that the guide is on hold and they can keep going. |
| 6. Find the cause and the reach | Engineering lead, with the Engineering manager | Reads the log entries. Says what went wrong, which submissions were affected, and since when. |
| 7. Review affected submissions | ICA officer | Looks again at every submission that went through with a wrong key field. The officer decides each one. The agent's wrong result is not a reason either way. |
| 8. Decide the fix | Product owner while it is a prototype. Business owner lead once it is live. | A rule that was wrong needs the Business owner team's written sign-off before it changes. |
| 9. Switch back on | Business owner lead gives the written yes once live. Product owner, while a prototype. The Engineering manager does the switch. | Written yes, with the cause and the fix. Silence is not a yes. |
| 10. Tell applicants | Business owner lead decides who and how. Customer service sends it. | Only applicants whose submission was affected. Say what was wrong. Never say the application is approved or rejected. |
| 11. Write it down | Engineering manager | One decision log entry: what happened, time found, time put on hold, who signed. Roles only. |

**Today, while it is a prototype.** There is no monitoring, no API check and no real applicants. The same steps apply to a made-up tester. The Product owner (you) takes steps 2 to 4 and 8 to 9.

**Why the Engineering manager acts alone.** Your answer: they can limit the damage and close vulnerabilities. Waiting for a sign-off while wrong submissions keep reaching officers costs more than a hold.

**Why the officer reviews, not the agent.** The officer decides every application. A wrong result must not decide it by default.

## Open decisions

These are yours. Nothing above is final.

1. **Business owner.** Is "Business owner" the right name for the team? Which team is it in a real service? The files never say.
2. **Vendor and model.** Your answer is that the agent uses fixed rules and no language model, so there is no model vendor. Does the Business owner still decide who builds and hosts the fixed rules, or the Engineering lead?
3. **Go-live.** What evidence would make the Business owner say yes? The evidence list is in decision 12 of `day3-build/ai-prd.md`, list B.
4. **Incident.** Monitoring alerts the whole Engineering team (your answer). How fast must someone respond? The files give no number. See Open decision 14.
5. **Incident, after going live.** Who tells affected applicants, and how?
6. **Retire.** How long are logs and drafts kept after the agent is retired, and who deletes them?
7. **Customer service language groups.** The control panel and PRD had a separate Native speaker role who checks wording. It is now part of Customer service, grouped by language. Is that right? Does every language group have enough agents to check wording as well as take hand-overs? Who is in each group?
8. **Business owner lead.** Which role holds the lead, and who covers when the lead is away?
9. **Sign-off speed.** How fast must the team answer a sign-off request? The files give no number.
10. **Small fixes.** Which changes count as a "small fix" under rule 4?
11. **Decision log.** Where is the written record of decisions kept, and who can read it?
12. **One owner for rules and service.** The old Passport Renewal Content Owner (rules) is now part of the Business owner (service). Could the team become a bottleneck for small rule fixes?
13. **What "on hold" means in the real system.** You said the agent is put on hold and the checks are routed through other means, with the API check validating applications. The prototype has neither. Which checks does the API check cover, and which of the agent's checks (such as the photo check) have no other route?
14. **Monitoring and notification.** You said the whole Engineering team is alerted. What triggers the alert? How fast must someone respond? What happens if nobody does?
15. **Engineering manager's power.** You said they can limit the damage and close vulnerabilities. Is putting the agent on hold the limit, or can they also change settings, close access or take a system down?
16. **Email as the record.** Who is on the Business owner lead's email list, and who covers when the lead is away? How fast must the email go out? The files give no number.
17. **Wrong answer, wider list.** You said a submission with errors in key fields. Which fields are "key"? Name, date of birth, NRIC and passport number? Does the Proposed wider list above stay, or go?
18. **While the agent is on hold.** Applicants keep going and the API check validates them. What does the applicant see, in all five languages? Do they know the guide is on hold? The language groups check the words.
19. **How an ICA officer sees the agent's result, and reports a wrong one.** Still open. The files say the agent never contacts an officer itself. Does the officer see the result and log entry on each submission? Where? To whom do they report, and by what route?
20. **Engineering manager.** You said to assume a named person. This file uses roles only, so no name is written. Who takes over when the Engineering manager is away? Is this a separate role from the Engineering lead?
21. **Engineering lead and Engineering manager.** Are these two roles or one? The Roles table keeps both until you decide.
