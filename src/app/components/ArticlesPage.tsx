import React from 'react';
import { DottedGlowBackground } from '../../components/ui/dotted-glow-background';
import articles from './articles-data';

export function ArticlesPage() {
  return (
    <section style={{ padding: '48px 20px', position: 'relative', backgroundColor: '#dddbd3', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', backgroundColor: 'transparent' }}>
        <div style={{ position: 'relative', padding: '36px 0 24px', textAlign: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.12 }}>
            <DottedGlowBackground gap={18} radius={2.2} color="rgba(28,26,21,0.6)" glowColor="rgba(150,110,60,0.12)" />
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              margin: 0,
              fontSize: 28,
              letterSpacing: '0.01em',
              color: '#1c1a15',
              fontFamily: "'EB Garamond', Georgia, serif",
            }}>
              Articles
            </h2>
            <p style={{ marginTop: 8, color: '#3a3830', opacity: 0.9, maxWidth: 780, marginLeft: 'auto', marginRight: 'auto' }}>
              Curated resources and short reads that help students build effective study habits.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
            alignItems: 'stretch',
            overflow: 'hidden'
          }}>
            {articles.map((article) => (
              <a
                key={article.id}
                href={`/articles/${article.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  window.dispatchEvent(new CustomEvent('route-change', { detail: `/articles/${article.id}` }));
                }}
                style={{
                  background: '#e9e4dd',
                  borderRadius: 10,
                  padding: 0,
                  boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1 1 0%',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'inherit',
                  overflow: 'hidden',
                }}
              >
                <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={article.cardImage || article.icon} alt="article image" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>

                <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
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
      </div>
    </section>
  );
}
