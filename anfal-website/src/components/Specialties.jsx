import { useState, useEffect }      from 'react'
import { motion, AnimatePresence }  from 'framer-motion'
import { useScrollAnimation }       from '@/hooks/useScrollAnimation'
import { specialties }              from '@/data/specialties'
import { useSwipeable }             from 'react-swipeable'

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

export default function Specialties() {
  const [active, setActive] = useState(0)
  const [dir, setDir]       = useState(1)
  const { ref, inView }     = useScrollAnimation(0.08)
  const isMobile            = useBreakpoint(768)

  const goTo = (idx) => {
    setDir(idx > active ? 1 : -1)
    setActive(idx)
  }
  const prev = () => goTo(active === 0 ? specialties.length - 1 : active - 1)
  const next = () => goTo(active === specialties.length - 1 ? 0 : active + 1)

  const handlers = useSwipeable({
    onSwipedLeft:  next,
    onSwipedRight: prev,
    preventScrollOnSwipe: true,
    trackMouse: false,
    delta: 40,
  })

  const item = specialties[active]

  const imgVariants = {
    enter:  (d) => ({ opacity: 0, scale: 1.06, x: d > 0 ? 30 : -30 }),
    center: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    exit:   { opacity: 0, scale: 0.97, transition: { duration: 0.3 } },
  }

  const txtVariants = {
    enter:  { opacity: 0, y: 14 },
    center: { opacity: 1, y: 0,  transition: { duration: 0.4, ease: 'easeOut' } },
    exit:   { opacity: 0, y: -10, transition: { duration: 0.25 } },
  }

  return (
    <section
      id="specialties"
      style={{
        backgroundColor: '#071A09',
        position: 'relative',
        overflow: 'hidden',
        paddingTop:    'clamp(64px, 8vw, 100px)',
        paddingBottom: 'clamp(64px, 8vw, 100px)',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 60% 60%, rgba(198,255,0,0.04) 0%, transparent 65%)',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft:  'clamp(20px, 5vw, 80px)',
        paddingRight: 'clamp(20px, 5vw, 80px)',
        position: 'relative', zIndex: 1,
      }}>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div ref={ref} style={{ marginBottom: 'clamp(40px, 5vw, 60px)' }}>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: 'block',
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#C6FF00', marginBottom: '14px',
            }}
          >
            Chef's Selection
          </motion.span>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.08 }}
            style={{
              width: '32px', height: '2px',
              backgroundColor: '#C6FF00',
              transformOrigin: 'left',
              marginBottom: '18px',
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              alignItems: 'flex-start',
            }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12 }}
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(32px, 4.5vw, 52px)',
                fontWeight: 700,
                color: '#F5F2EC',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              Our{' '}
              <span style={{ color: '#C6FF00'}}>Specialties</span>
            </motion.h2>

           <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            style={{
              fontSize: 'clamp(13px, 1.4vw, 15px)',
              color: 'rgba(245,242,236,0.45)',
              maxWidth: isMobile ? '100%' : '420px',
              lineHeight: 1.8,
              marginTop: isMobile ? '4px' : '0',
            }}
            >
            Signature dishes crafted by our chefs — each one a story
            of authentic flavours and premium ingredients.
            </motion.p> 
          </div>
        </div>

        {/* ── Showcase card ───────────────────────────────────────────────── */}
        <motion.div
          {...(isMobile ? handlers : {})}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '45% 55%',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
            minHeight: isMobile ? 'auto' : '500px',
          }}
        >

          {/* ── Image panel ── */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#04100519',
            aspectRatio: isMobile ? '4/3' : 'auto',
            minHeight: isMobile ? '260px' : 'auto',
          }}>
            <AnimatePresence custom={dir} mode="wait">
              <motion.img
                key={item.id + '-img'}
                custom={dir}
                variants={imgVariants}
                initial="enter"
                animate="center"
                exit="exit"
                src={item.image}
                alt={item.name}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="500"%3E%3Crect width="600" height="500" fill="%230D3615"/%3E%3C/svg%3E'
                }}
              />
            </AnimatePresence>

            {/* Dark vignette over photo */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, transparent 40%, rgba(0,0,0,0.35) 100%)',
            }} />

            {/* Tag — pill style */}
            <div style={{
              position: 'absolute',
              top: '18px', left: '18px',
              padding: '5px 13px',
              backgroundColor: 'rgba(198,255,0,0.92)',
              backdropFilter: 'blur(4px)',
              borderRadius: '100px',
              fontSize: '9px', fontWeight: 800,
              letterSpacing: '0.13em', textTransform: 'uppercase',
              color: '#071A09',
            }}>
              {item.tag}
            </div>

            {/* Mobile swipe hint */}
            {isMobile && (
              <div style={{
                position: 'absolute', bottom: '14px', right: '14px',
                display: 'flex', gap: '6px',
              }}>
                {specialties.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => goTo(i)}
                    style={{
                      width: i === active ? '20px' : '6px',
                      height: '6px',
                      borderRadius: '3px',
                      backgroundColor: i === active ? '#C6FF00' : 'rgba(255,255,255,0.35)',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── Content panel ── */}
          <div style={{
            background: 'linear-gradient(160deg, #0D3314 0%, #081E0B 100%)',
            padding: 'clamp(28px, 4vw, 52px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '24px',
          }}>

            {/* Counter + dots row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Dots */}
              
              <span style={{
                fontSize: '11px',
                color: 'rgba(245,242,236,0.3)',
                letterSpacing: '0.06em',
                marginLeft: '4px',
              }}>
                {String(active + 1).padStart(2, '0')} / {String(specialties.length).padStart(2, '0')}
              </span>
            </div>

            {/* Animated text block */}
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id + '-txt'}
                variants={txtVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ flex: 1 }}
              >
                <h3 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(22px, 2.8vw, 34px)',
                  fontWeight: 700,
                  color: '#F5F2EC',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  marginBottom: '16px',
                }}>
                  {item.name}
                </h3>

                {/* Thin rule under name */}
                <div style={{
                  width: '36px', height: '1px',
                  background: 'linear-gradient(90deg, #C6FF00 0%, transparent 100%)',
                  marginBottom: '18px',
                }} />

                <p style={{
                  fontSize: 'clamp(13px, 1.3vw, 15px)',
                  color: 'rgba(245,242,236,0.52)',
                  lineHeight: 1.85,
                  marginBottom: '28px',
                }}>
                  {item.desc}
                </p>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{
                    fontSize: '11px', fontWeight: 600,
                    color: 'rgba(245,242,236,0.3)',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>
                    Starting from
                  </span>
                  <span style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 'clamp(22px, 2.5vw, 30px)',
                    fontWeight: 700,
                    color: '#C6FF00',
                    lineHeight: 1,
                  }}>
                    {item.price}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next — desktop */}
            {!isMobile && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <NavBtn onClick={prev} label="Previous"><ChevLeft /></NavBtn>
                <NavBtn onClick={next} label="Next"><ChevRight /></NavBtn>
              </div>
            )}

            
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Nav Button ─────────────────────────────────────────────────────────── */
function NavBtn({ onClick, children, label }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '44px', height: '44px', borderRadius: '50%',
        border: `1px solid ${hovered ? '#C6FF00' : 'rgba(198,255,0,0.2)'}`,
        backgroundColor: hovered ? '#C6FF00' : 'transparent',
        color: hovered ? '#071A09' : '#C6FF00',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.22s',
        outline: 'none',
      }}
    >
      {children}
    </button>
  )
}

function ChevLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function ChevRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}