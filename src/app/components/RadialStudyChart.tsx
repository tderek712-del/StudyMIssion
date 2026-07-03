import { useState, useEffect, useRef } from 'react';
import { PolarGrid, RadialBar, RadialBarChart, ResponsiveContainer, Cell } from 'recharts';

const chartData = [
  { technique: 'Spaced Repetition', score: 92, fill: '#6b4a2f' },
  { technique: 'Active Recall',     score: 87, fill: '#1c1a15' },
  { technique: 'Practice Testing',  score: 78, fill: '#8b5d32' },
  { technique: 'Elaboration',       score: 64, fill: '#b08962' },
  { technique: 'Re-reading',        score: 28, fill: '#c8bdaa' },
];

const LEGEND = [
  { label: 'Spaced Repetition', color: '#6b4a2f' },
  { label: 'Active Recall',     color: '#1c1a15' },
  { label: 'Practice Testing',  color: '#8b5d32' },
  { label: 'Elaboration',       color: '#b08962' },
  { label: 'Re-reading',        color: '#c8bdaa' },
];

export function RadialStudyChart() {
  const [animKey, setAnimKey] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimKey((key) => key + 1);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} style={{ width: '100%', maxWidth: 340 }}>
      {/* Chart */}
      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            key={animKey}
            data={chartData}
            innerRadius={28}
            outerRadius={102}
            startAngle={90}
            endAngle={-270}
          >
            <PolarGrid gridType="circle" radialLines={false} stroke="rgba(28,26,21,0.12)" />
            <RadialBar
              dataKey="score"
              background={{ fill: 'rgba(28,26,21,0.06)' }}
              cornerRadius={4}
              isAnimationActive
              animationBegin={0}
              animationDuration={1400}
              animationEasing="ease-out"
            />
              {chartData.map((entry) => (
                <Cell key={entry.technique} fill={entry.fill} />
              ))}
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
        {LEGEND.map(({ label, color }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', letterSpacing: '0.06em', color: 'rgba(28,26,21,0.65)' }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(28,26,21,0.4)', marginTop: 14 }}>
        Long-term retention effectiveness (research composite)
      </p>
    </div>
  );
}
