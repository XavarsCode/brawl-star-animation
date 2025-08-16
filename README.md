# Brawl Animation (Template)

> **No copyrighted assets included.** Replace placeholders in `/public` and `/data` with your own lawful assets.
>
> Features:
> - Auth-gated **3D Studio** (login required) + **2D** sprite animator
> - **Simple / Complex** modes
> - **Timeline** (position/rotation/scale keyframes) with play/scrub
> - **Asset libraries** (brawlers, skins, backgrounds, dances) via JSON
> - Add simple 3D props (box/sphere/plane), import GLB/GLTF by URL or file
> - Share scenes via JSON export/import

## Dev
```bash
npm i
npm run dev
```
Open http://localhost:3000

## Demo Auth
- Email: `demo@local`
- Password: `demo`
(Stub JWT in cookie; replace with a real provider later.)

## Deploy
Push to GitHub → import on Vercel (Next.js defaults).
