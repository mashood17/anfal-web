import { useRef, useState, useEffect, useCallback } from 'react'
import { motion }             from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { reviews }            from '@/data/reviews'

const GOOGLE_URL = 'https://share.google/zqOBWNe619tSG5G2I'
const GAP = 16

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

export default function Reviews() {
  const trackRef        = useRef(null)
  const { ref, inView } = useScrollAnimation(0.08)
  const isMobile        = useBreakpoint(768)
  const [dragging, setDragging] = useState(false)

  const onMouseDown = useCallback((e) => {
    const el = trackRef.current
    if (!el) return
    let startX  = e.pageX - el.offsetLeft
    let scrollL = el.scrollLeft
    setDragging(false)
    const move = (ev) => {
      const dx = ev.pageX - el.offsetLeft - startX
      if (Math.abs(dx) > 4) setDragging(true)
      el.scrollLeft = scrollL - dx
    }
    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      setTimeout(() => setDragging(false), 50)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }, [])

  const scroll = (dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('.r-card')
    const w    = card ? card.offsetWidth + GAP : 360
    el.scrollBy({ left: dir * w * 2, behavior: 'smooth' })
  }

  return (
    <section
      id="reviews"
      style={{
        backgroundColor: '#07200A',
        position: 'relative',
        overflow: 'hidden',
        paddingTop:    'clamp(64px, 8vw, 100px)',
        paddingBottom: 'clamp(64px, 8vw, 100px)',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 35% at 15% 50%, rgba(198,255,0,0.04) 0%, transparent 70%)',
      }} />

      <div ref={ref} style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div style={{
          paddingLeft:  'clamp(20px, 5vw, 80px)',
          paddingRight: 'clamp(20px, 5vw, 80px)',
          marginBottom: 'clamp(36px, 4vw, 52px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <div>
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
              Guest Experiences
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

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12 }}
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(30px, 4.5vw, 52px)',
                fontWeight: 700,
                color: '#F5F2EC',
                lineHeight: 1.1,
                marginBottom: '14px',
                letterSpacing: '-0.01em',
              }}
            >
              What Our
              <span style={{ color: '#C6FF00', }}> Guests Say</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.18 }}
              style={{
                fontSize: 'clamp(13px, 1.4vw, 15px)',
                color: 'rgba(245,242,236,0.45)',
                maxWidth: '360px',
                lineHeight: 1.7,
              }}
            >
              Flavors, hospitality, and memories<br />from those who've dined with us.
            </motion.p>
          </div>

          {/* Desktop arrows */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.25 }}
              style={{ display: 'flex', gap: '10px', flexShrink: 0 }}
            >
              <NavBtn onClick={() => scroll(-1)} label="Previous"><ChevLeft /></NavBtn>
              <NavBtn onClick={() => scroll(1)}  label="Next"><ChevRight /></NavBtn>
            </motion.div>
          )}
        </div>

        {/* ── Carousel ───────────────────────────────────────────────────── */}
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          style={{
            display: 'flex',
            gap: `${GAP}px`,
            overflowX: 'auto',
            overflowY: 'visible',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            paddingLeft:   'clamp(20px, 5vw, 80px)',
            paddingRight:  'clamp(20px, 5vw, 80px)',
            paddingTop:    '8px',
            paddingBottom: '12px',
            cursor: dragging ? 'grabbing' : 'grab',
            userSelect: 'none',
          }}
        >
          {reviews.map((r, i) => (
            <ReviewCard key={r.id} review={r} index={i} inView={inView} isMobile={isMobile} />
          ))}
        </div>

        {/* Mobile swipe hint */}
        {isMobile && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            style={{
              fontSize: '10px', letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(245,242,236,0.22)',
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            Swipe to explore
          </motion.p>
        )}

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{
            textAlign: 'center',
            marginTop: 'clamp(36px, 4vw, 52px)',
            paddingLeft:  'clamp(20px, 5vw, 80px)',
            paddingRight: 'clamp(20px, 5vw, 80px)',
          }}
        >
          {/* Google rating badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 18px',
            backgroundColor: 'rgba(198,255,0,0.05)',
            border: '1px solid rgba(198,255,0,0.12)',
            borderRadius: '100px',
            marginBottom: '20px',
          }}>
            <GoogleIcon />
            <span style={{
              fontSize: '12px', fontWeight: 600,
              color: 'rgba(245,242,236,0.6)',
              letterSpacing: '0.04em',
            }}>
              Rated on Google Reviews
            </span>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
          </div>

          <br />

          <a
            href={GOOGLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              backgroundColor: 'transparent',
              border: '1px solid rgba(198,255,0,0.25)',
              borderRadius: '100px',
              color: '#C6FF00',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.25s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#C6FF00'
              e.currentTarget.style.color = '#07200A'
              e.currentTarget.style.borderColor = '#C6FF00'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#C6FF00'
              e.currentTarget.style.borderColor = 'rgba(198,255,0,0.25)'
            }}
          >
            See All Google Reviews
            <ChevRight />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Review Card ────────────────────────────────────────────────────────── */
function ReviewCard({ review: r, index, inView, isMobile }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="r-card"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: Math.min(index * 0.07, 0.35) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: isMobile ? '85vw' : 'clamp(300px, 28vw, 380px)',
        padding: 'clamp(22px, 2.5vw, 32px)',
        backgroundColor: '#0B2D10',
        border: `1px solid ${hovered ? 'rgba(198,255,0,0.18)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        transition: 'border-color 0.3s, transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 44px rgba(0,0,0,0.45)'
          : '0 4px 20px rgba(0,0,0,0.25)',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      {/* Top row: stars + verified */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '3px' }}>
          {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '3px 9px',
          backgroundColor: 'rgba(198,255,0,0.06)',
          border: '1px solid rgba(198,255,0,0.1)',
          borderRadius: '100px',
        }}>
          <GoogleIcon size={10} />
          <span style={{
            fontSize: '9px', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'rgba(245,242,236,0.4)',
          }}>
            Verified
          </span>
        </div>
      </div>

      {/* Quote mark + text */}
      <div style={{ flex: 1, position: 'relative' }}>
        <span style={{
          position: 'absolute', top: '-8px', left: '-4px',
          fontFamily: '"Playfair Display", serif',
          fontSize: '48px', lineHeight: 1,
          color: 'rgba(198,255,0,0.12)',
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          "
        </span>
        <p style={{
          paddingTop: '18px',
          fontSize: 'clamp(13px, 1.3vw, 14px)',
          color: 'rgba(245,242,236,0.7)',
          lineHeight: 1.8,
          fontStyle: 'italic',
        }}>
          {r.text}
        </p>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, rgba(198,255,0,0.12) 0%, transparent 100%)',
      }} />

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '38px', height: '38px',
          borderRadius: '50%',
          backgroundColor: 'rgba(198,255,0,0.08)',
          border: '1px solid rgba(198,255,0,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '12px', fontWeight: 700,
          color: '#C6FF00', flexShrink: 0,
          letterSpacing: '0.02em',
        }}>
          {r.avatar}
        </div>
        <div>
          <p style={{
            fontSize: '13px', fontWeight: 600,
            color: '#F5F2EC', lineHeight: 1.3,
          }}>
            {r.name}
          </p>
          <p style={{
            fontSize: '11px',
            color: 'rgba(245,242,236,0.3)',
            marginTop: '3px',
            letterSpacing: '0.03em',
          }}>
            {r.date}
          </p>
        </div>
      </div>
    </motion.div>
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
        color: hovered ? '#07200A' : '#C6FF00',
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

/* ─── Icons ──────────────────────────────────────────────────────────────── */
function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" fill="#C6FF00">
      <path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.19.53 3.11L6 8l-2.78 1.5.53-3.11L1.5 4.2l3.15-.47L6 1z"/>
    </svg>
  )
}
function GoogleIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
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