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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
            alignItems: 'start',
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
                  background: '#f6f0e4',
                  borderRadius: 10,
                  padding: 20,
                  boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 200,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div style={{ height: 100, borderRadius: 8, background: 'linear-gradient(135deg, #f1eadf, #fbf7f1)', marginBottom: 12 }} />
                <h3 style={{ margin: 0, marginBottom: 8, fontSize: 18, color: '#1c1a15', textAlign: 'center' }}>
                  {article.title}
                </h3>
                <p style={{ margin: 0, marginBottom: 12, color: '#4b4a45', textAlign: 'center' }}>
                  {article.excerpt}
                </p>
                <div style={{ marginTop: 'auto', color: '#8a7a52', fontSize: 13 }}></div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
