---
description: Spawn an Agent Team to debug with competing hypotheses in parallel
---

# 🐛 Team Debug — Competing Hypotheses (`/team-debug`)

Launch an Agent Team where multiple teammates investigate different hypotheses
about a bug **in parallel**, then debate and converge on the root cause.

This is dramatically faster than sequential debugging because each hypothesis
gets a dedicated investigator, and they actively challenge each other's theories.

---

## When to Use

- Root cause is **unclear** — multiple plausible explanations exist
- The bug spans **multiple layers** (frontend, backend, data flow)
- Sequential debugging has already **failed or stalled**
- You want to **avoid anchoring bias** (exploring only the first theory that seems right)

## When NOT to Use

- Obvious bugs with clear error messages → use the `debugger` subagent
- Simple typos or missing imports → fix directly
- Only one plausible hypothesis → single agent is sufficient

---

## Step 1: Define the Bug

Document the symptoms clearly:

```markdown
## Bug Report
**Symptoms:** [What the user sees]
**Error messages:** [Exact errors if any]
**Reproduction steps:** [How to trigger]
**Environment:** [Browser, Node version, OS]
**What's been tried:** [Previous debugging attempts]
```

---

## Step 2: Generate Hypotheses

Before spawning the team, brainstorm 3-5 hypotheses. Examples:

| # | Hypothesis                        | Layer     |
|---|-----------------------------------|-----------|
| 1 | API returns stale data            | Backend   |
| 2 | State mutation in React component | Frontend  |
| 3 | CSS animation blocking interaction | Styling   |
| 4 | Race condition on page load       | Data flow |
| 5 | Browser cache serving old version | Infra     |

---

## Step 3: Launch the Debug Team

```
Create an agent team called "debug-squad" to investigate a bug.

The bug: [DESCRIBE SYMPTOMS]

Spawn these investigators:
- "hypothesis-1": Investigate whether [theory 1]. Check [specific files/areas].
- "hypothesis-2": Investigate whether [theory 2]. Check [specific files/areas].
- "hypothesis-3": Investigate whether [theory 3]. Check [specific files/areas].

Rules:
1. Each investigator MUST actively try to DISPROVE their own hypothesis.
2. Share evidence with other teammates when you find something relevant.
3. If you eliminate your hypothesis, help investigate the remaining ones.
4. When you have strong evidence, message the other investigators to challenge them.
5. Do NOT implement fixes yet — just identify the root cause with evidence.
```

---

## Step 4: Facilitate the Debate

After initial investigation (5-10 minutes):

```
All investigators: share your findings so far.
What evidence supports your hypothesis?
What evidence contradicts it?
Challenge each other's conclusions.
```

---

## Step 5: Converge and Fix

Once the team agrees on the root cause:

1. **Document the diagnosis** in the team's shared context
2. **Spawn a fix teammate** (or have the most relevant investigator implement it):
   ```
   Assign the fix to hypothesis-2 since their investigation identified the root cause.
   The fix should be minimal and targeted. Don't refactor unrelated code.
   ```
3. **Have another teammate verify** the fix works

---

## Step 6: Post-Mortem

Ask the researcher (or lead) to document:

```markdown
## Post-Mortem: [Bug Title]
**Root Cause:** [What was actually wrong]
**Red Herrings:** [Hypotheses that were eliminated and why]
**Fix Applied:** [What changed]
**Prevention:** [How to prevent this class of bug]
```

Update PLAN.md with the post-mortem findings.

---

## Step 7: Cleanup

```
Shut down all debug teammates and clean up the team.
```
