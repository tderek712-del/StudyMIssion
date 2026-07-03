// Adapted from uiverse.io/Nawsome — colours mapped to The Study Mission palette
const CSS = `
  .tsm-pl {
    --bg:       #dddbd3;
    --primary1: #7a4e2f;
    --primary2: #1c1a15;
    --fg-t:     rgba(28,26,21,0.6);
    --trans-dur: 0.45s;
    box-shadow: 1.2em 0 1.2em rgba(0,0,0,0.08) inset, -1.2em 0 1.2em rgba(255,255,255,0.06) inset;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transform: rotateX(25deg) rotateZ(45deg);
    width: 9.5em;
    height: 9.5em;
    color: var(--primary2);
  }
  .tsm-pl, .tsm-pl__dot { border-radius: 50%; }
  .tsm-pl__dot {
    animation-name: tsm-shadow;
    box-shadow: 0.06em 0.06em 0 0.06em rgba(0,0,0,0.25), 0.18em 0 0.18em rgba(0,0,0,0.28);
    top:  calc(50% - 0.5em);
    left: calc(50% - 0.5em);
    width: 1em; height: 1em;
  }
  .tsm-pl__dot, .tsm-pl__dot:before, .tsm-pl__dot:after {
    animation-duration: 6s;
    animation-iteration-count: infinite;
    position: absolute;
  }
  .tsm-pl__dot:before, .tsm-pl__dot:after {
    content: ""; display: block; left: 0; width: inherit;
    transition: background-color var(--trans-dur);
  }
  .tsm-pl__dot:before {
    animation-name: tsm-push1;
    background-color: var(--bg);
    border-radius: inherit;
    box-shadow: 0.03em 0 0.05em rgba(255,255,255,0.12) inset;
    height: inherit; z-index: 1;
  }
  .tsm-pl__dot:after {
    animation-name: tsm-push2;
    background-color: var(--primary1);
    border-radius: 0.5em;
    box-shadow: 0.06em 0.18em 0.12em rgba(255,255,255,0.18) inset,
                0 -0.22em 0.12em #1c1a15 inset,
                0 -0.6em 0.15em rgba(0,0,0,0.18) inset;
    bottom: 0;
    clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);
    height: 2em;
    transform: rotate(-45deg);
    transform-origin: 50% 1.5em;
  }
  .tsm-pl__dot:nth-child(1)  { transform: rotate(0deg)    translateX(2.5em) rotate(0deg);    z-index:5; }
  .tsm-pl__dot:nth-child(2)  { transform: rotate(-30deg)  translateX(2.5em) rotate(30deg);   z-index:4; }
  .tsm-pl__dot:nth-child(3)  { transform: rotate(-60deg)  translateX(2.5em) rotate(60deg);   z-index:3; }
  .tsm-pl__dot:nth-child(4)  { transform: rotate(-90deg)  translateX(2.5em) rotate(90deg);   z-index:2; }
  .tsm-pl__dot:nth-child(5)  { transform: rotate(-120deg) translateX(2.5em) rotate(120deg);  z-index:1; }
  .tsm-pl__dot:nth-child(6)  { transform: rotate(-150deg) translateX(2.5em) rotate(150deg);  z-index:1; }
  .tsm-pl__dot:nth-child(7)  { transform: rotate(-180deg) translateX(2.5em) rotate(180deg);  z-index:2; }
  .tsm-pl__dot:nth-child(8)  { transform: rotate(-210deg) translateX(2.5em) rotate(210deg);  z-index:3; }
  .tsm-pl__dot:nth-child(9)  { transform: rotate(-240deg) translateX(2.5em) rotate(240deg);  z-index:4; }
  .tsm-pl__dot:nth-child(10) { transform: rotate(-270deg) translateX(2.5em) rotate(270deg);  z-index:5; }
  .tsm-pl__dot:nth-child(11) { transform: rotate(-300deg) translateX(2.5em) rotate(300deg);  z-index:6; }
  .tsm-pl__dot:nth-child(12) { transform: rotate(-330deg) translateX(2.5em) rotate(330deg);  z-index:6; }
  .tsm-pl__dot:nth-child(1),  .tsm-pl__dot:nth-child(1):before,  .tsm-pl__dot:nth-child(1):after  { animation-delay: 0s; }
  .tsm-pl__dot:nth-child(2),  .tsm-pl__dot:nth-child(2):before,  .tsm-pl__dot:nth-child(2):after  { animation-delay: -0.5s; }
  .tsm-pl__dot:nth-child(3),  .tsm-pl__dot:nth-child(3):before,  .tsm-pl__dot:nth-child(3):after  { animation-delay: -1s; }
  .tsm-pl__dot:nth-child(4),  .tsm-pl__dot:nth-child(4):before,  .tsm-pl__dot:nth-child(4):after  { animation-delay: -1.5s; }
  .tsm-pl__dot:nth-child(5),  .tsm-pl__dot:nth-child(5):before,  .tsm-pl__dot:nth-child(5):after  { animation-delay: -2s; }
  .tsm-pl__dot:nth-child(6),  .tsm-pl__dot:nth-child(6):before,  .tsm-pl__dot:nth-child(6):after  { animation-delay: -2.5s; }
  .tsm-pl__dot:nth-child(7),  .tsm-pl__dot:nth-child(7):before,  .tsm-pl__dot:nth-child(7):after  { animation-delay: -3s; }
  .tsm-pl__dot:nth-child(8),  .tsm-pl__dot:nth-child(8):before,  .tsm-pl__dot:nth-child(8):after  { animation-delay: -3.5s; }
  .tsm-pl__dot:nth-child(9),  .tsm-pl__dot:nth-child(9):before,  .tsm-pl__dot:nth-child(9):after  { animation-delay: -4s; }
  .tsm-pl__dot:nth-child(10), .tsm-pl__dot:nth-child(10):before, .tsm-pl__dot:nth-child(10):after { animation-delay: -4.5s; }
  .tsm-pl__dot:nth-child(11), .tsm-pl__dot:nth-child(11):before, .tsm-pl__dot:nth-child(11):after { animation-delay: -5s; }
  .tsm-pl__dot:nth-child(12), .tsm-pl__dot:nth-child(12):before, .tsm-pl__dot:nth-child(12):after { animation-delay: -5.5s; }
  .tsm-pl__text {
    font-size: 0.72em;
    max-width: 5rem;
    position: relative;
    text-shadow: 0 0 0.1em var(--fg-t);
    transform: rotateZ(-45deg);
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: var(--primary2);
  }
  @keyframes tsm-shadow {
    from { animation-timing-function: ease-in;
           box-shadow: 0.1em 0.1em 0 0.1em rgba(0,0,0,0.3), 0.3em 0 0.3em rgba(0,0,0,0.25); }
    25%  { animation-timing-function: ease-out;
           box-shadow: 0.1em 0.1em 0 0.1em rgba(0,0,0,0.3), 0.8em 0 0.8em rgba(0,0,0,0.45); }
    50%, to { box-shadow: 0.1em 0.1em 0 0.1em rgba(0,0,0,0.3), 0.3em 0 0.3em rgba(0,0,0,0.25); }
  }
  @keyframes tsm-push1 {
    from { animation-timing-function: ease-in; background-color: var(--bg); transform: translate(0,0); }
    25%  { animation-timing-function: ease-out; background-color: var(--primary2); transform: translate(-71%,-71%); }
    50%, to { background-color: var(--bg); transform: translate(0,0); }
  }
  @keyframes tsm-push2 {
    from { animation-timing-function: ease-in; background-color: var(--bg); clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%); }
    25%  { animation-timing-function: ease-out; background-color: var(--primary1); clip-path: polygon(0 25%, 100% 25%, 100% 100%, 0 100%); }
    50%, to { background-color: var(--bg); clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%); }
  }
`;

export function LoadingAnimation() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
      <style>{CSS}</style>

      {/* The spinner */}
      <div className="tsm-pl">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="tsm-pl__dot" />
        ))}
      </div>

      {/* Caption */}
      <div style={{ textAlign: 'center', maxWidth: 260 }}>
        <p style={{
          fontFamily:    "'EB Garamond', Georgia, serif",
          fontSize:      '1.05rem',
          lineHeight:    1.7,
          color:         'rgba(28,26,21,0.6)',
          fontStyle:     'italic',
        }}>
          Your brain is consolidating — spaced review catches it at exactly the right moment.
        </p>
      </div>
    </div>
  );
}
