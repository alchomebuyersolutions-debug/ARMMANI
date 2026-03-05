# CLAUDE.md — Project Instructions

## Project: Antigravity Command Center
A premium, dark-mode web application built with Next.js App Router.

---

## 🏗️ Tech Stack
- **Framework:** Next.js App Router (latest stable)
- **Styling:** Tailwind CSS + custom design tokens
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Typography:** Inter / Outfit (Google Fonts)
- **Package Manager:** Bun

## 🎨 Design System
```
--bg-deep:        #0A0B0F
--surface-glass:  rgba(255, 255, 255, 0.03)
--primary:        #FF6D5A (Coral)
--secondary:      #6366F1 (Indigo Glow)
--text-primary:   #F1F5F9
--text-muted:     #475569
```

## 📂 Project Structure
```
/app
  /api/          → API routes (Builder's territory)
  /components/   → React components (Design Lead's territory)
  /mcp-store/    → MCP Store page
  globals.css    → Global styles + design tokens
  layout.js      → App shell
  page.js        → Main Reddit Explorer page
/lib/            → Shared utilities (Builder's territory)
/__tests__/      → Tests (Nerd QC's territory)
PLAN.md          → Master Ledger (single source of truth)
```

## 🚥 Squad System — The Four Lanes
| Lane              | Owns                                    | Forbidden From           |
|-------------------|-----------------------------------------|--------------------------|
| 🐎 Design Lead    | /components, /styles, globals.css, pages | /api, /lib, /__tests__   |
| 🏗️ Builder        | /api, /lib, configs, serverless           | CSS, styling, components |
| 🤓 Nerd (QC)      | /__tests__, *.test.js, *.spec.js          | Building features or UI  |
| 📚 Researcher     | PLAN.md, docs, *.md                       | Production code (read-only) |

**CRITICAL:** Never cross into another agent's territory without explicit handoff.

## 🤖 Agent Teams (Experimental)
This project supports Claude Code Agent Teams for parallel work coordination.
- Teams are enabled via `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
- Use `/squad-team` workflow to launch a coordinated team
- Use `/team-debug` for parallel debugging with competing hypotheses
- Use `/team-review` for parallel multi-axis code review
- Use `/team-feature` for cross-layer feature builds
- Quality gate hooks enforce lint, tests, and PLAN.md updates

## 📏 Quality Standards
- All audit scores must reach **≥ 9/10** (Visual, Functional, Trust)
- Every component must handle Loading, Empty, Error, Success states
- Glassmorphism on cards, modals, and sidebars
- Micro-animations via Framer Motion
- Responsive across mobile, tablet, and desktop

## 🔧 Development Commands
```bash
bun run dev        # Start dev server
bun run build      # Production build
bun run lint       # Run ESLint
bun run test       # Run tests (Vitest)
```

## 📋 Master Ledger
Always check `PLAN.md` for current project status, active milestone, and squad assignments.
