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
