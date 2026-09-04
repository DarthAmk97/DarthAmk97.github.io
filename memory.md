# Portfolio continuity

## 2026-09-03 — Contributions redesign (local only)

- Repo: `https://github.com/DarthAmk97/DarthAmk97.github.io.git`
- Working branch: `codex/contributions-redesign`, tracking `origin/main`.
- Nothing pushed, merged, or deployed. GitHub Pages still deploys only from `main`.
- Local dev server left running at `http://127.0.0.1:5173/`.
- User shared an HF token in chat. Do not store/use it; remind them to revoke/rotate it.

### Product changes

- Added top-nav and command-palette route: `/contributions`.
- Added readable article route: `/contributions/trace-inverter-4b-nobubble`.
- TraceInverter content uses a concise version of the user's LinkedIn wording, links to LinkedIn/X/Hugging Face, a real accessible HTML benchmark table, and the three images from the LinkedIn post.
- Added “Currently working on”: `AMKwen 3.8 27B — Hybrid KDA` and `DEFT AMKwen — Writing Well series`.
- Contributions data lives in `src/content/contributions.json`.
- Dev-only editor lives in `src/Contributions.jsx`: add pages, edit copy/status/source links, edit/reorder blocks, add figure images, edit tables/galleries, save to localStorage, import/export JSON.
- Production builds never render the editor (`import.meta.env.DEV`).
- Maintenance/promotion guide: `MAINTAINING.md`.
- Content validator: `scripts/check-contributions.mjs`; `npm run build` runs it first.

### Visual direction

- Dark, calm research/editorial surface. Georgia reading type, Space Grotesk/Plex Mono UI labels, warm off-white text, restrained dusty violet.
- No new design dependency, card grid, gradient, or CMS.
- Reference pages studied: Deft Distribution Fine-Tuning and Arcee KDA article.
- Before/after screenshots are in `.codex-temp/ui-20260903-215740/` and excluded from Git.

### Validation

- `npm run build` passes.
- `npm audit fix` reduced audit to 0 vulnerabilities; lockfile updated only for safe transitive versions.
- Browser checked at 1440×1000, 1024×768, and 390×844.
- Production preview confirmed editor absent.
- No local console warnings/errors on Contributions pages.
- Mobile benchmark table scrolls horizontally and stays readable.

### Next user decision

- Review `http://127.0.0.1:5173/contributions` and the article.
- Iterate copy/layout locally.
- Only after explicit approval: commit, push branch/merge to `main`, and deploy.

## 2026-09-04 — Trace Inverter correction (local only)

- Corrected the article to explain both paper settings: with reasoning-summary “bubble” and without it, each using a separate inversion model.
- Replaced the misleading closing limitation with the paper’s actual result: synthetic inverted traces sometimes outperform ground-truth reasoning because they avoid backtracking and dead ends.
- Added the paper link. `npm run build` and a clean browser load pass.
- Verification screenshots: `.codex-temp/ui-20260904-correction/`.

## 2026-09-04 — ICML reproduction contribution (local only)

- Contributions heading is now `Curiosity & Experiments: Contributions, and tests.` with a more ML-specific eyebrow and summary.
- Added `ICML 2026 Agent Repro Challenge` to the Contributions index and as its own readable page.
- Copied the supplied certificate to `public/assets/contributions/icml-2026-repro-certificate.png`.
- Verified the live challenge leaderboard: `amkkk` is #7 of 364, with 277 logbooks and 1,674 points. Certificate records 491 claims across 164 papers.
- Fixed the index to render every contribution in `pieces`, not only the first, so pages added in the dev editor now appear automatically.
- `npm run build` passes. Desktop index/card/article screenshots: `.codex-temp/ui-20260904-icml/`. Nothing deployed.

## 2026-09-04 — Portfolio repository-view redesign (local only)

- Replaced the dashboard-like Portfolio UI (duplicate profile card, tile filters, branch map, separate case panel) with a single GitHub/README-inspired project list.
- New page has a plain `DarthAmk97 / portfolio` header, All/Work/Own builds tabs, ten repository-style rows, and one inline expanded case at a time.
- Preserved all project facts, external/source links, detailed case notes, Daraz workstreams, highlights, Udacity gallery/lightbox, and sessionStorage deep-link behavior.
- Verified All/Work/Own builds filtering, inline case selection, gallery open/close, desktop layout, and 390x844 mobile layout. Clean browser load has no console errors.
- `npm run build` passes. Before/after screenshots: `.codex-temp/ui-20260904-portfolio/`. Nothing deployed.

## 2026-09-04 — Papers copy reduction (local only)

- Removed every `Why I keep it` note from both the paper data and rendered cards.
- Paper cards now stop after the concise paper summary.
- `npm run build` and a clean browser load pass. Before/after screenshots: `.codex-temp/ui-20260904-papers/`. Nothing deployed.

## 2026-09-04 — Portfolio typographic iteration (local only)

- Reworked the repository view into a stronger editorial hierarchy without adding new cards or dependencies.
- Added the oversized `Selected work` masthead; italic/underlined domain language; large bold outcomes; numbered rows; and restrained amber `work` versus lilac `own build` lanes with text labels so meaning is not color-only.
- Expanded cases now read as a continuous page: promoted italic result, plain problem/build sections, visible trade-off, and a single colored rule rather than another boxed panel.
- Fixed the mobile repository path/avatar overlap and filter focus clipping.
- Verified desktop, 390×844 mobile, filters, expanded cases, and a clean browser console. `npm run build` passes.
- Before/after screenshots: `.codex-temp/ui-20260904-portfolio-type/`. Nothing deployed.
