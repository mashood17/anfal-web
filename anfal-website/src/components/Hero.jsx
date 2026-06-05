import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QR_MENU_URL = 'https://anfal-qr-menu.vercel.app'

// Replace with your actual hero images in public/images/hero/
const HERO_IMAGES = [
  '/images/hero/h1.jpg',
  '/images/hero/h2.jpg',
  '/images/hero/h3.jpg',
]

export default function Hero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_IMAGES.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background slider */}
      <AnimatePresence mode="sync">
        <motion.img
          key={idx}
          src={HERO_IMAGES[idx]}
          alt=""
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(10,46,18,0.75) 70%, rgba(10,46,18,0.95) 100%)',
      }} />

      {/* Content */}
      <div
        className="section-container"
        style={{
          position: 'relative', zIndex: 2,
          textAlign: 'center',
          paddingTop: '100px',
          paddingBottom: '60px',
        }}
      >
        {/* Logo */}
        <motion.img
          src="/images/logo/logo.png"
          alt="Anfal"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            height: 'clamp(56px, 8vw, 80px)',
            width: 'auto',
            objectFit: 'contain',
            marginBottom: '20px',
            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
          }}
          onError={(e) => { e.target.style.display = 'none' }}
        />

        {/* Label */}
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginBottom: '16px' }}
        >
          Welcome to
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(36px, 7vw, 80px)',
            fontWeight: 700,
            color: '#F5F2EC',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            textShadow: '0 2px 24px rgba(0,0,0,0.4)',
          }}
        >
          Anfal Restaurant
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{
            fontSize: 'clamp(14px, 2vw, 18px)',
            color: 'rgba(245,242,236,0.7)',
            letterSpacing: '0.06em',
            fontStyle: 'italic',
            marginBottom: '40px',
          }}
        >
          A World of Flavors in Your Hands
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href={QR_MENU_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Explore Menu
          </a>
          <a href="#contact" className="btn-outline">
            Find Us
          </a>
        </motion.div>

        {/* Slide indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '48px' }}>
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: i === idx ? '24px' : '6px',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: i === idx ? '#C6FF00' : 'rgba(198,255,0,0.3)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.3s ease',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: 'absolute', bottom: '28px', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2, display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '6px',
        }}
      >
        <span style={{ fontSize: '10px', color: 'rgba(198,255,0,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '28px', backgroundColor: 'rgba(198,255,0,0.35)' }}
        />
      </motion.div>
    </section>
  )
}