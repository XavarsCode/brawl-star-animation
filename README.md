# Brawlstars Anim Site (2D/3D Viewer)

A lightweight Next.js site to preview **2D sprite-sheet** and **3D GLTF/GLB** animations. Perfect for hosting on **Vercel**.

> ⚠️ **IP notice:** This template contains **no** Supercell/Brawl Stars assets. You must provide your own images/models and ensure you have rights to use them.

## Quickstart

```bash
pnpm i   # or npm i / yarn
pnpm dev # or npm run dev
```

## Deploy to Vercel
1. Push this folder to GitHub.
2. Import the repo on Vercel (Next.js).
3. Build command: `next build` (default).

## Features
- 3D: Load external `.gltf/.glb` by URL or local file; orbit controls; play first animation clip.
- 2D: Animate a sprite sheet on `<canvas>`; control FPS, scale, total frames, frames per row, loop.
- Shareable state via URL query params.

## Adding Assets
- Put public assets under `/public/` (e.g., `/public/sprites/`, `/public/models/`), then reference them by `/sprites/your.png`.
- Or paste any CORS-enabled URL in the UI.

## Pages
- `/` – Welcome page with links.
- `/editor` – Full 2D/3D animation editor.
