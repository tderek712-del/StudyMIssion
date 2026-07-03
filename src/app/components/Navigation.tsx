import { useEffect, useState } from 'react';

export function Navigation() {
  const textColor = '#3a3830';

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1.5rem',
        height: '64px',
        backgroundColor: '#dddbd3',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Left small link */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new Event('open-home'));
          }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.875rem',
            color: textColor,
            textDecoration: 'none',
            opacity: 0.85,
            padding: '0.35rem 0.6rem',
            cursor: 'pointer',
          }}
        >
          Home
        </a>

        {/* Center pill */}
        <div
          style={{
            backgroundColor: '#1c1a15',
            borderRadius: '9999px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            padding: '0.35rem 1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#e8e5de',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            letterSpacing: '0.01em',
            fontSize: '0.9rem',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8 }}>
            <path d="M12 2a6 6 0 0 0-4 10c0 2 1 3 1.5 3.5V17a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1.5c.5-.5 1.5-1.5 1.5-3.5A6 6 0 0 0 12 2z" stroke="#e8e5de" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 18h6" stroke="#e8e5de" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M10 21h4" stroke="#e8e5de" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span style={{ display: 'inline-block' }}>The Study Mission</span>
        </div>

        {/* Right small link */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new Event('open-articles'));
          }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.875rem',
            color: textColor,
            textDecoration: 'none',
            opacity: 0.85,
            padding: '0.35rem 0.6rem',
            cursor: 'pointer',
          }}
        >
          Articles
        </a>
      </div>
    </nav>
  );
}
