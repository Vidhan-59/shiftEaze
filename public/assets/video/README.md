# Product video

Drop a short, muted, looping product walkthrough here to power the "See it in
motion" section.

| Filename                | Used in                          |
| ----------------------- | -------------------------------- |
| `product-overview.mp4`  | `MotionShowcase` (the tour band) |

## Recommended export

- Format: **MP4 (H.264)**, muted, ~15–45s, designed to loop seamlessly.
- Aspect ratio near **1200 : 620**; ~1080p is plenty. Keep it compressed
  (target a few MB) — it autoplays inline on load.
- Optional: add a `poster` still and pass it via the `ProductVideo` `poster` prop.

Until you add it, `ProductVideo` shows an animated live-preview fallback, so the
section is never broken.
