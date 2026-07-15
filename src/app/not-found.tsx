import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#05070f', color: '#cbd5e1', margin: 0 }}>
        <main
          role="alert"
          style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}
        >
          <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>404</p>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '2rem', color: '#ffffff', marginBottom: '0.5rem' }}>Route Not Found</h1>
          <p style={{ fontFamily: 'var(--font-body)', color: '#A5B4D0', maxWidth: 400, lineHeight: 1.6, marginBottom: '2rem' }}>
            This endpoint does not exist in the NiraNexus-OS routing table.
          </p>
          <Link
            href="/"
            className="focus-visible:ring-2 focus-visible:ring-[#00EBD4] focus-visible:outline-none rounded px-1"
            style={{ fontFamily: 'DM Serif Display, serif', color: '#00ebd4', textDecoration: 'none', fontSize: '1rem' }}
          >
            &larr; Return to NiraNexus
          </Link>
        </main>
      </body>
    </html>
  );
}