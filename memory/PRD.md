# PRD · Bhumika & Arpit — A Divine Message in the Wind

## Problem Statement
A cinematic, scroll-driven, mobile-first **frontend-only** engagement invitation website
gifted from a friend to Bhumika Darbar & Arpit Patel (engagement on 10 May 2026, Surat).
Brief: feel like a short film, not a card — white dove carrying a divine message through a
mystical Indian forest, mythological + nature/spiritual theme, magical emotional tone.

## Event Details (Static)
- **Bride:** Bhumika Darbar — Daughter of Hinaben & DharmaSinh
- **Groom:** Arpit Patel — Son of Vinaben & Prafullchandra
- **Date:** Sunday, 10th May 2026
- **Ceremony:** 3:00 PM onwards
- **Dinner:** 5:00 PM
- **Venue:** Shri Surat Jilla Leuva Patidar Samaj Vadi, Surat
- **Maps:** https://share.google/GOfs4sIcSrrG3Gx7o

## User Personas
- **Gifting friend (you):** Wants a wow-moment gift, no technical lift required.
- **Couple:** Receives a memorable, shareable web link (private story — no couple backstory).
- **Guests:** View on WhatsApp-shared link, mostly mobile; need quick access to location + calendar.

## Architecture
- **Frontend-only** React SPA (no backend, no DB, no auth).
- Single-page vertical scroll experience, 6 viewport-height sections (5 narrative acts).
- **Stack:** React 19 · GSAP + ScrollTrigger · Lenis (smooth scroll) · Framer Motion · Tailwind.
- **Assets:** Unsplash/Pexels + curated Emergent assets for forest/river/temple/lanterns/parchment.
- **Audio:** Himalayan Atmosphere (Kevin MacLeod, CC-BY) at `/audio/ambient.mp3`.

## Implemented (2026-02-21)
- **Act 1 · Awakening Forest** — misty dark forest, sunrays conic gradient, floating gold
  particles, Cormorant Garamond hero "In the quiet harmony of nature…" with staggered
  word-reveal via GSAP.
- **Act 2 · Divine Messenger** — inline-SVG white dove with golden aura glow and wing-flap
  CSS keyframe; flies across the full page along a GSAP ScrollTrigger timeline scrubbed to
  scroll progress.
- **Act 3 · The Journey** — river scene with tap-ripple interaction (gold expanding circle)
  + temple horizon scene with parallax background.
- **Act 4 · The Reveal** — ivory parchment scroll unrolls (GSAP scaleY), displaying all
  event details with elegant serif typography.
- **Act 5 · Ending** — night sky with rising lanterns, CTAs: View Location (Google Maps)
  and Add to Calendar (pre-filled Google Calendar render URL, UTC-correct for IST event).
- **Fixed UI:** ambient audio toggle (top-right, VolumeX ↔ Volume2), Skip-to-Details
  button (bottom-left, auto-hides past 60% scroll), film-grain + vignette on every scene.
- **Tested:** 100% pass on testing_agent_v3 — all 13+ data-testids present, hrefs correct,
  no console errors, mobile + desktop both verified.

## Iteration 2 (2026-02-21) · Full SVG animation overhaul
User feedback: "photo doesn't give the engagement vibe — keep everything animated, Indian
wedding + nature + spiritual theme across all scenes." All scene backgrounds rebuilt as
hand-crafted animated SVG components. Zero stock photos now.
- **ForestScene** — layered SVG tree silhouettes (swaying), distant rotating mandala-moon,
  conic sun-ray beams, drifting mist bands, pulsing fireflies, foreground branch with
  mango leaves.
- **RiverScene** — golden-hour gradient sky, sun glow with reflection shimmer stripes,
  distant mountain silhouettes, animated sine-wave water bands, floating lotuses, swaying
  reeds on the bank.
- **TempleScene** — symmetric SVG temple silhouette (base, hall, door arch, side towers,
  stepped shikhara, kalash with mango leaves), giant rotating mandala halo behind, Om
  symbol floating above with pulse glow, fan-shaped sacred rays, glowing sanctuary inside.
- **NightScene** — star-twinkle SVG sky (24 stars), crescent moon with gentle rock motion,
  drifting cloud ribbons, horizon temple-row silhouette, rising lanterns.
- **Parchment (Act 4) decorated** with: Toran (mango-leaf & marigold garland) at top,
  4 corner paisleys, inline Om symbol, two lotus floral dividers flanking the `&`, and a
  row of 3 flickering diyas at the bottom.
- **New keyframes** in App.css: mandala-spin(-rev), tree-sway, branch-sway, ray-breathe,
  firefly-pulse, reed-sway, wave-flow, reflection-shift, sun-glow, lotus-float, lotus-bloom,
  om-pulse, star-twinkle, moon-rock, cloud-drift, flame-dance, flame-glow, toran-sway,
  parchment-glow.
- **Tested:** 100% pass on testing_agent_v3 iteration 2 — zero stock image tags, all five
  scenes animate correctly across mobile/desktop, every motif renders, all event details
  still legible on parchment.

## Design System
- **Colors:** deep forest green `#0B1A14` + midnight `#090D17` + gold `#D4AF37` + ivory `#F7F4EB`.
- **Typography:** Cormorant Garamond (display), Tenor Sans (accent caps), Outfit (body).
- **Motion:** GSAP scrub = 1.2, Lenis duration 1.4, staggered reveals 80ms.

## Prioritized Backlog
- **P1** — Couple could personalize: add guest-name URL param for "Dear {name}" opener.
- **P2** — Swap the ambient track for a more authentic Indian bansuri flute (Kevin MacLeod's Himalayan
  Atmosphere is atmospheric but not strictly Indian); user can drop any MP3 at `/audio/ambient.mp3`.
- **P2** — Downloadable PDF/image "save the date" card generated from the parchment view.
- **P3** — Lottie / Rive animation upgrade for the dove for richer feather motion.
- **P3** — RSVP form (if couple wants it later — currently skipped per user request).
- **P3** — Scene-by-scene share buttons (Instagram story export).

## Next Tasks
- Await user feedback on ambient music, dove style, or text copy.
- Consider adding a gentle "loading" splash for slow networks (9MB audio + HD images).
