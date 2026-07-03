import React from 'react';
import articles from './articles-data';
import { DottedGlowBackground } from '../../components/ui/dotted-glow-background';

export function ArticleView({ id }: { id: number | null }) {
  const article = articles.find(a => a.id === id) || null;

  if (!article) {
    return (
      <section style={{ padding: 40 }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p>Article not found.</p>
          <button onClick={() => window.dispatchEvent(new Event('open-home'))} style={{ marginTop: 12 }}>Back</button>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '36px 20px', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.08 }}>
        <DottedGlowBackground gap={18} radius={2.2} color="rgba(28,26,21,0.5)" glowColor="rgba(150,110,60,0.06)" />
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h1 style={{ margin: 0, fontSize: 28, textAlign: 'center', flex: 1 }}>{article.title}</h1>
          <button onClick={() => window.dispatchEvent(new Event('open-home'))} style={{ background: '#1c1a15', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 6, cursor: 'pointer' }}>Back</button>
        </div>
        <div style={{ color: '#4b4a45', lineHeight: 1.75, textAlign: 'center' }}>
          {article.content.map((block, idx) => {
            if (block.type === 'heading') return <h2 key={idx} style={{ marginTop: 22, textAlign: 'center' }}>{block.text}</h2>;
            if (block.type === 'image') return <img key={idx} src={(block as any).src} alt={(block as any).alt || ''} style={{ width: '100%', borderRadius: 8, margin: '18px 0' }} />;
            if (block.type === 'quote') return <blockquote key={idx} style={{ margin: '18px 0', paddingLeft: 14, borderLeft: '4px solid #c8b18f', textAlign: 'center' }}>{block.text}</blockquote>;
            return <p key={idx} style={{ margin: '12px 0' }}>{block.text}</p>;
          })}
        </div>
      </div>
    </section>
  );
}

export default ArticleView;
