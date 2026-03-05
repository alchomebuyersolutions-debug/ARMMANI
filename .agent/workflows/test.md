---
description: Run tests and verify the application — quick quality check
---

# 🧪 Quick Test (`/test`)

Rapid verification of the current application state.

---

## Step 1: Build Check
// turbo
1. Run `npm run build` (or `bun run build`) to verify zero compilation errors.

## Step 2: Browser Verification
1. Open the browser and navigate to the local dev URL (usually `http://localhost:3000`).
2. Take a screenshot of every major view/page.
3. Verify:
   - [ ] Page loads without errors
   - [ ] No console errors in the browser
   - [ ] All interactive elements respond to clicks
   - [ ] Layout looks correct on desktop viewport
   - [ ] No missing images or broken links

## Step 3: Mobile Check
1. Resize the browser to mobile viewport (375px wide).
2. Take a screenshot.
3. Verify responsive layout is intact.

## Step 4: Report
Output a quick status report:

```
🧪 TEST RESULTS
═══════════════════
  Build:    ✅/❌
  Desktop:  ✅/❌
  Mobile:   ✅/❌
  Console:  ✅/❌
═══════════════════
Issues Found: [count]
[List any issues]
```
