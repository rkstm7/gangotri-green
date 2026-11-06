import { useEffect, useRef, useState } from 'react';
import { GiPineTree } from 'react-icons/gi';
import { GiLotus } from 'react-icons/gi';
import { RiMedalLine } from 'react-icons/ri';
import { GiReceiveMoney } from 'react-icons/gi';

/* ════════════════════════════════════════════════
   KEYFRAMES
════════════════════════════════════════════════ */
const KF = `
  @keyframes wyFadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes wyLineGrow {
    from { width: 0; opacity: 0; }
    to   { width: 28px; opacity: 1; }
  }
  @keyframes wyUnderline {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes wyCardIn {
    from { opacity: 0; transform: translateY(40px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0)   scale(1); }
  }
  @keyframes wyIconBounce {
    0%   { opacity: 0; transform: scale(0.4) rotate(-12deg); }
    60%  { opacity: 1; transform: scale(1.15) rotate(4deg); }
    80%  { transform: scale(0.95) rotate(-2deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
  }
  @keyframes wyIconFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50%       { transform: translateY(-7px) scale(1.04); }
  }
  @keyframes wyDividerIn {
    from { scaleX: 0; opacity: 0; }
    to   { scaleX: 1; opacity: 1; }
  }
  @keyframes wyShimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes wyCounterIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes wyGoldPing {
    0%   { transform: scale(1);   opacity: 0.6; }
    70%  { transform: scale(2.2); opacity: 0; }
    100% { transform: scale(2.2); opacity: 0; }
  }
`;

/* ════════════════════════════════════════════════
   FEATURES DATA
════════════════════════════════════════════════ */
const FEATURES = [
  {
    title: 'Open Meadows',
    desc:  'Connect with nature and stay grounded in our lush green spaces.',
    icon:  <GiPineTree  size={52} color="#5a9e35" />,
    accent: '#5a9e35',
    bg:    '#f3fbe8',
    num:   '01',
  },
  {
    title: 'Serene Atmosphere',
    desc:  'Relax and unwind from the bustle of the city in our calm environment.',
    icon:  <GiLotus size={52} color="#d46b9a" />,
    accent: '#d46b9a',
    bg:    '#fdf0f6',
    num:   '02',
  },
  {
    title: 'Quality Assured',
    desc:  'State-of-the-art amenities and technology for your health and safety.',
    icon:  <RiMedalLine size={52} color="#4a86c8" />,
    accent: '#4a86c8',
    bg:    '#eef4fd',
    num:   '03',
  },
  {
    title: 'Budget Friendly',
    desc:  'Find the perfect plot tailored to comfortably fit your budget.',
    icon:  <GiReceiveMoney size={52} color="#b07d1a" />,
    accent: '#c9a030',
    bg:    '#fdf8ec',
    num:   '04',
  },
];

