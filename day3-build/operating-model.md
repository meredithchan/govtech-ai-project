# Operating model · Passport renewal guide agent

Scenario B · ICA passport applications and renewals. Everything here is made up. No real rules, people or records.

This file says who decides what about the agent. It uses roles, not names. It pulls from `SCENARIO-PICK.md`, `one-pager.md`, `day3-build/agent-control-panel.md` and `day3-build/ai-prd.md`.

Where a role already decides something in those files, this table repeats it. Where they say nothing, the entry is marked **Proposed**. Proposed entries are suggestions for you to accept, change or reject. They are listed again under Open decisions.

## Roles

| Role | What this role does | Where it comes from |
|---|---|---|
| Product owner (the learner, you) | Owns this project and the course files. Says yes before any file is saved. Reads the run log after each test round. | Control panel, PRD |
| Business owner | A team that owns the real service and the rules the agent uses. Signs off any change to a rule, format, limit, photo rule or document list. Keeps sources S1 to S5, `day2-validate/context-skill.md` and the quiz key up to date. Decides whether anything ships. Made-up team in this project. The rules it works by are below. | Handoff note: "the people who own the real service". The team and its name are **Proposed**. Merging in the old Passport Renewal Content Owner role is **Proposed**. |
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
| **Scope.** What the agent does and does not do. One agent or two. Whether the face and date-tag checks are built. | Product owner | Engineering lead, Business owner, Customer service | ICA officer |
| **Permissions.** The tier and setting for every action (read, draft, write, send; auto, confirm, block). | Product owner. A change to a format, limit, photo rule or document list needs the Business owner's written sign-off first. | Engineering lead (can it be enforced), Business owner | Customer service, ICA officer |
| **Vendor and model.** Which model, if any, runs the agent or the face and date-tag checks, and who supplies it. **Proposed.** | Business owner | Engineering lead, Product owner | Customer service, ICA officer |
| **Go-live.** Whether the agent is used with real applicants. **Proposed** for the decider. | Business owner, using the readiness evidence the Product owner sets | Product owner, Engineering lead, Customer service | ICA officer, Applicant (a plain notice) |
| **Incident.** A kill switch triggers, a bad photo passes, a flagged applicant reaches the form, or the agent promises approval. | The agent stops itself first (Stop conditions). Then the Product owner decides the fix while it is a prototype. The Business owner decides once it is live, including any fix to a rule that was wrong. **Proposed** | Engineering lead, Customer service | ICA officer, Applicant (if their case was affected) |
| **Retire.** Turning the agent off for good, and what happens to its logs and drafts. **Proposed** | Business owner | Product owner, Engineering lead, Customer service | ICA officer, Applicant |

**How to read it.** "Decides" is one role, or one role per stage where the table says so. "Consulted" is asked before the decision and can disagree. "Told" hears the result and does not vote.

**What the files already say** (not Proposed):

- Scope and permissions: the Product owner says yes before any course file is saved. The Business owner signs off any rule change.
- Wording in Tamil, Hindi, Chinese and Malay is checked before real use. The control panel gave this to a native speaker. Here it goes to the matching Customer service language group, which is **Proposed**.
- Go-live: shipping is for "the learner and the people who own the real service". The prototype is not ready.
- Incident: the kill switches in `day2-validate/build-log.md` apply, and "fix it before anything else". A photo it cannot decide goes to Customer service.

## Open decisions

These are yours. Nothing above is final.

1. **Business owner.** Is "Business owner" the right name for the team? Which team is it in a real service? The files never say.
2. **Vendor and model.** Does the Business owner decide, or the Engineering lead? Today the prototype uses no model, so there is no vendor yet.
3. **Go-live.** What evidence would make the Business owner say yes? This is open decision 12 in `day3-build/ai-prd.md`.
4. **Incident.** Who is on call, and how fast must someone respond? The files give no number.
5. **Incident, after going live.** Who tells affected applicants, and how?
6. **Retire.** How long are logs and drafts kept after the agent is retired, and who deletes them?
7. **Customer service language groups.** The control panel and PRD had a separate Native speaker role who checks wording. It is now part of Customer service, grouped by language. Is that right? Does every language group have enough agents to check wording as well as take hand-overs? Who is in each group?
8. **Business owner lead.** Which role holds the lead, and who covers when the lead is away?
9. **Sign-off speed.** How fast must the team answer a sign-off request? The files give no number.
10. **Small fixes.** Which changes count as a "small fix" under rule 4?
11. **Decision log.** Where is the written record of decisions kept, and who can read it?
12. **One owner for rules and service.** The old Passport Renewal Content Owner (rules) is now part of the Business owner (service). Could the team become a bottleneck for small rule fixes?
