import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ backgroundColor: '#05070f', color: '#cbd5e1', minHeight: '100vh', fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>404</p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#ffffff', marginBottom: '0.5rem' }}>Route Not Found</h1>
      <p style={{ fontFamily: 'var(--font-body)', color: '#64748b', maxWidth: 400, lineHeight: 1.6, marginBottom: '2rem' }}>
        This endpoint does not exist in the NiraNexus-OS routing table.
      </p>
      <Link href="/" style={{ fontFamily: 'var(--font-display)', color: '#00ebd4', textDecoration: 'none', fontSize: '1rem' }}>
        &larr; Return to NiraNexus
      </Link>
    </main>
  );
}
