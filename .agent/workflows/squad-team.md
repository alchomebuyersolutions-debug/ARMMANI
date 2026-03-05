---
description: Launch a coordinated Agent Team with the 4-lane Squad System (Design Lead, Builder, Nerd QC, Researcher)
---

# 🚀 Squad Agent Team — Full Orchestration (`/squad-team`)

Launch a **real** Agent Team using Claude Code's experimental agent teams feature.
This upgrades the Squad from subagent-based (report-back-only) to a fully coordinated
team with shared task lists, inter-agent messaging, and independent context windows.

> **Prerequisite:** Agent Teams must be enabled. See Step 0.

---

## Step 0: Enable Agent Teams (One-Time Setup)

Ensure the feature flag is active. Check `~/.claude/settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

If not present, add it and restart Claude Code.

---

## Step 1: Read the Master Ledger

1. Open `PLAN.md` and identify:
   - The **current active milestone** (📝 Current Trajectory)
   - Any **pending tasks** that can be parallelized
   - The **Squad Status** table (who is idle vs. active)

2. Determine the **work breakdown** — which tasks can be assigned to which lanes:

| Lane             | Assignable Work                                      |
|------------------|------------------------------------------------------|
| 🐎 Design Lead   | UI components, CSS, layout, animations, responsiveness |
| 🏗️ Builder       | API routes, data fetching, config, business logic      |
| 🤓 Nerd (QC)     | Tests, audits, quality gates, accessibility            |
| 📚 Researcher    | Documentation, research, PLAN.md updates               |

---

## Step 2: Create the Agent Team

Tell Claude to create the team. Use this prompt template, customizing the tasks:

```
Create an agent team called "squad" for the current milestone.

Spawn these teammates:
- "design-lead": Owns /app/components/, /app/globals.css, /app/layout.js, all visual work.
  Task: [DESCRIBE THE DESIGN TASK HERE]
- "builder": Owns /app/api/, /lib/, next.config.mjs, all backend/logic work.
  Task: [DESCRIBE THE BACKEND TASK HERE]
- "nerd-qc": Owns /__tests__/, testing scripts. Read-only on production code.
  Task: [DESCRIBE THE QC TASK HERE]
- "researcher": Read-only access. Owns PLAN.md and docs.
  Task: [DESCRIBE THE RESEARCH TASK HERE]

Rules:
1. Each teammate MUST stay in their lane — no cross-territory edits.
2. Teammates should message each other when they need something from another lane.
3. The design-lead and builder should coordinate on component interfaces.
4. The nerd-qc should audit work from design-lead and builder when they finish.
5. The researcher should update PLAN.md with progress throughout.
```

### Team Sizing Rules
- **Don't spawn all 4 if you don't need them.** Only spawn teammates for lanes with active work.
- **Minimum viable team:** 2 teammates (usually design-lead + builder, or builder + nerd-qc).
- **Research-only:** No team needed — use the researcher subagent directly.

---

## Step 3: Configure Display Mode

Choose based on your terminal:

| Mode         | When to Use                                      | Setting                           |
|--------------|--------------------------------------------------|-----------------------------------|
| `in-process` | VS Code terminal, simple setup, any terminal     | `--teammate-mode in-process`      |
| `tmux`       | macOS Terminal/iTerm2, want split panes           | `--teammate-mode tmux`            |
| `auto`       | Already in tmux session                          | Default behavior                  |

For quick work, `in-process` is fine. Use **Shift+Up/Down** to navigate between teammates.

---

## Step 4: Require Plan Approval (Optional but Recommended)

For complex or risky milestones, require teammates to plan before implementing:

```
Spawn the builder teammate with plan approval required.
Only approve plans that include error handling and don't modify the design system.
```

This prevents teammates from charging ahead with wrong approaches. The lead reviews
and approves/rejects plans before implementation begins.

---

## Step 5: Assign Tasks via Shared Task List

The lead creates and manages the shared task list. Use these patterns:

### Breaking Work Down
```
Break the current milestone into 5-6 tasks per teammate.
Each task should be self-contained and produce a clear deliverable.
```

### Self-Claiming
After finishing a task, teammates auto-claim the next unassigned, unblocked task.

### Dependencies
```
Mark the "API endpoint" task as a dependency for the "UI integration" task.
The design-lead can't start UI integration until the builder finishes the API.
```

---

## Step 6: Monitor & Steer

### Check Progress
- **In-process:** Shift+Up/Down to cycle through teammates
- **Split panes:** Click into a teammate's pane
- **Task list:** Press Ctrl+T to toggle the shared task list

### Direct Communication
Message any teammate directly:
- Give additional instructions
- Ask for status updates
- Redirect their approach

### Enable Delegate Mode
If the lead starts implementing instead of coordinating:
- Press **Shift+Tab** to cycle into delegate mode
- The lead is restricted to coordination-only tools

---

## Step 7: Quality Gate (via Hooks)

Use hooks to enforce quality before teammates can finish:

### TeammateIdle Hook (prevents sloppy exits)
The hook at `.agent/hooks/teammate-idle-check.sh` runs when any teammate tries to go idle.
Exit code 2 sends feedback and keeps them working.

### TaskCompleted Hook (prevents incomplete tasks)
The hook at `.agent/hooks/task-completed-check.sh` runs when a task is marked complete.
Exit code 2 blocks completion and provides feedback.

---

## Step 8: Synthesis & Cleanup

When all tasks are complete:

1. **Ask the lead to synthesize:** "Summarize what each teammate accomplished and any open items."
2. **Shut down teammates:**
   ```
   Ask the design-lead teammate to shut down
   Ask the builder teammate to shut down
   Ask the nerd-qc teammate to shut down
   Ask the researcher teammate to shut down
   ```
3. **Clean up the team:**
   ```
   Clean up the team
   ```
4. **Update PLAN.md:** Mark the milestone as ✅ Complete.

---

## ⚠️ Known Limitations

- No session resumption with in-process teammates
- One team per session — clean up before starting a new one
- No nested teams — teammates can't spawn their own teams
- Task status can lag — nudge teammates if tasks appear stuck
- All teammates inherit the lead's permission mode at spawn
- Split panes not supported in VS Code integrated terminal
