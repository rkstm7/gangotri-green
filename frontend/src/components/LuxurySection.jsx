import { useEffect, useRef, useState, useCallback } from 'react';
import heroPng from '../assets/home5-img2.png';

/* ════════════════════════════════════════════════
   KEYFRAMES
════════════════════════════════════════════════ */
const KF = `
  /* ── FLY IN ── */
  @keyframes lxFadeUp {
    from { opacity: 0; transform: translateY(38px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lxSlideLeft {
    from { opacity: 0; transform: translateX(52px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes lxWomanIn {
    from { opacity: 0; transform: translateX(-50%) translateY(80px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  @keyframes lxCardIn {
    from { opacity: 0; transform: translateY(36px) scale(0.94); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }
  @keyframes lxLineGrow {
    from { width: 0; }
    to   { width: 28px; }
  }
  @keyframes lxUnderline {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes lxDividerIn {
    from { opacity: 0; transform: scaleX(0); }
    to   { opacity: 1; transform: scaleX(1); }
  }
  @keyframes lxGoldBar {
    from { transform: scaleY(0); opacity: 0; }
    to   { transform: scaleY(1); opacity: 1; }
  }
  @keyframes lxOverlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* ── FLY OUT ── */
  @keyframes lxFadeDown {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(38px); }
  }
  @keyframes lxSlideRight {
    from { opacity: 1; transform: translateX(0); }
    to   { opacity: 0; transform: translateX(52px); }
  }
  @keyframes lxWomanOut {
    from { opacity: 1; transform: translateX(-50%) translateY(0); }
    to   { opacity: 0; transform: translateX(-50%) translateY(80px); }
  }
  @keyframes lxCardOut {
    from { opacity: 1; transform: translateY(0)    scale(1); }
    to   { opacity: 0; transform: translateY(36px) scale(0.94); }
  }
  @keyframes lxLineShrink {
    from { width: 28px; }
    to   { width: 0; }
  }
  @keyframes lxUnderlineOut {
    from { transform: scaleX(1); }
    to   { transform: scaleX(0); }
  }
  @keyframes lxDividerOut {
    from { opacity: 1; transform: scaleX(1); }
    to   { opacity: 0; transform: scaleX(0); }
  }
  @keyframes lxGoldBarOut {
    from { transform: scaleY(1); opacity: 1; }
    to   { transform: scaleY(0); opacity: 0; }
  }
  @keyframes lxOverlayOut {
    from { opacity: 1; }
    to   { opacity: 0; }
  }

  /* ── IDLE / LOOP ── */
  @keyframes lxWomanFloat {
    0%, 100% { transform: translateX(-50%) translateY(0px); }
    50%       { transform: translateX(-50%) translateY(-14px); }
  }
  @keyframes lxShimmer {
    0%   { background-position: -500px 0; }
    100% { background-position: 500px 0; }
  }
  @keyframes lxGoldPing {
    0%   { transform: scale(1);   opacity: 0.7; }
    70%  { transform: scale(2.4); opacity: 0; }
    100% { transform: scale(2.4); opacity: 0; }
  }
  @keyframes lxBtnGlow {
    0%, 100% { box-shadow: 0 0 0 0   rgba(255,255,255,0); }
    50%       { box-shadow: 0 0 0 8px rgba(255,255,255,0.10); }
  }
  @keyframes lxIconSpin {
    from { opacity: 0; transform: scale(0.5) rotate(-20deg); }
    60%  { opacity: 1; transform: scale(1.12) rotate(5deg); }
    80%  { transform: scale(0.95) rotate(-2deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
  }
`;

