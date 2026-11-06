import { useEffect, useRef, useState } from 'react';

/* ════════════════════════════════════════════════
   KEYFRAMES
════════════════════════════════════════════════ */
const KF = `
  @keyframes ctFadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ctLineGrow {
    from { width: 0; }
    to   { width: 28px; }
  }
  @keyframes ctCardIn {
    from { opacity: 0; transform: translateY(40px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }
  @keyframes ctShimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes ctPingEmail {
    0%   { transform: scale(1);   opacity: 0.6; }
    70%  { transform: scale(2.2); opacity: 0; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes ctBtnSlide {
    from { opacity: 0; transform: translateX(-16px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes ctInputLine {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
`;

/* ════════════════════════════════════════════════
   CONTACT INFO CHIP — animated hover
════════════════════════════════════════════════ */
const ContactChip = ({ icon, label, href, delay, inView }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '12px',
        padding: '12px 22px',
        borderRadius: '999px',
        border: `1.5px solid ${hovered ? '#c9a030' : 'rgba(201,160,48,0.3)'}`,
        background: hovered ? 'rgba(201,160,48,0.07)' : 'transparent',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, background 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 24px rgba(201,160,48,0.15)' : 'none',
        animation: inView ? `ctFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s both` : 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ping ring on hover */}
      {hovered && (
        <div style={{
          position: 'absolute',
          left: '22px', top: '50%',
          transform: 'translateY(-50%)',
          width: '22px', height: '22px',
          borderRadius: '50%',
          border: '1.5px solid rgba(201,160,48,0.5)',
          animation: 'ctPingEmail 1.1s ease-out infinite',
          pointerEvents: 'none',
        }} />
      )}
      {/* Icon */}
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '28px', height: '28px', flexShrink: 0,
        position: 'relative', zIndex: 1,
        transition: 'transform 0.3s',
        transform: hovered ? 'scale(1.15)' : 'scale(1)',
      }}>
        {icon}
      </span>
      <span style={{
        fontSize: '14px', fontWeight: '600',
        color: hovered ? '#c9a030' : '#333',
        letterSpacing: '0.1px',
        transition: 'color 0.3s',
        position: 'relative', zIndex: 1,
      }}>
        {label}
      </span>
      {/* Arrow */}
      <span style={{
        fontSize: '14px',
        color: hovered ? '#c9a030' : 'transparent',
        transition: 'color 0.3s, transform 0.3s',
        transform: hovered ? 'translateX(3px)' : 'translateX(0)',
        display: 'inline-block',
      }}>→</span>
    </a>
  );
};

