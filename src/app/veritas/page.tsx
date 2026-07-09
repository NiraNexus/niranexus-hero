'use client';

import Link from 'next/link';
import { ScrollToTop } from '@/components/ScrollToTop';

export default function VeritasPage() {
  return (
    <main style={{ backgroundColor: '#05070f', color: '#cbd5e1', minHeight: '100vh', fontFamily: 'var(--font-body)' }} aria-label="Veritas technical specification">

      {/* Breadcrumb */}
      <div style={{ padding: '1.5rem 2rem 0', maxWidth: 800, margin: '0 auto' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#00ebd4', textDecoration: 'none', outline: 'none' }} className="focus-visible:ring-2 focus-visible:ring-[#00ebd4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f] rounded">
          &larr; NiraNexus Home
        </Link>
      </div>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: '3rem 2rem 1rem', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <a href="/" title="NiraNexus home" style={{ display: 'flex', outline: 'none' }} className="focus-visible:ring-2 focus-visible:ring-[#00ebd4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f] rounded">
            <img src="/logo.svg" alt="NiraNexus" style={{ width: 32, height: 32 }} />
          </a>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', color: '#ffffff', margin: 0 }}>
            <span style={{ color: '#00ebd4', textShadow: '0 0 12px rgba(0, 235, 212, 0.3)' }}>NiraNexus</span>{' '}
            <span style={{ color: '#ffffff' }}>Veritas</span>
          </h1>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#64748b', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
          An engineering specification for the professional deliberation layer of NiraNexus-OS.
          Not a marketing page &mdash; a system transparency document.
        </p>
      </section>

      <Divider />

      {/* ═══ POSITIONING ═══ */}
      <section style={{ padding: '3rem 2rem', maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>
          Positioning
        </h2>
        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#ffffff', lineHeight: 1.8, textAlign: 'center', margin: 0 }}>
            Veritas is <strong style={{ color: '#00ebd4' }}>the NiraNexus Engine, precision-tuned for professional expertise</strong>.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.7, textAlign: 'center', marginTop: '1rem' }}>
            It is not a separate AI. It is the same adversarial deliberation pipeline that powers Model Council — deployed with domain-specific personas, regulatory frameworks, and professional-grade output standards for legal, accounting, and consulting professionals.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.7, textAlign: 'center', marginTop: '0.75rem' }}>
            <strong style={{ color: '#00ebd4' }}>Veritas does not generate text; it verifies intent.</strong>
          </p>
        </div>
      </section>

      <Divider />

      {/* ═══ THE MECHANISM ═══ */}
      <section style={{ padding: '3rem 2rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>
          The Mechanism
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.7, textAlign: 'center', maxWidth: 580, margin: '0 auto 2rem' }}>
          Veritas inherits the same 4-phase deliberation pipeline as Model Council. The difference is the domain context — legal precedents replace general knowledge, regulatory frameworks replace open-ended analysis.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <PhaseCard phase="01" title="Opening" label="Domain Context" body="Models ingest the professional query with domain-specific system prompts. Legal, accounting, or consulting frameworks frame the initial analysis." />
          <PhaseCard phase="02" title="Cross-Exam" label="Adversarial Logic" body="Models interrogate each other&apos;s interpretations. Precedent conflicts, regulatory gaps, and unsupported claims are surfaced and challenged." />
          <PhaseCard phase="03" title="Rebuttal" label="Refinement" body="Models incorporate peer critique. Positions that survive cross-examination gain evidentiary weight. Weak arguments collapse." />
          <PhaseCard phase="04" title="Synthesis" label="Provenance-Signed Verdict" body="The Council converges on a final verdict. Every claim is labeled against evidence. The output is signed with a NiraNexus Record provenance hash." />
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#94a3b8', textAlign: 'center', marginTop: '1.5rem', padding: '0.75rem 1rem', backgroundColor: 'rgba(0, 235, 212, 0.05)', borderRadius: 8, border: '1px solid rgba(0, 235, 212, 0.12)' }}>
          Same engine. Same pipeline. Same governance. Precision-tuned personas — zero new infrastructure.
        </p>
      </section>

      <Divider />

      {/* ═══ PROFESSIONAL DOMAINS ═══ */}
      <section style={{ padding: '3rem 2rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>
          Professional Domains
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Legal</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Adversarial verification of legal reasoning. Precedent cross-referencing. Citation validation. Regulatory compliance checks against jurisdictional frameworks. Every output produces a defensible audit trail for professional standards boards.
            </p>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Accounting</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Multi-model analysis of tax treatments, financial reporting standards, and audit procedures. Framework-specific deliberation (IFRS, GAAP). Discrepancy flagging with evidence-based explanations — not black-box outputs.
            </p>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Consulting</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Structural business logic encoded as adversarial deliberation. Strategy validation with forced counter-factual analysis. Market intelligence synthesis with source-level provenance. Board-ready artifacts.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ EVIDENCE BASIS + PROVENANCE PROOF ═══ */}
      <section style={{ padding: '3rem 2rem', maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>
          Evidence Basis &amp; Provenance Proof
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, textAlign: 'center', maxWidth: 560, margin: '0 auto 2rem' }}>
          Every Veritas deliberation produces an auditable Evidence Basis. Claims are labeled against retrieved evidence — not asserted from parametric memory. The provenance trail is permanently registered in the NiraNexus Record, providing a cross-product, immutable audit log.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#4ADE80', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>VERIFIED</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Retrieved evidence directly supports the claim. Source URL, title, and retrieval timestamp captured in the Record.
            </p>
          </div>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#FFC107', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>DISPUTED</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Retrieved evidence conflicts exist. The adversarial pipeline actively detects contradictions — conflicting statutes, split authority, competing standards.
            </p>
          </div>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>UNVERIFIED</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Information is insufficient, stale, or low-quality. The system surfaces its own limitations — no fabricated confidence. Flagged for human review.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.2)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.06)' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>NiraNexus Record Integration</h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            Every Veritas deliberation is registered in the <strong style={{ color: '#00ebd4' }}>NiraNexus Record</strong> — the cross-product provenance ledger. Each artifact receives a unique verification hash. Regulators, auditors, and professional standards bodies can verify that a deliberation occurred, which models participated, what evidence was retrieved, and how the final verdict was reached. The Record transforms AI-assisted professional judgment from a black box into a defensible system of record.
          </p>
        </div>
      </section>

      <Divider />

      {/* ═══ EXPORT PIPELINE ═══ */}
      <section style={{ padding: '3rem 2rem', maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>
          Export Pipeline
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, textAlign: 'center', maxWidth: 560, margin: '0 auto 2rem' }}>
          Every Veritas deliberation can be exported in three formats. All files carry a NiraNexus provenance signature with Record verification hash — the deliberation artifact is self-documenting and regulator-ready.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>PDF</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Print-optimized. Structured layout with NiraNexus Record provenance footer. WCAG-compliant contrast. Suitable for board submissions and regulatory filings.
            </p>
          </div>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Markdown</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Structured document with Record provenance footer. Compatible with any markdown renderer. Human-readable deliberation log with full evidence linkage.
            </p>
          </div>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>JSON</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Machine-readable. Includes <code style={{ color: '#00ebd4', background: 'none' }}>_source</code> and <code style={{ color: '#00ebd4', background: 'none' }}>_record_hash</code> provenance fields. Ready for programmatic audit consumption.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ ROADMAP ═══ */}
      <section style={{ padding: '3rem 2rem', maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>
          Development Status
        </h2>
        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)', maxWidth: 480, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ffc107', flexShrink: 0 }} aria-hidden="true" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#ffc107', textTransform: 'uppercase', letterSpacing: '1px' }} role="status">In Development</span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            Veritas is the second component of NiraNexus-OS. Built on the same engine, pipeline, and governance as Model Council. No new infrastructure required — domain-specific personas, professional output standards, and a dedicated interface.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.7, marginTop: '0.75rem' }}>
            Estimated build: 1-2 days. Same pattern as Model Council: deliberation engine + professional personas + landing page.
          </p>
        </div>
      </section>

      <Divider />

      {/* ═══ CTA ═══ */}
      <section style={{ padding: '3rem 2rem', maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', marginBottom: '1.5rem' }}>
          Veritas will be accessible at <code style={{ color: '#00ebd4', background: 'none' }}>veritas.niranexus.com</code>
        </p>
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(0, 235, 212, 0.05)', borderRadius: 8, border: '1px solid rgba(0, 235, 212, 0.12)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', margin: 0, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            [SYSTEM_ACCESS_NOTICE]
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#94a3b8', margin: '0.5rem 0 0', lineHeight: 1.5 }}>
            Veritas will require authenticated session handling via Google OAuth to maintain professional audit trails and data integrity.
          </p>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#64748b', marginTop: '1.5rem' }}>
          <Link href="/" style={{ color: '#64748b', outline: 'none' }} className="focus-visible:ring-2 focus-visible:ring-[#00ebd4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f] rounded">NiraNexus Home</Link>
          &nbsp;|&nbsp; <a href="https://model-council.niranexus.com" style={{ color: '#64748b', outline: 'none' }} className="focus-visible:ring-2 focus-visible:ring-[#00ebd4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f] rounded">Model Council</a>
          &nbsp;|&nbsp; <a href="/privacy" style={{ color: '#64748b', outline: 'none' }} className="focus-visible:ring-2 focus-visible:ring-[#00ebd4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f] rounded">Privacy</a>
          &nbsp;|&nbsp; <a href="/terms" style={{ color: '#64748b', outline: 'none' }} className="focus-visible:ring-2 focus-visible:ring-[#00ebd4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f] rounded">Terms</a>
        </p>
      </section>

      <ScrollToTop />
    </main>
  );
}

function PhaseCard({ phase, title, label, body }: { phase: string; title: string; label: string; body: string }) {
  return (
    <div style={{ padding: '1.5rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)', transition: 'transform 0.2s, border-color 0.2s' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: '#00ebd4', fontWeight: 700, marginBottom: '0.5rem' }}>
        {phase}.
      </div>
      <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>
        {title}
      </h3>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>
        {label}
      </p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
        {body}
      </p>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(0, 235, 212, 0.15), transparent)', margin: '0 2rem' }} aria-hidden="true" />;
}