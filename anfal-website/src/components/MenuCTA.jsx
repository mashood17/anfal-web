import { useState } from 'react'
import { motion }   from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const QR_MENU_URL = 'https://anfal-qr-menu.vercel.app'

export default function MenuCTA() {
  const { ref, inView } = useScrollAnimation(0.25)
  const [hovered, setHovered] = useState(false)

  return (
    <section
      style={{
        backgroundColor: '#07200A',
        position: 'relative',
        overflow: 'hidden',
        paddingTop:    'clamp(72px, 9vw, 110px)',
        paddingBottom: 'clamp(72px, 9vw, 110px)',
      }}
    >
      {/* ── Background: large watermark + radial glow ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Radial glow centred */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(198,255,0,0.06) 0%, transparent 70%)',
        }} />
        {/* Ghost watermark text */}
        <span style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(100px, 20vw, 220px)',
          fontWeight: 700,
          color: 'rgba(198,255,0,0.035)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}>
          MENU
        </span>
      </div>

      {/* ── Top & bottom border lines ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(198,255,0,0.18) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(198,255,0,0.1) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Content ── */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft:  'clamp(20px, 5vw, 80px)',
        paddingRight: 'clamp(20px, 5vw, 80px)',
        position: 'relative', zIndex: 1,
      }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center' }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              marginBottom: '20px',
            }}
          >
            <div style={{ width: '24px', height: '1px', backgroundColor: 'rgba(198,255,0,0.5)' }} />
            <span style={{
              fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#C6FF00',
            }}>
              Explore
            </span>
            <div style={{ width: '24px', height: '1px', backgroundColor: 'rgba(198,255,0,0.5)' }} />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(34px, 5vw, 60px)',
              fontWeight: 700,
              color: '#F5F2EC',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '18px',
            }}
          >
            Discover Our{' '}
            <span style={{ color: '#C6FF00',}}>Full Menu</span>
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
            style={{
              fontSize: 'clamp(13px, 1.4vw, 16px)',
              color: 'rgba(245,242,236,0.45)',
              lineHeight: 1.75,
              maxWidth: '440px',
              margin: '0 auto 36px',
            }}
          >
            From Afghani Mandi to fresh juices — browse our complete menu
            and find your next favourite dish.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.22 }}
          >
            <a
              href={QR_MENU_URL}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '15px 36px',
                backgroundColor: hovered ? '#C6FF00' : 'transparent',
                border: `1px solid ${hovered ? '#C6FF00' : 'rgba(198,255,0,0.35)'}`,
                borderRadius: '100px',
                color: hovered ? '#07200A' : '#C6FF00',
                fontSize: '12px', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.25s',
              }}
            >
              Open Menu
              <ArrowIcon hovered={hovered} />
            </a>
          </motion.div>

          {/* Cuisine hint pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '28px',
            }}
          >
            {['Afghani Mandi', 'Biriyani', 'Al Faham', 'Shawarma', 'Juices', '& more'].map((item) => (
              <span key={item} style={{
                fontSize: '10px', fontWeight: 500,
                color: 'rgba(245,242,236,0.28)',
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '100px',
                padding: '4px 12px',
                letterSpacing: '0.03em',
              }}>
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ArrowIcon({ hovered }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke={hovered ? '#07200A' : '#C6FF00'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}