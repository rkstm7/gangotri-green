import { useState } from 'react';

const testimonials = {
  featured: {
    name: 'Thakur Family',
    subtitle: 'Investing in Space, Securing the Future',
    img: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=900&q=80',
    videoUrl: '#',
  },
  side: [
    {
      name: 'Mr. Bhutra',
      subtitle: 'Smart Investment, Strong Foundation',
      img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&q=80',
      videoUrl: '#',
    },
    {
      name: 'Anish & Kamini',
      subtitle: 'A dream home, A bright future',
      img: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=600&q=80',
      videoUrl: '#',
    },
  ],
};

/* ── Reusable play button overlay ── */
const PlayOverlay = ({ size = 64 }) => (
  <div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    border: `${size > 50 ? 2.5 : 2}px solid rgba(255,255,255,0.90)`,
    background: 'rgba(255,255,255,0.18)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    zIndex: 3,
  }}>
    <div style={{
      width: 0,
      height: 0,
      borderTop: `${size * 0.16}px solid transparent`,
      borderBottom: `${size * 0.16}px solid transparent`,
      borderLeft: `${size * 0.26}px solid white`,
      marginLeft: `${size * 0.06}px`,
    }} />
  </div>
);

/* ── Name label at bottom-left of each card ── */
const CardLabel = ({ name, subtitle, small = false }) => (
  <div style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: small ? '28px 14px 14px' : '60px 22px 20px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)',
    zIndex: 2,
  }}>
    <div style={{
      fontSize: small ? '14px' : '18px',
      fontWeight: '700',
      color: '#ffffff',
      lineHeight: '1.3',
    }}>
      {name}
    </div>
    <div style={{
      fontSize: small ? '11.5px' : '13.5px',
      color: 'rgba(255,255,255,0.80)',
      marginTop: '3px',
      lineHeight: '1.4',
    }}>
      {subtitle}
    </div>
  </div>
);

const TestimonialsSection = () => {
  const [hoveredFeat, setHoveredFeat] = useState(false);
  const [hoveredSide, setHoveredSide] = useState(null);

  return (
    <section style={{
      width: '100%',
      background: 'white',
      padding: '80px 0 80px',
      boxSizing: 'border-box',
    }}>
      {/* ── Centered container ── */}
      <div style={{
        maxWidth: '100%',
        margin: '0 auto',
        padding: '0 140px',
        boxSizing: 'border-box',
      }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: '32px' }}>
        <p style={{
          fontSize: '11.5px',
          fontWeight: '700',
          color: '#F5C518',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}>
          TESTIMONIALS
        </p>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#111111',
          marginBottom: '6px',
          letterSpacing: '-0.2px',
          lineHeight: '1.2',
        }}>
          What our clients say
        </h2>
        <p style={{
          fontSize: '15px',
          color: '#999',
          margin: 0,
        }}>
          We are there with you at every step of the way.
        </p>
      </div>

      {/* ── Grid: large left + 2 stacked right ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '3.5fr 1.6fr',
        gridTemplateRows: '1fr 1fr',
        gap: '10px',
        height: '460px',
        position: 'relative',
      }}>

        {/* Featured — spans both rows */}
        <div
          style={{
            gridColumn: '1',
            gridRow: '1 / 3',
            position: 'relative',
            borderRadius: '0',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setHoveredFeat(true)}
          onMouseLeave={() => setHoveredFeat(false)}
        >
          <img
            src={testimonials.featured.img}
            alt={testimonials.featured.name}
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=900&q=80'; }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
              filter: hoveredFeat ? 'brightness(0.75)' : 'brightness(0.65)',
              transition: 'filter 0.3s ease, transform 0.4s ease',
              transform: hoveredFeat ? 'scale(1.03)' : 'scale(1)',
            }}
          />
          <PlayOverlay size={64} />
          <CardLabel
            name={testimonials.featured.name}
            subtitle={testimonials.featured.subtitle}
          />
        </div>

        {/* Side cards */}
        {testimonials.side.map((t, i) => (
          <div
            key={t.name}
            style={{
              gridColumn: '2',
              gridRow: i + 1,
              position: 'relative',
              borderRadius: '0',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setHoveredSide(i)}
            onMouseLeave={() => setHoveredSide(null)}
          >
            <img
              src={t.img}
              alt={t.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
                filter: hoveredSide === i ? 'brightness(0.75)' : 'brightness(0.65)',
                transition: 'filter 0.3s ease, transform 0.4s ease',
                transform: hoveredSide === i ? 'scale(1.03)' : 'scale(1)',
              }}
            />
            <PlayOverlay size={44} />
            <CardLabel
              name={t.name}
              subtitle={t.subtitle}
              small
            />
          </div>
        ))}

        {/* ── Yellow button — floats over bottom-right corner of grid ── */}
        <a
          href="#contact"
          aria-label="Scroll down"
          style={{
            position: 'absolute',
            bottom: '-22px',
            right: '0px',
            zIndex: 10,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: '#F5C518',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(245,197,24,0.45)',
            textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(245,197,24,0.6)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(245,197,24,0.45)';
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3.5V14.5M9 14.5L4.5 10M9 14.5L13.5 10"
              stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

      </div>

      </div> {/* end centered container */}
    </section>
  );
};

export default TestimonialsSection;
