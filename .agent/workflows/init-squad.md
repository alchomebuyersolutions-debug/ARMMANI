---
description: Initialize a new Squad Project with PLAN.md and full framework
---

# 🛠️ Squad Project Initialisation

When the user asks to **"Initialise a Squad Project"**, follow this protocol exactly.

---

## Step 1: Create `PLAN.md`
Create the Master Ledger at the project root with these sections:

```markdown
# 📋 PLAN.md — Master Ledger

## 🗺️ Master Roadmap
| #  | Milestone               | Status       |
|----|-------------------------|--------------|
| M1 | [First milestone]       | 🔲 Pending   |
| M2 | [Second milestone]      | 🔲 Pending   |
| M3 | [Third milestone]       | 🔲 Pending   |

## 📝 Current Trajectory
**Active Step:** [Description of what is being worked on right now]

## 🚥 Squad Status
| Agent            | Task                | Status       |
|------------------|---------------------|--------------|
| 🐎 Design Lead   | —                   | 💤 Idle      |
| 🏗️ Builder       | —                   | 💤 Idle      |
| 🤓 Nerd (QC)     | —                   | 💤 Idle      |
| 📚 Researcher    | —                   | 💤 Idle      |

## 🏛️ Architecture
[High-level system design and API surface goes here]

## 📊 Audit Log
| Date | Visual | Functional | Trust | Notes |
|------|--------|------------|-------|-------|
| —    | —      | —          | —     | —     |
```

## Step 2: Verify Workflow Files
Ensure all squad workflows exist in `.agent/workflows/`:
- `design-lead.md`
- `builder.md`
- `nerd.md`
- `researcher.md`
- `audit.md`

## Step 3: Initialize Tech Stack
// turbo
1. Scaffold the project using the default tech stack (Next.js App Router).
2. Install dependencies.
3. Verify the dev server starts cleanly.

## Step 4: Confirm to User
Report back with:
- ✅ PLAN.md created
- ✅ Squad workflows installed
- ✅ Project scaffolded
- ✅ Ready for first milestone
