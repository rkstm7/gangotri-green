import { useEffect, useRef, useState } from 'react';

/* ════════════════════════════════════════════════
   KEYFRAMES
════════════════════════════════════════════════ */
const KF = `
  /* BG image zoom in slowly */
  @keyframes wsBgZoom {
    from { transform: scale(1.15); }
    to   { transform: scale(1.02); }
  }
  /* Overlay dark fade in */
  @keyframes wsOverlay {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  /* Logo drop + fade */
  @keyframes wsLogoDrop {
    from { opacity: 0; transform: translateY(-40px) scale(0.85); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }
  /* Tag line slide up */
  @keyframes wsTagUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  /* Gold line expand from center */
  @keyframes wsLineExpand {
    from { width: 0; opacity: 0; }
    to   { width: 120px; opacity: 1; }
  }
  /* Shimmer sweep */
  @keyframes wsShimmer {
    0%   { background-position: -600px 0; }
    100% { background-position: 600px 0; }
  }
  /* Particles float up */
  @keyframes wsParticle {
    0%   { transform: translateY(0) scale(1);    opacity: 0.7; }
    100% { transform: translateY(-90px) scale(0); opacity: 0; }
  }
  /* Enter button pulse */
  @keyframes wsBtnPulse {
    0%, 100% { box-shadow: 0 0 0 0   rgba(201,160,48,0); }
    50%       { box-shadow: 0 0 0 14px rgba(201,160,48,0.18); }
  }
  /* Enter button appear */
  @keyframes wsBtnIn {
    from { opacity: 0; transform: translateY(20px) scale(0.9); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }
  /* Diamond spin */
  @keyframes wsDiamondSpin {
    from { transform: rotate(0deg)   scale(0); opacity: 0; }
    to   { transform: rotate(45deg)  scale(1); opacity: 1; }
  }
  /* Ring grow */
  @keyframes wsRingGrow {
    from { transform: scale(0.2); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }
  /* Counter tick */
  @keyframes wsCountIn {
    from { opacity: 0; transform: scale(0.6); }
    to   { opacity: 1; transform: scale(1); }
  }
  /* Full screen exit — slides UP */
  @keyframes wsExitUp {
    from { transform: translateY(0);     opacity: 1; }
    to   { transform: translateY(-100%); opacity: 0; }
  }
  /* Split exit — top half up, bottom half down */
  @keyframes wsSplitTop {
    from { transform: translateY(0); }
    to   { transform: translateY(-100%); }
  }
  @keyframes wsSplitBottom {
    from { transform: translateY(0); }
    to   { transform: translateY(100%); }
  }
  /* Horizontal reveal line */
  @keyframes wsRevealLine {
    0%   { width: 0; opacity: 1; }
    80%  { width: 100%; opacity: 1; }
    100% { width: 100%; opacity: 0; }
  }
  /* Floating badge */
  @keyframes wsBadgeFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-8px); }
  }
  /* Stats count up */
  @keyframes wsStatIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

/* ── Gold floating particle ─────────────────── */
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  left: `${8 + i * 7.5}%`,
  bottom: `${10 + (i % 3) * 8}%`,
  delay: `${i * 0.3}s`,
  dur:   `${2.5 + (i % 4) * 0.8}s`,
  size:  `${3 + (i % 3) * 2}px`,
}));

/* ── Stats ─────────────────────────────────── */
const STATS = [
  { value: '20+', label: 'Years' },
  { value: '50+', label: 'Projects' },
  { value: '5K+', label: 'Families' },
];

const WelcomeScreen = ({ onEnter }) => {
  const [phase, setPhase]         = useState('idle');   // idle | active | exiting | done
  const [btnHovered, setBtnHovered] = useState(false);
  const [countdown, setCountdown]  = useState(6);
  const timerRef = useRef(null);

  /* Auto-enter countdown */
  useEffect(() => {
    /* small delay before animations kick in */
    const start = setTimeout(() => setPhase('active'), 80);
    return () => clearTimeout(start);
  }, []);

  useEffect(() => {
    if (phase !== 'active') return;
    timerRef.current = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(timerRef.current); handleExit(); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const handleExit = () => {
    clearInterval(timerRef.current);
    setPhase('exiting');
    setTimeout(() => { setPhase('done'); onEnter(); }, 900);
  };

  if (phase === 'done') return null;

  const active = phase === 'active';
  const exiting = phase === 'exiting';

  const a = (name, dur, delay, ease = 'cubic-bezier(0.22,1,0.36,1)') =>
    active ? `${name} ${dur}s ${ease} ${delay}s both` : 'none';

  return (
    <>
      <style>{KF}</style>

      {/* ── SPLIT EXIT PANELS ── */}
      {exiting && (
        <>
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0,
            height: '50vh', zIndex: 10001,
            background: '#0d1a0d',
            animation: 'wsSplitTop 0.85s cubic-bezier(0.76,0,0.24,1) 0s forwards',
          }} />
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            height: '50vh', zIndex: 10001,
            background: '#0d1a0d',
            animation: 'wsSplitBottom 0.85s cubic-bezier(0.76,0,0.24,1) 0s forwards',
          }} />
          {/* Gold reveal line at center */}
          <div style={{
            position: 'fixed', top: '50%', left: 0,
            height: '2px', zIndex: 10002,
            background: 'linear-gradient(to right, transparent, #F5C518, transparent)',
            transform: 'translateY(-50%)',
            animation: 'wsRevealLine 0.7s ease 0s forwards',
          }} />
        </>
      )}

      {/* ── MAIN OVERLAY ── */}
      <div style={{
        position: 'fixed', inset: 0,
        zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        opacity: exiting ? 0 : 1,
        transition: exiting ? 'opacity 0.3s ease' : 'none',
      }}>

        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1800&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'wsBgZoom 8s cubic-bezier(0.25,0.46,0.45,0.94) 0s both',
          zIndex: 0,
        }} />

        {/* Dark vignette overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, rgba(5,12,5,0.82) 0%, rgba(10,22,10,0.72) 40%, rgba(5,12,5,0.88) 100%)',
          zIndex: 1,
          animation: 'wsOverlay 1.2s ease 0s both',
        }} />

        {/* Radial gold glow center */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(201,160,48,0.14) 0%, transparent 65%)',
          zIndex: 2, pointerEvents: 'none',
          animation: a('wsOverlay', 2.0, 0.5),
        }} />

        {/* Decorative rotating rings */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '520px', height: '520px',
          borderRadius: '50%',
          border: '1px solid rgba(201,160,48,0.12)',
          zIndex: 2, pointerEvents: 'none',
          animation: a('wsRingGrow', 1.8, 0.6),
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '380px', height: '380px',
          borderRadius: '50%',
          border: '1px solid rgba(201,160,48,0.18)',
          zIndex: 2, pointerEvents: 'none',
          animation: a('wsRingGrow', 1.6, 0.75),
        }} />

        {/* Floating gold particles */}
        {active && PARTICLES.map((p, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: p.left, bottom: p.bottom,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: 'rgba(201,160,48,0.65)',
            zIndex: 3, pointerEvents: 'none',
            animation: `wsParticle ${p.dur} ease-in ${p.delay} infinite`,
          }} />
        ))}

        {/* ════ MAIN CONTENT ════ */}
        <div style={{
          position: 'relative', zIndex: 4,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center',
          padding: '0 24px', maxWidth: '700px', width: '100%',
        }}>

          {/* Top accent line */}
          <div style={{
            height: '1.5px', marginBottom: '40px',
            background: 'linear-gradient(to right, transparent, #c9a030, #F5C518, #c9a030, transparent)',
            animation: a('wsLineExpand', 1.0, 0.3),
          }} />

          {/* Logo */}
          <div style={{
            marginBottom: '28px',
            animation: a('wsLogoDrop', 1.0, 0.5),
            filter: 'drop-shadow(0 8px 32px rgba(201,160,48,0.35))',
          }}>
            <img
              src="/src/assets/gangotri-logo.webp"
              alt="Gangotri Green"
              style={{
                height: '110px',
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Diamond divider */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            marginBottom: '24px',
            animation: a('wsTagUp', 0.7, 0.72),
          }}>
            <div style={{ width: '48px', height: '1px', background: 'rgba(201,160,48,0.5)' }} />
            <div style={{
              width: '8px', height: '8px',
              background: '#c9a030',
              animation: a('wsDiamondSpin', 0.6, 0.8),
            }} />
            <div style={{ width: '48px', height: '1px', background: 'rgba(201,160,48,0.5)' }} />
          </div>

          {/* Tagline */}
          <p style={{
            fontSize: '11px', fontWeight: '700',
            letterSpacing: '5px', textTransform: 'uppercase',
            color: '#c9a030', marginBottom: '16px',
            animation: a('wsTagUp', 0.7, 0.82),
          }}>
            Premium Real Estate · Pune
          </p>

          {/* Main headline */}
          <h1 style={{
            margin: '0 0 10px',
            fontSize: 'clamp(36px, 6vw, 62px)',
            fontWeight: '900', lineHeight: '1.08',
            letterSpacing: '-1.5px', color: 'white',
            animation: a('wsTagUp', 0.9, 0.88),
          }}>
            Welcome to
          </h1>
          <h1 style={{
            margin: '0 0 28px',
            fontSize: 'clamp(36px, 6vw, 62px)',
            fontWeight: '900', lineHeight: '1.08',
            letterSpacing: '-1.5px',
            backgroundImage: 'linear-gradient(90deg, #c9a030 0%, #F5C518 35%, #ffe97a 55%, #c9a030 80%, #F5C518 100%)',
            backgroundSize: '600px 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: active
              ? `wsTagUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.95s both, wsShimmer 4s linear 2.5s infinite`
              : 'none',
          }}>
            Gangotri Green
          </h1>

          {/* Subline */}
          <p style={{
            fontSize: '16px', color: 'rgba(255,255,255,0.65)',
            lineHeight: '1.7', maxWidth: '420px',
            marginBottom: '44px',
            animation: a('wsTagUp', 0.8, 1.05),
          }}>
            Where your dream of owning land becomes a legacy for generations.
          </p>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: '0',
            marginBottom: '52px',
          }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{
                padding: '16px 32px',
                borderRight: i < STATS.length - 1 ? '1px solid rgba(201,160,48,0.25)' : 'none',
                animation: a('wsStatIn', 0.7, 1.1 + i * 0.1),
              }}>
                <div style={{
                  fontSize: '28px', fontWeight: '900', color: '#F5C518',
                  lineHeight: 1, letterSpacing: '-1px',
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: '11px', fontWeight: '600',
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  marginTop: '5px',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div style={{ animation: a('wsBtnIn', 0.8, 1.3) }}>
            <button
              onClick={handleExit}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                padding: '16px 44px',
                borderRadius: '999px',
                background: btnHovered
                  ? 'linear-gradient(135deg, #F5C518 0%, #c9a030 100%)'
                  : 'linear-gradient(135deg, #c9a030 0%, #F5C518 100%)',
                color: '#0d1a0d',
                border: 'none', cursor: 'pointer',
                fontSize: '15px', fontWeight: '800',
                letterSpacing: '0.5px',
                transform: btnHovered ? 'translateY(-3px) scale(1.04)' : 'translateY(0) scale(1)',
                transition: 'background 0.3s, transform 0.3s, box-shadow 0.3s',
                animation: active
                  ? `wsBtnPulse 2.5s ease-in-out 2.5s infinite`
                  : 'none',
                boxShadow: btnHovered
                  ? '0 16px 40px rgba(201,160,48,0.50)'
                  : '0 8px 24px rgba(201,160,48,0.30)',
              }}
            >
              <span>Explore Properties</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#0d1a0d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Countdown */}
          <div style={{
            marginTop: '28px',
            display: 'flex', alignItems: 'center', gap: '8px',
            animation: a('wsTagUp', 0.6, 1.5),
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#c9a030',
            }} />
            <span style={{
              fontSize: '12px', color: 'rgba(255,255,255,0.38)',
              letterSpacing: '0.5px',
            }}>
              Auto-entering in&nbsp;
              <span style={{
                color: '#c9a030', fontWeight: '700',
                animation: 'wsCountIn 0.3s ease both',
                key: countdown,
              }}>
                {countdown}
              </span>
              &nbsp;seconds
            </span>
          </div>

        </div>

        {/* Bottom accent line */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '3px', zIndex: 5,
          background: 'linear-gradient(to right, transparent, #c9a030 20%, #F5C518 50%, #c9a030 80%, transparent)',
          animation: a('wsLineExpand', 1.2, 0.2),
        }} />

        {/* Corner accents */}
        {[
          { top: '24px', left: '24px', borderTop: '2px solid rgba(201,160,48,0.5)', borderLeft: '2px solid rgba(201,160,48,0.5)' },
          { top: '24px', right: '24px', borderTop: '2px solid rgba(201,160,48,0.5)', borderRight: '2px solid rgba(201,160,48,0.5)' },
          { bottom: '24px', left: '24px', borderBottom: '2px solid rgba(201,160,48,0.5)', borderLeft: '2px solid rgba(201,160,48,0.5)' },
          { bottom: '24px', right: '24px', borderBottom: '2px solid rgba(201,160,48,0.5)', borderRight: '2px solid rgba(201,160,48,0.5)' },
        ].map((s, i) => (
          <div key={i} style={{
            position: 'absolute', width: '32px', height: '32px',
            zIndex: 5, ...s,
            animation: a('wsOverlay', 0.8, 0.4 + i * 0.05),
          }} />
        ))}

      </div>
    </>
  );
};

export default WelcomeScreen;
