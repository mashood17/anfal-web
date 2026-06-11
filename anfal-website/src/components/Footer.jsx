import { useState } from 'react'

const QR_MENU_URL = 'https://anfal-qr-menu.vercel.app'
const WHATSAPP    = 'https://wa.me/919380569427'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: QR_MENU_URL, external: true },
  { label: 'Cuisine', href: '#cuisines' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]


const FOOTER_LINKS = [
  { label: 'Home',     href: '#contact'  },
]

const scrollTo = (id) => (e) => {
  e.preventDefault()
  document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      backgroundColor: '#040F05',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Ambient top glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(198,255,0,0.35) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Main footer body ─────────────────────────────────────────── */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft:  'clamp(20px, 5vw, 80px)',
        paddingRight: 'clamp(20px, 5vw, 80px)',
        paddingTop:   'clamp(44px, 5vw, 64px)',
        paddingBottom:'clamp(32px, 4vw, 48px)',
      }}>

        {/* Top row — brand left, nav centre-right */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 'clamp(32px, 5vw, 56px)',
          marginBottom: 'clamp(36px, 4vw, 52px)',
        }}>

          {/* ── Brand block ── */}
          <div style={{ maxWidth: '240px' }}>
            {/* Logo */}
            <img
              src="/images/logo/logo.png"
              alt="Anfal Restaurant"
              style={{ height: '36px', width: 'auto', marginBottom: '14px', objectFit: 'contain' }}
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <p style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '18px', fontWeight: 700,
              color: '#F5F2EC', lineHeight: 1.2,
              marginBottom: '8px',
            }}>
              Anfal Restaurant
            </p>
            <p style={{
              fontSize: '12px',
              color: 'rgba(245,242,236,0.35)',
              fontStyle: 'italic',
              lineHeight: 1.65,
              marginBottom: '20px',
            }}>
              A World of Flavors in Your Hands
            </p>

            {/* WhatsApp pill */}
            <FooterPill href={WHATSAPP} external>
              <WhatsAppIcon />
              WhatsApp Us
            </FooterPill>
          </div>

          {/* ── Nav + info block ── */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(28px, 5vw, 64px)',
          }}>

            {/* Navigation */}
            <div>
              <ColHeader>Navigate</ColHeader>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {NAV_LINKS.map(({ label, href, external }) => (
                <FooterLink
                  key={label}
                  href={href}
                  onClick={external ? undefined : scrollTo(href)}
                >
                  {label}
                </FooterLink>
              ))}
                
              </nav>
            </div>

            {/* Location + hours combined */}
            <div style={{ minWidth: '160px' }}>
              <ColHeader>Visit Us</ColHeader>
              <p style={{
                fontSize: '12px',
                color: 'rgba(245,242,236,0.45)',
                lineHeight: 1.75,
                marginBottom: '14px',
              }}>
                NH 75, Sulthan Bag<br />
                Soorikumeru, Mani
              </p>

              {[
                { label: '+91 93805 69427', href: 'tel:+919380569427' },
                { label: '+91 93720 34901', href: 'tel:+919372034901' },
              ].map(({ label, href }) => (
                <FooterLink key={href} href={href} style={{ marginBottom: '5px' }}>
                  {label}
                </FooterLink>
              ))}

              {/* Hours pill */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                marginTop: '14px',
                padding: '5px 12px',
                backgroundColor: 'rgba(198,255,0,0.06)',
                border: '1px solid rgba(198,255,0,0.15)',
                borderRadius: '100px',
              }}>
                <span style={{
                  width: '5px', height: '5px', borderRadius: '50%',
                  backgroundColor: '#F5F2EC', flexShrink: 0,
                  animation: 'fp-pulse 2s ease-in-out infinite',
                }} />
                <span style={{
                  fontSize: '11px', fontWeight: 600,
                  color: '#F5F2EC', letterSpacing: '0.05em',
                }}>
                  6 AM – 11:55 PM · Every Day
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)',
          marginBottom: 'clamp(18px, 2vw, 24px)',
        }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
        }}>
          <p style={{
            fontSize: '11px',
            color: 'rgba(245,242,236,0.2)',
            letterSpacing: '0.03em',
          }}>
            © {year} Anfal Restaurant. All rights reserved.
          </p>

          {/* Back to top */}
          <BackToTop />
        </div>
      </div>

      <style>{`
        @keyframes fp-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
      `}</style>
    </footer>
  )
}

/* ─── Column header ──────────────────────────────────────────────────────── */
function ColHeader({ children }) {
  return (
    <p style={{
      fontSize: '9px', fontWeight: 700,
      letterSpacing: '0.18em', textTransform: 'uppercase',
      color: 'rgba(198,255,0,0.55)',
      marginBottom: '16px',
    }}>
      {children}
    </p>
  )
}

/* ─── Footer link ────────────────────────────────────────────────────────── */
function FooterLink({ href, onClick, external, accent, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        fontSize: '12px',
        fontWeight: accent ? 600 : 400,
        color: accent
          ? (hovered ? '#E0FF5A' : '#F5F2EC')
          : (hovered ? 'rgba(245,242,236,0.75)' : 'rgba(245,242,236,0.38)'),
        textDecoration: 'none',
        letterSpacing: accent ? '0.04em' : '0',
        transition: 'color 0.2s',
        lineHeight: 1.6,
      }}
    >
      {children}
    </a>
  )
}

/* ─── Pill button ────────────────────────────────────────────────────────── */
function FooterPill({ href, external, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '7px',
        padding: '8px 16px',
        backgroundColor: hovered ? '#F5F2EC' : 'rgba(198,255,0,0.08)',
        border: `1px solid ${hovered ? '#F5F2EC' : 'rgba(198,255,0,0.2)'}`,
        borderRadius: '100px',
        color: hovered ? '#040F05' : '#F5F2EC',
        fontSize: '11px', fontWeight: 700,
        letterSpacing: '0.05em',
        textDecoration: 'none',
        transition: 'all 0.22s',
      }}
    >
      {children}
    </a>
  )
}

/* ─── Back to top ────────────────────────────────────────────────────────── */
function BackToTop() {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Back to top"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '7px',
        padding: '7px 14px',
        backgroundColor: 'transparent',
        border: `1px solid ${hovered ? 'rgba(198,255,0,0.35)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '100px',
        color: hovered ? '#F5F2EC' : 'rgba(245,242,236,0.25)',
        fontSize: '10px', fontWeight: 700,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.22s',
        outline: 'none',
      }}
    >
      <ArrowUpIcon hovered={hovered} />
      Back to top
    </button>
  )
}

/* ─── Icons ──────────────────────────────────────────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
    </svg>
  )
}
function ArrowUpIcon({ hovered }) {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
      <path d="M8 12V4M4 8l4-4 4 4" stroke={hovered ? '#F5F2EC' : 'rgba(245,242,236,0.25)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}