const sections = ['hero', 'research', 'faq', 'cta'];

export function ScrollNav() {
  const scrollTo = (dir: 'up' | 'down') => {
    // If the sticky scrollytelling section is in view, navigate its internal steps
    const sticky = document.getElementById('sticky-section');
    if (sticky) {
      const rect = sticky.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (inViewport) {
        const steps = parseInt(sticky.getAttribute('data-steps') || '0', 10) || 0;
        if (steps > 0) {
          const stickyTop = window.scrollY + rect.top;
          const outerHeight = rect.height;
          const stepHeight = outerHeight / steps;
          const rel = window.scrollY - stickyTop;
          const idx = Math.max(0, Math.min(steps - 1, Math.round(rel / stepHeight)));
          const next = dir === 'down' ? Math.min(idx + 1, steps - 1) : Math.max(idx - 1, 0);
          const target = Math.round(stickyTop + next * stepHeight + 1);
          window.scrollTo({ top: target, behavior: 'smooth' });
          return;
        }
      }
    }

    // Fallback: move by viewport-sized sections
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const idx = Math.round(scrollY / vh);
    const next = dir === 'down' ? Math.min(idx + 1, sections.length - 1) : Math.max(idx - 1, 0);
    const el = document.getElementById(sections[next]);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.2rem',
        right: '1.2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        zIndex: 100,
      }}
    >
      {[
        { label: '↓', action: () => scrollTo('down'), title: 'Next section' },
        { label: '↑', action: () => scrollTo('up'), title: 'Previous section' },
      ].map(({ label, action, title }) => (
        <button
          key={label}
          onClick={action}
          title={title}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            border: '1px solid rgba(28,26,21,0.2)',
            backgroundColor: 'rgba(221,219,211,0.85)',
            backdropFilter: 'blur(8px)',
            color: '#1c1a15',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            lineHeight: 1,
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
