---
description: Spawn an Agent Team for parallel multi-axis code review (security, performance, UX)
---

# 🔍 Team Review — Parallel Code Review (`/team-review`)

Launch an Agent Team where multiple reviewers examine the codebase
from **different angles simultaneously**. Each reviewer applies a
distinct lens so nothing slips through.

---

## When to Use

- Major feature complete, needs thorough review before ship
- Pre-deployment quality gate for production releases
- Code review of external contributions or AI-generated code
- Post-refactor validation across multiple concerns

---

## Step 1: Define Review Scope

Identify what needs review:

```markdown
## Review Scope
**Files/Dirs:** [List specific files or directories]
**Context:** [What changed and why]
**Risk areas:** [Where bugs are most likely]
**PR/Branch:** [If applicable]
```

---

## Step 2: Launch the Review Team

```
Create an agent team called "review-squad" to review the latest changes.

Spawn three reviewers:
- "security-reviewer": Focus on security implications — exposed secrets,
  XSS vulnerabilities, input validation, CORS config, auth issues.
  Check: all API routes, user-facing inputs, environment variable usage.

- "performance-reviewer": Focus on performance impact — unnecessary re-renders,
  missing memoization, API call efficiency, bundle size, caching strategy.
  Check: React components for re-render issues, API routes for N+1 patterns.

- "ux-reviewer": Focus on user experience — system states (loading/empty/error/success),
  accessibility (ARIA, keyboard nav), responsive design, animation smoothness.
  Check: all components and pages for missing states, accessibility attributes.

Rules:
1. Each reviewer should ONLY report issues in their domain.
2. Use specific file:line references for every finding.
3. Categorize findings as 🔴 Critical, 🟡 Warning, or 🟢 Suggestion.
4. Always highlight what's done WELL — positive reinforcement matters.
5. Share any cross-cutting concerns with other reviewers.
```

---

## Step 3: Synthesize Findings

After all reviewers finish, ask the lead:

```
Synthesize all review findings into a unified report.
Prioritize by severity (🔴 → 🟡 → 🟢).
Identify any conflicting recommendations between reviewers.
```

### Expected Output Format

```
🔍 TEAM REVIEW REPORT
═══════════════════════════════════
  Security Score:    [X]/10
  Performance Score: [X]/10
  UX Score:          [X]/10
═══════════════════════════════════

🔴 Critical Issues (Block Ship)
1. [Issue with file:line reference and fix suggestion]

🟡 Warnings (Fix Before Next Release)
1. [Issue with file:line reference]

🟢 Suggestions (Nice to Have)
1. [Suggestion]

✅ What's Good
- [Highlight strong patterns and good practices]

Verdict: ✅ Ship It | 🟡 Fix First | 🔴 Stop
```

---

## Step 4: Fix → Re-Review Loop

If any 🔴 Critical issues found:

1. Fix the critical issues (assign to the appropriate squad lane)
2. **Re-run only the affected reviewer** (don't re-review everything):
   ```
   Ask the security-reviewer to re-check the auth module after the fix.
   ```
3. Repeat until all scores ≥ 9/10

---

## Step 5: Update PLAN.md & Cleanup

1. Log the review scores in PLAN.md Audit Log
2. Clean up the review team:
   ```
   Shut down all reviewers and clean up the team.
   ```
