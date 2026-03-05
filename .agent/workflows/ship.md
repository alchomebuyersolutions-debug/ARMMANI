---
description: Ship the current feature — final checks, commit, and deploy
---

# 🚀 Ship It (`/ship`)

Final quality gate before committing and deploying a feature.

---

## Step 1: Pre-Flight Checks
// turbo
1. Run `npm run build` to verify zero errors.
2. Check for any TypeScript or linting errors.

## Step 2: Run Full Audit
1. Execute the `/audit` workflow to verify Visual, Functional, and Trust scores.
2. All scores must be ≥ 9/10. If not, enter the healing loop.

## Step 3: Git Commit
1. Stage all changes: `git add .`
2. Create a meaningful commit message following conventional commits:
   - `feat: [description]` for new features
   - `fix: [description]` for bug fixes
   - `refactor: [description]` for refactoring
   - `style: [description]` for visual changes
3. Commit the code.

## Step 4: Update PLAN.md
1. Mark the completed milestone as ✅ Done.
2. Update the Current Trajectory to the next task.
3. Log the audit scores in the Audit Log.

## Step 5: Report
```
🚀 SHIPPED
═══════════════════════════
  Feature: [name]
  Commit:  [hash]
  Audit:   V:[X]/10 F:[X]/10 T:[X]/10
═══════════════════════════
  Next Up: [next milestone]
```
