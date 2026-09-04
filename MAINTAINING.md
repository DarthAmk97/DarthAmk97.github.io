# Maintaining the portfolio

## Start the local dev site

```powershell
npm install
npm run dev
```

Open the localhost URL Vite prints. Nothing deploys from this command.

## Edit Contributions without touching code

1. Open `/contributions` locally.
2. Select **Edit contributions** at the bottom-left.
3. Edit a page or add a written piece. Article blocks are ordered; use ↑ and ↓ to place text and images.
4. Select **Save draft** to keep the draft in this browser.
5. Select **Export JSON** before closing the browser or starting a new Codex chat.

Drafts live only in browser `localStorage`. Production reads `src/content/contributions.json`.

## Ask Codex to promote a draft

Attach the exported `contributions.json`, then ask:

> Replace `src/content/contributions.json` with this approved local draft. Extract any embedded data-URL images into `public/assets/contributions`, update their paths, run the build, show me the local result, and do not merge or push to `main` until I approve.

## Add ordinary images

Put image files in `public/assets/contributions/`. Use paths such as:

```text
/assets/contributions/my-chart.png
```

Keep chart text readable on a phone. Add useful alt text in the content file.

## Papers and blogs

- Papers currently live in the `lovedPapers` array in `src/main.jsx`.
- Mirrored writing lives in `src/blogPosts.js`.
- Contributions are the first section moved to a plain content file. Move another section only when you actually need to edit it often; do not build a second CMS.

## Publish

GitHub Pages deploys only from `main` via `.github/workflows/deploy.yml`.

Safe flow:

1. Work on a `codex/...` branch.
2. Run `npm run build`.
3. Review the localhost site on desktop and mobile.
4. Merge/push to `main` only after explicit approval.

Never paste access tokens into content, source files, or chat. Revoke any token that has been shared accidentally.
