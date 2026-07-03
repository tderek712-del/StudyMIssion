// Simplified footer keeping visual style

export function SiteFooter() {
  return (
    <footer
      style={{
        backgroundColor: '#141210',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '3rem 2rem 2.5rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
        <nav style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center' }}>
          <a href="/" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('route-change', { detail: '/' })); }} style={{ color: '#c8c5be', textDecoration: 'none', fontFamily: "'EB Garamond', Georgia, serif'" }}>Home</a>
          <a href="/articles" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('route-change', { detail: '/articles' })); }} style={{ color: '#c8c5be', textDecoration: 'none', fontFamily: "'EB Garamond', Georgia, serif'" }}>Articles</a>
          <a href="https://www.linkedin.com/in/derek-t-40779a354/" target="_blank" rel="noopener noreferrer" style={{ color: '#c8c5be', textDecoration: 'none', fontFamily: "'EB Garamond', Georgia, serif'" }}>Founder</a>
        </nav>
        <p style={{ marginTop: 12, color: '#5a5850', fontSize: '0.8rem' }}>© {new Date().getFullYear()} The Study Mission</p>
      </div>
    </footer>
  );
}
