---
name: agent-team-orchestration
description: Use when coordinating multiple Claude Code instances as a team with shared tasks, messaging, and centralized management
---

# Agent Team Orchestration

## Overview

Agent Teams coordinate multiple Claude Code instances working together. One session acts as
the **team lead**, coordinating work, assigning tasks, and synthesizing results. Teammates work
independently, each in its own context window, and communicate directly with each other.

**Key difference from subagents:** Teammates can message each other directly, share a task list,
and self-coordinate. Subagents only report back to the caller.

## When to Use Agent Teams

```
✅ USE AGENT TEAMS:
- Research and review (multiple angles simultaneously)
- New modules or features (each teammate owns a piece)
- Debugging with competing hypotheses (test theories in parallel)
- Cross-layer coordination (frontend + backend + tests)
- Tasks where teammates need to communicate and challenge each other

❌ USE SUBAGENTS INSTEAD:
- Sequential tasks
- Same-file edits
- Work with many dependencies
- Focused tasks where only the result matters
- Lower token budget
```

## Architecture

| Component     | Role                                                           |
|---------------|----------------------------------------------------------------|
| **Team Lead** | Main session — creates team, spawns teammates, coordinates     |
| **Teammates** | Separate Claude Code instances — each works on assigned tasks  |
| **Task List** | Shared list of work items that teammates claim and complete    |
| **Mailbox**   | Messaging system for direct inter-agent communication          |

### Storage
- Team config: `~/.claude/teams/{team-name}/config.json`
- Task list: `~/.claude/tasks/{team-name}/`

## The Squad System Mapping

This project uses the **4-Lane Squad System**:

| Squad Role       | Agent Team Teammate | Territory                               |
|------------------|--------------------|-----------------------------------------|
| 🐎 Design Lead   | `design-lead`      | /app/components/, globals.css, pages    |
| 🏗️ Builder       | `builder`           | /app/api/, /lib/, configs               |
| 🤓 Nerd (QC)     | `nerd-qc`           | /__tests__/, *.test.js, *.spec.js       |
| 📚 Researcher    | `researcher`        | PLAN.md, docs, *.md (read-only)         |

**CRITICAL RULE:** Each teammate MUST stay in their lane. No cross-territory edits.
If a cross-lane change is needed, message the responsible teammate.

## Spawning a Team

### Basic Team
```
Create an agent team called "squad" with these teammates:
- "design-lead": [UI task description]
- "builder": [backend task description]
```

### Full Squad
```
Create an agent team called "squad" with these teammates:
- "design-lead": [UI task]
- "builder": [backend task]
- "nerd-qc": [testing task]
- "researcher": [research/docs task]
```

### With Plan Approval
```
Spawn the builder teammate with plan approval required.
Only approve plans that include error handling and test coverage.
```

### Model Selection
```
Use Sonnet for each teammate.
```

## Task Management

### Breaking Work Down
- **5-6 tasks per teammate** keeps everyone productive
- Each task should be **self-contained** with a clear deliverable
- Use dependencies to order tasks that depend on each other

### Task States
```
Pending → In Progress → Completed
```

### Dependencies
```
Mark "API endpoint" as a dependency for "UI integration".
Builder must complete the API before design-lead can integrate it.
```

### Self-Claiming
After finishing a task, teammates auto-claim the next unassigned, unblocked task.

## Communication Patterns

### Direct Message
Send to one specific teammate:
```
Message the builder: "What shape does the /api/posts response return?"
```

### Broadcast
Send to ALL teammates (use sparingly — costs scale with team size):
```
Broadcast: "Switching from REST to GraphQL. Update your implementations."
```

### Handoff Pattern
When work crosses lanes:
1. Builder finishes API → messages design-lead with response shape
2. Design-lead finishes components → messages nerd-qc with component list
3. Nerd-qc writes tests → messages team about test results

## Quality Gates

### Hooks (Automated)
- **TeammateIdle**: Runs when teammate tries to go idle
  - Checks lint errors
  - Checks PLAN.md currency (for researcher)
  - Warns about uncommitted changes
- **TaskCompleted**: Runs when task is marked complete
  - Runs tests for test-related tasks
  - Checks build for UI tasks
  - Scans for exposed secrets in API tasks

### Manual Quality Check
```
Nerd-QC: run the 3-axis audit (Visual, Functional, Trust).
All scores must be ≥ 9/10.
```

## Display Modes

| Mode         | Navigation                        | Best For                    |
|--------------|-----------------------------------|-----------------------------|
| `in-process` | Shift+Up/Down to switch           | VS Code, simple terminals   |
| `tmux`       | Click into panes                  | macOS Terminal, iTerm2       |
| `auto`       | Auto-detects based on environment | Already in tmux              |

### Delegate Mode
Press **Shift+Tab** to put the lead into delegate mode.
The lead can ONLY coordinate (spawn, message, shutdown) — no code changes.
Good for complex projects where you want the lead focused on orchestration.

## Lifecycle

### Start
1. Enable feature flag (done via settings.json)
2. Tell Claude to create a team
3. Claude creates team, spawns teammates, coordinates work

### During
- Monitor via Shift+Up/Down or split panes
- Message teammates directly for additional instructions
- Task list auto-updates as work progresses

### End
1. Shut down all teammates: `Ask the [name] teammate to shut down`
2. Clean up: `Clean up the team`
3. Update PLAN.md with results

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Lead implements instead of delegating | Say "Wait for teammates" or use delegate mode |
| Teammates edit same files | Break work so each owns different files |
| Team runs too long unattended | Check in every 5-10 minutes |
| Spawning all 4 for a small task | Only spawn teammates for lanes with active work |
| Not giving enough context | Include file paths, response shapes, acceptance criteria |
| Forgetting to clean up | Always shut down teammates THEN clean up the team |

## Token Cost Warning

Agent teams use **significantly more tokens** than a single session.
Each teammate has its own context window.

- **Research/review/features**: Extra tokens usually worthwhile
- **Routine tasks**: Single session is more cost-effective
- **Tip**: Fewer teammates = lower cost. Only spawn what you need.

## Integration with Existing Workflows

| Workflow        | Purpose                                     | Slash Command    |
|-----------------|---------------------------------------------|------------------|
| Squad Team      | Launch coordinated 4-lane team              | `/squad-team`    |
| Team Debug      | Parallel debugging with competing hypotheses | `/team-debug`    |
| Team Review     | Multi-axis parallel code review             | `/team-review`   |
| Team Feature    | Cross-layer feature build                   | `/team-feature`  |
| Audit           | 3-axis quality gate                         | `/audit`         |
| Ship            | Final checks + commit + deploy              | `/ship`          |
