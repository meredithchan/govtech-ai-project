# Operating model · Passport renewal guide agent

Scenario B · ICA passport applications and renewals. Everything here is made up. No real rules, people or records.

This file says who decides what about the agent. It uses roles, not names. It pulls from `SCENARIO-PICK.md`, `one-pager.md`, `day3-build/agent-control-panel.md` and `day3-build/ai-prd.md`.

Where a role already decides something in those files, this table repeats it. Where they say nothing, the entry is marked **Proposed**. Proposed entries are suggestions for you to accept, change or reject. They are listed again under Open decisions.

## Roles

| Role | What this role does | Where it comes from |
|---|---|---|
| Product owner (the learner, you) | Owns this project and the course files. Says yes before any file is saved. Reads the run log after each test round. | Control panel, PRD |
| Business owner | The people who own the real service. Decide whether anything ships. Made-up role in this project. | Handoff note: "the people who own the real service". Role name is **Proposed**. |
| Passport Renewal Content Owner | Signs off any change to a rule, format, limit, photo rule or document list. Made-up role. | Control panel, PRD |
| Engineering lead | Builds and runs the agent. Decides how settings are enforced, how logs are kept and which tools exist. Also owns the security review of the system and its APIs before any real data is used. This is a check on the system, not a separate role. | PRD, "What engineering decides" |
| Customer service | Takes every hand-over the agent cannot settle. Agents are grouped by language: English, Chinese, Malay, Tamil and Hindi. The agents in a language group also check any new or changed wording in that language before real use. This replaces the separate Native speaker role. | Control panel, PRD. Merging the roles is **Proposed**. |
| ICA officer | Decides every application and every photo's final result. Never the agent. | One pager, PRD |
| Applicant | Uses the guide. Confirms their own answers and presses Submit. Decides whether to replace a photo the agent has doubts about. | PRD, Permissions |

**Never a decider:** the agent. It decides nothing about an application, a photo's final result, who is eligible, or its own permissions.

## Decision rights

| Harness part | Who decides | Who is consulted | Who is told |
|---|---|---|---|
| **Scope.** What the agent does and does not do. One agent or two. Whether the face and date-tag checks are built. | Product owner | Engineering lead, Passport Renewal Content Owner, Customer service | ICA officer |
| **Permissions.** The tier and setting for every action (read, draft, write, send; auto, confirm, block). | Product owner. A change to a format, limit, photo rule or document list needs the Passport Renewal Content Owner's sign-off first. | Engineering lead (can it be enforced), Passport Renewal Content Owner | Customer service, ICA officer |
| **Vendor and model.** Which model, if any, runs the agent or the face and date-tag checks, and who supplies it. **Proposed.** | Business owner | Engineering lead, Product owner | Customer service, ICA officer |
| **Go-live.** Whether the agent is used with real applicants. **Proposed** for the decider. | Business owner, using the readiness evidence the Product owner sets | Product owner, Engineering lead, Passport Renewal Content Owner, Customer service | ICA officer, Applicant (a plain notice) |
| **Incident.** A kill switch triggers, a bad photo passes, a flagged applicant reaches the form, or the agent promises approval. | The agent stops itself first (Stop conditions). Then the Product owner decides the fix while it is a prototype. The Business owner decides once it is live. **Proposed** | Engineering lead, Passport Renewal Content Owner (if a rule was wrong), Customer service | ICA officer, Applicant (if their case was affected) |
| **Retire.** Turning the agent off for good, and what happens to its logs and drafts. **Proposed** | Business owner | Product owner, Engineering lead, Passport Renewal Content Owner, Customer service | ICA officer, Applicant |

**How to read it.** "Decides" is one role, or one role per stage where the table says so. "Consulted" is asked before the decision and can disagree. "Told" hears the result and does not vote.

**What the files already say** (not Proposed):

- Scope and permissions: the Product owner says yes before any course file is saved. The Passport Renewal Content Owner signs off any rule change.
- Wording in Tamil, Hindi, Chinese and Malay is checked before real use. The control panel gave this to a native speaker. Here it goes to the matching Customer service language group, which is **Proposed**.
- Go-live: shipping is for "the learner and the people who own the real service". The prototype is not ready.
- Incident: the kill switches in `day2-validate/build-log.md` apply, and "fix it before anything else". A photo it cannot decide goes to Customer service.

## Open decisions

These are yours. Nothing above is final.

1. **Business owner.** Is this the right role name? Who is it, in a real service? The files never say.
2. **Vendor and model.** Does the Business owner decide, or the Engineering lead? Today the prototype uses no model, so there is no vendor yet.
3. **Go-live.** What evidence would make the Business owner say yes? This is open decision 12 in `day3-build/ai-prd.md`.
4. **Incident.** Who is on call, and how fast must someone respond? The files give no number.
5. **Incident, after going live.** Who tells affected applicants, and how?
6. **Retire.** How long are logs and drafts kept after the agent is retired, and who deletes them?
7. **Customer service language groups.** The control panel and PRD had a separate Native speaker role who checks wording. It is now part of Customer service, grouped by language. Is that right? Does every language group have enough agents to check wording as well as take hand-overs? Who is in each group?
