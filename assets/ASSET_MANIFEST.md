# Mozart IDE homepage asset manifest

The composite design is a visual reference only. Do not use it as a full-page background and do not bake headings, controls, screenshots, or localized copy into raster images.

## Design reference

- `../design-concepts/mozart-hero-carousel-review-zh-4k.png` — approved 3840 × 2160 carousel composition.

## Brand

- `brand/mozart-wordmark.svg` — official scalable wordmark.
- `brand/mozart-app-icon-1024.png` — official high-resolution application icon.
- `brand/mozart-app-icon-256.png` — web-sized application icon.

## Hero artwork

- `hero/mozart-composer-transparent.png` — 1247 × 1261 transparent source cutout.
- `hero/mozart-composer-transparent-768.png` — responsive cutout.
- `hero/mozart-composer-base.png` and `hero/mozart-composer-base-768.png` — animation clean plate with the moving head and writing hand removed.
- `hero/mozart-composer-head.png` and `hero/mozart-composer-head-768.png` — exact head layer derived from the approved source cutout.
- `hero/mozart-composer-writing-hand.png` and `hero/mozart-composer-writing-hand-768.png` — writing hand and quill motion layer derived from the approved source cutout.
- `hero/mozart-composer-flame.png` and `hero/mozart-composer-flame-768.png` — candle-flame highlight layer derived from the approved source cutout.
- `hero/hero-atmosphere-4k.png` — lossless 3840 × 2160 source background.
- `hero/hero-atmosphere-4k.jpg` — compressed 4K web background.
- `hero/hero-atmosphere-1920.jpg` — default desktop web background.

The background and composer art contain no UI or localized text. The composer motion uses layered PNG assets and CSS keyframes; `prefers-reduced-motion` freezes the layers in their neutral pose. Render the headline, paragraph, carousel controls, evidence labels, and buttons with HTML/CSS.

## Real product screenshots

- `screenshots/performance-evidence-1710x1030.png` — Native performance slide; real Mozart IDE Debug build running the repository's safe `examples/mozart-review` fixture. Captured with macOS ScreenCaptureKit at the maximum 1710 × 984 window area, then centered without scaling or cropping on the required 1710 × 1030 canvas. It intentionally contains no unverified benchmark numbers.
- `screenshots/review-diff-1710x1030.png` — Review slide.
- `screenshots/official-agent-cli-1710x1030.png` — Official Agent slide, normalized to the carousel ratio.
- `screenshots/git-command-center-1710x1030.png` — Git slide.
- `screenshots/official-agent-cli.png` — original uncropped Agent capture.

All final carousel captures should use the same 1710 × 1030 viewport, dark theme, display scaling, window chrome, and safe demo repository. Remove tokens, usernames, private paths, and unrelated applications before capture.
