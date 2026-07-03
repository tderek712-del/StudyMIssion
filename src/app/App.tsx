import { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { ArticlesPage } from './components/ArticlesPage';
import { ArticleView } from './components/ArticleView';
import { ResearchSection } from './components/ResearchSection';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { SiteFooter } from './components/SiteFooter';
import { Navigation } from './components/Navigation';
import { StickyFeatureSection, STICKY_STEPS } from './components/StickyFeatureSection';

export default function App() {
  const [page, setPage] = useState<'home' | 'articles' | 'article'>('home');
  const [activeArticle, setActiveArticle] = useState<number | null>(null);

  useEffect(() => {
    const showArticles = () => {
      setActiveArticle(null);
      setPage('articles');
    };
    const showHome = () => setPage('home');
    const openArticle = (e: Event) => {
      const custom = e as CustomEvent<number>;
      setActiveArticle(custom?.detail ?? null);
      setPage('article');
    };

    window.addEventListener('open-articles', showArticles);
    window.addEventListener('open-home', showHome);
    window.addEventListener('open-article', openArticle as EventListener);

    return () => {
      window.removeEventListener('open-articles', showArticles);
      window.removeEventListener('open-home', showHome);
      window.removeEventListener('open-article', openArticle as EventListener);
    };
  }, []);

  return (
    <div
      style={{
        fontFamily:      "'EB Garamond', Georgia, serif",
        backgroundColor: '#dddbd3',
        color:           '#1c1a15',
      }}
    >
      <Navigation />
      {page === 'article' ? (
        <ArticleView id={activeArticle} />
      ) : page === 'articles' ? (
        <ArticlesPage />
      ) : (
        <>
          <HeroSection />
          <ResearchSection />
          <StickyFeatureSection steps={STICKY_STEPS} />
          <FaqSection />
          <CtaSection />
          <SiteFooter />
        </>
      )}
    </div>
  );
}
