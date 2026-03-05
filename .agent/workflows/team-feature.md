---
description: Spawn an Agent Team to build a new feature with cross-layer coordination (frontend + backend + tests)
---

# 🏗️ Team Feature — Cross-Layer Feature Build (`/team-feature`)

Launch an Agent Team to build a **complete feature** with coordinated
frontend, backend, and test work happening in parallel. Each teammate
owns their layer and communicates through the shared task list and messaging.

---

## When to Use

- New feature that spans frontend + backend + tests
- Feature requires changes across multiple layers simultaneously
- You want parallel progress instead of sequential build → test → polish

---

## Step 1: Define the Feature

```markdown
## Feature Spec
**Name:** [Feature name]
**User Story:** As a [user], I want to [action] so that [benefit]
**Acceptance Criteria:**
1. [Criterion 1]
2. [Criterion 2]
3. [Criterion 3]
**Files Affected:**
- Frontend: [list expected component/page files]
- Backend: [list expected API/lib files]
- Tests: [list expected test files]
```

---

## Step 2: Launch the Feature Team

```
Create an agent team called "feature-[name]" to build [feature description].

Spawn these teammates:
- "design-lead": Build the UI components and pages for this feature.
  Own: /app/components/, /app/globals.css, /app/*/page.js
  Requirements: [specific UI requirements]
  Design tokens: Use existing design system (--bg-deep, --surface-glass, --primary, etc.)
  Must implement: Loading, Empty, Error, Success states.

- "builder": Build the API routes and data layer for this feature.
  Own: /app/api/, /lib/
  Requirements: [specific API requirements]
  Must implement: Error handling, input validation, caching strategy.

- "nerd-qc": Write tests and validate the feature as it's built.
  Own: /__tests__/, *.test.js, *.spec.js
  Requirements: Write unit tests (Vitest), component tests (RTL), E2E tests (Playwright).
  Wait for: Design-lead and builder to implement before writing integration tests.

Rules:
1. STRICT LANE ENFORCEMENT — no cross-territory edits.
2. Builder: implement the API FIRST, then message the design-lead with the response shape.
3. Design-lead: start with component scaffolding, integrate real API after builder messages you.
4. Nerd-QC: write unit tests for utils immediately, wait for integration points before E2E.
5. All teammates: update the shared task list as you progress.
6. Require plan approval for the builder (API design is critical to get right).
```

---

## Step 3: Coordinate Interfaces

The critical coordination point is the **API contract**. The builder defines it,
and the design-lead consumes it.

### Builder → Design Lead Handoff
```
Builder: message the design-lead with the API response shape:
{
  "endpoint": "/api/[feature]",
  "method": "GET",
  "response": { ... shape ... },
  "error": { "error": "string", "status": "number" }
}
```

### Design Lead → Nerd QC Handoff
```
Design-lead: message the nerd-qc when components are ready for testing.
Include the component names, props interface, and expected behavior.
```

---

## Step 4: Progressive Integration

1. **Phase 1 (Parallel):** Builder creates API, Design-lead scaffolds UI, QC writes unit tests
2. **Phase 2 (Integration):** Design-lead integrates real API, QC writes component tests
3. **Phase 3 (Validation):** QC runs full audit, team fixes any issues

---

## Step 5: Quality Gate

Before marking the feature complete:

```
Nerd-QC: run the full audit protocol. All scores must be ≥ 9/10.
If any score is below threshold, message the responsible teammate with specific fixes.
```

---

## Step 6: Ship & Cleanup

1. Ask the lead to synthesize: "What was built, any tech debt created, and next steps."
2. Update PLAN.md: Mark milestone as ✅ Complete, log audit scores.
3. Git commit with conventional commit message.
4. Clean up the team.
