export function CtaSection() {
  return (
    <section
      id="cta"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #2a2218 0%, #0e0c09 60%, #080604 100%)',
        minHeight: '62vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem',
        textAlign: 'center',
      }}
    >
      <h2
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(2rem, 5vw, 3.8rem)',
          fontWeight: 400,
          lineHeight: 1.15,
          color: '#e8e5de',
          marginBottom: '1.4rem',
          maxWidth: '720px',
        }}
      >
        The optimal platform for <em style={{ fontStyle: 'italic' }}>students</em>.
      </h2>
      <p
        style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
          lineHeight: 1.65,
          color: '#9a9488',
          marginBottom: '2.4rem',
          maxWidth: '440px',
        }}
      >
        Take a quick read to see if The Study Mission
        is the missing layer in your learning.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('route-change', { detail: '/articles' }))}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.875rem',
            fontWeight: 500,
            backgroundColor: '#1c1a15',
            color: '#e8e5de',
            padding: '0.8rem 1.6rem',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.01em',
          }}
        >
          Read the Articles
        </button>
      </div>
    </section>
  );
}
