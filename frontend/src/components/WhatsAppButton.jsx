const WhatsAppButton = () => (
  <a
    href="https://wa.me/919999999999"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    style={{
      position: 'fixed',
      bottom: '20px',
      right: '0px',          /* flush to right edge — partially cut off like design */
      zIndex: 999,
      width: '58px',
      height: '58px',
      background: '#7DC243', /* exact light green from design */
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 16px rgba(125, 194, 67, 0.45)',
      textDecoration: 'none',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'scale(1.10)';
      e.currentTarget.style.boxShadow = '0 6px 22px rgba(125, 194, 67, 0.60)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 4px 16px rgba(125, 194, 67, 0.45)';
    }}
  >
    {/* Exact WhatsApp logo SVG — speech bubble + phone handset */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="34"
      height="34"
      fill="none"
    >
      {/* Speech bubble */}
      <path
        d="M24 4C13.0 4 4 13.0 4 24c0 3.6 1.0 7.0 2.7 9.9L4 44l10.4-2.7C17.1 42.9 20.5 44 24 44c11.0 0 20-9.0 20-20S35.0 4 24 4z"
        fill="white"
      />
      {/* Phone handset inside bubble */}
      <path
        d="M17.5 14.5c-.4-.9-1.5-.9-2.1-.1l-1.2 1.6c-1.1 1.5-.8 3.6.5 5.5 1.5 2.2 3.7 4.8 6.3 6.6 2.6 1.8 5.5 3.1 7.8 3.3 2.0.2 3.4-.7 4.2-2.0l.8-1.4c.5-.9.1-2.1-.9-2.5l-3.2-1.3c-.9-.4-1.9 0-2.3.8l-.5 1.0c-.2.4-.7.6-1.1.4-1.2-.5-3.4-2.0-5.0-3.8-1.6-1.8-2.6-4.1-2.8-5.4-.1-.5.2-.9.6-1.0l1.1-.3c.9-.2 1.4-1.2 1.1-2.1l-1.3-3.3z"
        fill="#7DC243"
      />
    </svg>
  </a>
);

export default WhatsAppButton;
