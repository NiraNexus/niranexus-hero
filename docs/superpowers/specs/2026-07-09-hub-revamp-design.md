# Hub Revamp — Product Hub to Control Plane (2026-07-09)

## Scope
Convert niranexus.com from a single-product "Model Council landing page" into a
multi-product platform dashboard ("NiraNexus Control Plane"). Three tiles
representing the product ecosystem, platform-level messaging, and a new Veritas
specification page.

## Changes

### 1. Hero + CTA Zone (page.tsx)
- Tagline: "Governance-first infrastructure for auditable AI deliberation"
  → "Operating System for Auditable Deliberation"
- Replace single "Continue to NiraNexus Model Council" button with 3-tile grid:
  - Veritas (BUILDING, amber) — links to /veritas
  - Model Council (LIVE, green) — links to model-council.niranexus.com
  - Record (COMING SOON, grey) — no link, placeholder

### 2. Architecture of Trust (page.tsx)
- "Every verdict includes..." → "Every system output includes..."
- Remove specific model names from first principle — use infrastructure language
- "Evidence Basis" → broaden to platform scope

### 3. System Components (page.tsx)
- Replace 2-tile grid with 3-tile platform grid:
  - Model Council: The Adversarial Engine
  - Veritas: The Assurance Interface
  - Record: Cross-product provenance and audit trail
- Each tile has role, status badge, description, and link

### 4. The Hardening (page.tsx)
- Keep badges as-is
- Add platform-level line: same pipeline, same governance across all products
- Gate check count: 15 → 17 (current gate has 17 checks)

### 5. Veritas Spec Page (NEW: veritas/page.tsx)
- Mirrors model-council/page.tsx structure
- The Mechanism, Professional Domains, Evidence Basis + Provenance Proof
  (explicitly links to NiraNexus Record), Export Pipeline, Roadmap
- Target: legal, accounting, compliance professionals

### 6. Layout (layout.tsx)
- Metadata: shift from single-product to platform language
- No structural changes to footer

## Design Constraints
- Same palette: #05070f bg, #00ebd4 (Tiffany Blue) accent, #cbd5e1 body
- Same fonts: DM_Serif_Display, Source_Serif_4, IBM_Plex_Mono
- WCAG AA+ throughout (focus-visible rings, sufficient contrast)
- Inline styles pattern (no CSS modules)
- 'use client' where interactivity needed (live metrics hook)
- niranexus.com domain

## Files
- src/app/page.tsx — modified (~60 lines changed)
- src/app/layout.tsx — modified (~5 lines)
- src/app/veritas/page.tsx — NEW (~250 lines)
