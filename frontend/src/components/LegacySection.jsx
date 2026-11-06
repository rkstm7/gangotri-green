import { useEffect, useRef, useState } from 'react';

/* ════════════════════════════════════════════════
   KEYFRAMES
════════════════════════════════════════════════ */
const KF = `
  /* Background slow parallax zoom */
  @keyframes lgBgZoom {
    from { transform: scale(1.10); }
    to   { transform: scale(1.0); }
  }

  /* Overlay fade */
  @keyframes lgOverlay {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Curtain wipe: reveal from left */
  @keyframes lgCurtainLeft {
    from { clip-path: inset(0 100% 0 0); opacity: 0.4; }
    to   { clip-path: inset(0 0% 0 0);   opacity: 1; }
  }

  /* Bungalow: rise from below */
  @keyframes lgRiseUp {
    from { opacity: 0; transform: translateX(-50%) translateY(50px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }

  /* Woman: drift in from right */
  @keyframes lgWomanIn {
    from { opacity: 0; transform: translateX(60px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* Woman idle float */
  @keyframes lgWomanFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }

  /* Generic fade + slide up */
  @keyframes lgFadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Slide in from left */
  @keyframes lgSlideLeft {
    from { opacity: 0; transform: translateX(-36px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* Gold line width expand */
  @keyframes lgLineGrow {
    from { width: 0; }
    to   { width: 32px; }
  }

  /* Heading underline scaleX */
  @keyframes lgUnderline {
    from { transform: scaleX(0); transform-origin: left; }
    to   { transform: scaleX(1); transform-origin: left; }
  }

  /* Gold shimmer sweep */
  @keyframes lgShimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  /* SVG circle stroke draw */
  @keyframes lgCircleDraw {
    from { stroke-dashoffset: 72; }
    to   { stroke-dashoffset: 0; }
  }

  /* SVG checkmark draw */
  @keyframes lgCheckDraw {
    from { stroke-dashoffset: 22; opacity: 0; }
    to   { stroke-dashoffset: 0;  opacity: 1; }
  }

  /* Pill button subtle glow pulse */
  @keyframes lgBtnGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(26,26,26,0.00); }
    50%       { box-shadow: 0 0 0 7px rgba(26,26,26,0.08); }
  }

  /* Gold vertical bar grow downward */
  @keyframes lgBarGrow {
    from { transform: scaleY(0); transform-origin: top; opacity: 0; }
    to   { transform: scaleY(1); transform-origin: top; opacity: 1; }
  }
`;

/* ════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════ */
const FEATURES = [
  { title: 'Curated NA Plots',            sub: 'Legally clear, thoughtfully planned land parcels' },
  { title: 'Community with Class',        sub: 'Like-minded neighbours, elevated living' },
  { title: 'Quiet, Private Surroundings', sub: 'Away from chaos, close to comfort' },
  { title: 'Thoughtful Infrastructure',   sub: 'Wide roads, drainage, and utilities in place' },
];

/* ════════════════════════════════════════════════
   SVG CHECK — draws on entry
════════════════════════════════════════════════ */
const DrawCheck = ({ active, delay }) => (
  <svg viewBox="0 0 24 24" width="22" height="22"
    style={{ flexShrink: 0, marginTop: '3px', overflow: 'visible' }}>
    {/* Circle */}
    <circle
      cx="12" cy="12" r="11"
      fill="none" stroke="#c9a030" strokeWidth="1.6"
      strokeDasharray="72"
      style={{
        strokeDashoffset: active ? undefined : 72,
        animation: active
          ? `lgCircleDraw 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}s both`
          : 'none',
      }}
    />
    {/* Tick */}
    <path
      d="M7.5 12.3l3.2 3.2 5.8-6.4"
      fill="none" stroke="#c9a030" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round"
      strokeDasharray="22"
      style={{
        strokeDashoffset: active ? undefined : 22,
        animation: active
          ? `lgCheckDraw 0.45s cubic-bezier(0.22,1,0.36,1) ${delay + 0.18}s both`
          : 'none',
      }}
    />
  </svg>
);

