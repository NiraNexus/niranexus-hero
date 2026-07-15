'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SystemStatus {
  debates: number;
  models: number;
  status: string;
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

const REDUCED_MOTION = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Home() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [statusError, setStatusError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/status')
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setStatus)
      .catch(() => setStatusError(true));
  }, []);

  return (
    <main style={{ backgroundColor: '#05070f', color: '#cbd5e1', minHeight: '100vh', fontFamily: 'var(--font-body)' }} aria-label="NiraNexus homepage">

      {/* ═══════════════════════════════════════════════════════════
          ZONE 1 — THE FOUNDER + CONTROL PLANE
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '75vh', padding: '3rem 2rem', textAlign: 'center' }} aria-label="Founder introduction and NiraNexus control plane">

        <img src="/logo.svg" alt="" style={{ width: 72, height: 72, marginBottom: '1rem' }} aria-hidden="true" />

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#00ebd4', textShadow: '0 0 32px rgba(0, 235, 212, 0.3)', margin: 0 }}>
          NiraNexus
        </h1>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.05rem, 1.7vw, 1.25rem)', color: '#ffffff', maxWidth: 620, marginTop: '1.5rem', lineHeight: 1.8 }}>
          Named for my daughter <strong style={{ color: '#00ebd4' }}>Nishka</strong>. NiraNexus. Born from the conviction that AI shouldn&apos;t just generate text &mdash; it should deliberate like a hardened operational logic partner.
        </p>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#cbd5e1', maxWidth: 620, marginTop: '1rem', lineHeight: 1.7 }}>
          NiraNexus-OS is an operating system for auditable deliberation. Multi-model adversarial cross-examination. Provenance-signed verdicts. Same pipeline, same governance, across every component.
        </p>

        {/* Live Metrics */}
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem', flexWrap: 'wrap', justifyContent: 'center', minHeight: 90 }} aria-live="polite">
          {status ? (
            <>
              <Stat value={status.debates} label="Proven Decisions" sub="Audited via Supabase RLS" />
              <Stat value={`${status.models}x`} label="Active Models" sub="Multi-model deliberation stack" />
              <Stat value={status.status} label="System Status" sub="Framework v3.0 / 17-gate enforced" />
            </>
          ) : statusError ? (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#64748b' }}>System telemetry offline</p>
          ) : (
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ padding: '1.25rem 1.75rem', backgroundColor: 'rgba(10, 14, 26, 0.5)', borderRadius: 12, border: '1px solid rgba(0, 235, 212, 0.08)', minWidth: 150, textAlign: 'center' }}>
                  <div className="animate-pulse" style={{ width: 48, height: 24, backgroundColor: 'rgba(0, 235, 212, 0.1)', borderRadius: 4, margin: '0 auto' }} />
                  <div className="animate-pulse" style={{ width: 80, height: 12, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 3, margin: '0.5rem auto 0.25rem' }} />
                  <div className="animate-pulse" style={{ width: 100, height: 8, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 2, margin: '0 auto' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA — Control Plane Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginTop: '2.5rem', maxWidth: 780, width: '100%' }} role="navigation" aria-label="NiraNexus control plane">

                  {/* Model Council Tile */}
                  <a
                    href="https://model-council.niranexus.com"
                    style={{
                      display: 'block', textDecoration: 'none', color: 'inherit',
                      padding: '1.75rem 1.5rem',
                      backgroundColor: 'rgba(10, 14, 26, 0.5)',
                      borderRadius: 14,
                      border: '1px solid rgba(0, 235, 212, 0.14)',
                      textAlign: 'left',
                      transition: 'border-color 0.2s, background-color 0.2s',
                      outline: 'none',
                    }}
                    className="focus-visible:ring-2 focus-visible:ring-[#00ebd4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f]"
                    aria-label="Model Council — Adversarial Engine, live"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>Model Council</h2>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.12)', padding: '0.2rem 0.7rem', borderRadius: 10, textTransform: 'uppercase', letterSpacing: '1px' }} role="status">LIVE</span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                      The Adversarial Engine. Multi-model deliberation pipeline with auditable Evidence Basis. Opening Statements → Cross-Examination → Rebuttal → Synthesis.
                    </p>
                  </a>

                  {/* Veritas Tile */}
                  <a
                    href="/veritas"
                    style={{
                      display: 'block', textDecoration: 'none', color: 'inherit',
                      padding: '1.75rem 1.5rem',
                      backgroundColor: 'rgba(10, 14, 26, 0.5)',
                      borderRadius: 14,
                      border: '1px solid rgba(0, 235, 212, 0.14)',
                      textAlign: 'left',
                      transition: 'border-color 0.2s, background-color 0.2s',
                      outline: 'none',
                    }}
                    className="focus-visible:ring-2 focus-visible:ring-[#00ebd4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f]"
                    aria-label="Veritas — Professional Deliberation Engine, building"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>Veritas</h2>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#ffc107', backgroundColor: 'rgba(255, 193, 7, 0.12)', padding: '0.2rem 0.7rem', borderRadius: 10, textTransform: 'uppercase', letterSpacing: '1px' }} role="status">BUILDING</span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                      The Assurance Interface. Professional deliberation engine precision-tuned for legal, accounting, and consulting. Adversarial verification with provenance-signed artifacts.
                    </p>
                  </a>

                  {/* Record Tile — Coming Soon */}
                  <div
                    style={{
                      padding: '1.75rem 1.5rem',
                      backgroundColor: 'rgba(10, 14, 26, 0.25)',
                      borderRadius: 14,
                      border: '1px dashed rgba(0, 235, 212, 0.06)',
                      opacity: 0.65,
                      textAlign: 'left',
                    }}
                    aria-label="NiraNexus Record — coming soon"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>Record</h2>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#64748b', backgroundColor: 'rgba(100, 116, 139, 0.12)', padding: '0.2rem 0.7rem', borderRadius: 10, textTransform: 'uppercase', letterSpacing: '1px' }}>COMING SOON</span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                      Cross-system provenance and audit trail. Every deliberation artifact — from Model Council or Veritas — registered, indexed, and permanently verifiable.
                    </p>
                  </div>
                </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', marginTop: '1.5rem', textAlign: 'center' }}>
          <a href="https://log.niranexus.com" style={{ color: '#00EBD4', textDecoration: 'none' }} className="hover:underline focus-visible:ring-2 focus-visible:ring-[#00EBD4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f] focus-visible:outline-none rounded px-0.5">Read the operational record →</a>
        </p>

        {/* Scroll cue */}
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#64748b', marginTop: '3rem', opacity: 0.5, letterSpacing: '2px', background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
          className="focus-visible:ring-2 focus-visible:ring-[#00ebd4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f]"
          aria-label="Scroll to next section"
        >
          SCROLL
        </button>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════
          ZONE 2 — THE THESIS
          ═══════════════════════════════════════════════════════════ */}
      <RevealSection>
        <section style={{ padding: '5rem 2rem', maxWidth: 800, margin: '0 auto' }} aria-label="Architecture thesis">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#ffffff', textAlign: 'center', marginBottom: '0.5rem' }}>
            The Architecture of Trust
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#64748b', textAlign: 'center', maxWidth: 520, margin: '0 auto 3rem', lineHeight: 1.6 }}>
            Deliberation is the antidote to AI hallucination. Every system output is cross-examined by multiple frontier models before it reaches the user — whether through Model Council, Veritas, or any NiraNexus component.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            <Principle title="Deliberation over Generation" body="Four frontier models debate before answering. Three rounds of Opening Statements, Cross-Examination, and Rebuttal. One synthesized verdict. No single-model hallucination survives cross-examination. Every NiraNexus component inherits this pipeline." />
            <Principle title="Traceable Deliberation" body="Every system output produces a session-scoped, exportable artifact stored in a hardened Supabase backend. The adversarial process is preserved — your decision-path is traceable, not disposable." />
            <Principle title="Hardened over Open" body="Pre-code gates enforce mechanical compliance before any line ships. Row-Level Security governs every database query. OAuth 2.0 with JWT verification. AI infrastructure without governance is a liability." />
            <Principle title="Evidence Basis" body="Every system output includes an auditable Evidence Basis. Claims are labeled VERIFIED (retrieved evidence supports the claim), DISPUTED (conflicting evidence detected), or UNVERIFIED (insufficient data). The system surfaces its own limitations — not fabricated confidence." />
          </div>
        </section>
      </RevealSection>

      <Divider />

      {/* Verdict example */}
      <RevealSection>
        <section style={{ padding: '3rem 2rem', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Verdict Example</p>
          <div style={{ padding: '1.5rem', backgroundColor: 'rgba(10, 14, 26, 0.4)', borderRadius: 12, border: '1px solid rgba(0, 235, 212, 0.1)', textAlign: 'left', maxWidth: 560, margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
              &ldquo;Deploying agentic AI without mechanical governance gates is operationally unsafe. Pre-code enforcement, RLS, and quorum-based model validation are the minimum viable controls before production.&rdquo;
            </p>
            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(0, 235, 212, 0.08)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Evidence Basis</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem' }}>
                  <span style={{ color: '#4ADE80', flexShrink: 0 }}>VERIFIED</span>
                  <span style={{ color: '#94a3b8' }}>Google — Agents Whitepaper (Nov 2025): guardrails required for production</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem' }}>
                  <span style={{ color: '#4ADE80', flexShrink: 0 }}>VERIFIED</span>
                  <span style={{ color: '#94a3b8' }}>OWASP Top 10 for LLM Applications — prompt injection + output handling</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem' }}>
                  <span style={{ color: '#FFC107', flexShrink: 0 }}>DISPUTED</span>
                  <span style={{ color: '#94a3b8' }}>Gartner — autonomous agents &apos;safe enough&apos; by 2027 vs. 2028 (conflicting analyst timelines)</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════
          ZONE 3 — SYSTEM COMPONENTS
          ═══════════════════════════════════════════════════════════ */}
      <RevealSection>
        <section style={{ padding: '4rem 2rem', maxWidth: 900, margin: '0 auto' }} aria-label="System components" id="system-components">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#ffffff', textAlign: 'center', marginBottom: '2.5rem' }}>
            System Components
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#64748b', textAlign: 'center', marginBottom: '2rem' }}>
            Each component is a piece of the NiraNexus-OS. Not standalone products &mdash; a unified operating system for auditable deliberation.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: 960, margin: '0 auto' }}>

            {/* Model Council */}
            <a href="https://model-council.niranexus.com" style={{ display: 'block', textDecoration: 'none', color: 'inherit', minWidth: 0, outline: 'none' }} className="focus-visible:ring-2 focus-visible:ring-[#00ebd4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f] rounded-xl" aria-label="Model Council — The Adversarial Engine, live">
            <div style={{ padding: '2rem', backgroundColor: 'rgba(10, 14, 26, 0.4)', borderRadius: 12, border: '1px solid rgba(0, 235, 212, 0.12)', transition: 'border-color 0.2s', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>Model Council</h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: '0.2rem 0.7rem', borderRadius: 10, textTransform: 'uppercase', letterSpacing: '1px' }} role="status">LIVE</span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>The Adversarial Engine</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                Multi-model deliberation pipeline with auditable source verification. Opening Statements → Cross-Examination → Rebuttal → Synthesis. Document-augmented deliberation — upload PDFs via web or Telegram. Export to PDF, Markdown, or JSON — every file signed with NiraNexus provenance.
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', marginTop: '0.75rem', lineHeight: 1.6 }}>Mid-debate checkpoints &middot; Quorum enforcement &middot; Live web search + source verification &middot; Telegram bot integration</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', marginTop: '1rem', opacity: 0.7 }}>
                              model-council.niranexus.com &rarr;
                            </p>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', marginTop: '0.5rem', opacity: 0.7 }}>
                              <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push('/model-council'); }} style={{ color: '#00ebd4', cursor: 'pointer', outline: 'none' }} className="focus-visible:ring-2 focus-visible:ring-[#00ebd4] focus-visible:ring-offset-1 focus-visible:ring-offset-[#05070f] rounded" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); router.push('/model-council'); } }} role="link">
                                View Engineering Specification &rarr;
                              </span>
                            </p>
                          </div>
                        </a>

            {/* Veritas */}
            <a href="/veritas" style={{ display: 'block', textDecoration: 'none', color: 'inherit', minWidth: 0, outline: 'none' }} className="focus-visible:ring-2 focus-visible:ring-[#00ebd4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f] rounded-xl" aria-label="Veritas — The Assurance Interface, building">
            <div style={{ padding: '2rem', backgroundColor: 'rgba(10, 14, 26, 0.4)', borderRadius: 12, border: '1px solid rgba(0, 235, 212, 0.12)', transition: 'border-color 0.2s', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>Veritas</h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#ffc107', backgroundColor: 'rgba(255, 193, 7, 0.1)', padding: '0.2rem 0.7rem', borderRadius: 10, textTransform: 'uppercase', letterSpacing: '1px' }} role="status">BUILDING</span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>The Assurance Interface</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                The NiraNexus Engine, precision-tuned for professional expertise. Legal, accounting, and consulting professionals execute auditable deliberation with domain-specific frameworks of evidence, precedent, and regulatory compliance. Veritas does not generate text — it verifies intent.
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', marginTop: '0.75rem', lineHeight: 1.6 }}>Domain personas &middot; Provenance-signed artifacts &middot; Regulatory audit trails &middot; NiraNexus Record backing</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', marginTop: '1rem', opacity: 0.7 }}>
                View Engineering Specification &rarr;
              </p>
            </div>
          </a>

            {/* Record */}
            <div style={{ padding: '2rem', backgroundColor: 'rgba(10, 14, 26, 0.25)', borderRadius: 12, border: '1px dashed rgba(0, 235, 212, 0.06)', opacity: 0.65, minWidth: 0 }} aria-label="NiraNexus Record — coming soon">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>Record</h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#64748b', backgroundColor: 'rgba(100, 116, 139, 0.1)', padding: '0.2rem 0.7rem', borderRadius: 10, textTransform: 'uppercase', letterSpacing: '1px' }}>COMING SOON</span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Cross-System Provenance</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                Every deliberation artifact — from Model Council or Veritas — registered, indexed, and permanently verifiable. The Record is the infrastructure backbone: a single source of truth for cross-system audit trails and compliance evidence.
              </p>
            </div>
          </div>
        </section>
      </RevealSection>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════
          ZONE 4 — THE HARDENING
          ═══════════════════════════════════════════════════════════ */}
      <RevealSection>
        <footer style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: 700, margin: '0 auto' }} aria-label="System governance and founder">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.5rem' }}>The Hardening</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem', maxWidth: 520, margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
            Governance is not an afterthought. Every layer of NiraNexus-OS enforces its own integrity. Every component — Model Council, Veritas, and beyond — inherits the same hardened infrastructure. Same pipeline, same governance.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Badge label="Framework" value="v3.0" detail="17-gate enforcement" />
            <Badge label="Pre-Code Gate" value="17 Checks" detail="Mechanical enforcement" />
            <Badge label="RLS Policies" value="Enforced" detail="Row-Level Security" />
            <Badge label="Authentication" value="OAuth 2.0" detail="Google + JWT" />
            <Badge label="Export" value="PDF/MD/JSON" detail="Signed provenance" />
            <Badge label="Telegram" value="@Bot" detail="Deliberate from chat" />
          </div>
        </footer>
      </RevealSection>
    </main>
  );
}

