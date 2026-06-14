import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

// ─── Anfal Restaurant — NH 75, Sulthan Bag, Soorikumeru, Mani, Karnataka ──────
// Coordinates: 12.8466° N, 75.1042° E  (Soorikumeru / Mani area on NH-75)
// Replace MAP_EMBED_SRC with your exact Google Maps embed URL once you confirm
// the pin in Google Maps: Maps → Share → Embed a map → copy the src value.
// Using Google Maps search embed — resolves to Anfal Restaurant's verified listing on NH 75
// To get your exact embed URL: Google Maps → search "Anfal Restaurant Mani" → Share → Embed a map → copy src
const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.055349484675!2d75.1088657!3d12.839699900000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4a500358965fd%3A0x7bb61236157f0fc9!2sAnfal%20Restaurant!5e0!3m2!1sen!2sin!4v1781075771478!5m2!1sen!2sin'
const MAP_DIRECTIONS = 'https://maps.app.goo.gl/T5GRz39SmfDDzgEL7'
const WHATSAPP_URL   = 'https://wa.me/919380569427'

const contactItems = [
  {
    id:    'address',
    label: 'Our Location',
    lines: [
      'NH 75, Sulthan Bag, Near HP Pump',
      'Soorikumeru, Mani',
    ],
  },
  {
    id:    'phone',
    label: 'Call Us',
    lines: ['+91 93805 69427', '+91 93720 34901'],
    action: null,
    phones: ['+919380569427', '+919372034901'],
  },
  {
    id:    'whatsapp',
    label: 'WhatsApp',
    lines: ['Chat with us directly for quick enquiries and reservations.'],
    action: { label: 'Open WhatsApp →', href: WHATSAPP_URL, external: true },
  },
  {
    id:    'hours',
    label: 'Opening Hours',
    lines: ['Monday – Sunday'],
    hours: '6:00 AM – 11:55 PM',
  },
]

// SVG icons — no emojis
const icons = {
  address: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C6FF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  ),
  phone: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C6FF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.07 2.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  ),
  whatsapp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C6FF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
    </svg>
  ),
  hours: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C6FF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  navigate: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 11 22 2 13 21 11 13 3 11"/>
    </svg>
  ),
}

