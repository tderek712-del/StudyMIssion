import React from 'react';
import articles from './articles-data';

export function RecentArticlesPreview() {
  const recent = [...articles].sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <section style={{ padding: '36px 60px', backgroundColor: 'transparent' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            color: '#1c1a15',
          }}
        >
          From the articles
        </h2>
        <p
          style={{
            marginTop: 8,
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 'clamp(1rem, 1.5vw, 1.05rem)',
            lineHeight: 1.7,
            color: '#3a3830',
            maxWidth: 800,
          }}
        >
          Short previews of our most recent posts to help you jump into ideas fast.
        </p>

        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, alignItems: 'stretch' }}>
          {recent.map(article => (
            <a
              key={article.id}
              href={`/articles/${article.id}`}
              onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('route-change', { detail: `/articles/${article.id}` })); }}
                style={{
                background: '#e9e4dd',
                borderRadius: 10,
                padding: 0,
                boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                flex: '1 1 0%',
                textDecoration: 'none',
                color: 'inherit',
                overflow: 'hidden',
              }}
            >
              <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
                <img src={article.cardImage || article.icon} alt="article image" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>

              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: 18, color: '#1c1a15', textAlign: 'left' }}>{article.title}</h3>
                <p style={{ margin: 0, color: '#4b4a45', lineHeight: 1.5 }}>{article.excerpt}</p>

                <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(28,26,21,0.06)', paddingTop: 12, color: '#6b6557', fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <div>{article.author}</div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#6b6557' }}>{article.readTime}</div>
                    <div style={{ color: '#9a9282', marginTop: 4 }}>{article.date}</div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentArticlesPreview;
