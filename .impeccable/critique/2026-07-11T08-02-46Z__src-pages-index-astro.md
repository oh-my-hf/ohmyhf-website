---
target: homepage (src/pages/index.astro)
total_score: 32
p0_count: 0
p1_count: 1
timestamp: 2026-07-11T08-02-46Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design-review fork · B: detector-evidence fork)

# Design Critique — ohmyhf homepage (`src/pages/index.astro`)

## Design Health Score: 32/40 — Good

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Download buttons give no file size; platform auto-detect highlight works |
| 2 | Match System / Real World | 4 | Fluent ML-engineer dialect; lone slip: "nsis" is packager jargon, not a user word |
| 3 | User Control and Freedom | 3 | Skip link + native `<details>` accordion are solid; mobile nav lacks Esc-to-close |
| 4 | Consistency and Standards | 3 | Dark theme shows full-brightness light screenshots on 4 of 5 feature rows |
| 5 | Error Prevention | 3 | Unsigned-macOS note sits below the download matrix, easy to miss at the moment it matters |
| 6 | Recognition Rather Than Recall | 4 | Everything visible and labeled; icon-only controls carry aria-labels |
| 7 | Flexibility and Efficiency | 3 | Direct release-asset links (no GitHub detour), anchors, persisted theme; nothing further for power users |
| 8 | Aesthetic and Minimalist Design | 3 | Uppercase mono eyebrow labels ×9; large dead whitespace in feature rows |
| 9 | Error Recovery | 2 | If the module script fails after `html.js` is set, hero stays `visibility: hidden` forever |
| 10 | Help and Documentation | 4 | FAQ answers the exact trust questions (official? tokens? cache compat?) |
| **Total** | | **32/40** | **Good — solid foundation, address weak areas** |

## Anti-Patterns Verdict

**Passes at a glance; template grammar shows on inspection.**

**LLM assessment (Assessment A):** Strong evidence against slop — real product screenshots in every section (theme-paired hero with honest "Not signed in" chrome), a palette that mirrors the actual app's light chrome rather than a category reflex, and audience-native copy ("A 300 GB cache folder you're afraid to open"). But the section grammar is the 2023 AI scaffold: **uppercase tracked mono eyebrows on all nine sections and feature rows** (BROWSE / FILTER / FILES / HOME / SPACES / ROADMAP / PRINCIPLES / GET THE APP / FAQ) — explicitly on the ban list — and the overall composition is the modal landing scaffold (centered hero → pain quote → alternating rows → 3-card roadmap → trust columns → download matrix → FAQ). Second-order check: from "HF desktop client landing page" you would guess cool grays + black pill + mono labels + framed screenshots, and that is exactly this page; it is defensible only because the palette is product truth. No side-stripes, gradient text, glassmorphism, hero metrics, 01/02/03 numbering, ghost-cards, or over-rounding.

**Deterministic scan (Assessment B):** CLI detector over `src` exited clean — **0 findings** (verified as a real scan of 20+ `.astro`/`.css`/`.ts` files, not a silent skip). In-browser detector found **7 findings, all `line-length`**: the six FAQ answer paragraphs render ~165 characters per line (1152 px wide at 14 px inside the `max-w-6xl` container, `src/components/FAQ.astro:81`), and the footer unofficial-disclaimer runs ~110 chars (`src/components/Footer.astro:44`). One partial false positive: the footer finding's reported "~165" magnitude is overstated (measured ~110), but it still exceeds the 65–75ch readable cap, so the finding stands.

**Where they diverge, both were right:** the detector caught the FAQ line-length problem the design review missed entirely; the design review caught the eyebrow cadence the deterministic ruleset never flagged.

**Visual overlays:** injection succeeded — overlays highlighting the 7 line-length findings are visible in the **[Human]** browser tab. The console reported "[impeccable] 7 anti-patterns found". Note: the dev server behind that tab has since been stopped, so don't reload it.

## Overall Impression

This is one of the more honest landing pages an unofficial client could ship: the product is shown, not described; the "unofficial" status is engineered into five separate touchpoints; contrast is verified AA everywhere. The biggest opportunity is robustness-as-design: the entrance choreography currently owns content visibility, and when GSAP doesn't run (background tab, screenshot bot, script failure) the page's hero is simply blank. Second: the page asserts trust in words nine times but never in numbers — no stars, no release date, no checksums — for an audience that trusts numbers over adjectives.

## What's Working

1. **Trust choreography.** Unofficial status appears at hero badge, principles, download note, FAQ #1, and footer; Trust immediately precedes Download; the unsigned-macOS reality is addressed with a link to signing docs. The site's core job per PRODUCT.md is genuinely engineered, not decorated.
2. **Show-the-product execution.** Real screenshots everywhere, theme-paired hero with `fetchpriority="high"` and explicit dimensions (no CLS), window-chrome frames at the system's 8px radius.
3. **Copy voice.** Headlines carry information ("Triple-pane browsing. Zero reloads."), and the pain interlude speaks the audience's exact anxiety.

