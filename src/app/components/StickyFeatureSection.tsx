import { useEffect, useRef, useState } from 'react';
import { RadialStudyChart } from './RadialStudyChart';
import { GlobeVisual } from './GlobeVisual';
import { LoadingAnimation } from './LoadingAnimation';

// ─── types ────────────────────────────────────────────────────────────────────
export interface StickyStep {
  tag:     string;
  heading: string;
  body:    string;
  visual:  React.ReactNode;
}

// ─── step content ─────────────────────────────────────────────────────────────
export const STICKY_STEPS: StickyStep[] = [
  {
    tag:     'Evidence-based',
    heading: 'The techniques that actually work',
    body:    'Decades of cognitive science research reveal that how you study matters far more than how long you study. We surface the methods with the highest proven impact on long-term retention — ranked by the evidence.',
    visual:  <RadialStudyChart />,
  },
  {
    tag:     'Global community',
    heading: 'Students everywhere, studying smarter',
    body:    'From lecture halls to library desks, students across the world are discovering that small, research-backed changes in study strategy lead to dramatically better outcomes — in significantly less time.',
    visual:  <GlobeVisual />,
  },
  {
    tag:     'The science',
    heading: 'Understanding how memory forms',
    body:    'Retention is not magic — it is mechanics. Every technique we cover is grounded in how the brain consolidates information, from initial encoding all the way through to durable long-term storage.',
    visual:  <LoadingAnimation />,
  },
];

// ─── shared text styles ───────────────────────────────────────────────────────
const tagStyle: React.CSSProperties = {
  fontFamily:    "'Inter', sans-serif",
  fontSize:      '0.68rem',
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
  color:         '#6b6860',
  marginBottom:  '1rem',
};
const headingStyle: React.CSSProperties = {
  fontFamily:   "'Playfair Display', Georgia, serif",
  fontSize:     'clamp(1.6rem, 2.4vw, 2.3rem)',
  fontWeight:   700,
  lineHeight:   1.15,
  color:        '#1c1a15',
  marginBottom: '1rem',
};
const bodyStyle: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize:   'clamp(1rem, 1.4vw, 1.08rem)',
  lineHeight: 1.8,
  color:      '#3a3830',
};

// ─── component ────────────────────────────────────────────────────────────────
// ONE sticky section that works on all screen sizes.
// Mobile (flex-col):  text on top, visual below, columnar sticky scroll.
// Desktop (flex-row): text left, visual right, side-by-side sticky scroll.

export function StickyFeatureSection({ steps }: { steps: StickyStep[] }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [active,  setActive]  = useState(0);
  const [stepKey, setStepKey] = useState(0);
  const [compactSticky, setCompactSticky] = useState(false);

  useEffect(() => {
    const update = () => {
      const el = outerRef.current;
      if (!el) return;
      const { top } = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -top / scrollable));
      const next = Math.min(Math.floor(progress * steps.length), steps.length - 1);
      setActive(prev => {
        if (prev !== next) setStepKey(k => k + 1);
        return next;
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [steps.length]);

  // Detect when the active text + visual will overflow the viewport
  useEffect(() => {
    const measure = () => {
      const root = outerRef.current;
      if (!root) return;
      const activeText = root.querySelector<HTMLDivElement>(`.text-step[data-step="${active}"]`);
      const activeVisual = root.querySelector<HTMLDivElement>(`.visual-step[data-step="${active}"]`);

      // Only apply compact behavior on narrow viewports (mobile)
      const isMobile = window.innerWidth <= 900;
      if (!isMobile) {
        setCompactSticky(false);
        return;
      }

      const textH = activeText ? activeText.getBoundingClientRect().height : 0;
      const visualH = activeVisual ? activeVisual.getBoundingClientRect().height : 0;
      const available = window.innerHeight - 48; // allow some breathing room

      // If combined heights exceed available space, enable compact mode
      setCompactSticky(textH + visualH + 24 > available);
    };

    measure();
    window.addEventListener('resize', measure);
    // also measure when active changes
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  return (
    // Tall outer div — provides the scroll range for all screen sizes
    <div id="sticky-section" data-steps={steps.length} ref={outerRef} style={{ height: `${steps.length * 110}vh` }}>

      {/* Sticky panel — locks to viewport top, adapts layout with breakpoints */}
      <div
        style={{
          position:        'sticky',
          top:             0,
          height:          '100vh',
          overflow:        'hidden',
          backgroundColor: '#dddbd3',
          display:         'flex',
          // Column on mobile so text sits above visual; row on desktop via className
        }}
        className="flex-col md:flex-row"
      >
        {/* ── Left / top: text ─────────────────────────────────────────────── */}
        <div
          className="w-full md:w-[46%] md:flex-none min-h-[42vh] md:min-h-0"
          style={{ position: 'relative', flexShrink: 0 }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              data-step={i}
              className={`text-step ${compactSticky ? 'compact' : ''} md:!p-0 md:!pl-[5rem] md:!pr-[3rem] md:flex md:flex-col md:justify-center`}
              style={{
                position:      'absolute',
                inset:         0,
                display:       'flex',
                flexDirection: 'column',
                alignItems:    'stretch',
                width:         '100%',
                maxWidth:      '100%',
                boxSizing:     'border-box',
                // Keep top content visible on mobile, center on desktop.
                padding:       compactSticky ? '0.9rem' : '1.25rem',
                paddingTop:    compactSticky ? '1.25rem' : '2rem',
                paddingBottom: compactSticky ? '1.25rem' : '2rem',
                opacity:       active === i ? 1 : 0,
                transform:     `translateY(${active === i ? 0 : active < i ? '22px' : '-22px'})`,
                transition:    'opacity 0.55s ease, transform 0.55s ease',
                pointerEvents: active === i ? 'auto' : 'none',
              }}
            >
              <p style={tagStyle}>{step.tag}</p>
              <h2 style={{ ...headingStyle, fontSize: compactSticky ? 'clamp(1.25rem, 2.2vw, 1.6rem)' : headingStyle.fontSize }}>{step.heading}</h2>
              <p style={{ ...bodyStyle, maxWidth: '100%', fontSize: compactSticky ? 'clamp(0.95rem, 1.2vw, 1rem)' : bodyStyle.fontSize }}>{step.body}</p>
            </div>
          ))}

        </div>

        {/* ── Right / bottom: visual ────────────────────────────────────────── */}
        <div
          className="w-full md:flex-1 md:border-l border-black/[0.08]"
          style={{
            position:  'relative',
            overflow:  'hidden',
            // On mobile give the visual a limited share of the 100vh panel
            flex:      1,
            minHeight: 0,
          }}
          data-visual-wrapper
        >
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                position:       'absolute',
                inset:          0,
                overflow:       'hidden',
                display:        'flex',
                alignItems:     compactSticky ? 'flex-end' : 'center',
                justifyContent: compactSticky ? 'flex-end' : 'center',
                padding:        compactSticky ? '0.9rem' : '1.5rem',
                opacity:        active === i ? 1 : 0,
                transform:      `scale(${active === i ? (compactSticky ? 0.86 : 1) : 0.95})`,
                transition:     'opacity 0.5s ease, transform 0.5s ease',
                pointerEvents:  active === i ? 'auto' : 'none',
              }}
              data-step={i}
              className={`visual-step ${compactSticky ? 'compact' : ''}`}
            >
              {/* stepKey remounts so entry animations replay each step change */}
              <div
                key={active === i ? stepKey : i}
                style={{ maxWidth: '100%', maxHeight: compactSticky ? '40vh' : '100%', overflow: 'hidden' }}
              >
                {step.visual}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