/* ════════════════════════════════════════════════
   FEATURE CARD
════════════════════════════════════════════════ */
const FeatureCard = ({ f, inView, delay, isLast }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        flex: '1',
        maxWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '36px 28px 32px',
        borderRadius: '16px',
        position: 'relative',
        cursor: 'default',
        background: hovered ? f.bg : 'white',
        boxShadow: hovered
          ? `0 20px 48px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)`
          : '0 2px 0px rgba(0,0,0,0)',
        border: hovered
          ? `1.5px solid ${f.accent}22`
          : '1.5px solid transparent',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
        animation: inView ? `wyCardIn 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s both` : 'none',
        borderRight: !isLast && !hovered ? '1px solid #f0f0f0' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Number tag — top right */}
      <div style={{
        position: 'absolute',
        top: '16px', right: '18px',
        fontSize: '11px', fontWeight: '800',
        color: hovered ? f.accent : '#e0e0e0',
        letterSpacing: '1px',
        transition: 'color 0.3s ease',
        fontFamily: 'monospace',
      }}>
        {f.num}
      </div>

      {/* Icon container with ping ring on hover */}
      <div style={{
        position: 'relative',
        width: '88px', height: '88px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '22px',
      }}>
        {/* Soft bg circle */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          background: hovered ? `${f.accent}18` : `${f.accent}0a`,
          transform: hovered ? 'scale(1)' : 'scale(0.85)',
          transition: 'background 0.35s, transform 0.4s cubic-bezier(0.22,1,0.36,1)',
        }} />

        {/* Ping ring on hover */}
        {hovered && (
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            border: `2px solid ${f.accent}`,
            animation: 'wyGoldPing 1.1s cubic-bezier(0,0,0.2,1) infinite',
          }} />
        )}

        {/* Icon — floats when hovered */}
        <div style={{
          position: 'relative', zIndex: 1,
          animation: inView
            ? hovered
              ? `wyIconFloat 2.4s ease-in-out infinite`
              : `wyIconBounce 0.75s cubic-bezier(0.34,1.56,0.64,1) ${delay + 0.18}s both`
            : 'none',
        }}>
          {f.icon}
        </div>
      </div>

      {/* Gold accent line — slides in on hover */}
      <div style={{
        height: '2px',
        width: hovered ? '36px' : '0px',
        background: `linear-gradient(to right, ${f.accent}, transparent)`,
        borderRadius: '2px',
        marginBottom: hovered ? '14px' : '0px',
        transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1), margin-bottom 0.3s ease',
      }} />

      {/* Title */}
      <div style={{
        fontSize: '17px',
        fontWeight: '700',
        color: hovered ? '#111' : '#222',
        marginBottom: '10px',
        lineHeight: '1.3',
        letterSpacing: '-0.1px',
        transition: 'color 0.25s',
      }}>
        {f.title}
      </div>

      {/* Description */}
      <p style={{
        fontSize: '14px',
        color: hovered ? '#555' : '#999',
        lineHeight: '1.7',
        margin: 0,
        transition: 'color 0.3s',
      }}>
        {f.desc}
      </p>
    </div>
  );
};

/* ════════════════════════════════════════════════
   SECTION
════════════════════════════════════════════════ */
const WhySection = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const a = (name, dur, delay, ease = 'cubic-bezier(0.22,1,0.36,1)') =>
    inView ? `${name} ${dur}s ${ease} ${delay}s both` : 'none';

  return (
    <>
      <style>{KF}</style>

      <section
        ref={ref}
        style={{ width: '100%', padding: '80px 0', background: 'white' }}
      >

        {/* ── Header block ── */}
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto 0 60px',
          padding: '0 40px',
          boxSizing: 'border-box',
        }}>

          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginBottom: '14px',
            animation: a('wyFadeUp', 0.7, 0.1),
          }}>
            <div style={{
              height: '2px',
              background: 'linear-gradient(to right, #c9a030, #F5C518)',
              animation: a('wyLineGrow', 0.6, 0.18),
            }} />
            <p style={{
              fontSize: '11px', fontWeight: '700',
              color: '#c9a030', letterSpacing: '3px',
              textTransform: 'uppercase', margin: 0,
            }}>
              Why Gangotri Green Properties
            </p>
          </div>

          {/* Heading */}
          <div style={{
            animation: a('wyFadeUp', 0.75, 0.22),
            marginBottom: '10px',
          }}>
            <h2 style={{
              fontSize: '34px', fontWeight: '800',
              color: '#111', letterSpacing: '-0.3px',
              lineHeight: '1.2', margin: 0,
            }}>
              Why you should consider Gangotri Green Properties
            </h2>
          </div>

          {/* Subtitle */}
          <p style={{
            fontSize: '15px', color: '#aaa',
            marginBottom: 0, marginTop: '14px',
            animation: a('wyFadeUp', 0.7, 0.35),
          }}>
            Your dream home at the tip of your fingers.
          </p>
        </div>

        {/* ── 4 cards ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
          marginTop: '56px',
          padding: '0 40px',
        }}>
          {FEATURES.map((f, i) => (
            <FeatureCard
              key={f.title}
              f={f}
              inView={inView}
              delay={0.38 + i * 0.12}
              isLast={i === FEATURES.length - 1}
            />
          ))}
        </div>

      </section>
    </>
  );
};

export default WhySection;
