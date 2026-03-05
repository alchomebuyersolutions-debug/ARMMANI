---
name: design-system-library
description: Curated collection of color palettes, typography pairings, and aesthetic references for rapid prototyping
---

# 🎨 Design System Library

A reference library of curated design tokens — palettes, typography, and aesthetic moods — ready to drop into any project.

---

## Palettes

### 1. Luxury Gold (Sophisticated, Exclusive, Timeless)
```
--primary:    #1C1917  (Stone Dark)
--cta:        #CA8A04  (Gold)
--background: #FAFAF9  (Cream)
--text:       #292524  (Warm Black)
--accent:     #78716C  (Taupe)
```
**60-30-10:** 60% Cream · 30% Stone · 10% Gold
**Use for:** Trading platforms, luxury SaaS, finance, premium portfolios

---

### 2. Health Calm (Calm, Trustworthy, Clean)
```
--primary:    #0891B2  (Cyan)
--cta:        #059669  (Health Green)
--background: #FFFFFF  (Clean White)
--text:       #0F172A  (Deep Blue)
--accent:     #06B6D4  (Bright Cyan)
```
**60-30-10:** 60% White · 30% Deep Blue · 10% Green
**Use for:** Health tech, wellness apps, trust-first SaaS

---

### 3. Midnight Pro (Tech-Forward, Immersive, Bold)
```
--background:     #0A0A0A  (True Black)
--surface:        #1A1A1A  (Card Background)
--border:         #333333  (Subtle Borders)
--text:           #FFFFFF  (Pure White)
--text-secondary: #A3A3A3  (Grey)
--accent:         #3B82F6  (Blue) or #10B981 (Green)
```
**Contrast:** 15:1 for text
**Use for:** Developer tools, dashboards, command centers, crypto

---

## Typography Pairings

### 1. Clean Professional
| Role     | Font           | Weights          |
|----------|----------------|------------------|
| Headings | Inter Variable  | 600, 700         |
| Body     | Roboto / System | 400              |
| Mono     | JetBrains Mono  | 400              |

**Personality:** Clean, scalable, professional

---

### 2. Editorial Luxury
| Role     | Font               | Weights          |
|----------|--------------------|------------------|
| Headings | Playfair Display    | 700              |
| Body     | Montserrat          | 300, 400         |
| Accents  | Cormorant Garamond  | 300              |

**Personality:** Sophisticated, high-contrast, editorial

---

### 3. Warm & Approachable
| Role     | Font       | Weights          |
|----------|------------|------------------|
| Headings | Poppins    | 600, 800         |
| Body     | Open Sans  | 400, 600         |
| Alt      | Nunito + Lato | 400, 700      |

**Personality:** Approachable, balanced, warm

---

## ✅ Color Rules (Non-Negotiable)

- **60-30-10 Rule** — 60% dominant, 30% secondary, 10% accent
- **WCAG AA** — Minimum 4.5:1 contrast for body text
- **Semantic tokens** — Always define `--success`, `--error`, `--warning`, `--info`
- **Never** use pure `#000` on pure `#FFF` (too harsh)
- **Never** rely on color alone for information (accessibility)
- **Max 3 primary colors** per palette
- **Test both** light and dark modes
