/* v1.0.0 — synced from github.com/NiraNexus/Root_Repo */
import React from 'react';
import Link from 'next/link';

/* ═══════════════════════════════════════════════════════════════
   NIRANEXUS SHARED FOOTER — v1.0.0
   Reference: Hub layout.tsx (canonical)
   Props:
     project: 'hub' | 'mc' | 'log' | 'veritas'
   ═══════════════════════════════════════════════════════════════ */

type FooterProject = 'hub' | 'mc' | 'log' | 'veritas';

interface FooterProps {
  project: FooterProject;
  fontMono?: string;
}

const linkStyle: React.CSSProperties = {
  color: '#64748b',
  textDecoration: 'underline',
};

const focusRing = 'hover:underline focus-visible:ring-2 focus-visible:ring-[#00EBD4] focus-visible:outline-none rounded px-0.5';

const MC_LINKS = (
  <>
    <a href="https://log.niranexus.com" style={linkStyle} className={focusRing}>Log</a>
    {' '}&nbsp;|&nbsp;{' '}
    <a href="https://niranexus.com/model-council" style={linkStyle} className={focusRing}>Specifications</a>
    {' '}&nbsp;|&nbsp;{' '}
    <Link href="/faq" style={linkStyle} className={focusRing}>FAQ</Link>
    {' '}&nbsp;|&nbsp;{' '}
    <a href="https://niranexus.com/privacy" style={linkStyle} className={focusRing}>Privacy</a>
    {' '}&nbsp;|&nbsp;{' '}
    <a href="https://niranexus.com/terms" style={linkStyle} className={focusRing}>Terms</a>
  </>
);

const DEFAULT_LINKS = (
  <>
    <a href="https://log.niranexus.com" style={linkStyle} className={focusRing}>Log</a>
    {' '}&nbsp;|&nbsp;{' '}
    <a href="https://niranexus.com/privacy" style={linkStyle} className={focusRing}>Privacy</a>
    {' '}&nbsp;|&nbsp;{' '}
    <a href="https://niranexus.com/terms" style={linkStyle} className={focusRing}>Terms</a>
  </>
);

const FOOTER_LINKS: Record<FooterProject, React.ReactNode> = {
  mc: MC_LINKS,
  hub: DEFAULT_LINKS,
  log: DEFAULT_LINKS,
  veritas: DEFAULT_LINKS,
};

export default function NiraNexusFooter({ project, fontMono }: FooterProps) {
  return (
    <footer style={{ padding: '2rem', textAlign: 'center' }}>
      <p style={{ fontFamily: fontMono || 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b' }}>
        <a
          href="https://niranexus.com"
          style={{ color: '#00EBD4', textDecoration: 'underline' }}
          className="hover:underline focus-visible:ring-2 focus-visible:ring-[#00EBD4] focus-visible:outline-none rounded px-0.5"
        >
          NiraNexus-OS
        </a>
        {' '}&copy; {new Date().getFullYear()} {'—'} Founded by Rakesh Maheswaran. Agentic infrastructure, not a wrapper.
      </p>
      <p style={{ fontFamily: fontMono || 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', marginTop: '0.5rem' }}>
        NiraNexus Ltd — Registered in England and Wales &nbsp;|&nbsp;{' '}
        {FOOTER_LINKS[project]}
      </p>
    </footer>
  );
}
