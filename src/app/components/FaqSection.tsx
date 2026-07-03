import { useState } from 'react';

const faqs = [
  {
    q: 'What will I find in these articles?',
    a: 'Each article explains the rationale behind better studying, what students should focus on, and how to apply the ideas in real learning scenarios. You get practical perspective, not just isolated tips.',
  },
  {
    q: 'Who are these resources for?',
    a: 'They are built for students who want to study smarter. Whether you are preparing for an exam, learning a subject deeply, or trying to build better habits, the articles help you make sense of your next study move.',
  },
  {
    q: 'How should I use the articles?',
    a: 'Read one article, then try one change in your next study session. The point is to learn the concept, then make a small adjustment so the idea becomes part of your routine.',
  },
  {
    q: 'What makes these articles different from regular study advice?',
    a: 'They focus on the underlying learning process and what students actually gain from each choice. That means the guidance is more practical and lasting than quick tricks that fade after the next test.',
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{ backgroundColor: '#dddbd3', minHeight: '100vh' }}
      className="flex flex-col"
    >
      {/* Main content */}
      <div className="flex flex-col lg:flex-row flex-1 px-10 sm:px-14 lg:px-16 pt-20 pb-20 gap-10 lg:gap-16">

        {/* Left: heading */}
        <div className="w-full lg:w-[360px] lg:flex-none">
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: '#1c1a15',
            }}
          >
            What the articles cover
          </h2>
        </div>

        {/* Right: FAQ content */}
        <div className="w-full lg:flex-1">
          <p
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 'clamp(1rem, 1.5vw, 1.05rem)',
              lineHeight: 1.7,
              color: '#3a3830',
              marginBottom: '2.5rem',
            }}
          >
            Helpful answers about what the articles cover, how students can use them, and what support they offer for more effective study habits.
          </p>

          <div style={{ borderTop: '1px solid rgba(28,26,21,0.18)' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid rgba(28,26,21,0.18)' }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.1rem 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'EB Garamond', Georgia, serif",
                      fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                      color: '#1c1a15',
                      lineHeight: 1.5,
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1.1rem',
                      color: '#1c1a15',
                      flexShrink: 0,
                      transition: 'transform 0.2s',
                      transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                      display: 'inline-block',
                    }}
                  >
                    +
                  </span>
                </button>
                {open === i && (
                  <p
                    style={{
                      fontFamily: "'EB Garamond', Georgia, serif",
                      fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
                      lineHeight: 1.75,
                      color: '#3a3830',
                      paddingBottom: '1.2rem',
                    }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
