const ProjectVideoSection = () => {
  return (
    <section style={{
      width: '100%',
      padding: '80px 160px',
      boxSizing: 'border-box',
      background: 'white',
    }}>

      {/* ── Outer container with rounded corners ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        borderRadius: '0',
        overflow: 'visible',
      }}>

        {/* ── Video / Image area ── */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '680px',
          borderRadius: '0',
          overflow: 'hidden',
          cursor: 'pointer',
        }}>
          {/* Background image — elegant interior with woman */}
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80"
            alt="Nivaan Meadows Phase 3"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              filter: 'brightness(0.82)',
            }}
          />

          {/* ── Gangotri Green Logo overlay — top left ── */}
          <div style={{
            position: 'absolute',
            top: '24px',
            left: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            {/* Logo */}
            <img
              src="/src/assets/gangotri-logo.webp"
              alt="Gangotri Green"
              style={{
                width: '52px',
                height: '52px',
                objectFit: 'contain',
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.7)',
                background: 'rgba(255,255,255,0.12)',
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ color: 'white', fontSize: '13px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', lineHeight: '1.3' }}>
                Gangotri Green
              </div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Properties India Pvt. Ltd.
              </div>
              <div style={{ color: 'rgba(255,255,255,0.60)', fontSize: '8.5px', fontStyle: 'italic', letterSpacing: '0.5px', marginTop: '2px' }}>
                Pioneers in Collector N.A. Plots
              </div>
            </div>
          </div>

          {/* ── Play button — center ── */}
          <div style={{
            position: 'absolute',
            top: '44%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            border: '2.5px solid white',
            background: 'rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            cursor: 'pointer',
            transition: 'background 0.2s, transform 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.32)'; e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'; }}
          >
            <div style={{
              width: 0, height: 0,
              borderTop: '11px solid transparent',
              borderBottom: '11px solid transparent',
              borderLeft: '18px solid white',
              marginLeft: '4px',
            }} />
          </div>
        </div>

        {/* ── Dark card — overlaps bottom of video, centered ── */}
        <div style={{
          position: 'absolute',
          bottom: '-230px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '98%',
          maxWidth: '1060px',
          background: '#1a1a1a',
          borderRadius: '14px',
          padding: '36px 48px 48px',
          textAlign: 'center',
          boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
          zIndex: 5,
          boxSizing: 'border-box',
        }}>
          {/* Yellow label */}
          <p style={{
            fontSize: '11px',
            fontWeight: '700',
            color: '#F5C518',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            Visit Our Project
          </p>

          {/* Heading — serif font like design */}
          <h2 style={{
            fontSize: '44px',
            fontWeight: '700',
            color: 'white',
            marginBottom: '20px',
            lineHeight: '1.15',
            letterSpacing: '-0.3px',
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}>
            Nivaan Meadows Phase 3
          </h2>

          {/* Description — 2 lines, center, natural break */}
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.72)',
            lineHeight: '1.80',
            margin: '0 auto 28px',
            textAlign: 'center',
          }}>
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>
              Live your dream of owning a bungalow in a gated residential community that not only offers spacious settings amidst a
            </span>
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>
              picturesque environment, but also embodies elements that come together to form a balanced and peaceful lifestyle.
            </span>
          </p>

          {/* Learn More button — pill outline */}
          <a href="#project" style={{
            display: 'inline-block',
            border: '1.5px solid rgba(255,255,255,0.75)',
            color: 'white',
            padding: '12px 36px',
            borderRadius: '999px',
            fontSize: '14px',
            fontWeight: '500',
            textDecoration: 'none',
            transition: 'background 0.2s',
            marginTop: '16px',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Spacer — card overflow + breathing room before next section */}
      <div style={{ height: '320px' }} />
    </section>
  );
};

export default ProjectVideoSection;
