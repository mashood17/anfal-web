import { motion }            from 'framer-motion'
import { useEffect, useState } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

function useBreakpoint(bp = 768) {
  const [below, setBelow] = useState(
    typeof window !== 'undefined' ? window.innerWidth < bp : false
  )
  useEffect(() => {
    const fn = () => setBelow(window.innerWidth < bp)
    window.addEventListener('resize', fn, { passive: true })
    return () => window.removeEventListener('resize', fn)
  }, [bp])
  return below
}

const STATS = [
  { val: '3',      label: 'Cuisine Types'  },
  { val: '50+',    label: 'Menu Items'     },
  { val: '7 Days', label: 'Open Every Day' },
]

const CUISINES = ['Arabian', 'Indian', 'Chinese']

export default function About() {
  const { ref: leftRef,  inView: leftIn  } = useScrollAnimation()
  const { ref: rightRef, inView: rightIn } = useScrollAnimation()
  const isMobile = useBreakpoint(768)

  return (
    <section
      id="about"
      style={{
        background: 'linear-gradient(180deg, #071A09 0%, #0B2810 100%)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop:    'clamp(64px, 8vw, 100px)',
        paddingBottom: 'clamp(64px, 8vw, 100px)',
      }}
    >
      {/* Ambient glow — right side */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 60% at 100% 50%, rgba(198,255,0,0.04) 0%, transparent 65%)',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft:  'clamp(20px, 5vw, 80px)',
        paddingRight: 'clamp(20px, 5vw, 80px)',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '46% 1fr',
          gridTemplateAreas: isMobile ? '"text" "image"' : '"image text"',
          gap: isMobile ? '0' : 'clamp(48px, 6vw, 88px)',
          alignItems: 'center',
        }}>

          {/* ── Image column ─────────────────────────────────────────── */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -28 }}
            animate={leftIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
            style={{ gridArea: 'image', position: 'relative' }}
          >
            {/* Main photo */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              aspectRatio: isMobile ? '4/3' : '3/4',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 24px 56px rgba(0,0,0,0.5)',
            }}>
              <img
                src="/images/about/about.jpg"
                alt="Anfal Restaurant interior"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="750"%3E%3Crect width="600" height="750" fill="%230D3615"/%3E%3C/svg%3E'
                }}
              />
            </div>

            {/* Established card — bottom-right of image */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={leftIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.45 }}
              style={{
                position: 'absolute',
                bottom: isMobile ? '-1px' : '-20px',
                right:  isMobile ? '16px' : '-20px',
                backgroundColor: '#C6FF00',
                borderRadius: '12px',
                padding: isMobile ? '14px 18px' : '20px 26px',
                boxShadow: '0 16px 36px rgba(0,0,0,0.4)',
                textAlign: 'center',
                minWidth: isMobile ? '90px' : '110px',
              }}
            >
              <p style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: isMobile ? '26px' : '32px',
                fontWeight: 700,
                color: '#071A09',
                lineHeight: 1,
              }}>
                2026
              </p>
              <p style={{
                fontSize: '9px', fontWeight: 700,
                color: 'rgba(7,26,9,0.55)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginTop: '5px',
              }}>
                Established
              </p>
            </motion.div>

            {/* Thin vertical accent line — desktop only */}
            {!isMobile && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={leftIn ? { scaleY: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  position: 'absolute',
                  top: '10%', left: '-24px',
                  width: '2px', height: '40%',
                  background: 'linear-gradient(180deg, transparent 0%, #C6FF00 40%, transparent 100%)',
                  transformOrigin: 'top',
                  borderRadius: '2px',
                }}
              />
            )}
          </motion.div>

          {/* ── Text column ──────────────────────────────────────────── */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: isMobile ? 0 : 28, y: isMobile ? 20 : 0 }}
            animate={rightIn ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{
              gridArea: 'text',
              paddingTop: isMobile ? 'clamp(40px, 6vw, 56px)' : '0',
            }}
          >
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <span style={{
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: '#C6FF00',
              }}>
                Our Story
              </span>
              <div style={{ flex: 1, maxWidth: '48px', height: '1px', backgroundColor: 'rgba(198,255,0,0.3)' }} />
            </div>

            {/* Headline */}
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(30px, 4vw, 48px)',
              fontWeight: 700,
              color: '#F5F2EC',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              marginBottom: '24px',
            }}>
              Crafted with Passion,<br />
              <span style={{ color: '#C6FF00', fontStyle: 'italic' }}>Served with Pride</span>
            </h2>

            {/* Body copy */}
            <p style={{
              fontSize: 'clamp(13px, 1.4vw, 15px)',
              color: 'rgba(245,242,236,0.55)',
              lineHeight: 1.85,
              marginBottom: '16px',
            }}>
              Born from a deep love for authentic flavors and genuine hospitality,
              Anfal Restaurant sits on NH 75, Soorikumeru — a destination for families,
              food lovers, and everyone who believes a great meal is one of life's finest pleasures.
            </p>
            <p style={{
              fontSize: 'clamp(13px, 1.4vw, 15px)',
              color: 'rgba(245,242,236,0.55)',
              lineHeight: 1.85,
              marginBottom: '32px',
            }}>
              Our chefs bring decades of culinary expertise, using time-honored recipes and
              the freshest local ingredients — whether it's our slow-cooked Mandi, fragrant
              Biriyani, or perfectly grilled Al Faham.
            </p>

            {/* Cuisine pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '36px' }}>
              {CUISINES.map((c) => (
                <CuisinePill key={c} label={c} />
              ))}
            </div>

            {/* Divider */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, rgba(198,255,0,0.15) 0%, transparent 100%)',
              marginBottom: '32px',
            }} />

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0',
            }}>
              {STATS.map(({ val, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={rightIn ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.35 + i * 0.07 }}
                  style={{
                    paddingRight: i < STATS.length - 1 ? 'clamp(16px, 2vw, 28px)' : '0',
                    borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    paddingLeft: i > 0 ? 'clamp(16px, 2vw, 28px)' : '0',
                  }}
                >
                  <p style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 'clamp(22px, 2.8vw, 32px)',
                    fontWeight: 700,
                    color: '#C6FF00',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}>
                    {val}
                  </p>
                  <p style={{
                    fontSize: '11px',
                    color: 'rgba(245,242,236,0.35)',
                    letterSpacing: '0.06em',
                    lineHeight: 1.4,
                  }}>
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

/* ─── Cuisine pill ───────────────────────────────────────────────────────── */
function CuisinePill({ label }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '6px 16px',
        borderRadius: '100px',
        border: `1px solid ${hovered ? 'rgba(198,255,0,0.4)' : 'rgba(198,255,0,0.18)'}`,
        backgroundColor: hovered ? 'rgba(198,255,0,0.08)' : 'transparent',
        fontSize: '11px', fontWeight: 600,
        color: hovered ? '#C6FF00' : 'rgba(198,255,0,0.7)',
        letterSpacing: '0.07em',
        transition: 'all 0.2s',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      {label}
    </span>
  )
}