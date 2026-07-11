# miwww — GitHub Pages Jekyll Portfolio — Session Summary

**Date:** 2025-07-11
**Repo:** https://github.com/terorero/miwww
**Live:** https://terorero.github.io/miwww/
**Status:** Site deployed, but **index.md responsive layout broken on mobile** — see Issue #1 below.

---

## 1. GOAL

Build a Jekyll portfolio site for Devin R. Conde Mancilla (Senior SysAdmin, 25+ years, Bolivia) on GitHub Pages. Full responsiveness, light/dark theme toggle, blog with 5 articles, project collection, and all content pages.

---

## 2. REPO STRUCTURE

```
/Users/terorero/Developer/miwww/
├── _config.yml                    # Jekyll 3.10, baseurl: /miwww, kramdown GFM
├── Gemfile                        # jekyll ~>3.10, kramdown-parser-gfm, base64, csv
├── Gemfile.lock
├── .github/
│   ├── pages.yml                  # build_type: workflow (NOT branch)
│   └── workflows/
│       └── pages.yml              # Ruby 3.2, bundle install, jekyll build, deploy-pages
├── _layouts/
│   ├── default.html               # Base layout: header, nav, theme toggle, anti-FOUC script
│   ├── project.html               # Project detail layout (metrics, tags, terminal, links)
│   └── post.html                  # Blog post layout
├── index.md                       # Homepage: hero, summary, 5 projects, skills, experience, contact
├── projects.md                    # Projects listing page
├── about.md                       # About page
├── contact.md                     # Contact page
├── blog.md                        # Blog listing page
├── _posts/
│   ├── 2025-06-25-cis-hardening-linux.md
│   ├── 2025-06-30-ansible-en-produccion.md
│   ├── 2025-07-04-prometheus-grafana-monitoring-stack.md
│   ├── 2025-07-07-borg-backup-enterprise-5tb.md
│   └── 2025-07-10-migracion-zimbra-8-a-10.md
├── _projects/
│   ├── immich-la-razon.md
│   ├── monitoring-stack.md
│   ├── infrastructure-as-code.md
│   ├── backup-dr.md
│   └── linux-hardening.md
├── assets/
│   ├── css/main.css               # 1515 lines — design tokens, components, responsive fixes
│   └── js/main.js                 # 140 lines — theme toggle, mobile menu
└── SESSION_SUMMARY.md             # This file
```

---

## 3. TECH STACK

- **Jekyll 3.10** (CI), **Ruby 3.2** (CI) / **Ruby 4.0** (local — broken, see below)
- **Theme:** None (custom layouts, no minima)
- **Markdown:** kramdown GFM
- **Design:** OKLCH color tokens, Space Grotesk + IBM Plex Sans + JetBrains Mono
- **JS:** Vanilla JS, no dependencies
- **Deploy:** GitHub Actions → GitHub Pages (`build_type: workflow`)
- **Baseurl:** `/miwww`

---

## 4. WHAT'S WORKING

| Feature | Status |
|---------|--------|
| Deploy (GitHub Actions) | ✅ Green |
| All 7 pages render | ✅ |
| Project collection (5 projects) | ✅ |
| Blog (5 articles) | ✅ |
| Theme toggle (light/dark) | ✅ localStorage persistence |
| Mobile menu drawer | ✅ |
| Hero, summary, skills, experience, contact sections | ✅ Desktop |
| Prose styles (tables, code, blockquotes) | ✅ |
| **Other pages (about, contact, projects, blog) responsive** | ✅ |

---

## 5. OUTSTANDING ISSUE: INDEX RESPONSIVE (CRITICAL)

**Problem:** `index.md` does NOT respect responsive layout on mobile (max-width 767px). It renders as desktop, causing horizontal scroll. Other pages (about, contact, projects, blog) work fine.

**What was attempted (commits 487f9bd → c27a870):**
1. Added `overflow-x: hidden` to `html` and `body`
2. Fixed class name mismatches (`hero__ctas` vs `hero__actions`, `hero__subtitle` vs `hero__title`)
3. Added `.experience` section CSS from scratch (was completely missing)
4. Added comprehensive `@media (max-width: 767px)` block at end of `main.css` covering:
   - Hero: smaller fonts, column CTAs, grid stats (2x2), reduced padding
   - Sections: reduced padding, smaller titles
   - Summary: column layout, overflow hidden
   - Projects: terminal margin reset, smaller fonts, compact badges
   - Experience: full timeline styles
   - Footer: centered, wrapped links
5. Added `.grid--2` responsive breakpoint (1fr mobile, 2-col at 600px+)
6. Fixed `.grid` `minmax` to use `min(280px, 100%)` to prevent overflow

**Root cause hypothesis (unconfirmed):**
The index is the ONLY page with ALL of these sections: hero (with terminal blocks inside project cards), summary list, project grid with terminal pre/code blocks, skills grid, experience timeline, and contact summary. The sheer volume of content with fixed max-widths (`max-width: 72ch`, `max-width: 55ch`) and terminal blocks with `white-space: pre` may cause the browser to not apply the media query correctly, OR the CSS is loading but the specific elements aren't being targeted.

**What to investigate next:**
1. Open Chrome DevTools → inspect `index.md` on mobile viewport — check if the `@media (max-width: 767px)` rules appear in the Styles panel
2. Check if any inline styles in `index.md` override the media query (e.g., `style="max-width: 72ch;"`)
3. Check if `.hero__value-prop` with `max-width: 55ch` + `border-left` causes overflow
4. Check if `.terminal__body` with `white-space: pre` and long content forces horizontal scroll
5. Check if `.summary__list` (display: grid) without column constraints overflows
6. Check if the 5th project card's terminal content (long `borg create` command) overflows
7. Try adding `* { max-width: 100%; overflow-wrap: break-word; }` as a nuclear option
8. Check if the issue is the `<pre>` blocks specifically — try wrapping in a `<div style="overflow-x: auto">`
9. Consider if the inline `style="max-width: 72ch;"` on the skills grid (line 349 of index.md) is overriding the media query

