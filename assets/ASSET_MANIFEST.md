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
- `hero/mozart-composer-base-v2.png` and `hero/mozart-composer-base-v2-768.png` — animation clean plate that keeps the complete head, neck, wrists, and hands intact while removing only the feather quill.
- `hero/mozart-composer-quill.png` and `hero/mozart-composer-quill-768.png` — feather-quill motion layer derived from the approved source cutout.
- `hero/mozart-composer-flame.png` and `hero/mozart-composer-flame-768.png` — candle-flame highlight layer derived from the approved source cutout.
- `hero/hero-atmosphere-4k.png` — lossless 3840 × 2160 source background.
- `hero/hero-atmosphere-4k.jpg` — compressed 4K web background.
- `hero/hero-atmosphere-1920.jpg` — default desktop web background.

The background and composer art contain no UI or localized text. The composer motion keeps the figure anatomically intact and animates only the feather quill and candle highlight with CSS keyframes; `prefers-reduced-motion` freezes the layers in their neutral pose. Render the headline, paragraph, carousel controls, evidence labels, and buttons with HTML/CSS.

## Real product screenshots

- `screenshots/performance-evidence-1710x1030.png` — Native performance slide; real Mozart IDE Debug build running the repository's safe `examples/mozart-review` fixture. Captured with macOS ScreenCaptureKit at the maximum 1710 × 984 window area, then centered without scaling or cropping on the required 1710 × 1030 canvas. It intentionally contains no unverified benchmark numbers.
- `screenshots/review-diff-1710x1030.png` — Review slide.
- `screenshots/official-agent-cli-1710x1030.png` — Official Agent slide, normalized to the carousel ratio.
- `screenshots/git-command-center-1710x1030.png` — Git slide.
- `screenshots/official-agent-cli.png` — original uncropped Agent capture.

All final carousel captures should use the same 1710 × 1030 viewport, dark theme, display scaling, window chrome, and safe demo repository. Remove tokens, usernames, private paths, and unrelated applications before capture.

## Performance comparison

The performance carousel slot is rendered with HTML/CSS in `index.html` and `styles.css`, using the six user-supplied measurements in `app.js`. Hover, keyboard focus, or tap a metric to see its design rationale; the enlarge control opens a readable detail view on narrow screens. Global-search P95 is omitted until measured values are supplied.
