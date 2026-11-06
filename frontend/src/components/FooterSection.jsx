import gangotriLogo from '../assets/gangotri-logo.webp';

const seededRand = (seed) => {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
};

const iconTypes = ['bird','tree','leaf','flower','house','sun','butterfly','star','diamond','feather','seedling','moon'];

const rand = seededRand(42);
const bgIcons = Array.from({ length: 130 }, (_, i) => ({
  type: iconTypes[i % iconTypes.length],
  top: rand() * 95,
  left: rand() * 97,
  size: 18 + rand() * 22,
  opacity: 0.07 + rand() * 0.08,
  rotate: rand() * 360,
}));

const renderIcon = (type, size, color) => {
  const sw = Math.max(1, size * 0.07);
  switch(type) {
    case 'bird':
      return <svg width={size} height={size*0.6} viewBox="0 0 40 24" fill="none">
        <path d="M2 18 C8 6 14 3 20 5 C26 3 32 6 38 18" stroke={color} strokeWidth={sw*1.2} fill="none" strokeLinecap="round"/>
        <path d="M20 5 C20 10 17 13 14 15" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round"/>
        <path d="M20 5 C20 10 23 13 26 15" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round"/>
      </svg>;
    case 'tree':
      return <svg width={size*0.7} height={size} viewBox="0 0 30 50" fill="none">
        <line x1="15" y1="50" x2="15" y2="30" stroke={color} strokeWidth={sw*1.5} strokeLinecap="round"/>
        <path d="M15 30 L4 44 L11 41 L7 50 L15 45 L23 50 L19 41 L26 44 Z" stroke={color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
        <path d="M15 16 L5 30 L12 27 L8 38 L15 33 L22 38 L18 27 L25 30 Z" stroke={color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
        <path d="M15 3 L6 16 L13 13 L10 22 L15 18 L20 22 L17 13 L24 16 Z" stroke={color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
      </svg>;
    case 'leaf':
      return <svg width={size*0.7} height={size} viewBox="0 0 28 40" fill="none">
        <path d="M14 38 C14 38 2 28 2 16 C2 6 7 2 14 2 C21 2 26 6 26 16 C26 28 14 38 14 38Z" stroke={color} strokeWidth={sw} fill="none"/>
        <line x1="14" y1="38" x2="14" y2="2" stroke={color} strokeWidth={sw*0.7} strokeDasharray="2 2"/>
        <path d="M14 20 C10 18 8 14 10 10" stroke={color} strokeWidth={sw*0.6} fill="none" strokeLinecap="round"/>
        <path d="M14 26 C18 24 20 20 18 16" stroke={color} strokeWidth={sw*0.6} fill="none" strokeLinecap="round"/>
      </svg>;
    case 'flower':
      return <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="4" stroke={color} strokeWidth={sw} fill="none"/>
        <ellipse cx="20" cy="10" rx="3" ry="5.5" stroke={color} strokeWidth={sw*0.8} fill="none"/>
        <ellipse cx="20" cy="30" rx="3" ry="5.5" stroke={color} strokeWidth={sw*0.8} fill="none"/>
        <ellipse cx="10" cy="20" rx="5.5" ry="3" stroke={color} strokeWidth={sw*0.8} fill="none"/>
        <ellipse cx="30" cy="20" rx="5.5" ry="3" stroke={color} strokeWidth={sw*0.8} fill="none"/>
        <ellipse cx="13" cy="13" rx="3" ry="5.5" transform="rotate(45 13 13)" stroke={color} strokeWidth={sw*0.7} fill="none"/>
        <ellipse cx="27" cy="27" rx="3" ry="5.5" transform="rotate(45 27 27)" stroke={color} strokeWidth={sw*0.7} fill="none"/>
        <ellipse cx="27" cy="13" rx="3" ry="5.5" transform="rotate(-45 27 13)" stroke={color} strokeWidth={sw*0.7} fill="none"/>
        <ellipse cx="13" cy="27" rx="3" ry="5.5" transform="rotate(-45 13 27)" stroke={color} strokeWidth={sw*0.7} fill="none"/>
      </svg>;
    case 'house':
      return <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <path d="M4 18 L20 5 L36 18" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="7" y="18" width="26" height="18" rx="1" stroke={color} strokeWidth={sw} fill="none"/>
        <rect x="15" y="26" width="10" height="10" rx="1" stroke={color} strokeWidth={sw*0.8} fill="none"/>
        <rect x="9" y="21" width="7" height="7" rx="1" stroke={color} strokeWidth={sw*0.7} fill="none"/>
        <rect x="24" y="21" width="7" height="7" rx="1" stroke={color} strokeWidth={sw*0.7} fill="none"/>
      </svg>;
    case 'sun':
      return <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="7" stroke={color} strokeWidth={sw} fill="none"/>
        {[0,45,90,135,180,225,270,315].map((a,i) => (
          <line key={i} x1={20+10*Math.cos(a*Math.PI/180)} y1={20+10*Math.sin(a*Math.PI/180)} x2={20+15*Math.cos(a*Math.PI/180)} y2={20+15*Math.sin(a*Math.PI/180)} stroke={color} strokeWidth={sw} strokeLinecap="round"/>
        ))}
      </svg>;
    case 'butterfly':
      return <svg width={size} height={size*0.75} viewBox="0 0 40 30" fill="none">
        <path d="M20 15 C15 6 3 3 3 11 C3 18 12 18 20 15Z" stroke={color} strokeWidth={sw} fill="none"/>
        <path d="M20 15 C25 6 37 3 37 11 C37 18 28 18 20 15Z" stroke={color} strokeWidth={sw} fill="none"/>
        <path d="M20 15 C15 22 5 23 7 18 C9 14 15 16 20 15Z" stroke={color} strokeWidth={sw*0.8} fill="none"/>
        <path d="M20 15 C25 22 35 23 33 18 C31 14 25 16 20 15Z" stroke={color} strokeWidth={sw*0.8} fill="none"/>
        <line x1="20" y1="12" x2="20" y2="18" stroke={color} strokeWidth={sw}/>
        <path d="M20 12 C18 8 17 6 16 4" stroke={color} strokeWidth={sw*0.8} strokeLinecap="round" fill="none"/>
        <path d="M20 12 C22 8 23 6 24 4" stroke={color} strokeWidth={sw*0.8} strokeLinecap="round" fill="none"/>
      </svg>;
    case 'star':
      return <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <path d="M20 3 L23.5 15 L36 15 L26 23 L29.5 35 L20 28 L10.5 35 L14 23 L4 15 L16.5 15 Z" stroke={color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
      </svg>;
    case 'diamond':
      return <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <path d="M20 3 L37 20 L20 37 L3 20 Z" stroke={color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
        <path d="M3 20 L37 20 M20 3 L20 37" stroke={color} strokeWidth={sw*0.5} strokeDasharray="2 2"/>
      </svg>;
    case 'feather':
      return <svg width={size*0.6} height={size} viewBox="0 0 24 40" fill="none">
        <path d="M12 38 C12 38 2 28 3 16 C4 6 10 2 20 4 C20 4 14 8 12 38Z" stroke={color} strokeWidth={sw} fill="none"/>
        <line x1="12" y1="38" x2="12" y2="10" stroke={color} strokeWidth={sw*0.7}/>
        <path d="M12 14 C9 12 6 13 4 15" stroke={color} strokeWidth={sw*0.5} fill="none" strokeLinecap="round"/>
        <path d="M12 18 C9 16 6 17 4 19" stroke={color} strokeWidth={sw*0.5} fill="none" strokeLinecap="round"/>
        <path d="M12 22 C9 20 6 21 5 23" stroke={color} strokeWidth={sw*0.5} fill="none" strokeLinecap="round"/>
        <path d="M12 14 C15 12 18 13 19 15" stroke={color} strokeWidth={sw*0.5} fill="none" strokeLinecap="round"/>
        <path d="M12 18 C15 16 18 17 19 19" stroke={color} strokeWidth={sw*0.5} fill="none" strokeLinecap="round"/>
      </svg>;
    case 'seedling':
      return <svg width={size*0.7} height={size} viewBox="0 0 28 40" fill="none">
        <line x1="14" y1="38" x2="14" y2="18" stroke={color} strokeWidth={sw*1.2} strokeLinecap="round"/>
        <path d="M14 28 C10 24 4 22 4 16 C4 10 10 8 14 12 C18 8 24 10 24 16 C24 22 18 24 14 28Z" stroke={color} strokeWidth={sw} fill="none"/>
        <path d="M14 18 C11 16 9 12 12 10" stroke={color} strokeWidth={sw*0.6} fill="none" strokeLinecap="round"/>
      </svg>;
    case 'moon':
      return <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <path d="M28 8 C18 10 12 18 14 28 C16 36 24 40 32 38 C22 42 10 36 8 26 C6 14 14 4 24 4 C25.4 4 26.7 4.2 28 8Z" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round"/>
        <circle cx="30" cy="12" r="1.5" fill={color} opacity="0.6"/>
        <circle cx="34" cy="20" r="1" fill={color} opacity="0.5"/>
      </svg>;
    default: return null;
  }
};

const FooterSection = () => {
  const projects = [
    'Nivaan Grandeur Phase 2','Nivaan Meadows Phase 3','Nivaan Skylark','Pristine City',
    'Nivaan Water Edge','Nivaan Sparsh','Nivaan Legacy','Nivaan Suraksha',
    'Nivaan Hills','Nivaan Nirvana','Nivaan Elegance','Nivaan Meadows Phase 1 & 2',
    'Firefly','Nivaan Business Hub',
  ];
  const otherLinks = ['NRI Lounge','Our Blog','Awards','Testimonials','Contact Us','Privacy Policy','Disclaimer'];

  return (
    <footer style={{ width: '100%', background: '#f0ede6', position: 'relative', overflow: 'hidden' }}>

      {/* ── 130 Scattered background icons ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {bgIcons.map((icon, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${icon.top}%`,
            left: `${icon.left}%`,
            opacity: icon.opacity,
            transform: `rotate(${icon.rotate}deg)`,
            lineHeight: 0,
          }}>
            {renderIcon(icon.type, icon.size, '#8a6f2e')}
          </div>
        ))}
      </div>

      {/* ── Main footer content ── */}
      <style>{`
        .footer-grid {
          max-width: 1200px; margin: 0 auto; padding: 60px 40px 40px;
          display: grid; grid-template-columns: 1fr 1.4fr 1fr 1.4fr; gap: 40px;
          position: relative; z-index: 1;
        }
        .footer-copy {
          padding: 16px 40px; display: flex; justify-content: space-between;
          align-items: center; max-width: 1200px; margin: 0 auto;
          position: relative; z-index: 1;
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr; padding: 40px 20px 30px; gap: 28px; }
          .footer-copy { flex-direction: column; gap: 8px; text-align: center; padding: 16px 20px; }
        }
      `}</style>
      <div className="footer-grid">

        {/* Column 1: Follow Us & Reach Us */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#1a1a1a', marginBottom: '14px' }}>Follow Us</h4>
          <div style={{ display: 'flex', gap: '14px', marginBottom: '30px' }}>
            <a href="#" style={{ color: '#555', textDecoration: 'none' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="5" width="20" height="14" rx="3" stroke="#555" strokeWidth="1.7" fill="none"/>
                <path d="M10 9l5 3-5 3V9z" fill="#555"/>
              </svg>
            </a>
            <a href="#" style={{ color: '#555', textDecoration: 'none' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" stroke="#555" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" style={{ color: '#555', textDecoration: 'none' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 4l16 16M20 4L4 20" stroke="#555" strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
            </a>
            <a href="#" style={{ color: '#555', textDecoration: 'none' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="#555" strokeWidth="1.7" fill="none"/>
                <circle cx="12" cy="12" r="4" stroke="#555" strokeWidth="1.7" fill="none"/>
                <circle cx="17.5" cy="6.5" r="1" fill="#555"/>
              </svg>
            </a>
          </div>
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#1a1a1a', marginBottom: '10px' }}>Reach Us</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <a href="mailto:support@vishalchugeraproperties.com" style={{ fontSize: '14px', color: '#555', textDecoration: 'none' }}>Write an Email</a>
            <a href="tel:+919309002202" style={{ fontSize: '14px', color: '#555', textDecoration: 'none' }}>Call Us</a>
          </div>
        </div>

        {/* Column 2: Our Projects */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#1a1a1a', marginBottom: '14px' }}>Our Projects</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {projects.map(p => (
              <a key={p} href="#" style={{ fontSize: '14px', color: '#555', textDecoration: 'none', lineHeight: '1.4', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#c9a030'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}>{p}</a>
            ))}
          </div>
        </div>

        {/* Column 3: Other Links */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#1a1a1a', marginBottom: '14px' }}>Other Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {otherLinks.map(l => (
              <a key={l} href="#" style={{ fontSize: '14px', color: '#555', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#c9a030'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}>{l}</a>
            ))}
          </div>
        </div>

        {/* Column 4: Brand & Address */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', marginBottom: '16px' }}>
            <img
              src={gangotriLogo}
              alt="Gangotri Green"
              className="footer-logo"
              style={{ width: '140px', height: 'auto', objectFit: 'contain' }}
            />
            <div style={{ fontSize: '11px', fontWeight: '600', color: '#888', letterSpacing: '2px' }}>PROPERTIES</div>
          </div>
          <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.65', marginBottom: '14px' }}>
            Gangotri Green Properties India Private Limited<br/>
            65-A, Oxford Village, Clover Village, Wanowrie, Pune, Maharashtra 411040
          </p>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a1a', textDecoration: 'none', borderBottom: '1.5px solid #1a1a1a', paddingBottom: '1px' }}>
            Locate us on Google Maps
          </a>
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div className="footer-copy">
        <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
          Copyright © <strong style={{ color: '#1a1a1a' }}>Gangotri Green Properties</strong> 2026. All rights reserved.
        </p>
        <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
          Made in India with ❤️ by <strong style={{ color: '#1a1a1a' }}>WisdomQuantums Solution</strong>
        </p>
      </div>

    </footer>
  );
};

export default FooterSection;
