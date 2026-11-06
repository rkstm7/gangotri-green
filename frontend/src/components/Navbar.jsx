import React, { useState } from 'react';

const NAV_LINKS = [
  { label: 'Home',         href: '#' },
  { label: 'About Us',     href: '#about' },
  { label: 'Our Projects', href: '#projects' },
  { label: 'NRI Lounge',   href: '#nri' },
  { label: 'Our Blog',     href: '#blog' },
  { label: 'Awards',       href: '#awards' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact Us',   href: '#contact' },
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Disclaimer',   href: '#disclaimer' },
];

const Navbar = () => {
  const [open, setOpen]   = useState(false);
  const [active, setActive] = useState('Home');

  const handleOpen  = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* ════════════════ TOP NAV BAR ════════════════ */}
      <nav className="navbar">

        {/* Logo */}
        <img
          src="/gangotri-logo.webp"
          alt="Gangotri Green — Past to Possibility"
          style={{
            height: '48px',
            width: 'auto',
            objectFit: 'contain',
            flexShrink: 0,
          }}
        />

        {/* Hamburger — morphs to X when open */}
        <button
          className={`hamburger${open ? ' is-open' : ''}`}
          onClick={open ? handleClose : handleOpen}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>
      </nav>

      {/* ════════════════ BACKDROP ════════════════ */}
      <div
        className={`drawer-backdrop${open ? ' open' : ''}`}
        onClick={handleClose}
        style={{ pointerEvents: open ? 'auto' : 'none' }}
      />

      {/* ════════════════ SIDE DRAWER ════════════════ */}
      <div className={`drawer${open ? ' open' : ''}`}>

        {/* Header with close button */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '16px 18px 12px',
          borderBottom: '1px solid #f0f0f0',
        }}>
          <button
            className="drawer-close-btn"
            onClick={handleClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1 }}>
          {NAV_LINKS.map((link, i) => {
            const isActive = active === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`drawer-link${isActive ? ' active-link' : ''}`}
                onClick={() => { setActive(link.label); handleClose(); }}
                style={{
                  display: 'block',
                  padding: '15px 28px',
                  fontSize: '15px',
                  fontWeight: isActive ? '700' : '400',
                  color: isActive ? 'white' : '#374151',
                  background: isActive ? '#F5C518' : (i % 2 === 0 ? '#f9fafb' : '#f3f4f6'),
                  textDecoration: 'none',
                  borderBottom: '1px solid #eaeaea',
                  borderLeft: isActive ? '4px solid #d4a017' : '4px solid transparent',
                  letterSpacing: '0.1px',
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
