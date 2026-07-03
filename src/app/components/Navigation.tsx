import { useEffect, useRef, useState } from 'react';

export function Navigation() {
  const textColor = '#3a3830';
  const navRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [isCompact, setIsCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const container = navRef.current;
      const measure = measureRef.current;
      if (!container || !measure) return;
      const isWrapped = container.clientHeight > 64;
      const isOverflowing = measure.scrollWidth > container.clientWidth - 4;
      const overflow = isWrapped || isOverflowing;
      setIsCompact(overflow);
      if (!overflow) setMenuOpen(false);
    };

    update();
    const observer = new ResizeObserver(update);
    if (navRef.current) observer.observe(navRef.current);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <nav
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1.5rem',
        height: '64px',
        backgroundColor: '#dddbd3',
      }}
    >
      <div ref={navRef} style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center', overflow: 'hidden', minHeight: '64px' }}>
        <div ref={measureRef} style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: 0, position: 'absolute', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem' }}>Home</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.9rem' }}>The Study Mission</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem' }}>Articles</span>
        </div>

        {!isCompact && (
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
        )}

        {!isCompact ? (
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
        ) : (
          <button
            onClick={() => setMenuOpen((open) => !open)}
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
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8 }}>
              <path d="M4 7h16M4 12h16M4 17h16" stroke="#e8e5de" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span style={{ display: 'inline-block' }}>Menu</span>
          </button>
        )}

        {!isCompact && (
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
        )}
      </div>

      {menuOpen && isCompact && (
        <div
          style={{
            position: 'absolute',
            top: '70px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#ffffff',
            borderRadius: 14,
            boxShadow: '0 18px 50px rgba(0,0,0,0.16)',
            padding: '0.8rem',
            width: 'min(240px, calc(100% - 32px))',
            zIndex: 20,
          }}
        >
          <button
            onClick={() => {
              window.dispatchEvent(new Event('open-home'));
              setMenuOpen(false);
            }}
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              border: 'none',
              background: 'transparent',
              textAlign: 'left',
              color: '#1c1a15',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              cursor: 'pointer',
            }}
          >
            Home
          </button>
          <button
            onClick={() => {
              window.dispatchEvent(new Event('open-articles'));
              setMenuOpen(false);
            }}
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              border: 'none',
              background: 'transparent',
              textAlign: 'left',
              color: '#1c1a15',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              cursor: 'pointer',
            }}
          >
            Articles
          </button>
        </div>
      )}
    </nav>
  );
}
