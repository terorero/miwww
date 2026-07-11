# AGENTS.md — miwww Portfolio Project

## Project Overview
Jekyll portfolio site for Devin R. Conde Mancilla on GitHub Pages.

## Key Files
- `_config.yml` — Jekyll config (baseurl: `/miwww`)
- `Gemfile` — Ruby deps (Jekyll 3.10, kramdown-parser-gfm)
- `.github/workflows/pages.yml` — CI/CD (Ruby 3.2, build, deploy)
- `assets/css/main.css` — ALL styles (1515 lines, OKLCH tokens)
- `assets/js/main.js` — Theme toggle + mobile menu (140 lines)
- `_layouts/default.html` — Base layout
- `index.md` — Homepage (THE FILE WITH THE RESPONSIVE BUG)
- `SESSION_SUMMARY.md` — Full project context

## Current Issue
**index.md responsive is broken on mobile.** Other pages work fine. See SESSION_SUMMARY.md §5 for details and investigation steps.

## Build
- CI: GitHub Actions, Ruby 3.2
- Local: broken (Ruby 4.0 + Jekyll 3.x incompatibility) — push to trigger CI
- Deploy: `build_type: workflow` in `.github/pages.yml`

## CSS Architecture
- Design tokens: lines 1-458 (OKLCH colors, spacing, typography)
- Components: lines 459-1425 (header, hero, projects, badges, buttons, prose)
- Responsive: lines 1426-1500 (`@media max-width: 767px`) — INCOMPLETE
- Print: lines 1501-1515

## Conventions
- OKLCH color system with light/dark theme via `data-theme` attribute
- CSS variables for all design tokens
- No JS framework, vanilla JS only
- Jekyll collections: `_projects/`, `_posts/`
- Layouts: `default.html`, `project.html`, `post.html`
- All pages use front matter with `layout: default`
