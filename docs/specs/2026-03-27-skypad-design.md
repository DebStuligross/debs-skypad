# Deb's Skypad — Design Spec
**Date:** 2026-03-27
**Status:** Approved

---

## Overview

Deb's Skypad is a personal project launcher — a deployed web app Deb bookmarks and opens daily to quickly access and launch any of her Claude Code projects and apps. It is read-only: data is maintained by Rosie (updating a JSON file), not through the UI.

Named as a nod to the Jetsons' "Skypad Apartments."

---

## Goals

1. **Launch fast** — one click from bookmark to live app
2. **See status at a glance** — what's active, in progress, local-only, etc.
3. **Know the setup** — editor, deployment platform, database, without having to look it up

---

## Non-Goals (v1)

- No editing or CRUD in the UI
- No skills or utilities tracking (future phase)
- No authentication
- No server-side logic

---

## Architecture

**Stack:** Vite + React + Tailwind CSS

**Data:** `src/projects.json` — a static JSON file imported at build time. No API calls, no database. When the project registry changes, Rosie updates this file and pushes to GitHub.

**Deployment:** Vercel, connected to GitHub (`DebStuligross/debs-skypad`). Auto-deploys on push to `main`.

**Dev:** `npm run dev` → `http://localhost:5173`

---

## Data Schema

Each entry in `src/projects.json`:

```json
{
  "name": "rosie-tasks",
  "displayName": "Deb's Task Master",
  "description": "Personal task manager backed by Google Sheets",
  "liveUrl": "https://deb-task-master.netlify.app",
  "status": "active",
  "editor": "vscode",
  "deployedVia": "netlify",
  "database": "Google Sheets",
  "localPath": "C:\\Users\\dasad\\Projects\\rosie-tasks",
  "githubUrl": "https://github.com/DebStuligross/rosie-tasks"
}
```

**Status values:** `active` · `in-progress` · `planning` · `setup-pending` · `completed` · `local-only`

**Nullable fields:** `liveUrl`, `githubUrl`, `database` (null if not applicable)

---

## UI

### Header
- Periwinkle gradient (`#7B8CDE → #5A6BC7`), same as rosie-tasks
- Deb's photo avatar (left) — `public/deb-photo.png`, copied from rosie-tasks project; 40px circle with white border
- App title "Deb's Skypad" + light-weight subtitle "All your projects, one place"

### Filter Bar
- Row of toggle pills beneath header, white background, periwinkle border when active
- **Status filters:** All · Active · In Progress · Planning · Setup Pending · Completed
- **Platform filters:** All · Vercel · Netlify · GitHub Pages · Local — derived from each project's `deployedVia` field
- **Filter combination:** Status and platform filters are AND — a project must match both to appear
- One active selection per row; clicking the active pill resets it to "All"

### Card Grid
- Responsive: 3 columns desktop → 2 tablet → 1 mobile
- Background: `#F7F8FE` (periwinkle-bg)
- Cards: white, `border-radius: 8px`, `box-shadow: 0 1px 3px rgba(0,0,0,0.08)`

### Card Anatomy
```
┌────────────────────────────────────┐
│ Project Name            [● Active] │  ← name is a link if liveUrl exists
│ One-line description               │
│                                    │
│ [Claude Code] [Vercel] [Supabase]  │  ← metadata chips
└────────────────────────────────────┘
```

- **Name:** `#1a1a2e`, 16px semibold. Clickable link (opens in new tab) if `liveUrl` is set; non-linked otherwise.
- **Description:** `#6b7280`, 13px
- **Status badge** (top-right, color-coded pill — text color / background):
  | Status | Text | Background |
  |--------|------|------------|
  | `active` | `#7B8CDE` | `#E8EBFA` |
  | `in-progress` | `#E8850C` | `#FEF3E2` |
  | `planning` | `#1565C0` | `#E3F0FF` |
  | `setup-pending` | `#E91E8C` | `#FCE4F2` |
  | `completed` | `#8B95A5` | `#F0F1F4` |
  | `local-only` | `#8B95A5` | `#F0F1F4` |
- **Metadata chips:** Small pills, `#F3F5FD` background, `#6b7280` text. Three chips max: editor · deployed via · database (omit database chip if null)

---

## File Structure

```
debs-skypad/
├── src/
│   ├── projects.json        ← data source (maintained by Rosie)
│   ├── App.tsx              ← root component, filter state
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── FilterBar.tsx
│   │   └── ProjectCard.tsx
│   ├── main.tsx
│   └── style.css            ← CSS variables matching rosie-tasks palette
├── public/
│   └── deb-photo.png        ← copied from rosie-tasks
├── docs/
│   └── specs/
│       └── 2026-03-27-skypad-design.md
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Visual Design Tokens

Inherited directly from rosie-tasks:

```css
--periwinkle: #7B8CDE;
--periwinkle-dark: #5A6BC7;
--periwinkle-light: #E8EBFA;
--periwinkle-bg: #F7F8FE;
--text: #1a1a2e;
--text-muted: #6b7280;
--border: #d1d5db;
--shadow: 0 1px 3px rgba(0,0,0,0.08);
--shadow-lg: 0 4px 12px rgba(0,0,0,0.12);
```

Font: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

---

## Maintenance Protocol

When a project is added, removed, or updated:
1. Rosie updates `~/.claude/MEMORY/project-registry.md` — the human-readable source of truth stored in Rosie's memory system (not part of this repo)
2. Rosie updates `src/projects.json` in this repo — the app's data source
3. `git push origin main` → Vercel auto-deploys

---

## Out of Scope (Future Phases)

- Skills and utilities tracking
- Editable UI
- Search
- Authentication
