import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence }           from 'framer-motion'
import { useActiveSection }                  from '@/hooks/useActiveSection'

const LINKS = [
  { label: 'Home',       href: '#hero'          },
  { label: 'About',      href: '#about'         },
  { label: 'Cuisine',    href: '#cuisines'      },
  { label: 'Gallery',    href: '#gallery'       },
  { label: 'Reviews',    href: '#reviews'       },
  { label: 'Contact',    href: '#contact'       },
]

const SECTION_IDS  = ['hero', 'about', 'cuisines', 'gallery', 'reviews', 'contact']
const QR_MENU_URL  = 'https://anfal-qr-menu.vercel.app'

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const activeSection               = useActiveSection(SECTION_IDS)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
        window.removeEventListener('resize', handleResize)
    }
    }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLink = useCallback((e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const isActive = (href) => activeSection === href.replace('#', '')

  return (
    <>
      {/* ── Desktop / tablet bar ── */}
      <header
        style={{
          position:        'fixed',
          top:             0, left: 0, right: 0,
          zIndex:          200,
          height:          scrolled ? '72px' : '90px',
          backgroundColor: scrolled ? 'rgba(10,46,18,0.94)' : 'transparent',
          backdropFilter:  scrolled ? 'blur(16px)'           : 'none',
          borderBottom:    scrolled ? '1px solid rgba(198,255,0,0.07)' : 'none',
          transition:      'all 0.35s ease',
          display:         'flex',
          alignItems:      'center',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLink(e, '#hero')}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                textDecoration: 'none',
            }}
            >
            <img src="/images/logo/logo.jpg" alt="Anfal"
                 style={{ height: '52px', width: '52px',objectFit: 'contain', }}
                 onError={(e) => { e.target.style.display = 'none' }} />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    lineHeight: 1,
                }}
                >
                <span
                    style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '30px',
                    fontWeight: 600,
                    color: '#F5F2EC',
                    letterSpacing: '-0.03em',
                    }}
                >
                    Anfal
                </span>

                <span
                    style={{
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.25em',
                    color: '#C6FF00',
                    marginTop: '4px',
                    }}
                >
                    Restaurant
                </span>
                </div>
          </a>

          {/* Desktop links */}
          {!isMobile && (
          <nav className="flex items-center gap-7">
            {LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleLink(e, href)}
                style={{
                  position:    'relative',
                  fontSize:    '13px',
                  fontWeight:  isActive(href) ? 600 : 400,
                  color:       isActive(href) ? '#C6FF00' : 'rgba(245,242,236,0.65)',
                  letterSpacing: '0.03em',
                  transition:  'color 0.2s',
                  paddingBottom: '2px',
                }}
                onMouseOver={(e) => { if (!isActive(href)) e.currentTarget.style.color = '#F5F2EC' }}
                onMouseOut={(e)  => { if (!isActive(href)) e.currentTarget.style.color = 'rgba(245,242,236,0.65)' }}
              >
                {label}
                {isActive(href) && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{
                      position: 'absolute', bottom: '-4px', left: 0, right: 0,
                      height: '1.5px', background: '#C6FF00', borderRadius: '1px',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </a>
            ))}
          </nav>
          )}

          {/* Desktop CTA + hamburger */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '8px' : '12px'
            }}
          >
            <a
              href={QR_MENU_URL}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? '10px 16px' : '12px 28px',
                borderRadius: '999px',
                background: '#C6FF00',
                color: '#071F0A',
                fontSize: isMobile ? '11px' : '13px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textDecoration: 'none',
                transition: 'all 0.35s ease',
                whiteSpace: 'nowrap',
              }}
            >
              View Menu →
            </a>

            {/* Hamburger */}
            {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex"
              aria-label="Toggle navigation"
              style={{
                width: '40px', height: '40px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '5px', background: 'none', border: 'none',
                cursor: 'pointer', padding: '4px',
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{
                    rotate:      menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                    translateY:  menuOpen ? (i === 0 ? 10 : i === 2 ? -10 : 0) : 0,
                    opacity:     menuOpen && i === 1 ? 0 : 1,
                    width:       menuOpen ? '22px' : i === 1 ? '16px' : '22px',
                  }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: 'block',
                    height: '1.5px',
                    background: '#F5F2EC',
                    borderRadius: '1px',
                    transformOrigin: 'center',
                  }}
                />
              ))}
            </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)'   }}
            exit={{   opacity: 0, clipPath: 'inset(0 0 100% 0)'  }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0,
              zIndex: 199,
              background: 'rgba(6,18,10,0.55)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
              display: 'flex', flexDirection: 'column',
              borderLeft: '1px solid rgba(255,255,255,0.06)',
              alignItems: 'center', justifyContent: 'center', paddingTop: '0',
              gap: '18px',
              paddingBottom: '40px',
            }}
          >
            {LINKS.map(({ label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                onClick={(e) => handleLink(e, href)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
                style={{
                    width: '240px',
                    textAlign: 'center',
                    padding: '14px 20px',
                    borderRadius: '16px',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '26px',
                    fontWeight: 600,
                    textShadow: '0 2px 12px rgba(0,0,0,0.25)',
                    letterSpacing: '-0.02em',
                    color: isActive(href)
                        ? '#C6FF00'
                        : 'rgba(245,242,236,0.85)',
                    
                    transition: 'all 0.3s ease',
                    }}
                onMouseOver={(e) => e.currentTarget.style.color = '#C6FF00'}
                onMouseOut={(e)  => e.currentTarget.style.color = isActive(href) ? '#C6FF00' : 'rgba(245,242,236,0.7)'}
                whileTap={{scale: 0.97,}}
              >
                {label}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ delay: 0.5, duration: 0.35 }}
              style={{ marginTop: '24px' }}
            >
              <a href={QR_MENU_URL} target="_blank" rel="noopener noreferrer"
                 style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 28px',
                    borderRadius: '999px',
                    background: '#C6FF00',
                    color: '#071F0A',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    border: 'none',
                    textDecoration: 'none',
                    transition: 'all 0.35s ease',
                    }}
                    onClick={() => setMenuOpen(false)}>
                View Menu →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}