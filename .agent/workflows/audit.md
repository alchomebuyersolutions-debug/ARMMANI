---
description: Run a full Visual, Functional, and Trust audit against 2026 standards
---

# 🔍 Visual & Functional Quality Gate (`/audit`)

Performs an elite-level audit of the UI/UX and logic against the 2026 "Visual Excellence" and "Responsible App" standards.

---

## 🛠️ Step 1: Environmental Check
1. Open the integrated browser and navigate to the local development URL.
2. Verify the build is stable and the compiler has finished the initial render.
3. Take a **screenshot** as the baseline for the audit.

---

## 🎨 Step 2: Visual Excellence Audit
Analyze the current view against these **non-negotiable** standards:

| # | Standard                  | Pass Criteria                                                              |
|---|---------------------------|----------------------------------------------------------------------------|
| 1 | **Information Architecture** | Page organized by user goals. Scannable in < 3 seconds.                  |
| 2 | **Modular Bento Grid**     | Layout structured in clean, high-density grid. Consistent spacing tokens. |
| 3 | **Glassmorphism**          | `backdrop-blur` and transparency applied to cards and sidebars.           |
| 4 | **Kinetic Typography**     | Fonts legible and reactive to interaction. Inter/Outfit loaded.           |
| 5 | **Sidebar Audit**          | Visually quiet. Grouped by *intent*, not features.                        |

---

## ⚡ Step 3: Interaction & Trust Audit
Perform a **"Stress Test"** on the UX:

### Immediate Feedback
- Do all buttons and links acknowledge input instantly (< 100ms)?

### System States — Verify Existence:
| State       | Implementation                                  |
|-------------|--------------------------------------------------|
| **Loading** | Skeletons used during data fetch                 |
| **Empty**   | Clear CTA when no data exists                    |
| **Error**   | Recoverable, non-blaming messages                |
| **Success** | Toast notifications for completed actions        |

### Advanced UX
- **Optimistic UI:** Do mutations update the UI immediately before the server responds?
- **Intent Check:** Are Modals used for high-commitment/destructive tasks? Popovers for quick edits?

---

## 📊 Step 4: The Audit Report
Output a report in chat with this structure:

```
🚦 SQUAD AUDIT REPORT
═══════════════════════════════
  Visual Score:     [X]/10
  Functional Score: [X]/10
  Trust Score:      [X]/10
═══════════════════════════════

✅ Visual Wins
- [List standout UI elements]

❌ Critical Fails (Immediate Fix Required)
- [List broken bento grids, navigation noise, or accessibility issues]

🐛 Logic & Trust Bugs
- [List broken endpoints, missing loading states, or ambiguous interactions]
```

---

## 🚥 Step 5: Recursive Self-Correction Loop

- **Score Threshold:** 9/10 in ALL categories.
- **Action:** If any category (Visual, Functional, Trust) scores below threshold:

### Healing Protocol
1. **Diagnose:** Analyze the "Critical Fails" and "Bugs" from Step 4.
2. **Assign & Fix:**
   - If **Visual < 9** → Assume the **🐎 Design Lead** persona → Refactor CSS/Layout.
   - If **Functional < 9** → Assume the **🏗️ Builder** persona → Fix logic/API.
   - If **Trust < 9** → Fix system states, feedback loops, and error handling.
3. **Validate:** Re-run the `/audit` workflow automatically after fixes.

### Exit Conditions
- ✅ **Success:** All scores ≥ 9. Move to Step 6.
- ❌ **Blocked:** After **3 failed healing attempts**, escalate to the human with a "Blocked" status in the chat and in `PLAN.md`.

---

## 📝 Step 6: Final Sync
1. Update `PLAN.md` status to **"✅ Verified & Polished"**.
2. Commit the working code to Git with the prefix: `[AUTO-HEALED]`.
3. Take a final screenshot as proof of completion.
