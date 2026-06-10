const QR_MENU_URL = 'https://anfal-qr-menu.vercel.app'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      backgroundColor: '#071F0A',
      borderTop: '1px solid rgba(198,255,0,0.07)',
    }}>
      {/* Main footer */}
      <div className="container" style={{ paddingTop: 'clamp(48px, 6vw, 72px)', paddingBottom: 'clamp(40px, 5vw, 60px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 'clamp(32px, 4vw, 56px)',
          marginBottom: 'clamp(40px, 5vw, 56px)',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <img src="/images/logo/logo.png" alt="Anfal"
                 style={{ height: '40px', width: 'auto', marginBottom: '16px', objectFit: 'contain' }}
                 onError={(e) => { e.target.style.display = 'none' }} />
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: 700, color: '#F5F2EC', marginBottom: '8px' }}>
              Anfal Restaurant
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(245,242,236,0.4)', lineHeight: 1.7, fontStyle: 'italic', maxWidth: '220px' }}>
              A World of Flavors in Your Hands
            </p>
            {/* WhatsApp CTA */}
            <a href="https://wa.me/919380569427" target="_blank" rel="noopener noreferrer"
               style={{
                 display: 'inline-flex', alignItems: 'center', gap: '6px',
                 marginTop: '20px', padding: '9px 16px',
                 backgroundColor: 'rgba(198,255,0,0.08)',
                 border: '1px solid rgba(198,255,0,0.2)',
                 borderRadius: '6px', color: '#C6FF00',
                 fontSize: '12px', fontWeight: 600,
                 letterSpacing: '0.04em', textDecoration: 'none',
                 transition: 'all 0.2s',
               }}
               onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#C6FF00'; e.currentTarget.style.color = '#0A2E12' }}
               onMouseOut={(e)  => { e.currentTarget.style.backgroundColor = 'rgba(198,255,0,0.08)'; e.currentTarget.style.color = '#C6FF00' }}
            >
              WhatsApp Us
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#C6FF00', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Navigate
            </h4>
            {[
              { label: 'Home',        href: '#hero'        },
              { label: 'About',       href: '#about'       },
              { label: 'Cuisine',     href: '#cuisines'    },
              { label: 'Gallery',     href: '#gallery'     },
              { label: 'Reviews',     href: '#reviews'     },
              { label: 'Contact',     href: '#contact'     },
              { label: 'View Menu',   href: QR_MENU_URL, external: true },
            ].map(({ label, href, external }) => (
              <a key={label} href={href}
                 target={external ? '_blank' : undefined}
                 rel={external ? 'noopener noreferrer' : undefined}
                 style={{ display: 'block', fontSize: '13px', color: 'rgba(245,242,236,0.45)', marginBottom: '11px', transition: 'color 0.2s' }}
                 onMouseOver={(e) => e.target.style.color = '#C6FF00'}
                 onMouseOut={(e)  => e.target.style.color = 'rgba(245,242,236,0.45)'}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#C6FF00', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Contact
            </h4>
            <p style={{ fontSize: '13px', color: 'rgba(245,242,236,0.45)', lineHeight: 1.7, marginBottom: '12px' }}>
              NH 75, Sulthan Bag,<br />Soorikumeru, Mani
            </p>
            {[
              { label: '+91 93805 69427', href: 'tel:+919380569427'  },
              { label: '+91 93720 34901', href: 'tel:+919372034901'  },
            ].map(({ label, href }) => (
              <a key={href} href={href}
                 style={{ display: 'block', fontSize: '13px', color: 'rgba(245,242,236,0.45)', marginBottom: '6px', transition: 'color 0.2s' }}
                 onMouseOver={(e) => e.target.style.color = '#C6FF00'}
                 onMouseOut={(e)  => e.target.style.color = 'rgba(245,242,236,0.45)'}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#C6FF00', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Hours
            </h4>
            <p style={{ fontSize: '13px', color: 'rgba(245,242,236,0.45)', lineHeight: 1.7 }}>
              Open Every Day
            </p>
            <p style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(245,242,236,0.75)', marginTop: '4px' }}>
              6:00 AM – 11:55 PM
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              marginTop: '12px', padding: '5px 12px',
              backgroundColor: 'rgba(198,255,0,0.08)',
              borderRadius: '100px',
              fontSize: '11px', color: '#C6FF00', fontWeight: 600,
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C6FF00', display: 'inline-block' }} />
              Open Now
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Bottom */}
        <div style={{
          paddingTop: '20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '12px', color: 'rgba(245,242,236,0.25)' }}>
            © {year} Anfal Restaurant. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(245,242,236,0.2)' }}>
            Crafted with care
          </p>
        </div>
      </div>
    </footer>
  )
}