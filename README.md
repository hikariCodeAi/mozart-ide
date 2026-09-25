# Mozart IDE public website and releases

This repository hosts the [Mozart IDE homepage](https://hikaricodeai.github.io/mozart-ide/), public release notes, and update metadata. The product source code remains in the private development repository.

本仓库用于维护 [Mozart IDE 官网](https://hikaricodeai.github.io/mozart-ide/)、公开版本说明和更新清单；IDE 产品源码仍保存在私有开发仓库中。

## Architecture / 项目架构

The website is a static GitHub Pages project with no build step or backend:

- `index.html` — semantic page structure and accessible controls.
- `styles.css` — visual system, responsive layout, and motion preferences.
- `app.js` — Vue 2 state, bilingual copy, carousel behavior, and release-state loading.
- `DESIGN_GUIDE.md` — shared typography, color, spacing, control, icon, and motion rules.
- `assets/` — approved brand artwork, layered hero artwork, and real product screenshots.
- `update/latest.json` — the single source of truth for download availability.
- `update/appcast-macos-arm64.xml` and `update/appcast-windows-x64.xml` — signed, derived platform feeds generated only from verified release data.
- `release-notes/` — notes for verified public releases.
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow.

Vue 2.7.16 and Tailwind CSS Browser v4 are loaded from pinned jsDelivr URLs. There is no `package.json`, bundler, application server, database, PM2 process, SSH deployment, or server password in this repository.

The performance carousel slot uses an interactive HTML comparison with six user-supplied measurements. Its rationale appears on hover, keyboard focus, or tap; the detail view makes values readable on phones. Global-search P95 is omitted pending actual measurement.

The five feature slides advance vertically every 8 seconds. Each image slide has two horizontal screenshot slots that advance every 4 seconds; both slots currently reference the same approved capture until a second real screenshot is available. The performance comparison remains an interactive HTML slide. Manual arrows, keyboard navigation, and touch gestures work in both directions.

## Local development / 本地开发

Run a static HTTP server from the repository root:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4173/`. Opening `index.html` directly is not supported because the page fetches `update/latest.json`.

Before changing the homepage, read `AGENTS.md` and `assets/ASSET_MANIFEST.md`. Use real Mozart IDE screenshots and keep all visible copy and controls in HTML/CSS; design composites are reference material only.

## Verification / 验证

Check these viewports after visible changes:

- `1920×1080`, `1440×900`, `1280×720`
- `768×1024`, `390×844`

Desktop layouts must fit within `100svh`; mobile layouts may scroll vertically but must not overflow horizontally. Also verify both languages, all five feature slides and their image slots, keyboard and touch navigation, pause/autoplay, persisted language, and reduced-motion behavior.

Basic source checks:

```bash
node --check app.js
python3 -m json.tool update/latest.json >/dev/null
git diff --check
```

## Release truth / 发布真实性

No installable release has been published yet. While `update/latest.json` contains `"published": false`, every download CTA must remain disabled and display “即将发布 / Coming soon”. A published manifest uses a stable `X.Y.Z` version and exactly one signed `macos/arm64` DMG plus one signed `windows/x64` EXE, including size, SHA-256, and Ed25519 signature. Both appcasts are generated from that same verified data and advance in the same commit only after the draft Release assets are complete and the Release is public. Never add placeholder assets, fabricated checksums, signatures, or performance numbers.

## Deployment / 部署

Pushing website changes to `origin/main` automatically deploys GitHub Pages through `.github/workflows/pages.yml`; no server credentials or manual file synchronization are required.

Production URL: https://hikaricodeai.github.io/mozart-ide/
