'use client';

import { useState, useEffect, useRef } from 'react';

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

  useEffect(() => {
    fetch('/api/status')
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setStatus)
      .catch(() => setStatusError(true));
  }, []);

  return (
    <main style={{ backgroundColor: '#05070f', color: '#cbd5e1', minHeight: '100vh', fontFamily: 'var(--font-body)' }} aria-label="NiraNexus homepage">

      {/* ═══════════════════════════════════════════════════════════
          ZONE 1 — THE FOUNDER
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '75vh', padding: '3rem 2rem', textAlign: 'center' }} aria-label="Founder introduction">

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#00ebd4', textShadow: '0 0 32px rgba(0, 235, 212, 0.3)', margin: 0 }}>
          NiraNexus
        </h1>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.05rem, 1.7vw, 1.25rem)', color: '#ffffff', maxWidth: 620, marginTop: '1.5rem', lineHeight: 1.8 }}>
          Named for my daughter <strong style={{ color: '#00ebd4' }}>Nishka</strong>. Born from the conviction that AI shouldn&apos;t just generate text &mdash; it should deliberate like an expert.
        </p>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#64748b', maxWidth: 560, marginTop: '1rem', lineHeight: 1.7 }}>
          Combining over a decade of systems thinking with a multi-model stack, I am building the infrastructure I wish I had: an <strong style={{ color: '#ffffff' }}>Agentic Fortress</strong>.
        </p>

        {/* Live Metrics */}
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem', flexWrap: 'wrap', justifyContent: 'center', minHeight: 90 }} aria-live="polite">
          {status ? (
            <>
              <Stat value={status.debates} label="Proven Decisions" sub="Audited via Supabase RLS" />
              <Stat value={`${status.models}x`} label="Active Models" sub="Multi-model deliberation stack" />
              <Stat value={status.status} label="System Status" sub="Framework v3.0-lite enforced" />
            </>
          ) : statusError ? (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#64748b' }}>System telemetry offline</p>
          ) : (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#64748b' }}>Awaiting telemetry&hellip;</p>
          )}
        </div>

        {/* CTA */}
        <a
          href="https://model-council.niranexus.com"
          style={{
            display: 'inline-block',
            marginTop: '2rem',
            padding: '0.9rem 2.5rem',
            backgroundColor: '#00ebd4',
            color: '#05070f',
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 700,
            borderRadius: 50,
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(0, 235, 212, 0.35)',
          }}
          aria-label="Continue to NiraNexus Model Council"
        >
          Continue to NiraNexus Model Council
        </a>

        {/* Scroll cue */}
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#64748b', marginTop: '3rem', opacity: 0.5, letterSpacing: '2px' }}>
          SCROLL
        </p>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════
          ZONE 2 — THE THESIS
          ═══════════════════════════════════════════════════════════ */}
      <RevealSection>
        <section style={{ padding: '5rem 2rem', maxWidth: 800, margin: '0 auto' }} aria-label="Architecture thesis">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#ffffff', textAlign: 'center', marginBottom: '0.5rem' }}>
            The Architecture of Trust
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#64748b', textAlign: 'center', maxWidth: 520, margin: '0 auto 3rem', lineHeight: 1.6 }}>
            Deliberation is the antidote to AI hallucination. My systems don&apos;t just guess &mdash; they cross-examine, synthesize, and enforce governance at every layer.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            <Principle title="Deliberation over Generation" body="Four frontier models debate before answering. Three rounds of Opening Statements, Cross-Examination, and Rebuttal. One synthesized verdict. No single-model hallucination survives cross-examination." tags={['GPT-5.5 Pro', 'DeepSeek R1', 'Claude Sonnet', 'Qwen 3.7']} />
            <Principle title="Persistence over Ephemerality" body="Every claim, dissenting opinion, and confidence score is stored in Supabase. The system learns from its own reasoning history — debates are auditable, not disposable." />
            <Principle title="Hardened over Open" body="Pre-code gates enforce mechanical compliance before any line ships. Row-Level Security governs every database query. OAuth 2.0 with JWT verification. AI infrastructure without governance is a liability." />
          </div>
        </section>
      </RevealSection>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════
          ZONE 3 — SYSTEM COMPONENTS
          ═══════════════════════════════════════════════════════════ */}
      <RevealSection>
        <section style={{ padding: '4rem 2rem', maxWidth: 800, margin: '0 auto' }} aria-label="System components">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#ffffff', textAlign: 'center', marginBottom: '2.5rem' }}>
            System Components
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#64748b', textAlign: 'center', marginBottom: '2rem' }}>
            Each component is a piece of the NiraNexus-OS. Not standalone products &mdash; a unified agentic infrastructure.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: 900, margin: '0 auto' }}>
            {/* Model Council */}
            <a href="https://model-council.niranexus.com" style={{ display: 'block', textDecoration: 'none', color: 'inherit', minWidth: 0 }} aria-label="Model Council — live product">
            <div style={{ padding: '2rem', backgroundColor: 'rgba(10, 14, 26, 0.4)', borderRadius: 12, border: '1px solid rgba(0, 235, 212, 0.12)', transition: 'border-color 0.2s', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>Model Council</h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: '0.2rem 0.7rem', borderRadius: 10, textTransform: 'uppercase', letterSpacing: '1px' }} role="status">LIVE</span>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                A multi-model deliberation engine. Opening Statements &rarr; Cross-Examination &rarr; Rebuttal &rarr; Synthesis. Google OAuth, quota enforcement, persistent verdicts.
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ebd4', marginTop: '1rem', opacity: 0.7 }}>
                model-council.niranexus.com &rarr;
              </p>
            </div>
          </a>

            {/* Next Component */}
            <div style={{ padding: '2rem', backgroundColor: 'rgba(10, 14, 26, 0.25)', borderRadius: 12, border: '1px dashed rgba(0, 235, 212, 0.06)', opacity: 0.6, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>Next Component</h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#ffc107', backgroundColor: 'rgba(255, 193, 7, 0.1)', padding: '0.2rem 0.7rem', borderRadius: 10, textTransform: 'uppercase', letterSpacing: '1px' }}>IN DEVELOPMENT</span>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                The next component of the NiraNexus-OS. What gets built is determined by what the infrastructure makes possible.
              </p>
            </div>
          </div>
        </section>
      </RevealSection>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════
          ZONE 4 — GOVERNANCE
          ═══════════════════════════════════════════════════════════ */}
      <RevealSection>
        <footer style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: 700, margin: '0 auto' }} aria-label="System governance and founder">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.5rem' }}>The Hardening</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#64748b', marginBottom: '2rem', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.5 }}>
            Governance is not an afterthought. Every layer of NiraNexus-OS enforces its own integrity.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Badge label="Framework" value="v3.0-lite" detail="8-phase governance" />
            <Badge label="Pre-Code Gate" value="14 Checks" detail="Mechanical enforcement" />
            <Badge label="RLS Policies" value="Enforced" detail="Row-Level Security" />
            <Badge label="Authentication" value="OAuth 2.0" detail="Google + JWT" />
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', marginTop: '3rem' }}>
            NiraNexus-OS &copy; {new Date().getFullYear()} &mdash; Founded by Rakesh Maheswaran. Agentic infrastructure, not a wrapper.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#64748b', marginTop: '0.75rem', opacity: 0.6 }}>
            NiraNexus Ltd — Registered in England and Wales &nbsp;|&nbsp; <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b' }}>Privacy</a> &nbsp;|&nbsp; <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b' }}>Terms</a>
          </p>
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

function Principle({ title, body, tags }: { title: string; body: string; tags?: string[] }) {
  return (
    <div style={{ padding: '1.5rem', backgroundColor: 'rgba(10, 14, 26, 0.3)', borderRadius: 10, border: '1px solid rgba(0, 235, 212, 0.06)' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.6rem' }}>{title}</h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>{body}</p>
      {tags && (
        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
          {tags.map(t => (
            <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#00ebd4', backgroundColor: 'rgba(0, 235, 212, 0.08)', padding: '0.15rem 0.5rem', borderRadius: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t}</span>
          ))}
        </div>
      )}
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
