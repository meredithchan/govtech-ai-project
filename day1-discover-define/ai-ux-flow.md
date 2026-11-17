## AI-UX readiness

**Scenario:** B · ICA passport applications
**Moment:** When the user selects a passport renewal type
**Level reached:** 2 of 3
**What we ship:** Stay on a validator UI until the correction rate shows the AI removes more labor than it creates.

### Levels

- Level 01 · Trigger Accuracy: Pass. Starts pulling in form fields when user has signed into Singpass, User has passed passport eligibility check (whether someone is allowed to renew passport)
- Level 02 · System Transparency: Pass. Verifies form filled with passport photo generated, Fields are verified with accurate information filled. All required fields are filled with information.
- Level 03 · Invisible Integration: Not sure

### Trust gaps

- Black box: Forms are filled wrongly
- Hallucination: Passport photo editor changes features of face
- Control: Allow for direct edits in field, upload of photo from other sources (phone gallery, camera)
