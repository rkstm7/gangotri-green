import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/* ── Animated floating particles ─────────────────────────── */
const Particle = ({ style }) => (
  <div style={{
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(201, 160, 48, 0.18)',
    animation: 'floatUp 6s ease-in-out infinite',
    pointerEvents: 'none',
    ...style,
  }} />
);

const NotFoundPage = () => {
  const navigate = useNavigate();
  const countRef = useRef(null);

  /* ── Auto-redirect countdown ─── */
  useEffect(() => {
    let secs = 10;
    const tick = setInterval(() => {
      secs -= 1;
      if (countRef.current) countRef.current.textContent = secs;
      if (secs <= 0) {
        clearInterval(tick);
        navigate('/');
      }
    }, 1000);
    return () => clearInterval(tick);
  }, [navigate]);

  return (
    <>
      {/* ── Keyframe injections ── */}
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0)   scale(1);   opacity: 0.6; }
          50%  { transform: translateY(-40px) scale(1.1); opacity: 0.3; }
          100% { transform: translateY(0)   scale(1);   opacity: 0.6; }
        }
        @keyframes pulse404 {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.7; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rotateDiamond {
          from { transform: rotate(45deg); }
          to   { transform: rotate(405deg); }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #0d1f0d 0%, #1a3a1a 40%, #0d1a0d 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}>

        {/* ── Background grass texture overlay ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=60')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
          zIndex: 0,
        }} />

        {/* ── Radial gold glow ── */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(201,160,48,0.12) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {/* ── Floating particles ── */}
        <Particle style={{ width: 10, height: 10, left: '12%', top: '22%', animationDelay: '0s',   animationDuration: '7s' }} />
        <Particle style={{ width: 6,  height: 6,  left: '80%', top: '18%', animationDelay: '1.2s', animationDuration: '5.5s' }} />
        <Particle style={{ width: 14, height: 14, left: '65%', top: '72%', animationDelay: '2s',   animationDuration: '8s' }} />
        <Particle style={{ width: 8,  height: 8,  left: '28%', top: '78%', animationDelay: '0.6s', animationDuration: '6.5s' }} />
        <Particle style={{ width: 5,  height: 5,  left: '90%', top: '55%', animationDelay: '3s',   animationDuration: '9s' }} />
        <Particle style={{ width: 9,  height: 9,  left: '5%',  top: '60%', animationDelay: '1.8s', animationDuration: '7.5s' }} />

        {/* ── Main card ── */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
          animation: 'slideUp 0.8s ease both',
        }}>

          {/* ── Top label ── */}
          <p style={{
            fontSize: '12px',
            fontWeight: '700',
            color: '#c9a030',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '28px',
            opacity: 0.9,
          }}>
            Gangotri Green Properties
          </p>

          {/* ── 404 number ── */}
          <div style={{ position: 'relative', marginBottom: '8px' }}>
            <h1 style={{
              fontSize: 'clamp(100px, 20vw, 180px)',
              fontWeight: '900',
              lineHeight: 1,
              letterSpacing: '-6px',
              margin: 0,
              background: 'linear-gradient(135deg, #c9a030 0%, #f5d060 40%, #c9a030 70%, #a07820 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'pulse404 3s ease-in-out infinite',
              userSelect: 'none',
            }}>
              404
            </h1>

            {/* ── Diamond accent ── */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(45deg)',
              width: '200px',
              height: '200px',
              border: '1px solid rgba(201,160,48,0.15)',
              borderRadius: '4px',
              animation: 'rotateDiamond 18s linear infinite',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(45deg)',
              width: '260px',
              height: '260px',
              border: '1px solid rgba(201,160,48,0.08)',
              borderRadius: '4px',
              animation: 'rotateDiamond 26s linear infinite reverse',
              pointerEvents: 'none',
            }} />
          </div>

          {/* ── Diamond divider ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '18px 0 22px' }}>
            <div style={{ width: '60px', height: '1px', background: 'rgba(201,160,48,0.45)' }} />
            <div style={{
              width: '8px', height: '8px',
              background: '#c9a030',
              transform: 'rotate(45deg)',
            }} />
            <div style={{ width: '60px', height: '1px', background: 'rgba(201,160,48,0.45)' }} />
          </div>

          {/* ── Heading ── */}
          <h2 style={{
            fontSize: 'clamp(22px, 4vw, 34px)',
            fontWeight: '800',
            color: 'white',
            marginBottom: '14px',
            lineHeight: 1.2,
            letterSpacing: '-0.5px',
          }}>
            This Plot Hasn't Been Developed Yet
          </h2>

          {/* ── Subtext ── */}
          <p style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.60)',
            lineHeight: '1.7',
            maxWidth: '420px',
            marginBottom: '36px',
          }}>
            The page you're looking for doesn't exist or has been moved.
            Let us guide you back to premium properties.
          </p>

          {/* ── Countdown pill ── */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(201,160,48,0.12)',
            border: '1px solid rgba(201,160,48,0.28)',
            borderRadius: '999px',
            padding: '8px 20px',
            marginBottom: '36px',
          }}>
            <div style={{
              width: '7px', height: '7px',
              background: '#c9a030',
              borderRadius: '50%',
            }} />
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.2px' }}>
              Redirecting to Home in&nbsp;
              <span ref={countRef} style={{ color: '#c9a030', fontWeight: '700' }}>10</span>
              &nbsp;seconds
            </span>
          </div>

          {/* ── Action buttons ── */}
          <div style={{
            display: 'flex',
            gap: '14px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {/* Primary CTA */}
            <button
              onClick={() => navigate('/')}
              style={{
                background: '#c9a030',
                color: 'white',
                border: 'none',
                borderRadius: '999px',
                padding: '13px 34px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                letterSpacing: '0.2px',
                transition: 'background 0.2s, transform 0.2s',
                boxShadow: '0 4px 20px rgba(201,160,48,0.35)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#b8902a';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#c9a030';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Back to Home
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 400);
              }}
              style={{
                background: 'transparent',
                color: 'white',
                border: '1.5px solid rgba(255,255,255,0.40)',
                borderRadius: '999px',
                padding: '13px 34px',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                letterSpacing: '0.2px',
                transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.40)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Contact Us
            </button>
          </div>

        </div>

        {/* ── Bottom wave (matches hero) ── */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          lineHeight: 0,
          pointerEvents: 'none',
        }}>
          <svg
            viewBox="0 0 1440 70"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '70px', display: 'block' }}
          >
            <path
              d="M0,28 C200,48 400,8 600,32 C800,56 1100,12 1440,36 L1440,70 L0,70 Z"
              fill="rgba(201,160,48,0.07)"
            />
          </svg>
        </div>

        {/* ── Footer strip ── */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: 0,
          right: 0,
          zIndex: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
        }}>
          {/* Gangotri Logo */}
          <img
            src="/src/assets/gangotri-logo.webp"
            alt="Gangotri Green"
            style={{ width: '26px', height: '26px', objectFit: 'contain', borderRadius: '3px' }}
          />
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Gangotri Green Properties
          </span>
        </div>

      </div>
    </>
  );
};

export default NotFoundPage;
