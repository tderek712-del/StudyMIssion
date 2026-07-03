import { useState, useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from 'recharts';

// Linear line starts clearly above exponential early on,
// they cross once around t=45, then exponential pulls dramatically ahead.
// This ensures they are never visually similar or overlapping.
const chartData = [
  { t: 0,   expo: 0,  linear: 0 },
  { t: 10,  expo: 1,  linear: 2 },
  { t: 20,  expo: 4,  linear: 4 },
  { t: 30,  expo: 10, linear: 7 },
  { t: 40,  expo: 22, linear: 10 },
  { t: 50,  expo: 41, linear: 13 },  // crossing zone
  { t: 60,  expo: 61, linear: 17 },
  { t: 70,  expo: 77, linear: 20 },
  { t: 80,  expo: 88, linear: 24 },
  { t: 90,  expo: 94, linear: 28 },
  { t: 100, expo: 98, linear: 32 },
];

export function ComplexityChart() {
  const [animKey, setAnimKey] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState(false);
  const [coords, setCoords] = useState<{ x: number; yExpo: number; yLinear: number; width: number } | null>(null);
  const revealTimeoutRef = useRef<number | null>(null);
  const labelTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimKey(k => k + 1); },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Trigger reveal after animation finishes and compute overlay coordinates
  useEffect(() => {
    // durations mirror the animation props on the Line components
    const expoEnd = 200 + 2200; // animationBegin + animationDuration
    const linearEnd = 2000;
    const wait = Math.max(expoEnd, linearEnd) + 150; // small buffer

    setReveal(false);
    if (revealTimeoutRef.current) {
      clearTimeout(revealTimeoutRef.current);
      revealTimeoutRef.current = null;
    }

    const tid = window.setTimeout(() => {
      const el = wrapperRef.current;
      if (!el) {
        setReveal(true);
        return;
      }

      const width = el.clientWidth || 600;
      const height = 360; // same as ResponsiveContainer height
      const margin = { top: 20, right: 20, left: 20, bottom: 36 };
      const chartH = height - margin.top - margin.bottom;
      const last = chartData[chartData.length - 1];
      const yExpo = margin.top + (1 - last.expo / 100) * chartH;
      const yLinear = margin.top + (1 - last.linear / 100) * chartH;
      const x = width - margin.right;

      setCoords({ x, yExpo, yLinear, width });
      // clear any existing label timer
      if (labelTimerRef.current) { clearTimeout(labelTimerRef.current); labelTimerRef.current = null; }
      // show labels (and arrows) shortly after animations finish
      labelTimerRef.current = window.setTimeout(() => setReveal(true), 180);
    }, wait);

    revealTimeoutRef.current = tid;
    return () => {
      if (revealTimeoutRef.current) {
        clearTimeout(revealTimeoutRef.current);
        revealTimeoutRef.current = null;
      }
    };
  }, [animKey]);

  // Hide overlays while the chart is being resized or adjusted
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setReveal(false);
      setCoords(null);
      if (revealTimeoutRef.current) {
        clearTimeout(revealTimeoutRef.current);
        revealTimeoutRef.current = null;
      }
      if (labelTimerRef.current) {
        clearTimeout(labelTimerRef.current);
        labelTimerRef.current = null;
      }
      
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',   // prevent chart from busting out of its container
        position: 'relative',
      }}
    >
      <ResponsiveContainer width="100%" height={360}>
        <LineChart
          key={animKey}
          data={chartData}
          margin={{ top: 20, right: 20, left: 20, bottom: 36 }}
        >
          <CartesianGrid
            horizontal
            vertical={false}
            strokeDasharray="3 4"
            stroke="#1c1a15"
            strokeOpacity={0.1}
          />

          <XAxis
            dataKey="t"
            tick={false}
            axisLine={{ stroke: '#1c1a15', strokeOpacity: 0.4 }}
            tickLine={false}
          >
            <Label
              value="Time"
              position="insideBottom"
              offset={-10}
              style={{
                fontSize: 9,
                letterSpacing: '0.1em',
                fill: '#1c1a15',
                fillOpacity: 0.5,
                fontFamily: "'Inter', sans-serif",
              }}
            />
          </XAxis>

          <YAxis
            type="number"
            domain={[0, 100]}
            tick={false}
            axisLine={{ stroke: '#1c1a15', strokeOpacity: 0.4 }}
            tickLine={false}
            label={{
              value: 'Knowledge Complexity',
              angle: -90,
              position: 'insideLeft',
              offset: 14,
              style: {
                fontSize: 9,
                letterSpacing: '0.1em',
                fill: '#1c1a15',
                fillOpacity: 0.5,
                fontFamily: "'Inter', sans-serif",
                textAnchor: 'middle',
              },
            }}
          />

          {/* Olive — linear steady growth (student retention) */}
          <Line
            key="line-linear"
            id="line-linear"
            dataKey="linear"
            stroke="#6b6040"
            strokeWidth={1.8}
            dot={false}
            type="monotone"
            isAnimationActive
            animationBegin={0}
            animationDuration={2000}
            animationEasing="ease-out"
          />

          {/* Red — slow then explosive exponential growth (knowledge demanded) */}
          <Line
            key="line-expo"
            id="line-expo"
            dataKey="expo"
            stroke="#c42916"
            strokeWidth={2.5}
            dot={false}
            type="monotone"
            isAnimationActive
            animationBegin={200}
            animationDuration={2200}
            animationEasing="ease-out"
          />

          {/* Vertical reference line at last t to precisely align SVG overlays */}
              {/* reference line removed — using SVG overlay for precise control */}
        </LineChart>
      </ResponsiveContainer>

      {/* Overlay annotations that appear after animation finishes */}
      {coords && (
        <>
          {/* vertical SVG line drawn between expo and linear final points */}
              {/* Arrows: appear together with labels when `reveal` is true */}
              {(() => {
                const mid = (coords.yExpo + coords.yLinear) / 2;
                const arrowSize = 14;
                const rightBase = Math.max(8, coords.width - coords.x + 12);
                const upCenter = coords.yExpo + (mid - coords.yExpo) / 2;
                const downCenter = mid + (coords.yLinear - mid) / 2;
                const commonStyle: React.CSSProperties = {
                  position: 'absolute',
                  right: rightBase,
                  width: arrowSize,
                  height: arrowSize,
                  pointerEvents: 'none',
                  opacity: reveal ? 1 : 0,
                  transform: reveal ? 'scale(1)' : 'scale(0.9)',
                  transition: 'opacity 420ms ease, transform 360ms cubic-bezier(.2,.9,.2,1)',
                };

                return (
                  <>
                    {/* up arrow between gap label and 'with' pill */}
                    <svg
                      style={{ ...commonStyle, top: upCenter - arrowSize / 2 - 4 }}
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path d="M12 4 L6 12 H9 V20 H15 V12 H18 L12 4 Z" fill="#1c1a15" />
                    </svg>

                    {/* down arrow between gap label and 'without' box */}
                    <svg
                      style={{ ...commonStyle, top: downCenter - arrowSize / 2 + 4 }}
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path d="M12 20 L18 12 H15 V4 H9 V12 H6 L12 20 Z" fill="#1c1a15" />
                    </svg>
                  </>
                );
              })()}

          {/* knowledge gap label (centered on the vertical line) */}
          <div
            id="cs-kg-label"
            style={{
              position: 'absolute',
              // anchor right edge a few pixels left of the vertical line so label sits to the left
              right: Math.max(8, coords.width - coords.x + 12),
              top: (coords.yExpo + coords.yLinear) / 2 - 10,
              transform: reveal ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.94)',
              transformOrigin: 'right center',
              background: 'rgba(28,26,21,0.92)',
              color: '#fff',
              padding: '6px 8px',
              borderRadius: 6,
              fontSize: 12,
              opacity: reveal ? 1 : 0,
              transition: 'opacity 620ms ease 120ms, transform 420ms cubic-bezier(.2,.9,.2,1)',
              pointerEvents: 'none',
              maxWidth: 160,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Knowledge Gap
          </div>

          {/* top-right pill above last expo point */}
          <div
            id="cs-with-label"
            style={{
              position: 'absolute',
              // anchor right to the vertical line so the pill expands leftward
              right: Math.max(8, coords.width - coords.x + 8),
              top: coords.yExpo - 28,
              background: '#1c1a15',
              color: '#fff',
              padding: '6px 10px',
              borderRadius: 999,
              fontSize: 12,
              opacity: reveal ? 1 : 0,
              transition: 'opacity 720ms cubic-bezier(.2,.9,.2,1) 160ms, transform 420ms cubic-bezier(.2,.9,.2,1)',
              transform: reveal ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.96)',
              pointerEvents: 'none',
              maxWidth: coords.width ? Math.max(100, coords.width * 0.4) : 160,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Knowledge with The Study Mission
          </div>

          {/* bottom label under last linear point */}
          <div
            id="cs-without-label"
            style={{
              position: 'absolute',
              // anchor right to the vertical line so the box expands leftward
              right: Math.max(8, coords.width - coords.x + 8),
              top: coords.yLinear + 8,
              background: '#fff',
              color: '#1c1a15',
              padding: '8px 10px',
              borderRadius: 6,
              fontSize: 13,
              boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
              opacity: reveal ? 1 : 0,
              transition: 'opacity 720ms cubic-bezier(.2,.9,.2,1) 180ms, transform 420ms cubic-bezier(.2,.9,.2,1)',
              transform: reveal ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.98)',
              pointerEvents: 'none',
              maxWidth: coords.width ? Math.max(120, coords.width * 0.45) : 220,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            What School Provides (No Strategies Taught)
          </div>
        </>
      )}
    </div>
  );
}
