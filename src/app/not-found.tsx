export default function NotFound() {
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
        <p
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.7rem',
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '1rem',
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: '2rem',
            color: '#ffffff',
            marginBottom: '0.5rem',
          }}
        >
          Route Not Found
        </h1>
        <p
          style={{
            color: '#A5B4D0',
            lineHeight: 1.6,
            marginBottom: '2rem',
            maxWidth: 400,
            textAlign: 'center',
          }}
        >
          This endpoint does not exist in the NiraNexus-OS routing table.
        </p>
        <a
          href="/"
          style={{
            fontFamily: 'DM Serif Display, serif',
            color: '#00ebd4',
            textDecoration: 'none',
            fontSize: '1rem',
          }}
        >
          ← Return to NiraNexus
        </a>
      </main>
    </>
  );
}