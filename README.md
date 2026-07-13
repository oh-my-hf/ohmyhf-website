# ohmyhf website

Marketing site for **ohmyhf** — an unofficial, open-source Hugging Face desktop client (Apache-2.0).

This repository builds a static Astro site (English at `/`, Simplified Chinese at `/zh/`) suitable for GitHub Pages or Cloudflare Pages.

> Not affiliated with Hugging Face, Inc. “Hugging Face” is a trademark of Hugging Face, Inc., used here only for referential purposes.

## Requirements

- Node.js 22.12+
- [pnpm](https://pnpm.io/) 10+

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:4321/](http://localhost:4321/) (English) and [http://localhost:4321/zh/](http://localhost:4321/zh/) (简体中文).

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `pnpm dev`      | Start the Astro dev server |
| `pnpm build`    | Production static build → `dist/` |
| `pnpm preview`  | Preview the production build |
| `pnpm lint`     | Run ESLint               |
| `pnpm format`   | Format with Prettier     |
| `pnpm generate:og` | Regenerate `public/og.png` (not part of build) |

## Build

```bash
pnpm build
```

Output is written to `dist/` and can be served by any static host.

## Deployment

### GitHub Pages

1. In the repository settings, enable **GitHub Pages** with source **GitHub Actions**.
2. Push to `main`. The workflow in `.github/workflows/build.yml` runs `pnpm lint`, `pnpm build`, uploads `dist/`, and deploys with `actions/deploy-pages` (deploy job is gated to `main`).
3. Optionally set a custom domain in Pages settings. Update `site` in `astro.config.mjs` to match.

### Cloudflare Pages

1. Create a Cloudflare Pages project linked to this repository.
2. Build settings:
   - **Framework preset:** None / Astro
   - **Build command:** `pnpm build`
   - **Build output directory:** `dist`
   - **Node version:** 22 (or set `NODE_VERSION=22` in environment variables)
3. Install command: `pnpm install` (enable pnpm in the Pages build image, or use `npx pnpm@10 install`).
4. Deploy on every push to `main` (or your chosen production branch).

## Screenshots

Product screenshots live in `public/` (e.g. `browse.png`, `home-feed.png`), captured from the `oh-my-hf/ohmyhf` desktop app — see [docs/media-replacement.md](docs/media-replacement.md) for the capture pipeline. The landing page uses them directly. Regenerate social assets with:

```bash
pnpm generate:favicon   # white-backed tab icon from public/icon-source.png
pnpm generate:og        # light OG image → public/og.png
pnpm fetch:release      # latest installers from oh-my-hf/ohmyhf Releases
```

`pnpm build` runs `fetch:release` automatically via `prebuild`.

## QA results (2026-07-09)

Lighthouse mobile (default emulation) against the production `dist/` build:

| Locale | Performance | Accessibility | Best Practices | SEO |
| ------ | ----------- | ------------- | -------------- | --- |
| `/` (en) | 97 | 100 | 100 | 100 |
| `/zh/` | 95 | 100 | 100 | 100 |

Baseline before QA fixes (same setup): Performance 98, Accessibility **92**, Best Practices 100, SEO 100 on both locales. Accessibility was raised by fixing fog opacity contrast, always-underlining in-text links, and removing demoted-card `opacity` that failed WCAG AA.

Also verified:

- **Responsive:** screenshots at 390 / 768 / 1024 / 1440; no horizontal overflow at 390 (`scrollWidth <= innerWidth`) for en and zh; hero window mockup degrades cleanly on mobile (sidebar icons + list, preview pane hidden until `lg`).
- **Keyboard / a11y:** skip-to-content link, `:focus-visible` iris outline, mobile menu `aria-expanded`, native `<details>`/`<summary>` FAQ, no positive `tabindex`, tap targets ≥44px on menu/lang controls.
- **`prefers-reduced-motion`:** hero/feature motion gated under `no-preference`; global reduce rule collapses remaining transitions/animations.
- **Hard requirements:** “unofficial” / “非官方” in hero + footer; full trademark disclaimer; no 🤗 / HF yellow accents; exactly two runtime scripts; no analytics/cookies; `lang` / hreflang / canonical / JSON-LD SoftwareApplication; sitemap + robots in `dist/`; Apache-2.0 LICENSE.

## License

Apache-2.0 — see [LICENSE](LICENSE). Copyright 2026 ohmyhf contributors.
