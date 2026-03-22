# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML/CSS/JavaScript website for the **SMC Execution Engine** — a TradingView Pine Script indicator created by @abdallacrypto. The site serves as both a marketing page and user documentation, written primarily in Portuguese (pt-BR).

No build system, package manager, or dependencies are required. Open `index.html` or `manual.html` directly in a browser.

## File Structure

- `index.html` — Marketing/product page with hero, feature sections, and purchase CTA
- `manual.html` — Complete user manual with sidebar table of contents

## Architecture

Both files are self-contained with inline CSS and vanilla JavaScript. No external dependencies beyond Google Fonts CDN.

**Design system (CSS variables):**
- Background: `#0a0a0f`
- Accent (free): `#00ff88` (neon green)
- Accent (PRO): `#a78bfa` (violet)
- Danger: `#ff4466`, Warning: `#ffaa00`
- Fonts: IBM Plex Mono (code), DM Sans (UI)

**Key JavaScript behaviors:**
- `index.html`: Mobile hamburger nav toggle, scroll-reveal animations (IntersectionObserver), YouTube thumbnail overlay
- `manual.html`: Sidebar TOC toggle for mobile, scroll-reveal animations

## Content Domain

The indicator implements **Smart Money Concepts (SMC)** trading methodology:
- **BOS** (Break of Structure) — trend continuation signal
- **CHOCH** (Change of Character) — trend reversal signal
- **Order Blocks** — institutional supply/demand zones
- **Anchor** — structural guardrail preventing counter-trend entries
- **Fib A / Fib B** — two dynamic Fibonacci execution zone systems
- **HUD** — multi-timeframe dashboard (PRO only)
- **ATR gating** — volatility-based signal filtering

Free vs PRO tier distinction is a core content theme throughout both pages.
