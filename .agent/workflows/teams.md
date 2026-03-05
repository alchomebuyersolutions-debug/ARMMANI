---
description: Quick reference for all Agent Team slash commands and usage patterns
---

# 🤖 Agent Teams — Quick Reference (`/teams`)

Fast reference for all Agent Team workflows. Choose the right one for your task.

---

## Which Workflow?

| I want to...                                | Use               |
|---------------------------------------------|--------------------|
| Build a new feature across frontend+backend | `/team-feature`    |
| Debug a complex bug with multiple theories  | `/team-debug`      |
| Review code from security+perf+UX angles    | `/team-review`     |
| Launch the full 4-lane Squad for a milestone | `/squad-team`      |
| Run a quick quality audit                   | `/audit`           |
| Ship and commit a completed feature         | `/ship`            |

---

## Quick Commands

### Start a team
```
Create an agent team called "squad" with 3 teammates for [task].
```

### Message a teammate
Use **Shift+Up/Down** to select, then type.

### Toggle task list
Press **Ctrl+T**

### Delegate mode (lead coordinates only)
Press **Shift+Tab**

### Shut down a teammate
```
Ask the [name] teammate to shut down
```

### Clean up team
```
Clean up the team
```

---

## Pre-Flight Checklist

Before launching a team:

- [ ] `PLAN.md` is current with active milestone
- [ ] Agent Teams enabled (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`)
- [ ] Tasks are **independent enough** for parallel work
- [ ] Each teammate has **clear territory** (no file overlaps)
- [ ] You know which **display mode** you want (in-process or tmux)

---

## Team Sizing Guide

| Task Complexity | Recommended Team Size |
|-----------------|----------------------|
| Simple bug fix  | Don't use teams      |
| Single-layer feature | 1-2 teammates   |
| Multi-layer feature  | 2-3 teammates   |
| Full milestone  | 3-4 teammates        |
| Research sprint | 2-3 teammates        |
