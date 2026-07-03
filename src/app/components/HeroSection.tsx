import { StudyOrbit } from './StudyOrbit';

export function HeroSection() {
  return (
    <section
      id="hero"
      style={{ backgroundColor: '#dddbd3', minHeight: '90vh' }}
      className="flex flex-col lg:flex-row"
    >
      {/* Left: text */}
      <div className="w-full lg:w-[500px] lg:flex-none flex flex-col justify-center px-10 sm:px-14 lg:px-16 py-20 lg:py-0">
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#1c1a15',
            marginBottom: '1.4rem',
          }}
        >
          Learning that compounds itself.
        </h1>
        <p
          style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            lineHeight: 1.65,
            color: '#3a3830',
            marginBottom: '2.2rem',
          }}
        >
          Take a quick read to see if The Study Mission is the
          missing layer in your learning.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('route-change', { detail: '/articles' }))}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              fontWeight: 500,
              backgroundColor: '#1c1a15',
              color: '#e8e5de',
              padding: '0.65rem 1.4rem',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.01em',
            }}
          >
            Read the Articles
          </button>
        </div>
      </div>

      {/* Right: Study orbit graphic */}
      <div className="w-full lg:flex-1 flex items-center justify-center px-8 py-10 lg:py-0 min-h-72 lg:min-h-0">
        <StudyOrbit />
      </div>
    </section>
  );
}
