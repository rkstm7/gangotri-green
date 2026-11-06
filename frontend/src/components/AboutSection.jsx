import { useEffect, useRef, useState } from 'react';

/* ── Keyframes ───────────────────────────────────────────── */
const KEYFRAMES = `
  @keyframes aboutImgReveal {
    from { clip-path: inset(0 100% 0 0); opacity: 0; }
    to   { clip-path: inset(0 0% 0 0);   opacity: 1; }
  }
  @keyframes aboutKenBurns {
    from { transform: scale(1.08) translateX(-6px); }
    to   { transform: scale(1)    translateX(0); }
  }
  @keyframes aboutSlideRight {
    from { opacity: 0; transform: translateX(-48px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes aboutSlideLeft {
    from { opacity: 0; transform: translateX(48px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes aboutFadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes aboutFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes trophyBounce {
    0%   { opacity: 0; transform: scale(0) rotate(-20deg); }
    60%  { opacity: 1; transform: scale(1.15) rotate(4deg); }
    80%  { transform: scale(0.94) rotate(-2deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
  }
  @keyframes trophyFloat {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50%       { transform: translateY(-6px) rotate(2deg); }
  }
  @keyframes progressBar {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes shimmerGold {
    0%   { background-position: -300px 0; }
    100% { background-position: 300px 0; }
  }
  @keyframes underlineExpand {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes playPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.3); }
    50%       { box-shadow: 0 0 0 12px rgba(255,255,255,0); }
  }
  @keyframes overlayShimmer {
    0%   { opacity: 0.55; }
    50%  { opacity: 0.65; }
    100% { opacity: 0.55; }
  }
  @keyframes statCountUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

/* ── Intersection Observer hook — replays on every enter ── */
const useInView = (threshold = 0.18) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

/* ── Stats row data ─────────────────────────────────────── */
const STATS = [
  { value: '20+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '5000+', label: 'Happy Families' },
];

const AboutSection = () => {
  const [sectionRef, inView] = useInView(0.15);

  const anim = (name, dur, delay, ease = 'cubic-bezier(0.22,1,0.36,1)') =>
    inView ? `${name} ${dur}s ${ease} ${delay}s both` : 'none';

  return (
    <>
      <style>{KEYFRAMES}</style>

      <style>{`
        @media (max-width: 900px) {
          .about-inner { flex-direction: column !important; gap: 40px !important; }
          .about-img-wrap { width: 100% !important; max-width: 100% !important; }
        }
        @media (max-width: 600px) {
          .about-inner { padding: 0 20px !important; }
          .about-heading { font-size: 24px !important; white-space: normal !important; }
          .about-stats { gap: 16px !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          width: '100%',
          padding: '80px 0',
          background: 'white',
          display: 'flex',
          justifyContent: 'center',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div className="about-inner" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '60px',
          maxWidth: '1300px',
          width: '100%',
          margin: '0 auto',
          padding: '0 60px',
          boxSizing: 'border-box',
        }}>

          {/* ════════════════════════════════
              LEFT — image block
          ════════════════════════════════ */}
          <div className="about-img-wrap" style={{
            position: 'relative',
            flexShrink: 0,
            width: 'min(720px, 100%)',
            height: '420px',
            overflow: 'visible',
            animation: anim('aboutSlideRight', 1.0, 0.1),
          }}>

            {/* Image wrapper with clip-path reveal */}
            <div style={{
              width: '100%',
              height: '420px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              animation: anim('aboutImgReveal', 1.0, 0.2),
            }}>
              {/* Ken Burns on the image itself */}
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                alt="Founder & Chairman"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  filter: 'brightness(0.72)',
                  animation: inView
                    ? 'aboutKenBurns 1.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.2s both'
                    : 'none',
                }}
              />

              {/* Subtle overlay breathe */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.18) 0%, transparent 60%)',
                animation: inView ? 'overlayShimmer 5s ease-in-out 1.5s infinite' : 'none',
              }} />

              {/* Play button — with pulse ring */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -60%)',
                  width: '60px', height: '60px',
                  borderRadius: '50%',
                  border: '2.5px solid white',
                  background: 'rgba(255,255,255,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(3px)',
                  cursor: 'pointer',
                  animation: inView
                    ? `aboutFadeIn 0.6s ease 1.1s both, playPulse 2.4s ease-in-out 2s infinite`
                    : 'none',
                  transition: 'background 0.25s, transform 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.35)';
                  e.currentTarget.style.transform = 'translate(-50%, -60%) scale(1.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
                  e.currentTarget.style.transform = 'translate(-50%, -60%) scale(1)';
                }}
              >
                <div style={{
                  width: 0, height: 0,
                  borderTop: '10px solid transparent',
                  borderBottom: '10px solid transparent',
                  borderLeft: '18px solid white',
                  marginLeft: '4px',
                }} />
              </div>

              {/* Progress bar — top of image */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '3px',
                background: 'rgba(255,255,255,0.15)',
              }}>
                <div style={{
                  height: '100%',
                  background: 'linear-gradient(to right, #c9a030, #F5C518)',
                  animation: inView ? 'progressBar 1.6s cubic-bezier(0.4,0,0.2,1) 0.6s both' : 'none',
                }} />
              </div>

              {/* Name overlay */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '48px 18px 16px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 100%)',
                animation: anim('aboutFadeIn', 0.8, 0.9),
              }}>
                <div style={{
                  color: 'white', fontSize: '16px', fontWeight: '700',
                  letterSpacing: '1.5px', textTransform: 'uppercase', lineHeight: '1.3',
                }}>
                  Mr. AKSHAT GUPTA
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.80)', fontSize: '11px',
                  letterSpacing: '1.8px', textTransform: 'uppercase',
                  marginTop: '4px', fontWeight: '500',
                }}>
                  Founder &amp; Chairman
                </div>
              </div>
            </div>

            {/* ── Gold corner accent ── */}
            <div style={{
              position: 'absolute', top: '-10px', left: '-10px',
              width: '36px', height: '36px',
              borderTop: '3px solid #c9a030',
              borderLeft: '3px solid #c9a030',
              animation: anim('aboutFadeIn', 0.6, 0.5),
            }} />
            <div style={{
              position: 'absolute', bottom: '-10px', right: '108px',
              width: '36px', height: '36px',
              borderBottom: '3px solid #c9a030',
              borderRight: '3px solid #c9a030',
              animation: anim('aboutFadeIn', 0.6, 0.6),
            }} />

            {/* ── Trophy badge ── */}
            <div style={{
              position: 'absolute',
              bottom: '-32px', right: '32px',
              width: '86px', height: '86px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #c9a84c 0%, #D4AF37 40%, #e8c94a 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 0 4px white, 0 4px 20px rgba(180,140,30,0.45)',
              zIndex: 5,
              animation: inView
                ? `trophyBounce 0.8s cubic-bezier(0.34,1.56,0.64,1) 1.1s both, trophyFloat 3.5s ease-in-out 2.5s infinite`
                : 'none',
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="white" width="62" height="62">
                <path d="M44 8H20v18c0 7.18 5.38 13.1 12.33 13.93V46h-4a2 2 0 000 4h8a2 2 0 000-4h-4v-6.07C39.62 39.1 45 33.18 45 26V9a1 1 0 00-1-1z" fill="white" opacity="0"/>
                <path d="M42,8H22c-0.6,0-1,0.4-1,1v17c0,6.6,5.4,12,12,12s12-5.4,12-12V9C45,8.4,44.6,8,44,8z" />
                <path d="M21,14h-4c-2.2,0-4,1.8-4,4v2c0,2.8,2,5.1,4.6,5.8C18.2,22.6,19,19.4,19,16v-2H21z" />
                <path d="M43,14h2v2c0,3.4,0.8,6.6,1.4,9.8C48,25.1,50,22.8,50,20v-2c0-2.2-1.8-4-4-4H43z" />
                <rect x="29" y="38" width="6" height="6" rx="1" />
                <rect x="22" y="44" width="20" height="5" rx="2" />
                <polygon points="33,16 34.5,21 39,21 35.5,23.8 36.8,28.5 33,25.5 29.2,28.5 30.5,23.8 27,21 31.5,21" fill="#C9973A"/>
              </svg>
            </div>
          </div>

          {/* ════════════════════════════════
              RIGHT — text content
          ════════════════════════════════ */}
          <div style={{
            flex: 1,
            animation: anim('aboutSlideLeft', 1.0, 0.25),
          }}>

            {/* Eyebrow label */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              marginBottom: '16px',
              animation: anim('aboutFadeUp', 0.7, 0.35),
            }}>
              <div style={{ width: '24px', height: '2px', background: '#c9a030' }} />
              <span style={{
                fontSize: '11px', fontWeight: '700',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: '#c9a030',
              }}>
                About Us
              </span>
            </div>

            {/* Heading with shimmer gold underline */}
            <div style={{
              animation: anim('aboutFadeUp', 0.7, 0.45),
              marginBottom: '18px',
            }}>
              <h2 className="about-heading" style={{
                fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: '800',
                color: '#1a1a1a',
                letterSpacing: '-0.3px', lineHeight: '1.2',
                whiteSpace: 'normal', margin: 0,
                position: 'relative', display: 'inline-block',
              }}>
                Gangotri Green Properties
                {/* Animated underline */}
                <span style={{
                  position: 'absolute',
                  bottom: '-4px', left: 0,
                  height: '2.5px', width: '100%',
                  background: 'linear-gradient(90deg, #c9a030, #F5C518, #c9a030)',
                  backgroundSize: '300px 100%',
                  transformOrigin: 'left center',
                  animation: inView
                    ? `underlineExpand 0.8s cubic-bezier(0.22,1,0.36,1) 0.8s both,
                       shimmerGold 2.5s linear 1.8s infinite`
                    : 'none',
                  display: 'block',
                }} />
              </h2>
            </div>

            {/* Body text */}
            <p style={{
              fontSize: '15.5px', color: '#555',
              lineHeight: '1.82', marginBottom: '28px', fontWeight: '400',
              animation: anim('aboutFadeUp', 0.7, 0.55),
            }}>
              Guided by the vision and leadership of our Founder &amp; Chairman,
              Gangotri Green Properties India Pvt. Ltd. is built on the belief that
              land is not just an investment, but a legacy for future generations.
              With projects located in prime areas across Pune, we focus on
              developing Collector NA and RERA-registered plotted and bungalow
              developments that offer open spaces, modern amenities, and long-term
              value, helping families build a secure, comfortable, and prosperous
              future.
            </p>

            {/* Stats row */}
            <div className="about-stats" style={{
              display: 'flex', gap: '32px',
              flexWrap: 'wrap',
              marginBottom: '32px',
              borderTop: '1px solid #f0f0f0',
              borderBottom: '1px solid #f0f0f0',
              padding: '20px 0',
            }}>
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    textAlign: 'center',
                    animation: anim('statCountUp', 0.7, 0.65 + i * 0.12),
                  }}
                >
                  <div style={{
                    fontSize: '26px', fontWeight: '800',
                    backgroundImage: 'linear-gradient(90deg, #c9a030, #F5C518, #c9a030)',
                    backgroundSize: '300px 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: inView ? 'shimmerGold 3s linear 1.5s infinite' : 'none',
                  }}>
                    {s.value}
                  </div>
                  <div style={{
                    fontSize: '11px', color: '#888',
                    letterSpacing: '1px', textTransform: 'uppercase',
                    marginTop: '4px', fontWeight: '600',
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <div style={{ animation: anim('aboutFadeUp', 0.7, 0.85) }}>
              <a
                href="#about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#1a1a1a',
                  color: 'white',
                  padding: '13px 32px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  letterSpacing: '0.4px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'background 0.25s, transform 0.25s, gap 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#000';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.gap = '14px';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#1a1a1a';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.gap = '10px';
                }}
              >
                About Us
                {/* Arrow icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
