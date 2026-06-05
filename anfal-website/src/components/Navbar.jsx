import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Cuisine',  href: '#cuisine'  },
  { label: 'Gallery',  href: '#gallery'  },
  { label: 'Reviews',  href: '#reviews'  },
  { label: 'Contact',  href: '#contact'  },
]

const QR_MENU_URL = 'https://anfal-qr-menu.vercel.app'

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [activeLink,  setActiveLink]  = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    setActiveLink(href)
  }

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 100,
          backgroundColor: scrolled
            ? 'rgba(10,46,18,0.96)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(198,255,0,0.08)'
            : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          className="section-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: scrolled ? '64px' : '76px',
            transition: 'height 0.3s ease',
          }}
        >
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img
              src="/images/logo/logo.png"
              alt="Anfal Restaurant"
              style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <span style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '18px',
              fontWeight: 700,
              color: '#F5F2EC',
              letterSpacing: '-0.01em',
            }}>
              Anfal
            </span>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}
               className="hidden md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => handleNavClick(href)}
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: activeLink === href ? '#C6FF00' : 'rgba(245,242,236,0.75)',
                  textDecoration: 'none',
                  letterSpacing: '0.03em',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => e.target.style.color = '#C6FF00'}
                onMouseOut={(e) => e.target.style.color = activeLink === href ? '#C6FF00' : 'rgba(245,242,236,0.75)'}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href={QR_MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden md:inline-flex"
              style={{ padding: '10px 20px', fontSize: '13px' }}
            >
              View Menu
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
              style={{
                background: 'none', border: 'none',
                color: '#F5F2EC', cursor: 'pointer',
                padding: '4px', fontSize: '22px',
                display: 'flex', alignItems: 'center',
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '64px', left: 0, right: 0,
              zIndex: 99,
              backgroundColor: 'rgba(10,46,18,0.98)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(198,255,0,0.1)',
              padding: '16px 20px 24px',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => handleNavClick(href)}
                  style={{
                    padding: '12px 16px',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'rgba(245,242,236,0.85)',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    transition: 'all 0.15s',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(198,255,0,0.08)'; e.currentTarget.style.color = '#C6FF00' }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'rgba(245,242,236,0.85)' }}
                >
                  {label}
                </a>
              ))}
              <div style={{ paddingTop: '12px', paddingLeft: '16px' }}>
                <a
                  href={QR_MENU_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ width: 'fit-content' }}
                >
                  View Menu
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}