/* ════════════════════════════════════════════════
   FEATURE DATA
════════════════════════════════════════════════ */
const FEATURES = [
  {
    title: 'Strong Appreciation',
    desc: 'Land and homes that grow in worth',
    icon: (
      <svg width="52" height="52" viewBox="0 0 56 58" fill="none">
        <line x1="43" y1="13" x2="47" y2="10" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="46" y1="22" x2="50" y2="21" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="43" y1="30" x2="47" y2="33" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22 35C20.5 33 19 30 19 26C19 19.925 23.03 15 28 15L28 35H22Z" stroke="rgba(255,255,255,0.75)" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
        <path d="M28 15C32.97 15 37 19.925 37 26C37 30 35.5 33 34 35H28V15Z" fill="#c9a030" opacity="0.90"/>
        <path d="M28 15C32.97 15 37 19.925 37 26C37 30 35.5 33 34 35H28" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" fill="none"/>
        <line x1="22" y1="37" x2="34" y2="37" stroke="rgba(255,255,255,0.65)" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="23" y1="40" x2="33" y2="40" stroke="rgba(255,255,255,0.65)" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="25" y1="43" x2="31" y2="43" stroke="rgba(255,255,255,0.65)" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Limited Inventory',
    desc: 'Scarcity that protects long-term value',
    icon: (
      <svg width="52" height="52" viewBox="0 0 56 58" fill="none">
        <path d="M21 32L16 52L23 46L28 52" stroke="rgba(255,255,255,0.70)" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
        <path d="M35 32L40 52L33 46L28 52" stroke="rgba(255,255,255,0.70)" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
        <circle cx="28" cy="20" r="14" stroke="rgba(255,255,255,0.72)" strokeWidth="1.5" fill="none"/>
        <circle cx="28" cy="20" r="10.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1" fill="none"/>
        <path d="M28 11L30.5 18H38L32 22.5L34.5 29.5L28 25L21.5 29.5L24 22.5L18 18H25.5L28 11Z" fill="#c9a030" stroke="#c9a030" strokeWidth="0.4" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'High-Growth Locations',
    desc: 'Aligned with future development corridors',
    icon: (
      <svg width="52" height="52" viewBox="0 0 56 58" fill="none">
        <line x1="38" y1="10" x2="12" y2="46" stroke="rgba(255,255,255,0.72)" strokeWidth="3.2" strokeLinecap="round"/>
        <path d="M10 44L8 48L12 50L14 46Z" fill="rgba(255,255,255,0.72)"/>
        <line x1="18" y1="10" x2="44" y2="46" stroke="rgba(255,255,255,0.55)" strokeWidth="3.2" strokeLinecap="round"/>
        <path d="M12 6L22 6L24 14L10 14Z" transform="rotate(45 18 10)" fill="#c9a030" stroke="#c9a030" strokeWidth="0.5" strokeLinejoin="round"/>
        <path d="M42 44L44 48L48 46L46 42Z" fill="rgba(255,255,255,0.55)"/>
      </svg>
    ),
  },
  {
    title: 'Ideal for Today & Tomorrow',
    desc: 'Live, lease, or hold for the future',
    icon: (
      <svg width="52" height="52" viewBox="0 0 56 58" fill="none">
        <path d="M28 8 L31 6 L34 8 L36 6 C38.5 7.5 40.5 9.5 41.5 12 L39.5 14 C40.5 16 41 18 41 20 L43.5 21 C43.5 23.5 43 26 41.5 28 L39 27 C37.5 29 35.5 30.5 33.5 31.5 L34 34 C31.5 35.5 29 36 28 36 C27 36 24.5 35.5 22 34 L22.5 31.5 C20.5 30.5 18.5 29 17 27 L14.5 28 C13 26 12.5 23.5 12.5 21 L15 20 C15 18 15.5 16 16.5 14 L14.5 12 C15.5 9.5 17.5 7.5 20 6 L22 8 L24 6 L28 8Z" stroke="rgba(255,255,255,0.70)" strokeWidth="1.3" fill="none" strokeLinejoin="round"/>
        <circle cx="28" cy="21" r="7.5" stroke="rgba(255,255,255,0.38)" strokeWidth="1.1" fill="none"/>
        <line x1="28" y1="28" x2="28" y2="20" stroke="rgba(255,255,255,0.82)" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M28 25C28 25 23.5 23 23 18.5C23 18.5 27 17.5 29.5 21" fill="#c9a030" stroke="#c9a030" strokeWidth="0.4" strokeLinejoin="round"/>
        <path d="M28 23C28 23 31.5 20 35.5 21.5C35.5 21.5 34.5 26 31 25.5" fill="#c9a030" stroke="#c9a030" strokeWidth="0.4" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

/* ════════════════════════════════════════════════
   3D FEATURE CARD
════════════════════════════════════════════════ */
const FeatureCard = ({ f, inView, hasEntered, delay }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const mx = (e.clientX - left) / width  - 0.5;
    const my = (e.clientY - top)  / height - 0.5;
    setTilt({ x: my * -12, y: mx * 12 });
  }, []);

  const onLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        border: `1px solid ${hovered ? 'rgba(201,160,48,0.75)' : 'rgba(180,140,30,0.35)'}`,
        borderRadius: '16px',
        padding: '28px 18px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
        gap: '12px',
        minHeight: '200px',
        background: hovered
          ? 'linear-gradient(145deg, rgba(201,160,48,0.12) 0%, rgba(255,255,255,0.04) 100%)'
          : 'rgba(255,255,255,0.03)',
        boxSizing: 'border-box',
        cursor: 'default',
        transform: hovered
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px) scale(1.04)`
          : 'perspective(800px) rotateX(0) rotateY(0) translateY(0) scale(1)',
        transition: hovered
          ? 'transform 0.08s linear, box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease'
          : 'transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, background 0.3s ease, border-color 0.3s ease',
        boxShadow: hovered
          ? '0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,160,48,0.2)'
          : '0 4px 16px rgba(0,0,0,0.2)',
        animation: !hasEntered
          ? 'none'
          : inView
            ? `lxCardIn 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s both`
            : `lxCardOut 0.5s cubic-bezier(0.4,0,1,1) 0s both`,
        willChange: 'transform',
      }}
    >
      {/* Gold ping on hover */}
      {hovered && (
        <div style={{
          position: 'absolute',
          top: '28px', left: '50%',
          transform: 'translateX(-50%)',
          width: '52px', height: '52px',
          borderRadius: '50%',
          border: '1.5px solid rgba(201,160,48,0.6)',
          animation: 'lxGoldPing 1.2s ease-out infinite',
          pointerEvents: 'none',
        }} />
      )}

      {/* Icon */}
      <div style={{
        animation: !hasEntered
          ? 'none'
          : inView
            ? `lxIconSpin 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay + 0.15}s both`
            : 'none',
        position: 'relative', zIndex: 1,
      }}>
        {f.icon}
      </div>

      {/* Gold accent line */}
      <div style={{
        height: '2px',
        width: hovered ? '32px' : '0',
        background: 'linear-gradient(to right, #c9a030, transparent)',
        borderRadius: '1px',
        transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1)',
      }} />

      <div style={{
        fontSize: '14px', fontWeight: '700',
        color: hovered ? '#fff' : 'rgba(255,255,255,0.88)',
        lineHeight: '1.4', wordBreak: 'break-word', width: '100%',
        transition: 'color 0.25s',
      }}>
        {f.title}
      </div>
      <div style={{
        fontSize: '12.5px',
        color: hovered ? 'rgba(255,255,255,0.68)' : 'rgba(255,255,255,0.42)',
        lineHeight: '1.6', wordBreak: 'break-word', width: '100%',
        transition: 'color 0.3s',
      }}>
        {f.desc}
      </div>

      {/* Gloss top-left */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '55%', height: '40%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
        borderRadius: '16px 0 0 0',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s',
        pointerEvents: 'none',
      }} />
    </div>
  );
};

/* ════════════════════════════════════════════════
   SECTION
════════════════════════════════════════════════ */
const LuxurySection = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(false); // tracks if ever entered

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) setHasEntered(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Returns fly-in or fly-out animation string.
     - inName / outName : keyframe names
     - dur              : duration in seconds
     - delay            : delay in seconds (only applied on fly-in)
     - ease             : easing */
  const a = (inName, outName, dur, delay, ease = 'cubic-bezier(0.22,1,0.36,1)') => {
    if (!hasEntered) return 'none';                        // before first entry — hidden
    if (inView)  return `${inName}  ${dur}s ${ease} ${delay}s both`;
    return       `${outName} ${dur * 0.7}s cubic-bezier(0.4,0,1,1) 0s both`; // fly out faster, no delay
  };

  return (
    <>
      <style>{KF}</style>

      <section
        ref={ref}
        style={{
          position: 'relative',
          width: '100%',
          background: '#141414',
          overflow: 'hidden',
          minHeight: '900px',
        }}
      >
        {/* ── Subtle gold radial glow — top right ── */}
        <div style={{
          position: 'absolute',
          top: '-100px', right: '-100px',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(201,160,48,0.12) 0%, transparent 65%)',
          zIndex: 0,
          pointerEvents: 'none',
          animation: a('lxOverlayIn', 'lxOverlayOut', 1.5, 0.1),
        }} />

        {/* ── Noise texture overlay ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='2' height='2' fill='%23fff'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '4px 4px',
          pointerEvents: 'none',
        }} />

        {/* ── Top gold accent line ── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '3px',
          background: 'linear-gradient(to right, transparent, #c9a030 20%, #F5C518 50%, #c9a030 80%, transparent)',
          zIndex: 2,
          width: inView ? '100%' : '0',
          transition: inView
            ? 'width 1.4s cubic-bezier(0.22,1,0.36,1) 0.1s'
            : 'width 0.6s ease 0s',
        }} />

        {/* ── Gold vertical bar — far left ── */}
        <div style={{
          position: 'absolute',
          left: 0, top: '80px', bottom: '80px',
          width: '3px',
          background: 'linear-gradient(to bottom, transparent, #c9a030 20%, #F5C518 50%, #c9a030 80%, transparent)',
          zIndex: 2,
          transformOrigin: 'top',
          animation: a('lxGoldBar', 'lxGoldBarOut', 1.2, 0.3),
        }} />

        {/* ════════════ MAIN ROW ════════════ */}
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex',
          alignItems: 'stretch',
          minHeight: '900px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>

          {/* ════ LEFT — woman image ════ */}
          <div style={{
            position: 'relative',
            flexShrink: 0,
            width: '520px',
            minHeight: '900px',
            overflow: 'visible',
          }}>
            {/* Subtle vertical gold line behind image */}
            <div style={{
              position: 'absolute',
              left: '50%', top: '60px', bottom: '40px',
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, rgba(201,160,48,0.2) 30%, rgba(201,160,48,0.2) 70%, transparent)',
              transform: 'translateX(-50%)',
              zIndex: 1,
              animation: a('lxOverlayIn', 'lxOverlayOut', 1.0, 0.5),
            }} />

            <img
              src={heroPng}
              alt="Brand Ambassador"
              style={{
                position: 'absolute',
                left: '50%',
                bottom: '160px',
                width: '1200px',
                height: 'auto',
                display: 'block',
                zIndex: 2,
                animation: !hasEntered
                  ? 'none'
                  : inView
                    ? `lxWomanIn 1.3s cubic-bezier(0.22,1,0.36,1) 0.3s both, lxWomanFloat 6s ease-in-out 2s infinite`
                    : `lxWomanOut 0.9s cubic-bezier(0.4,0,1,1) 0s both`,
              }}
            />

            {/* Gold floor reflection */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: '10%', right: '10%',
              height: '60px',
              background: 'radial-gradient(ellipse, rgba(201,160,48,0.18) 0%, transparent 70%)',
              zIndex: 1,
              animation: a('lxOverlayIn', 'lxOverlayOut', 1.0, 1.0),
            }} />
          </div>

          {/* ════ RIGHT — text + cards ════ */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '120px 40px 80px 20px',
          }}>

            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              marginBottom: '20px',
              animation: a('lxFadeUp', 'lxFadeDown', 0.7, 0.25),
            }}>
              <div style={{
                height: '2px',
                background: 'linear-gradient(to right, #c9a030, #F5C518)',
                animation: a('lxLineGrow', 'lxLineShrink', 0.6, 0.32),
              }} />
              <span style={{
                fontSize: '11px', fontWeight: '700',
                letterSpacing: '3.5px', textTransform: 'uppercase',
                color: '#c9a030',
              }}>
                Premium Living
              </span>
            </div>

            {/* Heading */}
            <div style={{ animation: a('lxSlideLeft', 'lxSlideRight', 0.85, 0.35), marginBottom: '22px' }}>
              <h2 style={{
                fontSize: '54px', fontWeight: '900',
                color: 'white', lineHeight: '1.08',
                letterSpacing: '-1px', margin: 0,
                position: 'relative', display: 'inline-block',
              }}>
                Luxury That Grows
                <br />
                <span style={{
                  backgroundImage: 'linear-gradient(90deg, #c9a030 0%, #F5C518 40%, #c9a030 70%, #F5C518 100%)',
                  backgroundSize: '400px 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: inView ? 'lxShimmer 4s linear 1.5s infinite' : 'none',
                  display: 'inline-block',
                }}>
                  in Value.
                </span>
                <span style={{
                  position: 'absolute',
                  bottom: '-6px', left: 0,
                  height: '2px', width: '100%',
                  background: 'linear-gradient(90deg, rgba(201,160,48,0.6), rgba(245,197,24,0.8) 50%, transparent)',
                  display: 'block',
                  transformOrigin: 'left center',
                  animation: a('lxUnderline', 'lxUnderlineOut', 1.0, 0.9),
                }} />
              </h2>
            </div>

            {/* Body */}
            <p style={{
              fontSize: '15.5px', color: 'rgba(255,255,255,0.58)',
              lineHeight: '1.75', marginBottom: '34px', maxWidth: '400px',
              animation: a('lxFadeUp', 'lxFadeDown', 0.7, 0.5),
            }}>
              Premium NA plots and bungalows designed not just
              to live in, but to grow with you.
            </p>

            {/* Divider */}
            <div style={{
              height: '1px', width: '100%', maxWidth: '400px',
              background: 'linear-gradient(to right, rgba(201,160,48,0.4), transparent)',
              marginBottom: '32px',
              transformOrigin: 'left',
              animation: a('lxDividerIn', 'lxDividerOut', 0.8, 0.58),
            }} />

            {/* Buttons */}
            <div style={{
              display: 'flex', gap: '14px',
              marginBottom: '48px', flexWrap: 'wrap',
              animation: a('lxFadeUp', 'lxFadeDown', 0.7, 0.62),
            }}>
              <a
                href="#properties"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'white', color: '#1a1a1a',
                  padding: '13px 28px', borderRadius: '999px',
                  fontSize: '14px', fontWeight: '700', textDecoration: 'none',
                  transition: 'background 0.25s, transform 0.25s, gap 0.25s',
                  animation: inView ? 'lxBtnGlow 3s ease-in-out 2.5s infinite' : 'none',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#efefef';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.gap = '13px';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.gap = '8px';
                }}
              >
                Visit Our Properties
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#contact"
                style={{
                  display: 'inline-block',
                  background: 'transparent', color: 'white',
                  padding: '13px 28px', borderRadius: '999px',
                  fontSize: '14px', fontWeight: '600', textDecoration: 'none',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  transition: 'background 0.25s, border-color 0.25s, transform 0.25s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Get in Touch
              </a>
            </div>

            {/* 4 Feature cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '14px',
              width: '100%',
            }}>
              {FEATURES.map((f, i) => (
                <FeatureCard
                  key={f.title}
                  f={f}
                  inView={inView}
                  hasEntered={hasEntered}
                  delay={0.72 + i * 0.1}
                />
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default LuxurySection;
