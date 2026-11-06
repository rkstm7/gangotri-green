import { useRef, useEffect, useState, useCallback } from 'react';

/* ════════════════════════════════════════════════
   KEYFRAMES
════════════════════════════════════════════════ */
const KF = `
  @keyframes prjFadeUp {
    from { opacity: 0; transform: translateY(36px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes prjLineGrow {
    from { width: 0; }
    to   { width: 28px; }
  }
  @keyframes prjCardIn {
    from { opacity: 0; transform: translateY(50px) scale(0.94) rotateX(8deg); }
    to   { opacity: 1; transform: translateY(0)    scale(1)    rotateX(0deg); }
  }
  @keyframes prjImgZoom {
    from { transform: scale(1.12); }
    to   { transform: scale(1); }
  }
  @keyframes prjShimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes prjGlowPulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50%       { opacity: 0.9; transform: scale(1.04); }
  }
  @keyframes prjTagSlide {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes prjArrowBounce {
    0%, 100% { transform: translateX(0); }
    50%       { transform: translateX(4px); }
  }
`;

/* ════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════ */
const PROJECTS = [
  { title: 'Nivaan Grandeur – Phase 2',  tag: 'NA Plots',    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',  desc: 'Serene landscapes with exceptional connectivity — where progress meets peace.' },
  { title: 'Nivaan Meadows – Phase 3',   tag: 'Bungalows',   img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',  desc: 'Own your dream bungalow at the price of a flat. Balanced, peaceful lifestyle.' },
  { title: 'Nivaan Skylark',             tag: 'NA Plots',    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',  desc: 'Uncover the ideal backdrop at Skylark — your pathway to the ultimate dream home.' },
  { title: 'Green Valley Estates',       tag: 'Gated',       img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',  desc: 'Premium NA plots nestled in lush greenery with wide roads and full utilities.' },
  { title: 'Serene Heights Phase 1',     tag: 'Hilltop',     img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80',  desc: 'Elevated living with panoramic views, gated security, and smart infrastructure.' },
  { title: 'Lakeside Residences',        tag: 'Waterfront',  img: 'https://images.unsplash.com/photo-1549517045-bc93de199806?w=600&q=80',  desc: 'Wake up to the shimmer of water every morning — plots along a pristine lake.' },
  { title: 'Sunset Palms',              tag: 'Resort Style', img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80',  desc: 'Tropical-inspired bungalow community designed for leisurely resort-style living.' },
  { title: 'Golden Orchid Township',    tag: 'Township',     img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80',  desc: 'Self-sustained township with clubs, schools, and parks right at your doorstep.' },
  { title: 'The Horizon Villas',        tag: 'Villas',       img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',  desc: 'Architecturally distinctive villas with private gardens and smart home features.' },
  { title: 'Emerald Grove Phase 2',     tag: 'Eco Gated',    img: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&q=80',  desc: 'Tree-lined avenues meet modern infrastructure in this eco-conscious community.' },
  { title: 'Sapphire Gardens',          tag: 'Gated',        img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&q=80',  desc: 'Sprawling plots with manicured greens, jogging tracks, and 24×7 security.' },
  { title: 'Pearl Bay Bungalows',       tag: 'Coastal',      img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',  desc: 'Coastal charm meets urban convenience — your sanctuary by the bay.' },
  { title: 'Ivory Crest Phase 1',       tag: 'Hilltop',      img: 'https://images.unsplash.com/photo-1625602812206-5ec545ca1231?w=600&q=80',  desc: 'Premium hilltop plots offering sweeping city vistas and cool mountain breezes.' },
  { title: 'Marigold Township',         tag: 'Township',     img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',  desc: 'Vibrant community-first living with parks, schools, and retail woven together.' },
  { title: 'The Courtyard Collection',  tag: 'Heritage',     img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',  desc: 'Heritage-inspired bungalows with central courtyards and artisan stone work.' },
  { title: 'Riviera Plots Phase 4',     tag: 'Waterfront',   img: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=600&q=80',  desc: 'River-facing plots with unobstructed views and superior city connectivity.' },
  { title: 'Amber Terrace',            tag: 'Boutique',      img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80',  desc: 'Boutique terrace bungalows with private decks overlooking a serene valley.' },
  { title: 'Cedar Woods Enclave',       tag: 'Forest Edge',  img: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=600&q=80',  desc: 'Forest-edge living with native landscape, walking trails, and mountain air.' },
  { title: 'Solaris Township Phase 2',  tag: 'Eco Smart',    img: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=600&q=80',  desc: 'Solar-powered sustainable community with near-zero utility costs and parks.' },
  { title: 'Azure Sky Residences',      tag: 'NA Plots',     img: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&q=80',  desc: 'Open-sky plots with wide roads, underground drainage, and premium landscaping.' },
];

const CARD_W   = 360;
const CARD_GAP = 22;

/* ════════════════════════════════════════════════
   3D CARD
════════════════════════════════════════════════ */
const ProjectCard = ({ p, inView, delay }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const onMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const mx = (e.clientX - left) / width  - 0.5;   // -0.5 → +0.5
    const my = (e.clientY - top)  / height - 0.5;
    setTilt({ x: my * -14, y: mx * 14 });            // max ±7deg
  }, []);

  const onMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        flexShrink: 0,
        width: `${CARD_W}px`,
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #2e2e2e 0%, #1e1e1e 100%)',
        cursor: 'pointer',
        position: 'relative',
        /* 3D perspective tilt */
        transform: hovered
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-10px) scale(1.03)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)',
        transition: hovered
          ? 'transform 0.08s linear, box-shadow 0.35s ease'
          : 'transform 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease',
        boxShadow: hovered
          ? '0 30px 70px rgba(0,0,0,0.60), 0 0 0 1px rgba(201,160,48,0.25)'
          : '0 6px 24px rgba(0,0,0,0.35)',
        animation: inView
          ? `prjCardIn 0.80s cubic-bezier(0.22,1,0.36,1) ${delay}s both`
          : 'none',
        /* Perspective origin for tilt */
        transformOrigin: 'center center',
        willChange: 'transform',
      }}
    >
      {/* ── Image area ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '210px',
        overflow: 'hidden',
        background: '#1a1a1a',
      }}>
        <img
          src={p.img}
          alt={p.title}
          onLoad={() => setImgLoaded(true)}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
            transform: hovered ? 'scale(1.09)' : 'scale(1)',
            animation: imgLoaded && inView
              ? `prjImgZoom 1.2s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s both`
              : 'none',
            opacity: imgLoaded ? 1 : 0,
          }}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80'; setImgLoaded(true); }}
        />

        {/* Dark gradient bottom */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(22,22,22,0.85) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
        }} />

        {/* Gold shimmer overlay on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(120deg, transparent 30%, rgba(201,160,48,0.10) 50%, transparent 70%)',
          backgroundSize: '300% 100%',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          animation: hovered ? 'prjShimmer 1.8s linear infinite' : 'none',
        }} />

        {/* Tag badge */}
        <div style={{
          position: 'absolute',
          top: '14px', left: '14px',
          background: 'rgba(201,160,48,0.92)',
          color: 'white',
          fontSize: '10px', fontWeight: '700',
          letterSpacing: '1.5px', textTransform: 'uppercase',
          padding: '4px 10px', borderRadius: '999px',
          backdropFilter: 'blur(4px)',
          animation: inView ? `prjTagSlide 0.5s ease ${delay + 0.3}s both` : 'none',
        }}>
          {p.tag}
        </div>

        {/* Glow dot — bottom center on hover */}
        {hovered && (
          <div style={{
            position: 'absolute',
            bottom: '-20px', left: '50%',
            transform: 'translateX(-50%)',
            width: '80px', height: '40px',
            background: 'radial-gradient(ellipse, rgba(201,160,48,0.35) 0%, transparent 70%)',
            animation: 'prjGlowPulse 1.5s ease-in-out infinite',
            pointerEvents: 'none',
          }} />
        )}
      </div>

      {/* ── Text body ── */}
      <div style={{ padding: '20px 22px 24px', position: 'relative' }}>

        {/* Gold top border line — slides in on hover */}
        <div style={{
          position: 'absolute', top: 0, left: '22px',
          height: '2px',
          width: hovered ? 'calc(100% - 44px)' : '0',
          background: 'linear-gradient(to right, #c9a030, #F5C518, transparent)',
          borderRadius: '1px',
          transition: 'width 0.45s cubic-bezier(0.22,1,0.36,1)',
        }} />

        <h3 style={{
          fontSize: '16.5px', fontWeight: '700',
          color: '#ffffff', marginBottom: '8px',
          lineHeight: '1.3', letterSpacing: '-0.1px',
          transition: 'color 0.25s',
        }}>
          {p.title}
        </h3>

        <p style={{
          fontSize: '13px',
          color: hovered ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.50)',
          lineHeight: '1.65', margin: '0 0 18px',
          transition: 'color 0.3s',
        }}>
          {p.desc}
        </p>

        {/* Learn more link */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '12px', fontWeight: '700',
          color: hovered ? '#F5C518' : 'rgba(255,255,255,0.35)',
          letterSpacing: '1px', textTransform: 'uppercase',
          transition: 'color 0.3s',
        }}>
          <span>Learn More</span>
          <span style={{
            animation: hovered ? 'prjArrowBounce 0.7s ease-in-out infinite' : 'none',
            display: 'inline-block',
          }}>→</span>
        </div>
      </div>

      {/* Gloss reflection — top-left on hover */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '60%', height: '40%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
        borderRadius: '16px 0 0 0',
        pointerEvents: 'none',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s',
      }} />
    </div>
  );
};

/* ════════════════════════════════════════════════
   SECTION
════════════════════════════════════════════════ */
const buildingIconSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'><g fill='none' stroke='rgba(255,255,255,0.055)' stroke-width='1.2'><rect x='20' y='28' width='50' height='42' rx='1'/><rect x='30' y='38' width='10' height='10'/><rect x='50' y='38' width='10' height='10'/><rect x='37' y='52' width='16' height='18'/><polyline points='15,28 45,10 75,28'/><line x1='45' y1='10' x2='45' y2='28'/></g></svg>`;

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const pausedRef  = useRef(false);
  const [inView, setInView] = useState(false);

  /* Scroll-replay observer */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Auto-scroll */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = () => {
      if (pausedRef.current) return;
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) {
        track.scrollLeft = 0;
      } else {
        track.scrollLeft += 1;
      }
    };
    const id = setInterval(step, 20);
    const pause  = () => { pausedRef.current = true; };
    const resume = () => { pausedRef.current = false; };
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);
    track.addEventListener('touchstart', pause, { passive: true });
    track.addEventListener('touchend',   resume);
    return () => {
      clearInterval(id);
      track.removeEventListener('mouseenter', pause);
      track.removeEventListener('mouseleave', resume);
      track.removeEventListener('touchstart', pause);
      track.removeEventListener('touchend',   resume);
    };
  }, []);

  const scroll = (dir) => {
    if (!trackRef.current) return;
    pausedRef.current = true;
    trackRef.current.scrollBy({ left: dir * (CARD_W + CARD_GAP), behavior: 'smooth' });
    setTimeout(() => { pausedRef.current = false; }, 2200);
  };

  const a = (name, dur, delay, ease = 'cubic-bezier(0.22,1,0.36,1)') =>
    inView ? `${name} ${dur}s ${ease} ${delay}s both` : 'none';

  return (
    <>
      <style>{KF}</style>

      <section
        id="projects"
        ref={sectionRef}
        style={{
          width: '100%',
          background: '#1e1e1e',
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(buildingIconSvg)}"), linear-gradient(180deg, #1c1c1c 0%, #252525 100%)`,
          backgroundRepeat: 'repeat, no-repeat',
          backgroundSize: '90px 90px, cover',
          padding: '80px 0 80px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Top gold border */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '3px',
          background: 'linear-gradient(to right, transparent, #c9a030 30%, #F5C518 50%, #c9a030 70%, transparent)',
          animation: a('prjLineGrow', 1.2, 0.1, 'ease'),
          width: inView ? '100%' : '0',
          transition: 'width 1.2s ease 0.1s',
        }} />

        {/* ── Header ── */}
        <div style={{ padding: '0 72px', marginBottom: '48px' }}>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginBottom: '14px',
            animation: a('prjFadeUp', 0.7, 0.15),
          }}>
            <div style={{
              height: '2px',
              background: 'linear-gradient(to right, #c9a030, #F5C518)',
              animation: a('prjLineGrow', 0.6, 0.22),
            }} />
            <p style={{
              fontSize: '11px', fontWeight: '700',
              color: '#c9a030', letterSpacing: '3px',
              textTransform: 'uppercase', margin: 0,
            }}>
              Our Projects
            </p>
          </div>

          <h2 style={{
            fontSize: '36px', fontWeight: '800',
            color: '#ffffff', marginBottom: '10px',
            letterSpacing: '-0.3px', lineHeight: '1.2',
            animation: a('prjFadeUp', 0.75, 0.28),
          }}>
            Bring your dream home to life!
          </h2>

          <p style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.45)',
            margin: 0,
            animation: a('prjFadeUp', 0.7, 0.38),
          }}>
            Explore our properties in and around Pune
          </p>
        </div>

        {/* ── Card track ── */}
        <div
          id="prj-track"
          ref={trackRef}
          style={{
            display: 'flex',
            gap: `${CARD_GAP}px`,
            overflowX: 'auto',
            paddingLeft: '72px',
            paddingRight: '72px',
            paddingBottom: '20px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            /* perspective on the container for collective 3D */
            perspective: '1200px',
          }}
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.title}
              p={p}
              inView={inView}
              delay={0.45 + (i % 5) * 0.08}
            />
          ))}
        </div>

        {/* ── Arrows ── */}
        {['left', 'right'].map(side => (
          <button
            key={side}
            aria-label={`Scroll ${side}`}
            onClick={() => scroll(side === 'left' ? -1 : 1)}
            style={{
              position: 'absolute',
              [side]: '18px',
              top: '54%',
              transform: 'translateY(-50%)',
              width: '44px', height: '44px',
              borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.20)',
              background: 'rgba(255,255,255,0.07)',
              color: 'white',
              fontSize: '22px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              backdropFilter: 'blur(6px)',
              transition: 'background 0.25s, border-color 0.25s, transform 0.25s',
              lineHeight: 1,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(201,160,48,0.25)';
              e.currentTarget.style.borderColor = 'rgba(201,160,48,0.6)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            {side === 'left' ? '‹' : '›'}
          </button>
        ))}

        {/* Scrollbar */}
        <style>{`
          #prj-track { scrollbar-width: thin; scrollbar-color: #4a4a4a #1e1e1e; }
          #prj-track::-webkit-scrollbar { height: 5px; }
          #prj-track::-webkit-scrollbar-track { background: #1e1e1e; border-radius: 4px; }
          #prj-track::-webkit-scrollbar-thumb { background: #4a4a4a; border-radius: 4px; }
          #prj-track::-webkit-scrollbar-thumb:hover { background: #c9a030; }
        `}</style>
      </section>
    </>
  );
};

export default ProjectsSection;
