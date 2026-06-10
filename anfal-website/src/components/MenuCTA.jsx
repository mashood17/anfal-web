import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const QR_MENU_URL = 'https://anfal-qr-menu.vercel.app'

export default function MenuCTA() {
  const { ref, inView } = useScrollAnimation(0.3)

  return (
    <section
      style={{
        backgroundColor: '#C6FF00',
        padding: 'clamp(48px, 6vw, 80px) 20px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Decorative background text */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(80px, 15vw, 160px)',
          fontWeight: 700,
          color: 'rgba(10,46,18,0.06)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          letterSpacing: '-0.02em',
        }}>
          MENU
        </span>
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <p style={{
          fontSize: '11px', fontWeight: 600,
          color: 'rgba(10,46,18,0.6)',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          Explore
        </p>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 700,
          color: '#0A2E12',
          lineHeight: 1.1,
          marginBottom: '16px',
          letterSpacing: '-0.01em',
        }}>
          Discover Our Full Menu
        </h2>
        <p style={{
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          color: 'rgba(10,46,18,0.65)',
          marginBottom: '32px',
          maxWidth: '480px',
          margin: '0 auto 32px',
          lineHeight: 1.6,
        }}>
          From Afghani Mandi to fresh juices — browse our complete menu and find your next favourite dish.
        </p>
        <a
          href={QR_MENU_URL}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 32px',
            backgroundColor: '#0A2E12',
            color: '#C6FF00',
            fontWeight: 700,
            fontSize: '14px',
            letterSpacing: '0.04em',
            borderRadius: '4px',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#0D3615'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#0A2E12'; e.currentTarget.style.transform = 'none' }}
        >
          Open Menu →
        </a>
      </motion.div>
    </section>
  )
}