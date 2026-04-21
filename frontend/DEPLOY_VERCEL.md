# Deploying to Vercel

This project is a **frontend-only** React (CRA + craco) app. Follow these steps to deploy
it to Vercel.

## 1. Push to GitHub

From Emergent, use the GitHub export / push feature (or clone & push manually).

## 2. Import the repo in Vercel

- Go to https://vercel.com/new and select your repository.
- On the **Configure Project** screen:
  - **Root Directory**: set to `frontend`
    (This is the critical setting — the rest of the monorepo is ignored.)
  - **Framework Preset**: Vercel should auto-detect **Create React App**.
  - **Build Command / Install Command / Output Directory** are already
    defined in [`frontend/vercel.json`](./vercel.json), so you can leave them blank.
- Click **Deploy**.

## 3. (Optional) Environment variables

The app has **no runtime env vars** (it's a pure frontend experience with no backend
calls). You can skip adding any env vars on Vercel.

## 4. Custom domain

Once deployed, add your custom domain in Vercel → Project → Settings → Domains.

---

## What's included for Vercel

- `frontend/vercel.json`
  - Framework set to `create-react-app`
  - `CI=false` on build so CRA warnings don't fail the build
  - SPA rewrite (`/* → /index.html`) so that any direct URL still loads the app
  - 1-year immutable cache headers on `/audio/*` and `/static/*` for fast repeat loads
- `.vercelignore` (at the repo root) — skips `backend/`, `memory/`, `tests/`, etc. in case
  someone ever deploys from the root directory.

## Notes on Emergent-specific snippets

`public/index.html` contains two Emergent-specific elements that are **optional** to keep
when deploying externally:

1. The **"Made with Emergent" badge** (fixed bottom-right `<a id="emergent-badge">`)
2. The **PostHog analytics** snippet at the bottom of `<body>`
3. The `<script src="https://assets.emergent.sh/scripts/emergent-main.js"></script>` tag

You can safely **delete these three blocks** from `frontend/public/index.html` before
pushing to GitHub if you don't want them on your Vercel deployment. The site will work
identically without them.

## Local test of the production build

```bash
cd frontend
yarn install
CI=false yarn build
npx serve -s build
```

Open http://localhost:3000 — this is the exact artifact Vercel will serve.
