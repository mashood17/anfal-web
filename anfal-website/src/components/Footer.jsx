const QR_MENU_URL = 'https://anfal-qr-menu.vercel.app'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      backgroundColor: '#071F0A',
      borderTop: '1px solid rgba(198,255,0,0.08)',
      padding: 'clamp(32px, 5vw, 56px) 20px 24px',
    }}>
      <div className="section-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}>
          {/* Brand */}
          <div>
            <img
              src="/images/logo/logo.png"
              alt="Anfal"
              style={{ height: '44px', width: 'auto', marginBottom: '16px', objectFit: 'contain' }}
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: 700, color: '#F5F2EC', marginBottom: '8px' }}>
              Anfal Restaurant
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(245,242,236,0.45)', lineHeight: 1.6, fontStyle: 'italic' }}>
              A World of Flavors in Your Hands
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#C6FF00', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Quick Links
            </h4>
            {[
              { label: 'About Us',  href: '#about'   },
              { label: 'Cuisine',   href: '#cuisine'  },
              { label: 'Gallery',   href: '#gallery'  },
              { label: 'Reviews',   href: '#reviews'  },
              { label: 'Contact',   href: '#contact'  },
              { label: 'View Menu', href: QR_MENU_URL, external: true },
            ].map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'block',
                  fontSize: '13px',
                  color: 'rgba(245,242,236,0.5)',
                  textDecoration: 'none',
                  marginBottom: '10px',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => e.target.style.color = '#C6FF00'}
                onMouseOut={(e) => e.target.style.color = 'rgba(245,242,236,0.5)'}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#C6FF00', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Contact
            </h4>
            <p style={{ fontSize: '13px', color: 'rgba(245,242,236,0.5)', lineHeight: 1.7 }}>
              NH 75, Sulthan Bag,<br />
              Soorikumeru, Mani
            </p>
            <a href="tel:+919037154400" style={{ display: 'block', marginTop: '12px', fontSize: '13px', color: 'rgba(245,242,236,0.5)', textDecoration: 'none' }}
               onMouseOver={(e) => e.target.style.color = '#C6FF00'}
               onMouseOut={(e) => e.target.style.color = 'rgba(245,242,236,0.5)'}
            >
              +91 90371 54400
            </a>
            <a href="https://wa.me/919037154400" target="_blank" rel="noopener noreferrer"
               style={{ display: 'block', marginTop: '6px', fontSize: '13px', color: '#C6FF00', textDecoration: 'none' }}>
              WhatsApp →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(198,255,0,0.06)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontSize: '12px', color: 'rgba(245,242,236,0.3)' }}>
            © {year} Anfal Restaurant. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(245,242,236,0.2)' }}>
            Built with care
          </p>
        </div>
      </div>
    </footer>
  )
}