'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ScrollToTop } from '@/components/ScrollToTop';

interface SystemStatus {
  debates: number;
  models: number;
  status: string;
}

export default function ModelCouncilPage() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [statusError, setStatusError] = useState(false);

  useEffect(() => {
    fetch('/api/status')
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setStatus)
      .catch(() => setStatusError(true));
  }, []);

  return (
    <main style={{ backgroundColor: '#05070f', color: '#cbd5e1', minHeight: '100vh', fontFamily: 'var(--font-body)' }} aria-label="Model Council technical deep-dive">
      {/* Sticky nav banner — persists during scroll */}
            <div style={{ position: 'sticky', top: 0, zIndex: 10, padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', backgroundColor: 'rgba(5, 7, 15, 0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(0, 235, 212, 0.1)' }}>
              <Link
                href="/"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#00ebd4', textDecoration: 'underline', textShadow: '0 0 10px rgba(0, 235, 212, 0.3)', outline: 'none' }}
                className="focus-visible:ring-2 focus-visible:ring-[#00ebd4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f] rounded"
              >
                &larr; NiraNexus Home
              </Link>
            </div>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: '3rem 2rem 1rem', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <a href="/" title="NiraNexus home" style={{ display: 'flex' }}>
            <img src="/logo.svg" alt="NiraNexus" style={{ width: 32, height: 32 }} />
          </a>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', color: '#ffffff', margin: 0 }}>
            <span style={{ color: '#00ebd4', textShadow: '0 0 12px rgba(0, 235, 212, 0.3)' }}>NiraNexus</span>{' '}
            <span style={{ color: '#ffffff' }}>Model Council</span>
          </h1>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#64748b', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
          An engineering specification for the deliberative infrastructure powering NiraNexus-OS.
          Not a marketing page &mdash; a system transparency document.
        </p>
      </section>

      <Divider />

      {/* ═══ SECTION 1 — THE DELIBERATION STACK ═══ */}
      <section style={{ padding: '3rem 2rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>
          The Mechanism
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <PhaseCard phase="01" title="Opening" label="Contextual Input" body="Models ingest the query, applying foundational system prompts. Each model independently formulates its initial hypothesis." />
          <PhaseCard phase="02" title="Cross-Exam" label="Adversarial Logic" body="Models interrogate each other's assumptions and data. Unsupported claims are surfaced, challenged, and discarded." />
          <PhaseCard phase="03" title="Rebuttal" label="Refinement" body="Models incorporate peer critique to strengthen positions. Weak arguments collapse; strong evidence gains consensus weight." />
          <PhaseCard phase="04" title="Synthesis" label="Governed Verdict" body="The Council converges on a final, synthesized verdict. Validated against hardened protocols with a statistical confidence score." />
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#94a3b8', textAlign: 'center', marginTop: '1.5rem', padding: '0.75rem 1rem', backgroundColor: 'rgba(0, 235, 212, 0.05)', borderRadius: 8, border: '1px solid rgba(0, 235, 212, 0.12)' }}>
          Deliberations may conclude prior to Round 3 if a definitive verdict is reached or if budget thresholds are triggered, ensuring cost-efficiency and protection.
        </p>

        {/* Tool-Augmented Deliberation */}
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.12)' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
            Tool-Augmented Deliberation
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            When enabled, the deliberative stack executes a deterministic 3-phase cycle:
          </p>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(0, 235, 212, 0.04)', borderRadius: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px' }}>Phase A (Intent)</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#A5B4D0', marginLeft: '0.75rem' }}>Model evaluates evidence necessity; declares requisite tool usage.</span>
            </div>
            <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(0, 235, 212, 0.04)', borderRadius: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px' }}>Phase B (Execute)</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#A5B4D0', marginLeft: '0.75rem' }}>Tool calls processed via circuit breakers (loop detection, 6-call/debate budget).</span>
            </div>
            <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(0, 235, 212, 0.04)', borderRadius: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px' }}>Phase C (Generate)</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#A5B4D0', marginLeft: '0.75rem' }}>Tool output synthesized into deliberation; provenance tagged as VERIFIED and persisted to the Evidence Basis.</span>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ SECTION 2 — USE CASES ═══ */}
      <section style={{ padding: '3rem 2rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>
          Deliberation Blueprints
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Market Intelligence</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Multi-model synthesis of technical analysis, macro indicators, and risk signals into high-conviction decision paths.
            </p>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Security & Compliance</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Automated SRE audits &mdash; scanning for insecure configurations, exposed variables, and deployment vulnerabilities via structured adversarial deliberation.
            </p>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Systemic Consulting</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Encoded business logic providing a structural Founder&apos;s lens to complex operational decisions with adversarial validation.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ EVIDENCE BASIS ═══ */}
      <section style={{ padding: '3rem 2rem', maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>
          Evidence Basis
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, textAlign: 'center', maxWidth: 560, margin: '0 auto 2rem' }}>
          Every verdict includes an auditable Evidence Basis — an audit trail of live-retrieved sources, not a bibliography of fabricated references. Claims are labeled against evidence, not asserted from parametric memory.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#4ADE80', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>VERIFIED</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Retrieved evidence directly supports the claim. Source URL, title, and retrieval timestamp captured.
            </p>
          </div>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#FFC107', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>DISPUTED</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Retrieved evidence conflicts exist. The system actively detects data contradictions rather than blindly aggregating sources.
            </p>
          </div>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>UNVERIFIED</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Information is insufficient, stale, or low-quality. The system surfaces its own limitations — no fabricated confidence.
            </p>
          </div>
        </div>
        <div style={{ marginTop: '2rem', padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.2)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.06)' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Operational Mechanics</h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            Per-model source attribution ensures clear provenance for every claim. Evidence is retrieved via live web search during deliberation — never from parametric memory. Mechanical anti-fabrication discipline is enforced: sources without retrievable URLs are rejected. Claims without supporting evidence are flagged, not invented.
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
          Every deliberation can be exported in three formats. All files carry a NiraNexus provenance signature — the deliberation record is self-documenting and portable.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>PDF</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Print-optimized. Structured layout with NiraNexus signature footer. WCAG-compliant contrast.
            </p>
          </div>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Markdown</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Structured document with provenance footer. Compatible with any markdown renderer or text editor.
            </p>
          </div>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>JSON</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Machine-readable. Includes <code style={{ color: '#00ebd4', background: 'none' }}>_source</code> provenance field. Ready for programmatic consumption.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ DOCUMENT-AUGMENTED DELIBERATION ═══ */}
      <section style={{ padding: '3rem 2rem', maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>
          Document-Augmented Deliberation
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, textAlign: 'center', maxWidth: 560, margin: '0 auto 2rem' }}>
          Upload a text-based PDF via the deliberation page or send one directly to the Telegram bot. The Council cross-examines your document — models are grounded in the source text, not parametric memory. Claims are verified against the uploaded material, not the model&apos;s training data. Image-heavy or scanned documents contain insufficient extractable text and may not ground the deliberation.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Web Upload</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Attach a text-based PDF on the deliberation page. Text is extracted and injected into the Council pipeline. Image-heavy or scanned documents may not provide sufficient extractable text. Max 10MB.
            </p>
          </div>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Telegram Upload</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Send a text-based PDF to @NiraNexus_ModelCouncilBot, then run /deliberate with your question. Same pipeline, same governance. Image-heavy or scanned PDFs may not ground the deliberation.
            </p>
          </div>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Grounded Adversarial Review</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Models cross-examine each other&apos;s interpretations of the source document. Fabricated claims are detected and discarded — the text is the ground truth.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ TELEGRAM INTEGRATION ═══ */}
      <section style={{ padding: '3rem 2rem', maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>
          Telegram Integration
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, textAlign: 'center', maxWidth: 560, margin: '0 auto 2rem' }}>
          The Council is accessible as a Telegram bot. Deliberate from any device without opening a browser. Same models, same governance — a new entry point, not a separate component.
        </p>
        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)', maxWidth: 480, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#00ebd4', marginBottom: '1rem' }}>
            @NiraNexus_ModelCouncilBot
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#94a3b8' }}>
            <div><code style={{ color: '#00ebd4', background: 'none' }}>/deliberate &lt;question&gt;</code> — Submit a question to the Council</div>
            <div><code style={{ color: '#00ebd4', background: 'none' }}>/deliberate &lt;question&gt; +mcp</code> — Live research with web search</div>
            <div><code style={{ color: '#00ebd4', background: 'none' }}>/status</code> — View quota and model availability</div>
            <div><code style={{ color: '#00ebd4', background: 'none' }}>/link &lt;code&gt;</code> — Link this Telegram to your account</div>
            <div><code style={{ color: '#00ebd4', background: 'none' }}>/clear</code> — Remove attached document context</div>
            <div><code style={{ color: '#00ebd4', background: 'none' }}>/cancel</code> — Stop a running deliberation</div>
            <div><code style={{ color: '#00ebd4', background: 'none' }}>/api</code> — View API documentation</div>
            <div><code style={{ color: '#00ebd4', background: 'none' }}>/start</code> — Welcome, help, and consumption rates</div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ PUBLIC EVIDENCE LAYER ═══ */}
      <section style={{ padding: '3rem 2rem', maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>
          Public Evidence Layer
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, textAlign: 'center', maxWidth: 560, margin: '0 auto 2rem' }}>
          Every deliberation produces a shareable public record. No authentication required to view. Source attribution, confidence scores, dissent tracking, and evidence basis — all publicly auditable.
        </p>
        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)', maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
            Example: model-council.niranexus.com/debate/[id]
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
            Every Council deliberation produces a shareable public URL.
          </p>
        </div>
      </section>

      <Divider />

      {/* ═══ SYSTEM OBSERVABILITY ═══ */}
      <section style={{ padding: '3rem 2rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>
          System Observability
        </h2>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {status ? (
            <>
              <LiveMetric value={status.debates} label="Proven Decisions" sub="[SOURCE: SUPABASE_DB]" />
              <LiveMetric value={`${status.models}x`} label="Active Models" sub="[MULTI-MODEL STACK]" />
              <LiveMetric value={status.status} label="System Status" sub="[RLS: ENFORCED]" />
            </>
          ) : statusError ? (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#64748b' }}>Telemetry unavailable</p>
          ) : (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#64748b' }}>System initializing&hellip;</p>
          )}
        </div>
      </section>

      <Divider />

      {/* ═══ GOVERNANCE COCKPIT ═══ */}
      <section style={{ padding: '3rem 2rem', maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>
          Governance Cockpit
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, textAlign: 'center', maxWidth: 560, margin: '0 auto 2rem' }}>
          Infrastructure-grade operational controls. The governance cockpit provides real-time observability, emergency intervention, and audit capabilities — not an afterthought, a first-class system layer. Founder-access only.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#FF6B6B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Kill Switch</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Emergency stop for all active deliberations. Layered at API and engine yield points.
            </p>
          </div>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Quota Monitor</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Real-time debate tracking with progressive enforcement. Circuit breaker at pre-flight and round boundaries.
            </p>
          </div>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#FFC107', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Model Health</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Real-time success rates, error counts, and per-model latency. Daily automated audit against live OpenRouter roster.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* EXECUTION METRICS */}
      <section style={{ padding: '3rem 2rem', maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>Execution Metrics</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          Every deliberation records execution metrics: models deployed, calls executed, fallbacks triggered, verdict production, duration, and token estimates. Clinical labels — STATE_VERDICT, CALLS_EXECUTED — keep the data transparent. Metrics appear in the in-app viewer, public records, and export files.
        </p>
      </section>

      <Divider />

      {/* DELIBERATION TEMPLATES */}
      <section style={{ padding: '3rem 2rem', maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>Deliberation Templates</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, textAlign: 'center', maxWidth: 560, margin: '0 auto 2rem' }}>
          Jump-start any deliberation with pre-built templates. Compare, Decide, Review, Validate — four structured prompts that cover the most common deliberation patterns. Click a chip, edit the prompt, convene the Council.
        </p>
      </section>

      <Divider />

      {/* API ACCESS */}
      <section style={{ padding: '3rem 2rem', maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>API Access</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          Programmatic deliberation via REST API with SSE streaming. POST /api/deliberate with Bearer JWT auth. Same engine, same governance, same quota enforcement. GET /api/deliberate for interactive documentation.
        </p>
      </section>

      <Divider />

      {/* ═══ FOUNDER'S LOGIC ═══ */}
      <section style={{ padding: '3rem 2rem', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>
          The Founder&apos;s Logic
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#ffffff', lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
          NiraNexus-OS was born from the conviction that AI shouldn&apos;t just generate text &mdash; it should deliberate like an expert.
          This Council is the implementation of that conviction. By subjecting frontier models to adversarial cross-examination before
          committing a verdict to our hardened Supabase backend, we enforce mechanical compliance at every layer.
          Agentic infrastructure, not a wrapper.
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', marginTop: '1.5rem', opacity: 0.6 }}>
          Founded by Rakesh Maheswaran. Combining enterprise consulting rigour with modern systems engineering.
        </p>
      </section>

      <Divider />

      {/* ═══ CTA ═══ */}
      <section style={{ padding: '3rem 2rem', maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
        <a
          href="https://model-council.niranexus.com"
          style={{
            display: 'inline-block',
            padding: '0.9rem 2.5rem',
            backgroundColor: '#00ebd4',
            color: '#05070f',
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 700,
            borderRadius: 50,
            textDecoration: 'underline',
            boxShadow: '0 4px 20px rgba(0, 235, 212, 0.35)',
          }}
        >
          Click to Deliberate
        </a>
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'rgba(0, 235, 212, 0.05)', borderRadius: 8, border: '1px solid rgba(0, 235, 212, 0.12)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', margin: 0, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            [SYSTEM_ACCESS_NOTICE]
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#94a3b8', margin: '0.5rem 0 0', lineHeight: 1.5 }}>
            Accessing the Council requires authenticated session handling via Google OAuth to maintain SOC 2-ready compliance data integrity and professional audit trails.
          </p>
        </div>
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

function LiveMetric({ value, label, sub }: { value: string | number; label: string; sub: string }) {
  return (
    <div style={{ padding: '1.25rem 1.75rem', backgroundColor: 'rgba(10, 14, 26, 0.5)', borderRadius: 12, border: '1px solid rgba(0, 235, 212, 0.08)', minWidth: 150, textAlign: 'center' }} role="status">
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', color: '#00ebd4', fontWeight: 700, textShadow: '0 0 14px rgba(0, 235, 212, 0.3)' }}>{value}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: '#ffffff', marginTop: '0.25rem' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#64748b', marginTop: '0.3rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{sub}</div>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(0, 235, 212, 0.15), transparent)', margin: '0 2rem' }} aria-hidden="true" />;
}
