import { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { ArticlesPage } from './components/ArticlesPage';
import { ArticleView } from './components/ArticleView';
import { ResearchSection } from './components/ResearchSection';
import { FaqSection } from './components/FaqSection';
import { RecentArticlesPreview } from './components/RecentArticlesPreview';
import { CtaSection } from './components/CtaSection';
import { SiteFooter } from './components/SiteFooter';
import { Navigation } from './components/Navigation';
import { StickyFeatureSection, STICKY_STEPS } from './components/StickyFeatureSection';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type RouteState = {
  page: 'home' | 'articles' | 'article';
  articleId: number | null;
};

function resolveRoute(pathname: string): RouteState {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  if (normalized === '/') {
    return { page: 'home', articleId: null };
  }

  if (normalized === '/articles') {
    return { page: 'articles', articleId: null };
  }

  const articleMatch = /^\/articles\/(\d+)$/.exec(normalized);
  if (articleMatch) {
    return { page: 'article', articleId: Number(articleMatch[1]) };
  }

  return { page: 'home', articleId: null };
}

function trackPageView(pathname: string) {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;

  if (typeof window === 'undefined') {
    return;
  }

  const title = document.title || 'The Study Mission';
  if (typeof window.gtag === 'function') {
    window.gtag('config', 'G-PDLF3Y9SV2', { page_path: normalized });
    window.gtag('event', 'page_view', { page_path: normalized, page_title: title });
  }
}

export default function App() {
  const [route, setRoute] = useState<RouteState>(() => resolveRoute(typeof window !== 'undefined' ? window.location.pathname : '/'));

  useEffect(() => {
    const syncRoute = (pathname: string) => {
      const nextRoute = resolveRoute(pathname);
      setRoute(nextRoute);

      if (nextRoute.page === 'article') {
        document.title = `The Study Mission | Article ${nextRoute.articleId}`;
      } else if (nextRoute.page === 'articles') {
        document.title = 'The Study Mission | Articles';
      } else {
        document.title = 'The Study Mission';
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
      trackPageView(pathname);
    };

    const handleRouteChange = (event: Event) => {
      const custom = event as CustomEvent<string>;
      const nextPath = custom.detail ?? '/';
      if (window.location.pathname !== nextPath) {
        window.history.pushState({}, '', nextPath);
      }
      syncRoute(nextPath);
    };

    const handlePopState = () => syncRoute(window.location.pathname);

    window.addEventListener('route-change', handleRouteChange as EventListener);
    window.addEventListener('popstate', handlePopState);
    syncRoute(window.location.pathname);

    return () => {
      window.removeEventListener('route-change', handleRouteChange as EventListener);
      window.removeEventListener('popstate', handlePopState);
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
      {route.page === 'article' ? (
        <ArticleView id={route.articleId} />
      ) : route.page === 'articles' ? (
        <ArticlesPage />
      ) : (
        <>
          <HeroSection />
          <ResearchSection />
          <StickyFeatureSection steps={STICKY_STEPS} />
          <RecentArticlesPreview />
          <FaqSection />
          <CtaSection />
          <SiteFooter />
        </>
      )}
    </div>
  );
}
