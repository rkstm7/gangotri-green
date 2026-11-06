import { useEffect, useRef, useState } from 'react';

const WOMAN_SRC = 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=500&q=85&fit=crop&crop=top';

/* ── Keyframes injected once ─────────────────────────────── */
const KEYFRAMES = `
  /* Background slow zoom-in */
  @keyframes heroBgZoom {
    from { transform: scale(1.12); }
    to   { transform: scale(1); }
  }

  /* Woman image slides up from bottom */
  @keyframes womanSlideUp {
    from { transform: translateY(60px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }

  /* Generic fade + slide up */
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Fade in only */
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Gold shimmer sweep across text */
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  /* Divider lines expand from center */
  @keyframes expandLine {
    from { width: 0; opacity: 0; }
    to   { width: 48px; opacity: 1; }
  }

  /* Diamond spin-in */
  @keyframes diamondSpin {
    from { transform: rotate(0deg) scale(0); opacity: 0; }
    to   { transform: rotate(45deg) scale(1); opacity: 1; }
  }

  /* CTA button pulse glow */
  @keyframes ctaPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(245,197,24,0); }
    50%       { box-shadow: 0 0 0 8px rgba(245,197,24,0.18); }
  }

  /* Floating particle drift */
  @keyframes particleDrift {
    0%   { transform: translate(0, 0) scale(1);    opacity: 0.5; }
    33%  { transform: translate(8px, -20px) scale(1.15); opacity: 0.25; }
    66%  { transform: translate(-6px, -36px) scale(0.9); opacity: 0.4; }
    100% { transform: translate(0, -52px) scale(1); opacity: 0; }
  }

  /* Wave subtle breathe */
  @keyframes waveBreathe {
    0%, 100% { transform: scaleY(1); }
    50%       { transform: scaleY(1.04); }
  }

  /* Overlay gradient shift */
  @keyframes overlayShift {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Cursor blink on typewriter */
  @keyframes cursorBlink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
`;

/* ── Individual floating spark ───────────────────────────── */
const Spark = ({ style }) => (
  <div style={{
    position: 'absolute',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'rgba(245,197,24,0.7)',
    animation: `particleDrift ${3 + Math.random() * 4}s ease-in infinite`,
    pointerEvents: 'none',
    ...style,
  }} />
);

const SPARKS = [
  { left: '8%',  top: '65%', animationDelay: '0s' },
  { left: '14%', top: '40%', animationDelay: '1.2s' },
  { left: '20%', top: '72%', animationDelay: '2.4s' },
  { left: '28%', top: '55%', animationDelay: '0.6s' },
  { left: '35%', top: '78%', animationDelay: '3.1s' },
  { left: '6%',  top: '80%', animationDelay: '1.8s' },
  { left: '42%', top: '60%', animationDelay: '0.3s' },
  { left: '18%', top: '85%', animationDelay: '2.0s' },
];

