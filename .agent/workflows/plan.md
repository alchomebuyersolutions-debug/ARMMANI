---
description: Enter Planning Mode — create an implementation plan before writing code
---

# 📋 Planning Mode (`/plan`)

Use this workflow when tackling a complex, risky, or architectural task. The agent creates a detailed plan for your review BEFORE writing any code.

---

## Step 1: Understand the Request
1. Read the user's request carefully.
2. Read the current `PLAN.md` to understand project context.
3. Identify all dependencies, risks, and unknowns.

## Step 2: Generate Implementation Plan Artifact
Create an **Implementation Plan** artifact with:

```markdown
# 🗺️ Implementation Plan: [Feature Name]

## Objective
[What we're building and why]

## Approach
[High-level strategy]

## Steps
| # | Task | Files Affected | Complexity | Risk |
|---|------|---------------|------------|------|
| 1 | ...  | ...           | Low/Med/High | ... |

## Dependencies
- [List any external APIs, libraries, or prerequisites]

## Risks & Mitigations
- [Known risks and how to handle them]

## Definition of Done
- [ ] [Specific success criteria]
```

## Step 3: Wait for Approval
**DO NOT** proceed to implementation until the user reviews and approves the plan.

## Step 4: Execute
Once approved, implement the plan step by step, updating `PLAN.md` as you go.
