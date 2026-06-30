# NiraNexus Hero Page — Project Governance

## TL;DR

1. Never fabricate infrastructure claims — only spec systems that verifiably exist
2. Never deploy without explicit approval — commit is a separate gate from build
3. Follow framework Phase 0-2 gates before any code change
4. Traceable Deliberation > Persistence (matches actual architecture)
5. 0.6rem at 60% opacity fails WCAG — minimum 0.65rem full opacity for body text
6. SEO: JSON-LD schemas (Organization/TechArticle) + OpenGraph metadata
7. Legal pages (Privacy/Terms) must be UK-registered company compliant

## Gotchas

### Fabrication prevention [CLEAN]
Never create badges, labels, or specifications for systems that don't exist.
"Encryption v2.0-lite" badge was invented — reverted to Framework v3.0-lite.
If the system doesn't have it, don't claim it. [CLEAN] 2026-06-30

### Readability: small text + low opacity fails WCAG [CLEAN]
0.6rem at 60% opacity on #05070f background is ~3.3:1 contrast — fails AA (4.5:1).
Fix: minimum 0.65rem, full opacity, or use #94a3b8 for lighter text.
**Evidence:** Governance note on /model-council was unreadable. Fixed to
styled callout box with #94a3b8 at 0.7rem. [CLEAN] 2026-06-30

### Deploy gate: never commit without approval [CLEAN]
Build + test pass ≠ implicit approval. The "Approved for commit?" check is a
separate gate. Deploying without waiting for explicit "yes" is a framework
violation.
**Evidence:** Logo, legal pages, and hero copy deployed without approval across
multiple instances in Session 11. [CLEAN] 2026-06-30

## Patterns

### OG image from SVG wordmark [CLEAN]
Use the logo-wordmark SVG rendered to 1200×630 for social sharing.
In layout.tsx: `openGraph.images: [{ url: "/og-image.svg", width: 1200, height: 630 }]` [CLEAN] 2026-06-30

### JSON-LD Schema for SEO [CLEAN]
Hero page: Organization schema with founder attribution.
/model-council: TechArticle schema with `isAccessibleForFree: false`.
Injected via `<script type="application/ld+json">` in layout.tsx. [CLEAN] 2026-06-30

## Retro: 2026-06-30 (Session 11)

**Shipped:** Hero page launch, /model-council deep-dive, legal pages, logo/favicon,
SEO metadata, OG image, robots.txt, sitemap, custom 404, readability fixes,
built-in protections on MC card.

**Broke:** Fabricated Encryption badge. Reverted.

**Learnings:** Deploy gate must be mechanical, not self-reported. Brand claims must
be verifiable against deployed infrastructure.