/* ════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════ */
const LegacySection = () => {
  const ref  = useRef(null);
  const [v, setV] = useState(false);   /* v = visible / in-view */

  /* Scroll-replay: toggles both ways */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setV(e.isIntersecting),
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Helper — returns animation string or 'none' */
  const a = (name, dur, delay, ease = 'cubic-bezier(0.22,1,0.36,1)') =>
    v ? `${name} ${dur}s ${ease} ${delay}s both` : 'none';

  return (
    <>
      <style>{KF}</style>

      <section
        ref={ref}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '680px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >

        {/* ── BG image: slow zoom ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          filter: 'brightness(1.05) saturate(0.7) hue-rotate(200deg)',
          animation: a('lgBgZoom', 2.0, 0, 'cubic-bezier(0.25,0.46,0.45,0.94)'),
          transformOrigin: 'center center',
        }} />

        {/* ── White gradient overlay ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to right, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.55) 48%, rgba(255,255,255,0.04) 100%)',
          animation: a('lgOverlay', 1.4, 0.15),
        }} />

        {/* ── Thin gold vertical accent ── */}
        <div style={{
          position: 'absolute',
          left: '108px', top: '64px', bottom: '64px',
          width: '2.5px',
          background: 'linear-gradient(to bottom, transparent 0%, #c9a030 18%, #F5C518 50%, #c9a030 82%, transparent 100%)',
          zIndex: 4,
          animation: a('lgBarGrow', 1.1, 0.35),
        }} />

        {/* ── Bungalow center ── */}
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80"
          alt="Luxury Bungalow"
          style={{
            position: 'absolute',
            bottom: 0, left: '48%',
            width: '560px', height: 'auto',
            zIndex: 2, objectFit: 'cover',
            WebkitMaskImage:
              'linear-gradient(to top, black 45%, transparent 100%), linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            WebkitMaskComposite: 'source-in',
            maskImage:
              'linear-gradient(to top, black 45%, transparent 100%), linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            maskComposite: 'intersect',
            animation: a('lgRiseUp', 1.3, 0.45),
          }}
        />

        {/* ── Woman right ── */}
        <img
          src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=500&q=85&fit=crop&crop=top"
          alt="Brand Ambassador"
          style={{
            position: 'absolute',
            right: '3%', bottom: 0,
            height: '95%', width: 'auto',
            zIndex: 3, objectFit: 'contain', objectPosition: 'bottom',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 14%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 6%, black 82%, transparent 100%)',
            WebkitMaskComposite: 'source-in',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 14%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 6%, black 82%, transparent 100%)',
            maskComposite: 'intersect',
            animation: v
              ? `lgWomanIn 1.2s cubic-bezier(0.22,1,0.36,1) 0.55s both, lgWomanFloat 5s ease-in-out 2.2s infinite`
              : 'none',
          }}
        />

        {/* ════════════════ TEXT CONTENT ════════════════ */}
        <div style={{
          position: 'relative', zIndex: 4,
          padding: '80px 0 80px 130px',
          maxWidth: '580px',
        }}>

          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginBottom: '18px',
            animation: a('lgFadeUp', 0.7, 0.3),
          }}>
            <div style={{
              height: '2px',
              background: 'linear-gradient(to right, #c9a030, #F5C518)',
              animation: a('lgLineGrow', 0.6, 0.38),
            }} />
            <span style={{
              fontSize: '11px', fontWeight: '700',
              letterSpacing: '3.5px', textTransform: 'uppercase',
              color: '#c9a030',
            }}>
              Our Promise
            </span>
          </div>

          {/* Heading — curtain wipe + underline */}
          <div style={{
            marginBottom: '20px',
            animation: a('lgSlideLeft', 0.85, 0.4),
          }}>
            <h2 style={{
              fontSize: '50px', fontWeight: '800',
              color: '#1a1a1a', lineHeight: '1.12',
              letterSpacing: '-0.5px', margin: 0,
              whiteSpace: 'nowrap',
              position: 'relative', display: 'inline-block',
            }}>
              Not Just Land. A Legacy.
              {/* Gold underline scales from left */}
              <span style={{
                position: 'absolute',
                bottom: '-6px', left: 0,
                height: '2.5px', width: '100%',
                background: 'linear-gradient(90deg, #c9a030 0%, #F5C518 50%, #c9a030 100%)',
                backgroundSize: '400px 100%',
                display: 'block',
                transformOrigin: 'left center',
                animation: v
                  ? `lgUnderline 0.85s cubic-bezier(0.22,1,0.36,1) 0.9s both,
                     lgShimmer 3.2s linear 2s infinite`
                  : 'none',
              }} />
            </h2>
          </div>

          {/* Subtitle */}
          <p style={{
            fontSize: '16px', color: '#444',
            lineHeight: '1.78', marginBottom: '32px',
            maxWidth: '440px',
            animation: a('lgFadeUp', 0.7, 0.55),
          }}>
            Curated NA plots and bespoke bungalows designed for those
            who value exclusivity, security, and long-term worth.
          </p>

          {/* Buttons */}
          <div style={{
            display: 'flex', gap: '14px',
            marginBottom: '42px', flexWrap: 'wrap',
            animation: a('lgFadeUp', 0.7, 0.68),
          }}>
            {/* Primary pill */}
            <a
              href="#properties"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#1a1a1a', color: 'white',
                padding: '13px 28px', borderRadius: '999px',
                fontSize: '14px', fontWeight: '600', textDecoration: 'none',
                transition: 'background 0.22s, transform 0.22s, gap 0.22s',
                animation: v ? 'lgBtnGlow 2.8s ease-in-out 2.4s infinite' : 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#000';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.gap = '13px';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#1a1a1a';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.gap = '8px';
              }}
            >
              Visit Our Properties
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Ghost pill */}
            <a
              href="#contact"
              style={{
                display: 'inline-block',
                background: 'transparent', color: '#1a1a1a',
                padding: '13px 28px', borderRadius: '999px',
                fontSize: '14px', fontWeight: '600', textDecoration: 'none',
                border: '1.5px solid rgba(26,26,26,0.55)',
                transition: 'background 0.22s, color 0.22s, border-color 0.22s, transform 0.22s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#1a1a1a';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = '#1a1a1a';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1a1a1a';
                e.currentTarget.style.borderColor = 'rgba(26,26,26,0.55)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get in Touch
            </a>
          </div>

          {/* Feature list — each staggered */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '14px',
                  animation: a('lgFadeUp', 0.65, 0.78 + i * 0.11),
                }}
              >
                <DrawCheck active={v} delay={0.90 + i * 0.11} />
                <div>
                  <div style={{
                    fontSize: '15.5px', fontWeight: '700',
                    color: '#1a1a1a', lineHeight: '1.3',
                  }}>
                    {f.title}
                  </div>
                  <div style={{
                    fontSize: '13.5px', color: '#666',
                    marginTop: '3px', lineHeight: '1.55',
                  }}>
                    {f.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default LegacySection;