const HeroSection = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  /* Replay animations every time the section enters the viewport */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Alias for cleaner JSX */
  const loaded = inView;

  /* Subtle parallax on mouse move */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const bg = section.querySelector('.hero-bg');
    const woman = section.querySelector('.hero-woman');

    const onMove = (e) => {
      const { innerWidth: W, innerHeight: H } = window;
      const dx = (e.clientX / W - 0.5) * 14;
      const dy = (e.clientY / H - 0.5) * 8;
      if (bg)    bg.style.transform    = `scale(1) translate(${dx * 0.4}px, ${dy * 0.4}px)`;
      if (woman) woman.style.transform = `translateY(0) translate(${dx * -0.6}px, ${dy * -0.3}px)`;
    };

    section.addEventListener('mousemove', onMove);
    return () => section.removeEventListener('mousemove', onMove);
  }, []);

  /* Shared animation base */
  const anim = (name, dur, delay, fill = 'both', ease = 'cubic-bezier(0.22,1,0.36,1)') =>
    loaded ? `${name} ${dur}s ${ease} ${delay}s ${fill}` : 'none';

  return (
    <>
      <style>{KEYFRAMES}</style>

      <section className="hero-section" ref={sectionRef}>

        {/* ── Background: slow cinematic zoom ── */}
        <div
          className="hero-bg"
          style={{
            animation: `heroBgZoom 2.2s cubic-bezier(0.25,0.46,0.45,0.94) 0s both`,
            transformOrigin: 'center center',
          }}
        />

        {/* ── Overlay: fades in ── */}
        <div
          className="hero-overlay"
          style={{ animation: `overlayShift 1.6s ease 0.2s both` }}
        />

        {/* ── Floating sparks ── */}
        {SPARKS.map((s, i) => (
          <Spark key={i} style={{ left: s.left, top: s.top, animationDelay: s.animationDelay }} />
        ))}

        {/* ── Thin gold horizontal accent line ── */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '3px',
          background: 'linear-gradient(to right, transparent, #F5C518 30%, #c9a030 70%, transparent)',
          zIndex: 5,
          animation: loaded ? `expandLine 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s both` : 'none',
          width: loaded ? '100%' : '0',
          transition: 'width 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s',
        }} />

        {/* ── Woman image ── */}
        <img
          src={WOMAN_SRC}
          alt="Brand Ambassador"
          className="hero-woman"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 18%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 80%, transparent 100%)',
            WebkitMaskComposite: 'source-in',
            maskImage: 'linear-gradient(to right, transparent 0%, black 18%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 80%, transparent 100%)',
            maskComposite: 'intersect',
            animation: anim('womanSlideUp', 1.4, 0.5),
          }}
          onError={e => { e.target.style.display = 'none'; }}
        />

        {/* ── White wave ── */}
        <div
          className="hero-wave"
          style={{ animation: anim('fadeIn', 1.2, 1.2) }}
        >
          <svg
            viewBox="0 0 1440 110"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{
              width: '100%',
              height: '110px',
              display: 'block',
              animation: `waveBreathe 6s ease-in-out infinite 2s`,
              transformOrigin: 'bottom center',
            }}
          >
            <path
              d="M0,38 C100,36 220,40 380,48 C500,54 580,80 700,95 C820,108 950,85 1080,68 C1200,52 1320,55 1440,60 L1440,110 L0,110 Z"
              fill="white"
            />
          </svg>
        </div>

        {/* ── Text content ── */}
        <div className="hero-content">
          <div style={{ maxWidth: '640px' }}>

            {/* ── Eyebrow label ── */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '18px',
              animation: anim('fadeSlideUp', 0.9, 0.4),
            }}>
              <div style={{
                width: '28px', height: '1.5px',
                background: '#F5C518',
              }} />
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '3.5px',
                textTransform: 'uppercase',
                color: '#F5C518',
              }}>
                Premium Real Estate · Pune
              </span>
            </div>

            {/* ── Heading line 1: gold shimmer ── */}
            <h1 style={{ lineHeight: '1.18', letterSpacing: '-0.5px', marginBottom: '0' }}>
              <span style={{
                display: 'block',
                fontSize: '46px',
                fontWeight: '800',
                backgroundImage: 'linear-gradient(90deg, #F5C518 0%, #ffe97a 40%, #c9a030 60%, #F5C518 100%)',
                backgroundSize: '400px 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: loaded
                  ? `fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.55s both, shimmer 3.5s linear 1.8s infinite`
                  : 'none',
              }}>
                Buy Land,
              </span>

              {/* ── Heading line 2 ── */}
              <span style={{
                display: 'block',
                color: 'white',
                fontSize: '50px',
                fontWeight: '800',
                lineHeight: '1.12',
                whiteSpace: 'nowrap',
                animation: anim('fadeSlideUp', 0.9, 0.72),
              }}>
                They're Not Making It Anymore.
              </span>
            </h1>

            {/* ── Subtitle ── */}
            <p style={{
              color: 'rgba(255,255,255,0.82)',
              fontSize: '15px',
              fontWeight: '400',
              marginTop: '14px',
              letterSpacing: '0.1px',
              animation: anim('fadeSlideUp', 0.9, 0.9),
            }}>
              Crafted for those who seek elegance, comfort, and timeless design.
            </p>

            {/* ── Animated diamond divider ── */}
            <div
              className="divider"
              style={{ animation: anim('fadeIn', 0.6, 1.05) }}
            >
              <div style={{
                width: '48px',
                height: '1px',
                background: 'rgba(255,255,255,0.50)',
                animation: anim('expandLine', 0.7, 1.1),
              }} />
              <div
                className="divider-diamond"
                style={{ animation: anim('diamondSpin', 0.6, 1.2) }}
              />
              <div style={{
                width: '48px',
                height: '1px',
                background: 'rgba(255,255,255,0.50)',
                animation: anim('expandLine', 0.7, 1.1),
              }} />
            </div>

            {/* ── Secondary line ── */}
            <p style={{
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '26px',
              animation: anim('fadeSlideUp', 0.9, 1.05),
            }}>
              Discover premium plots and elegant 4BHK bungalows
            </p>

            {/* ── CTA button ── */}
            <div style={{ animation: anim('fadeSlideUp', 0.9, 1.2) }}>
              <a
                href="#properties"
                className="btn-explore"
                style={{
                  animation: `ctaPulse 2.8s ease-in-out 2.5s infinite`,
                  display: 'inline-block',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(245,197,24,0.18)';
                  e.currentTarget.style.borderColor = '#F5C518';
                  e.currentTarget.style.letterSpacing = '0.6px';
                  e.currentTarget.style.transition = 'all 0.3s ease';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.88)';
                  e.currentTarget.style.letterSpacing = '0.2px';
                }}
              >
                Explore our Properties
              </a>
            </div>

          </div>
        </div>

      </section>
    </>
  );
};

export default HeroSection;