## Priority Issues

1. **[P1] Content visibility is gated on GSAP's requestAnimationFrame.** `html.js [data-hero-*] { visibility: hidden }` plus `gsap.from()` reveals mean the H1, subtitle, CTAs, and product shot render blank whenever rAF doesn't tick. Reproduced live three times: a background/occluded tab showed a blank hero for 5+ seconds, and the zh page stayed blank through interaction. Also hits link-preview/screenshot bots, and a module-script failure leaves the hero hidden permanently (heuristic 9's score of 2). **Why it matters:** the first thing some visitors and every unfurl bot sees is an empty hero on a trust-sensitive site. **Fix:** make content visible by default; apply the hidden state via `gsap.set()` only when `document.visibilityState === 'visible'`; add a one-shot fallback that `clearProps` if the timeline hasn't started within ~1s; delete the CSS visibility gate. **Suggested command:** `$impeccable animate`.
2. **[P2] Dark theme shows light screenshots on 4 of 5 feature rows.** Only `browse` has a `-dark.png`; `srcDark: null` elsewhere (`src/components/Features.astro`). Full-brightness white rectangles on `#070b14` contradict DESIGN.md's "theme-paired screenshots." **Fix:** capture dark variants; interim, dim light shots in dark context. **Suggested command:** `$impeccable polish`.
3. **[P2] Eyebrow grammar ×9.** The banned uppercase-tracked-kicker cadence on every section and feature row. **Why it matters:** it's the single strongest "AI made this" tell on an otherwise distinctive page. **Fix:** delete eyebrows on feature rows (titles already carry the verb); keep at most one deliberate labeling device — ideally something Hub-native like a mono repo-path motif in a single location. **Suggested command:** `$impeccable quieter`.
4. **[P2] FAQ and footer line lengths far exceed readable measure.** Six FAQ answers render at ~165 chars/line; the footer disclaimer at ~110 (cap is 65–75ch). Detector-confirmed with overlays. **Why it matters:** these are the paragraphs doing the site's trust work, and they're the hardest to read. **Fix:** constrain FAQ answer text to `max-w-[70ch]` (the accordion frame can stay wide) and tighten the footer disclaimer. **Suggested command:** `$impeccable typeset`.
5. **[P2] Download choice architecture.** With platform unknown, three near-equal dark CTAs; with platform detected, the demotion (`opacity-80`) and active highlight (`border-iris/40`) are too subtle to steer. "nsis" is jargon; the unsigned-macOS note trails the whole matrix; no per-card link to the GitHub release for provenance-checkers. **Fix:** primary CTA style only on the detected card, secondary style elsewhere; label "exe installer"; move the unsigned note into the macOS card; add a "view on GitHub Releases" affordance. **Suggested command:** `$impeccable clarify`.

## Persona Red Flags

- **Jordan (first-timer):** "nsis" label means nothing to them. Otherwise the page assumes Hub familiarity by design, which PRODUCT.md sanctions. No blockers.
- **Riley (stress tester):** opening in a background tab → blank/frozen sections (reproduced); JS failure after `html.js` → permanently hidden hero; AppImage architecture unlabeled (deb implies amd64 only via filename). Theme persistence survives blocked localStorage (try/catch present — good).
- **Casey (mobile):** source review only (live viewport untested): 44px targets and full-width card CTAs look right, but the header Download pill is hidden below `sm`, so downloading requires a scroll or the menu.
- **Priya (privacy-sensitive ML engineer, impostor-allergic):** direct GitHub Releases URLs are good provenance, but the page offers no checksums and no per-card release link to verify assets — while the app itself advertises "sha256 checks." She will notice that asymmetry. No stars/release date to gauge project health.

## Minor Observations

- `src/components/mockups/` (5 components) are dead code — unreferenced by any page.
- Feature rows are five identical alternating compositions at max spacing; attention dies by row 4. Two screenshots lead with empty states ("Nothing selected", "Hub sign-in needed") — deflates demo energy. Worth a re-shoot with populated panes.
- FAQ `+` icon rotation won't visibly animate with the native `<details>` toggle.
- Footer mono links (GitHub / Releases / License) are `text-xs` with ~16px hit areas; only the language switch got `min-h-11`.
- Verified solid: contrast AA everywhere (body 10.3:1 light, 12.4:1 dark; faint 4.84:1 worst case), exact i18n key parity, proper reduced-motion handling (matchMedia + clearProps + CSS fallback), CLS-safe images, JSON-LD SoftwareApplication, H1 tracking -0.03em within the -0.04 floor.

## Questions to Consider

1. Would anyone miss the entrance animation? The product shot is the hero — what if the only motion were the app itself doing something (a short silent loop of triple-pane browsing)?
2. The page asserts trust in words nine times but never in numbers. What if GitHub proved it instead — build-time star count, release date, download tally, checksums per installer?
3. The Hub's real dialect isn't uppercase labels — it's repo paths. Where would a single `oh-my-hf/ohmyhf` mono path say more than "PRINCIPLES"?
