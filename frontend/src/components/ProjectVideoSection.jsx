import gangotriLogo from '../assets/gangotri-logo.webp';

const ProjectVideoSection = () => {
  return (
    <>
      <style>{`
        .pvs-section {
          width: 100%;
          padding: 80px 160px;
          box-sizing: border-box;
          background: white;
        }
        .pvs-video {
          position: relative;
          width: 100%;
          height: 680px;
          overflow: hidden;
          cursor: pointer;
        }
        .pvs-card {
          position: absolute;
          bottom: -230px;
          left: 50%;
          transform: translateX(-50%);
          width: 98%;
          max-width: 1060px;
          background: #1a1a1a;
          border-radius: 14px;
          padding: 36px 48px 48px;
          text-align: center;
          box-shadow: 0 12px 40px rgba(0,0,0,0.25);
          z-index: 5;
          box-sizing: border-box;
        }
        .pvs-card-heading {
          font-size: 44px;
          font-weight: 700;
          color: white;
          margin-bottom: 20px;
          line-height: 1.15;
          letter-spacing: -0.3px;
          font-family: Georgia, "Times New Roman", serif;
        }
        .pvs-card-desc {
          font-size: 16px;
          color: rgba(255,255,255,0.72);
          line-height: 1.80;
          margin: 0 auto 28px;
          text-align: center;
        }
        .pvs-desc-line { display: block; white-space: nowrap; }
        .pvs-spacer { height: 320px; }

        @media (max-width: 1100px) {
          .pvs-section { padding: 60px 40px; }
          .pvs-video { height: 500px; }
          .pvs-card { bottom: -200px; padding: 28px 32px 36px; }
          .pvs-card-heading { font-size: 32px; }
          .pvs-spacer { height: 270px; }
        }
        @media (max-width: 768px) {
          .pvs-section { padding: 40px 20px; }
          .pvs-video { height: 280px; }
          .pvs-card {
            position: static;
            transform: none;
            width: 100%;
            border-radius: 12px;
            margin-top: 16px;
            padding: 24px 20px 28px;
          }
          .pvs-card-heading { font-size: 24px; margin-bottom: 12px; }
          .pvs-card-desc { font-size: 14px; }
          .pvs-desc-line { white-space: normal; }
          .pvs-spacer { height: 0; display: none; }
        }
        @media (max-width: 480px) {
          .pvs-video { height: 220px; }
          .pvs-card-heading { font-size: 20px; }
        }
      `}</style>

      <section className="pvs-section">

        {/* ── Outer container ── */}
        <div style={{ position: 'relative', width: '100%' }}>

          {/* ── Video / Image area ── */}
          <div className="pvs-video">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80"
              alt="Nivaan Meadows Phase 3"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center',
                display: 'block', filter: 'brightness(0.82)',
              }}
            />

            {/* Logo overlay — top left */}
            <div style={{
              position: 'absolute', top: '24px', left: '24px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <img
                src={gangotriLogo}
                alt="Gangotri Green"
                style={{
                  width: '44px', height: '44px',
                  objectFit: 'contain', borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,0.7)',
                  background: 'rgba(255,255,255,0.12)', flexShrink: 0,
                }}
              />
              <div>
                <div style={{ color: 'white', fontSize: '12px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', lineHeight: '1.3' }}>
                  Gangotri Green
                </div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Properties India Pvt. Ltd.
                </div>
              </div>
            </div>

            {/* Play button */}
            <div style={{
              position: 'absolute', top: '44%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '64px', height: '64px', borderRadius: '50%',
              border: '2.5px solid white',
              background: 'rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)', cursor: 'pointer',
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

          {/* ── Dark card ── */}
          <div className="pvs-card">
            <p style={{
              fontSize: '11px', fontWeight: '700',
              color: '#F5C518', letterSpacing: '3px',
              textTransform: 'uppercase', marginBottom: '12px',
            }}>
              Visit Our Project
            </p>

            <h2 className="pvs-card-heading">
              Nivaan Meadows Phase 3
            </h2>

            <p className="pvs-card-desc">
              <span className="pvs-desc-line">
                Live your dream of owning a bungalow in a gated residential community that not only offers spacious settings amidst a
              </span>
              <span className="pvs-desc-line">
                picturesque environment, but also embodies elements that come together to form a balanced and peaceful lifestyle.
              </span>
            </p>

            <a href="#project" style={{
              display: 'inline-block',
              border: '1.5px solid rgba(255,255,255,0.75)',
              color: 'white', padding: '12px 36px',
              borderRadius: '999px', fontSize: '14px', fontWeight: '500',
              textDecoration: 'none', transition: 'background 0.2s',
              marginTop: '8px',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Spacer for card overflow */}
        <div className="pvs-spacer" />
      </section>
    </>
  );
};

export default ProjectVideoSection;