export default function Contact() {
  const { ref: headerRef, inView: headerIn } = useScrollAnimation(0.1)
  const { ref: leftRef,   inView: leftIn   } = useScrollAnimation(0.08)
  const { ref: rightRef,  inView: rightIn  } = useScrollAnimation(0.08)

  return (
    <section id="contact" className="section-py"
      style={{ backgroundColor: '#0A2E12', position: 'relative', overflow: 'hidden' }}>

      {/* Background texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(198,255,0,0.03) 0%, transparent 70%)',
      }} />

      <div
        className="container"
        style={{
          position: 'relative',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >

        {/* Header */}
        <motion.div
          ref={headerRef}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}
        >
          <motion.span className="label"
            initial={{ opacity: 0, y: 10 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ display: 'block', marginBottom: '14px', fontSize: '13px', }}
          >
            Visit Us
          </motion.span>

          <motion.div className="accent-bar"
            initial={{ scaleX: 0 }}
            animate={headerIn ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ transformOrigin: 'center', margin: '0 auto 20px' }}
          />

          <motion.h2 className="heading-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
            style={{ marginBottom: '16px' }}
          >
            Experience<span style={{ color: '#C6FF00',  }}> Anfal Restaurant</span>
          </motion.h2>

          <motion.p className="body-text"
            initial={{ opacity: 0 }}
            animate={headerIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            style={{ maxWidth: '400px', margin: '0 auto' }}
          >
            We're open every day of the week.<br />Come hungry, leave happy.
          </motion.p>
        </motion.div>

        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(28px, 4vw, 52px)',
          alignItems: 'start',
        }}>

          {/* Left — contact info */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, y: 32 }}
            animate={leftIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {contactItems.map(({ id, label, lines, action, phones, hours }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={leftIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                style={{
                  padding: 'clamp(18px, 2.5vw, 24px)',
                  backgroundColor: '#0D3615',
                  border: '1px solid rgba(198,255,0,0.07)',
                  borderRadius: '14px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  transition: 'border-color 0.25s, transform 0.25s',
                  cursor: 'default',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(198,255,0,0.18)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(198,255,0,0.07)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '38px', height: '38px', flexShrink: 0,
                  borderRadius: '10px',
                  backgroundColor: 'rgba(198,255,0,0.07)',
                  border: '1px solid rgba(198,255,0,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: '1px',
                }}>
                  {icons[id]}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: '11px', fontWeight: 600,
                    color: 'rgba(245,242,236,0.4)',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>
                    {label}
                  </p>

                  {/* Phone — clickable numbers */}
                  {id === 'phone' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {phones.map((p) => (
                        <a key={p} href={`tel:${p}`}
                           style={{
                             fontSize: 'clamp(14px, 1.5vw, 16px)',
                             fontWeight: 500,
                             color: '#F5F2EC',
                             textDecoration: 'none',
                             transition: 'color 0.2s',
                           }}
                           onMouseOver={(e) => e.target.style.color = '#C6FF00'}
                           onMouseOut={(e) => e.target.style.color = '#F5F2EC'}
                        >
                          {p.replace(/^\+?91/, '+91 ').replace(/(\d{5})(\d{5})$/, '$1 $2')}
                        </a>
                      ))}
                    </div>
                  ) : id === 'hours' ? (
                    <div>
                      <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', fontWeight: 500, color: '#F5F2EC' }}>
                        {lines[0]}
                      </p>
                      <p style={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: 'clamp(17px, 2vw, 21px)',
                        fontWeight: 600, color: '#C6FF00',
                        marginTop: '4px',
                      }}>
                        {hours}
                      </p>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        marginTop: '10px',
                        padding: '4px 12px',
                        backgroundColor: 'rgba(198,255,0,0.08)',
                        border: '1px solid rgba(198,255,0,0.15)',
                        borderRadius: '100px',
                        fontSize: '11px', fontWeight: 600,
                        color: '#C6FF00', letterSpacing: '0.06em',
                      }}>
                        <span style={{
                          width: '6px', height: '6px', borderRadius: '50%',
                          backgroundColor: '#C6FF00', display: 'inline-block',
                          animation: 'pulse-dot 2s ease-in-out infinite',
                        }} />
                        Open Today
                      </div>
                    </div>
                  ) : (
                    <div>
                      {lines.map((line, i) => (
                        <p key={i} style={{
                          fontSize: 'clamp(13px, 1.4vw, 15px)',
                          color: 'rgba(245,242,236,0.65)',
                          lineHeight: 1.7,
                        }}>
                          {line}
                        </p>
                      ))}
                      {action && (
                        <a
                          href={action.href}
                          target={action.external ? '_blank' : undefined}
                          rel={action.external ? 'noopener noreferrer' : undefined}
                          style={{
                            display: 'inline-block',
                            marginTop: '10px',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#C6FF00',
                            letterSpacing: '0.03em',
                            transition: 'letter-spacing 0.2s',
                          }}
                          onMouseOver={(e) => e.currentTarget.style.letterSpacing = '0.06em'}
                          onMouseOut={(e) => e.currentTarget.style.letterSpacing = '0.03em'}
                        >
                          {action.label}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — map */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, y: 32 }}
            animate={rightIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >

            {/* ── Map label row ── */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '2px',
            }}>
              <p style={{
                fontSize: '11px', fontWeight: 600,
                color: 'rgba(245,242,236,0.4)',
                letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>
                Location on Map
              </p>
              <a
                href={MAP_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '11px', fontWeight: 600,
                  color: '#C6FF00', letterSpacing: '0.04em',
                  textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '5px',
                  transition: 'opacity 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                Open full map {icons.navigate}
              </a>
            </div>

            {/* ── Map iframe container ── */}
           <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(198,255,0,0.12)',
              position: 'relative',
              aspectRatio: '4/3',
              minHeight: '280px',
              backgroundColor: '#0D3615',
              boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            }}
            className="contact-map"
          >
              {/* Subtle top overlay label — mirrors the reference screenshot style */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2,
                padding: '10px 14px',
                background: 'linear-gradient(180deg, rgba(10,46,18,0.82) 0%, transparent 100%)',
                display: 'flex', alignItems: 'center', gap: '8px',
                pointerEvents: 'none',
              }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '6px',
                  backgroundColor: 'rgba(198,255,0,0.12)',
                  border: '1px solid rgba(198,255,0,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {icons.address}
                </div>
                <span style={{
                  fontSize: '12px', fontWeight: 600, color: '#F5F2EC',
                  letterSpacing: '0.02em',
                }}>
                  Anfal Restaurant
                </span>
                <span style={{
                  fontSize: '11px', color: 'rgba(245,242,236,0.45)',
                  marginLeft: '2px',
                }}>
                  · NH 75, Mani
                </span>
              </div>

              {/* Google Maps embed */}
              <iframe
                src={MAP_EMBED_SRC}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  minHeight: '280px',
                  /* Slight desaturation to blend with the dark theme */
                  filter: 'saturate(0.85) brightness(0.95)',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Anfal Restaurant on Google Maps"
              />
            </div>

            {/* ── Directions CTA button ── */}
            <a
              href={MAP_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '14px 24px',
                backgroundColor: 'rgba(198,255,0,0.06)',
                border: '1px solid rgba(198,255,0,0.15)',
                borderRadius: '12px',
                color: '#C6FF00', fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.04em', textDecoration: 'none',
                transition: 'all 0.25s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#C6FF00'
                e.currentTarget.style.color = '#0A2E12'
                e.currentTarget.style.borderColor = '#C6FF00'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(198,255,0,0.06)'
                e.currentTarget.style.color = '#C6FF00'
                e.currentTarget.style.borderColor = 'rgba(198,255,0,0.15)'
              }}
            >
              {icons.navigate}
              Get Directions on Google Maps
            </a>

            {/* ── Quick info strip ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
            }}>
              {[
                { top: 'On Highway', bottom: 'NH 75, Near HP Pump' },
                { top: 'Easy to Spot', bottom: 'Sulthan Bag, Soorikumeru' },
              ].map(({ top, bottom }) => (
                <div key={top} style={{
                  padding: '12px 14px',
                  backgroundColor: '#0D3615',
                  border: '1px solid rgba(198,255,0,0.07)',
                  borderRadius: '10px',
                }}>
                  <p style={{
                    fontSize: '10px', fontWeight: 600,
                    color: 'rgba(245,242,236,0.35)',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}>
                    {top}
                  </p>
                  <p style={{
                    fontSize: '12px', fontWeight: 500, color: 'rgba(245,242,236,0.7)',
                    lineHeight: 1.4,
                  }}>
                    {bottom}
                  </p>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }

        /* Mobile: stack map below cards, make map taller */
        @media (max-width: 680px) {
          #contact .map-iframe-wrap {
            aspect-ratio: 1 / 1 !important;
            min-height: 320px !important;
          }
        }
      `}</style>
    </section>
  )
}