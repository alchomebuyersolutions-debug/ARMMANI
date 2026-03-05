---
description: Fast Mode — skip planning and execute quickly for simple tasks
---

# ⚡ Fast Mode (`/fast`)

Use for simple, low-risk tasks where you need speed over process. Skips planning and goes straight to execution.

---

## When to Use
- Simple bug fixes
- Minor copy changes
- Adding a single component
- Quick styling tweaks
- Tasks that take < 5 minutes

## When NOT to Use
- Architectural changes → use `/plan`
- Multi-file refactors → use `/plan`
- Anything touching auth, payments, or data → use `/plan`

## Protocol
// turbo-all
1. Read the user's request.
2. Implement it immediately.
3. Verify in the browser (take a screenshot).
4. Report what was done in 1-2 sentences.

**No PLAN.md update needed for fast mode tasks.**