/* ════════════════════════════════════════════════
   ANIMATED INPUT
════════════════════════════════════════════════ */
const FormField = ({ label, required, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label style={{ fontSize: '13px', fontWeight: '600', color: '#555', letterSpacing: '0.3px' }}>
      {label} {required && <span style={{ color: '#c9a030' }}>*</span>}
    </label>
    {children}
  </div>
);

/* ════════════════════════════════════════════════
   SECTION
════════════════════════════════════════════════ */
const ContactSection = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const a = (dur, delay) =>
    inView ? `ctFadeUp ${dur}s cubic-bezier(0.22,1,0.36,1) ${delay}s both` : 'none';

  return (
    <>
      <style>{KF}</style>
      <style>{`
        @media (max-width: 768px) {
          .ct-chips { flex-direction: column !important; align-items: stretch !important; }
          .ct-chips a { justify-content: center; }
          .ct-heading { font-size: 28px !important; }
          .ct-card { padding: 28px 18px !important; }
        }
        @media (max-width: 480px) {
          .ct-heading { font-size: 24px !important; }
        }
      `}</style>

      <section
        ref={ref}
        id="contact"
        style={{
          width: '100%',
          background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)',
          padding: '80px 20px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle gold radial bg */}
        <div style={{
          position: 'absolute',
          top: '-60px', left: '50%',
          transform: 'translateX(-50%)',
          width: '700px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(201,160,48,0.06) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          position: 'relative', zIndex: 1,
          textAlign: 'center',
        }}>

          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            justifyContent: 'center',
            marginBottom: '16px',
            animation: a(0.7, 0.1),
          }}>
            <div style={{
              height: '2px', background: 'linear-gradient(to right, #c9a030, #F5C518)',
              animation: inView ? `ctLineGrow 0.6s ease 0.18s both` : 'none',
            }} />
            <span style={{
              fontSize: '11px', fontWeight: '700',
              letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a030',
            }}>
              Get In Touch
            </span>
            <div style={{
              height: '2px', background: 'linear-gradient(to left, #c9a030, #F5C518)',
              animation: inView ? `ctLineGrow 0.6s ease 0.18s both` : 'none',
            }} />
          </div>

          {/* Heading */}
          <h2 className="ct-heading" style={{
            fontSize: '38px', fontWeight: '800',
            color: '#1a1a1a', marginBottom: '14px', lineHeight: '1.18',
            letterSpacing: '-0.4px',
            animation: a(0.8, 0.22),
          }}>
            We're here for you
          </h2>

          {/* Subtext */}
          <p style={{
            fontSize: '15px', color: '#777',
            lineHeight: '1.75', marginBottom: '36px',
            animation: a(0.7, 0.32),
          }}>
            Have a query about one of our properties? We'd love to hear from you.
            Leave us a message and we'll get back to you.
          </p>

          {/* ── Contact chips — centered row ── */}
          <div className="ct-chips" style={{
            display: 'flex', gap: '14px',
            justifyContent: 'center', flexWrap: 'wrap',
            marginBottom: '44px',
          }}>
            <ContactChip
              href="mailto:support@gangotrigreen.com"
              label="support@gangotrigreen.com"
              inView={inView} delay={0.4}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#c9a030" strokeWidth="1.8" fill="none"/>
                  <path d="M2 7l10 7 10-7" stroke="#c9a030" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              }
            />
            <ContactChip
              href="tel:+919309002202"
              label="+91 93090 02202"
              inView={inView} delay={0.5}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="#c9a030" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
          </div>

          {/* ── Form card ── */}
          <div className="ct-card" style={{
            border: '1px solid #ebebeb',
            borderRadius: '16px',
            padding: '40px 36px',
            background: 'white',
            boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
            textAlign: 'left',
            animation: inView ? `ctCardIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s both` : 'none',
            transition: 'box-shadow 0.3s',
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 48px rgba(201,160,48,0.12), 0 2px 8px rgba(0,0,0,0.06)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 32px rgba(0,0,0,0.07)'}
          >
            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>

              <FormField label="Name" required>
                <input
                  type="text" placeholder="Enter your Name" required
                  style={{
                    border: 'none', borderBottom: '1.5px solid #e0e0e0',
                    fontSize: '14px', color: '#333', padding: '9px 0',
                    outline: 'none', background: 'transparent', width: '100%',
                    transition: 'border-color 0.25s',
                  }}
                  onFocus={e => e.target.style.borderBottomColor = '#c9a030'}
                  onBlur={e => e.target.style.borderBottomColor = '#e0e0e0'}
                />
              </FormField>

              <FormField label="Email ID" required>
                <input
                  type="email" placeholder="Enter your Email ID" required
                  style={{
                    border: 'none', borderBottom: '1.5px solid #e0e0e0',
                    fontSize: '14px', color: '#333', padding: '9px 0',
                    outline: 'none', background: 'transparent', width: '100%',
                    transition: 'border-color 0.25s',
                  }}
                  onFocus={e => e.target.style.borderBottomColor = '#c9a030'}
                  onBlur={e => e.target.style.borderBottomColor = '#e0e0e0'}
                />
              </FormField>

              <FormField label="Phone Number" required>
                <input
                  type="tel" placeholder="Enter your Phone Number" required
                  style={{
                    border: 'none', borderBottom: '1.5px solid #e0e0e0',
                    fontSize: '14px', color: '#333', padding: '9px 0',
                    outline: 'none', background: 'transparent', width: '100%',
                    transition: 'border-color 0.25s',
                  }}
                  onFocus={e => e.target.style.borderBottomColor = '#c9a030'}
                  onBlur={e => e.target.style.borderBottomColor = '#e0e0e0'}
                />
              </FormField>

              <FormField label="How did you hear about us?" required>
                <div style={{ position: 'relative' }}>
                  <select required style={{
                    border: 'none', borderBottom: '1.5px solid #e0e0e0',
                    fontSize: '14px', color: '#666', padding: '9px 0',
                    outline: 'none', background: 'transparent', width: '100%',
                    appearance: 'none', cursor: 'pointer',
                    transition: 'border-color 0.25s',
                  }}
                    onFocus={e => e.target.style.borderBottomColor = '#c9a030'}
                    onBlur={e => e.target.style.borderBottomColor = '#e0e0e0'}
                  >
                    <option value="">Referred by someone</option>
                    <option value="social">Social Media</option>
                    <option value="google">Google</option>
                    <option value="friend">Friend / Family</option>
                    <option value="newspaper">Newspaper</option>
                    <option value="other">Other</option>
                  </select>
                  <svg style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                    width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </FormField>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  style={{
                    background: '#c9a030',
                    color: 'white', border: 'none',
                    borderRadius: '8px', padding: '13px 36px',
                    fontSize: '15px', fontWeight: '700',
                    cursor: 'pointer', letterSpacing: '0.3px',
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    transition: 'background 0.25s, transform 0.25s, gap 0.25s, box-shadow 0.25s',
                    boxShadow: '0 4px 16px rgba(201,160,48,0.3)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#b8902a';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.gap = '13px';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,160,48,0.45)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#c9a030';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.gap = '8px';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,160,48,0.3)';
                  }}
                >
                  Send Request
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>
    </>
  );
};

export default ContactSection;