function Stat({ value, label, sub }: { value: string | number; label: string; sub: string }) {
  return (
    <div style={{ padding: '1.25rem 1.75rem', backgroundColor: 'rgba(10, 14, 26, 0.5)', borderRadius: 12, border: '1px solid rgba(0, 235, 212, 0.08)', minWidth: 150, textAlign: 'center' }} role="status">
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', color: '#00ebd4', fontWeight: 700, textShadow: '0 0 14px rgba(0, 235, 212, 0.3)' }}>{value}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: '#ffffff', marginTop: '0.25rem' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#64748b', marginTop: '0.3rem', textTransform: 'uppercase', letterSpacing: '1px' }}>[SOURCE: SUPABASE_DB]</div>
    </div>
  );
}

function Principle({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ padding: '1.5rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.06)' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.6rem' }}>{title}</h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>{body}</p>
    </div>
  );
}

function Badge({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div style={{ padding: '0.5rem 1rem', backgroundColor: 'rgba(0, 235, 212, 0.05)', borderRadius: 20, border: '1px solid rgba(0, 235, 212, 0.1)', textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#00ebd4', fontWeight: 700, marginTop: '0.15rem' }}>{value}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#64748b', marginTop: '0.15rem' }}>{detail}</div>
    </div>
  );
}

function RevealSection({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useReveal();
  const prefersReduced = REDUCED_MOTION;

  return (
    <div
      ref={ref}
      style={{
        opacity: prefersReduced ? 1 : (visible ? 1 : 0),
        transform: prefersReduced ? 'none' : (visible ? 'translateY(0)' : 'translateY(24px)'),
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(0, 235, 212, 0.15), transparent)', margin: '0 2rem' }} aria-hidden="true" />;
}