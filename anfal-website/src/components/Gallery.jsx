import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence }  from 'framer-motion'
import Lightbox                     from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { useScrollAnimation }       from '@/hooks/useScrollAnimation'
import { galleryImages }            from '@/data/gallery'

/* ─── tiny hook: track window width ─────────────────────────────────────── */
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

export default function Gallery() {
  const trackRef          = useRef(null)
  const [lightboxIdx, setLightboxIdx] = useState(-1)
  const [dragging, setDragging]       = useState(false)
  const isMobile                      = useBreakpoint(768)
  const { ref, inView }               = useScrollAnimation(0.08)

  /* ── drag-to-scroll (desktop) ─────────────────────────────────────────── */
  const onMouseDown = useCallback((e) => {
    const el    = trackRef.current
    if (!el) return
    let startX  = e.pageX - el.offsetLeft
    let scrollL = el.scrollLeft
    let moved   = false
    setDragging(false)

    const move = (ev) => {
      const dx = ev.pageX - el.offsetLeft - startX
      if (Math.abs(dx) > 4) { moved = true; setDragging(true) }
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
    const el   = trackRef.current
    if (!el) return
    const card = el.querySelector('.g-card')
    const w    = card ? card.offsetWidth + GAP : 300
    el.scrollBy({ left: dir * w * 2, behavior: 'smooth' })
  }

  const handleCardClick = (i) => {
    if (!dragging) setLightboxIdx(i)
  }

  return (
    <section
      id="gallery"
      style={{
        backgroundColor: '#071E0A',
        position: 'relative',
        overflow: 'hidden',
        paddingTop:    'clamp(64px, 8vw, 100px)',
        paddingBottom: 'clamp(64px, 8vw, 100px)',
      }}
    >
      {/* ── ambient glow ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(198,255,0,0.05) 0%, transparent 70%)',
      }} />

      <div
        ref={ref}
        style={{ position: 'relative', zIndex: 1 }}
      >
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
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#C6FF00',
                marginBottom: '14px',
              }}
            >
              Our Gallery
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
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 700,
                color: '#F5F2EC',
                lineHeight: 1.1,
                marginBottom: '14px',
                letterSpacing: '-0.01em',
              }}
            >
              A Feast for 
              <span style={{ color: '#C6FF00',  }}> the Eyes</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.18 }}
              style={{
                fontSize: 'clamp(13px, 1.4vw, 15px)',
                color: 'rgba(245,242,236,0.5)',
                maxWidth: '380px',
                lineHeight: 1.7,
              }}
            >
              Culinary creations, warm ambience,<br />and moments worth remembering.
            </motion.p>
          </div>

          {/* Desktop nav arrows */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.25 }}
              style={{ display: 'flex', gap: '10px', flexShrink: 0 }}
            >
              <NavBtn onClick={() => scroll(-1)} label="Previous">
                <ArrowLeft />
              </NavBtn>
              <NavBtn onClick={() => scroll(1)} label="Next">
                <ArrowRight />
              </NavBtn>
            </motion.div>
          )}
        </div>

        {/* ── Carousel ───────────────────────────────────────────────────── */}
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          style={{
            display:    'flex',
            gap:        `${GAP}px`,
            overflowX:  'auto',
            overflowY:  'visible',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            paddingLeft:  'clamp(20px, 5vw, 80px)',
            paddingRight: 'clamp(20px, 5vw, 80px)',
            paddingBottom: '8px',
            paddingTop:    '8px',
            cursor: dragging ? 'grabbing' : 'grab',
            userSelect: 'none',
          }}
        >
          {galleryImages.map((img, i) => (
            <GalleryCard
              key={img.id}
              img={img}
              index={i}
              inView={inView}
              onClick={() => handleCardClick(i)}
            />
          ))}
        </div>

        {/* Mobile swipe hint */}
        {isMobile && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            style={{
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(245,242,236,0.25)',
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            Swipe to explore
          </motion.p>
        )}
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      <Lightbox
        open={lightboxIdx >= 0}
        close={() => setLightboxIdx(-1)}
        slides={galleryImages.map((img) => ({ src: img.src, alt: img.alt }))}
        index={lightboxIdx}
        styles={{ container: { backgroundColor: 'rgba(0,0,0,0.96)' } }}
      />
    </section>
  )
}

/* ─── Card ───────────────────────────────────────────────────────────────── */
const GAP = 14

function GalleryCard({ img, index, inView, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="g-card"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.36) }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: 'clamp(200px, 26vw, 300px)',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        border: hovered
          ? '1px solid rgba(198,255,0,0.22)'
          : '1px solid rgba(255,255,255,0.05)',
        transition: 'border-color 0.3s, transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(198,255,0,0.08)'
          : '0 8px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* Image */}
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        draggable={false}
        style={{
          width: '100%',
          aspectRatio: '3/4',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          pointerEvents: 'none',
        }}
        onError={(e) => {
          e.target.src =
            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400"%3E%3Crect width="300" height="400" fill="%230D3615"/%3E%3C/svg%3E'
        }}
      />

      {/* Hover overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, transparent 35%, rgba(5,18,7,0.88) 100%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '20px 18px',
      }}>
        {img.alt && (
          <p style={{
            fontSize: '12px',
            fontWeight: 500,
            color: 'rgba(245,242,236,0.8)',
            letterSpacing: '0.04em',
            lineHeight: 1.4,
          }}>
            {img.alt}
          </p>
        )}
      </div>

      {/* Expand icon */}
      <div style={{
        position: 'absolute', top: '12px', right: '12px',
        width: '28px', height: '28px',
        borderRadius: '50%',
        backgroundColor: 'rgba(10,46,18,0.75)',
        backdropFilter: 'blur(6px)',
        border: '1px solid rgba(198,255,0,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.25s',
        pointerEvents: 'none',
      }}>
        <ExpandIcon />
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
        width: '44px', height: '44px',
        borderRadius: '50%',
        border: `1px solid ${hovered ? '#C6FF00' : 'rgba(198,255,0,0.2)'}`,
        backgroundColor: hovered ? '#C6FF00' : 'transparent',
        color: hovered ? '#071E0A' : '#C6FF00',
        fontSize: '14px', cursor: 'pointer',
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
function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function ExpandIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1 4.5V1h3.5M7.5 1H11v3.5M11 7.5V11H7.5M4.5 11H1V7.5" stroke="#C6FF00" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}