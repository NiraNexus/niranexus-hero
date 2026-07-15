/* v1.0.0 — synced from github.com/NiraNexus/Root_Repo */
import React from 'react';

/* ═══════════════════════════════════════════════════════════════
   NIRANEXUS SHARED 404 — v1.0.0
   Reference: Hub not-found.tsx (canonical)
   Props:
     project: 'hub' | 'mc' | 'log' | 'veritas'
     message?: string — override default routing table message
   ═══════════════════════════════════════════════════════════════ */

type NotFoundProject = 'hub' | 'mc' | 'log' | 'veritas';

interface NotFoundProps {
  project: NotFoundProject;
  message?: string;
}

const RETURN_LINKS: Record<NotFoundProject, { href: string; label: string }> = {
  hub:     { href: '/', label: '← Return to NiraNexus' },
  mc:      { href: '/', label: '← Return to Model Council' },
  log:     { href: '/', label: '← Return to Log' },
  veritas: { href: '/', label: '← Return to NiraNexus' },
};

export default function NiraNexusNotFound({ project, message }: NotFoundProps) {
  const link = RETURN_LINKS[project];

  return (
    <>
      <style>{`footer{display:none!important}`}</style>
      <main
        role="alert"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: '#05070f',
        }}
      >
        <p style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '0.7rem',
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '1rem',
        }}>
          404
        </p>
        <h1 style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: '2rem',
          color: '#ffffff',
          marginBottom: '0.5rem',
        }}>
          Route Not Found
        </h1>
        <p style={{
          color: '#A5B4D0',
          lineHeight: 1.6,
          marginBottom: '2rem',
          maxWidth: 400,
          textAlign: 'center',
        }}>
          {message || 'This endpoint does not exist in the NiraNexus-OS routing table.'}
        </p>
        <a
          href={link.href}
          style={{
            fontFamily: 'DM Serif Display, serif',
            color: '#00ebd4',
            textDecoration: 'none',
            fontSize: '1rem',
          }}
        >
          {link.label}
        </a>
      </main>
    </>
  );
}
