# Screenshot pipeline

Marketing screenshots are real app captures, not mockups. They're generated from the
`oh-my-hf/ohmyhf` desktop app repo and copied into `src/assets/images/` here — there's no local
mockup/placeholder path in this repo anymore.

## Source of truth

In `ohmyhf/apps/desktop`:

```sh
pnpm build                    # electron-vite build, from the ohmyhf repo root
pnpm run test:screenshots     # CAPTURE_SCREENSHOTS=1 playwright test --config playwright.screenshots.config.ts
```

This drives the real Electron app (signed out, English, light + dark theme) through Browse,
Filter, Files, Home, Spaces, and a few not-yet-used views, and writes PNGs to
`ohmyhf/docs/screenshots/`. The capture steps live in
`apps/desktop/e2e/capture-screenshots.spec.ts`.

Copy the ones this site uses straight into `src/assets/images/` here, matching filenames:

| Site usage | Files |
| ---------- | ----- |
| Hero + Features · Browse | `browse.png`, `browse-dark.png` |
| Features · Filter | `filter-panel.png`, `filter-panel-dark.png` |
| Features · Files | `file-preview.png`, `file-preview-dark.png` |
| Features · Home | `home-feed.png`, `home-feed-dark.png` |
| Features · Spaces | `spaces-gallery.png`, `spaces-gallery-dark.png` |

`src/components/Features.astro` renders both a `srcDark` (shown via the `shot-dark` class
in dark theme) and the light `src`; only set `srcDark` once the dark capture actually exists,
otherwise the light shot gets the `shot-light-only` dimming treatment instead.

Images are imported (`astro:assets`) rather than referenced by URL, so overwriting a file here
with a refreshed capture produces a new content-hashed `/_astro/browse.<hash>.webp` URL on the
next build — visitors never get a stale cached copy of an old screenshot.

Captured but **not currently placed on any page**: `dataset-preview.png`, `pr-files.png`,
`space-runner.png`, `user-profile.png`, `post-page.png`, `settings-modal.png`. They're spare
material from the same capture run — useful if a future section wants them, otherwise leave
them out rather than padding the page with more alternating rows (see DESIGN.md's row-fatigue
note).

## Social share

`public/og.png` is generated separately, not from the app:

```sh
pnpm generate:og   # scripts/generate-og.mjs → public/og.png, 1200×630
```

## Conventions

- Always set explicit `width`/`height` (and `alt` from i18n) to avoid CLS.
- Do not introduce Hugging Face logos, mascots, 🤗 emoji, or HF brand yellow (`#FFD21E` and near).
- Coming soon / trust / download / FAQ sections intentionally have no product mockups.
