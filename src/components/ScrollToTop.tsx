'use client';

import { useState, useEffect } from 'react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: 44,
        height: 44,
        borderRadius: '50%',
        backgroundColor: 'rgba(0, 235, 212, 0.12)',
        border: '1px solid rgba(0, 235, 212, 0.25)',
        color: '#00ebd4',
        fontSize: '1.2rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.2s',
        zIndex: 100,
      }}
    >
      ↑
    </button>
  );
}