---

## 6. CONFIGURATION REFERENCE

### _config.yml
- `theme: minima` — commented out (custom layouts)
- `baseurl: "/miwww"`
- `markdown: kramdown` with GFM input
- Collections: `projects` (output: true, permalink: /projects/:name/)
- Posts permalink: /blog/:year/:month/:day/:title/
- Exclude: vendor/, Gemfile*, node_modules/, .git/, .github/, *.sh, README.md, LICENSE

### .github/pages.yml
```yaml
build_type: workflow
```

### .github/workflows/pages.yml
- Ruby 3.2, `bundle config set --local deployment 'true'`
- `bundle install --retry 3 --jobs 4`
- `bundle exec jekyll build` with `JEKYLL_ENV: production`
- Upload `_site` → deploy-pages

### Gemfile
- `jekyll ~> 3.10`, `kramdown-parser-gfm`, `base64`, `csv`
- Plugins: jekyll-feed, jekyll-seo-tag, jekyll-sitemap, jekyll-relative-links

---

## 7. CSS ARCHITECTURE (main.css — 1515 lines)

```
Lines 1-458:    Design tokens (OKLCH colors, typography, spacing, shadows, z-index)
Lines 459-488:  Reset / Base (box-sizing, html, body, typography)
Lines 489-560:  Utilities (sr-only, etc)
Lines 561-590:  Page layout (.page grid, .wrapper, .main)
Lines 591-652:  Skip link, animations
Lines 653-702:  Site header, title, nav, menu
Lines 703-790:  Theme toggle
Lines 791-828:  Mobile drawer (site-menu fixed, site-overlay)
Lines 829-855:  Sidebar (sticky desktop)
Lines 856-940:  Sidebar navigation links
Lines 941-960:  Hero section
Lines 961-970:  Summary section
Lines 972-1000: Projects grid, project cards
Lines 1001-1040: Terminal component
Lines 1041-1084: Buttons
Lines 1085-1130: Badges
Lines 1131-1160: Cards
Lines 1161-1200: Modal
Lines 1201-1230: Utilities
Lines 1231-1260: Cluster, stack, prose utilities
Lines 1261-1425: Prose styles (headings, links, lists, code, tables, blockquotes)
Lines 1426-1500: RESPONSIVE FIXES (@media max-width: 767px) — INCOMPLETE
Lines 1501-1515: Print styles
```

### Key CSS classes used by index.md
- `.hero`, `.hero__content`, `.hero__eyebrow`, `.hero__name`, `.hero__title`, `.hero__value-prop`, `.hero__ctas`, `.hero__stats`, `.hero__stat`, `.hero__stat-value`, `.hero__stat-label`
- `.section`, `.section--alt`, `.section__header`, `.section__eyebrow`, `.section__title`
- `.summary`, `.summary__list`, `.summary__item`, `.summary__icon`, `.summary__text`
- `.projects`, `.project`, `.card`, `.project__terminal`, `.terminal`, `.terminal__header`, `.terminal__dots`, `.terminal__dot`, `.terminal__title`, `.terminal__body`, `.terminal__command`, `.terminal__output`, `.terminal__success`, `.terminal__prompt`
- `.project__body`, `.project__header`, `.project__icon`, `.project__title`, `.project__meta`, `.project__meta-item`, `.project__meta-value`, `.project__description`, `.project__stack`, `.project__footer`
- `.grid`, `.grid--2`, `.card__title`, `.card__stack`, `.badge`, `.badge--primary`
- `.experience`, `.experience__item`, `.experience__marker`, `.experience__period`, `.experience__role`, `.experience__company`, `.experience__highlights`, `.experience__highlight`
- `.btn`, `.btn--primary`, `.btn--ghost`, `.btn--lg`, `.btn--sm`
- `.animate-in`, `.delay-1` through `.delay-5`

---

## 8. INLINE STYLES IN index.md (potential responsive blockers)

- Line 349: `style="max-width: 72ch;"` on skills `.grid`
- Line 467: `style="max-width: 56ch;"` on contact `.summary`
- Line 473: `style="padding: var(--space-1) var(--space-2); font-size: var(--text-sm);"` on email link
- Line 486-488: Similar inline styles on LinkedIn/GitHub/Web links

---

## 9. LOCAL BUILD NOTE

Ruby 4.0 (local) is broken with Jekyll 3.x:
```
cannot load such file -- bigdecimal (LoadError)
```
This is a local environment issue only. CI uses Ruby 3.2 which works fine. Do NOT try to fix local build — just push and let CI handle it.

---

## 10. GIT TAGS

- `v1.0` — first working version (pre-responsive fixes)

---

## 11. USEFUL COMMANDS

```bash
# Trigger deploy manually
git commit --allow-empty -m "ci: trigger deploy" && git push

# View workflow logs
gh run view --log

# Verify Pages config
gh api repos/terorero/miwww/pages

# Check CSS line count (should be ~1515)
wc -l assets/css/main.css
```

---

## 12. RESUME CHECKLIST

When picking this up again:
1. Read this file
2. Check `git log --oneline -10` for latest commits
3. The site is deployed and live at https://terorero.github.io/miwww/
4. Focus on Issue #1: index responsive on mobile
5. Test with Chrome DevTools device toolbar at 375px width
6. Check the Styles panel in DevTools to see which CSS rules are applying
7. After fixing, commit, push, and verify deploy
