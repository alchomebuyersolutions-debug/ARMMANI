# Product Design Document: r/n8n Top 6 Explorer

## 1. Overview
The **r/n8n Top 6 Explorer** is a high-end, interactive web application designed to fetch and display the most relevant current discussions from the `n8n` subreddit. The goal is to provide users with a sleek, minimal, and premium interface to stay updated on the n8n automation ecosystem.

## 2. Target Audience
- **n8n Power Users**: Developers and automation experts looking for the latest community tips.
- **Technical Enthusiasts**: Users interested in low-code/no-code automation trends.
- **Workflow Designers**: People seeking inspiration for their next n8n project.

## 3. Product Features
### 3.1 Real-time Data Fetching
- Integration with the Reddit API to fetch live data from `https://www.reddit.com/r/n8n/top/.json?limit=6`.
- Automatic filtering to ensure only the top 6 results are displayed.

### 3.2 Interactive UI/UX
- **Dynamic Grid**: A responsive 3x2 or 2x3 grid layout depending on screen size.
- **Engagement Insights**: Displaying post title, upvote count, comment count, and author.
- **Direct Navigation**: Clicking a card opens the original Reddit thread in a new tab.

### 3.3 Premium Aesthetics
- **Theme**: Deep obsidian dark mode with subtle indigo accents (matching n8n branding).
- **Glassmorphism**: Translucent card backgrounds with backdrop-blur effects.
- **Micro-animations**: Smooth hover transitions, entrance animations, and loading skeletons.
- **Typography**: Modern sans-serif stack (e.g., *Inter* or *Outfit*).

## 4. Technical Stack
- **Framework**: Vite + Vanilla JavaScript (for maximum performance and low footprint).
- **Styling**: Modern CSS with Flexbox/Grid and CSS Variables for theming.
- **Icons**: Lucide or Phosphor Icons for a clean, professional look.
- **Deployment**: Optimized for quick deployment on Vercel, Netlify, or similar.

## 5. Design System
### 5.1 Color Palette
- **Background**: `#0F1115` (Deep Space)
- **Surface**: `rgba(255, 255, 255, 0.05)` (Frosted Glass)
- **Primary**: `#FF6D5A` (n8n Orange/Coral)
- **Secondary**: `#6366F1` (Indigo Glow)
- **Text**: `#E2E8F0` (Slate White)

### 5.2 Interactivity
- **Hover State**: Cards should scale slightly (1.02x) and increase shadow intensity.
- **Transitions**: 0.3s ease-in-out for all visual changes.

## 6. Success Metrics
- **Load Time**: < 1.0s for the initial data render.
- **Engagement**: High click-through rate to Reddit discussions.
- **Aesthetic Score**: High perceived value through premium styling.
