import { motion }            from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useRef, useState, useEffect } from 'react'

const CUISINES = [
  {
    name:     'Arabian',
    subtitle: 'The Heart of Our Kitchen',
    desc:     'Slow-cooked Mandi, smoky Al Faham grills, Kabuli rice and freshly rolled Shawarma — our Arabian menu draws from generations of Gulf culinary tradition.',
    dishes:   ['Afghani Mandi', 'Al Faham Chicken', 'Plate Shawarma', 'Kabuli Rice', 'Grill Bukhari'],
    image:    '/images/cuisine/arabian.jpg',
    index:    '01',
  },
  {
    name:     'Indian',
    subtitle: 'Rich, Aromatic & Comforting',
    desc:     'From the fragrant depths of Hydrabadi Biriyani to the velvety richness of Butter Chicken, our Indian selection celebrates the full spectrum of subcontinent cuisine.',
    dishes:   ['Hydrabadi Biriyani', 'Butter Chicken', 'Paneer Butter Masala', 'Kerala Parotta', 'Chicken Masala'],
    image:    '/images/cuisine/indian.jpg',
    index:    '02',
  },
  {
    name:     'Chinese',
    subtitle: 'Bold, Fiery & Satisfying',
    desc:     'Wok-fired Indo-Chinese favourites with bold heat and layered flavours — from crispy Dragon Chicken to our signature Manchow Soup.',
    dishes:   ['Dragon Chicken', 'Chilli Chicken', 'Schezwan Fried Rice', 'Chicken Noodles', 'Manchow Soup'],
    image:    '/images/cuisine/chinese.jpg',
    index:    '03',
  },
]

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

export default function Cuisines() {
  const { ref, inView } = useScrollAnimation(0.06)
  const isMobile        = useBreakpoint(768)

  return (
    <section
      id="cuisines"
      style={{
        backgroundColor: '#081A0A',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: isMobile ? '5px' : 'clamp(44px, 5vw, 72px)',
        paddingBottom: isMobile ? '5px' : 'clamp(44px, 5vw, 72px)',  
      }}
    >
      {/* Subtle texture gradient */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(198,255,0,0.03) 0%, transparent 65%)',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft:  'clamp(20px, 5vw, 80px)',
        paddingRight: 'clamp(20px, 5vw, 80px)',
        position: 'relative', zIndex: 1,
      }}>

        {/* ── Section Header ──────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(52px, 7vw, 88px)' }}>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'block',
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#C6FF00', marginBottom: '14px',
            }}
          >
            What We Serve
          </motion.span>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            style={{
              width: '32px', height: '2px',
              backgroundColor: '#C6FF00',
              transformOrigin: 'center',
              margin: '0 auto 20px',
            }}
          />

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(34px, 5vw, 58px)',
              fontWeight: 700,
              color: '#F5F2EC',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              marginBottom: '16px',
            }}
          >
            Signature <span style={{ color: '#C6FF00', }}>Cuisines</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            style={{
              fontSize: 'clamp(13px, 1.4vw, 15px)',
              color: 'rgba(245,242,236,0.45)',
              maxWidth: '460px',
              margin: '0 auto',
              lineHeight: 1.75,
            }}
          >
            Three distinct culinary traditions, united by one commitment —
            exceptional flavour in every dish.
          </motion.p>
        </div>

        {/* ── Cuisine Rows ─────────────────────────────────────────────── */}
        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {CUISINES.map(({ name, subtitle, desc, dishes, image, index }, i) => {
            const flip = !isMobile && i % 2 !== 0
            return (
              <CuisineRow
                key={name}
                name={name}
                subtitle={subtitle}
                desc={desc}
                dishes={dishes}
                image={image}
                ordinal={index}
                flip={flip}
                last={i === CUISINES.length - 1}
                delay={i * 0.1}
                inView={inView}
                isMobile={isMobile}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Single cuisine row ─────────────────────────────────────────────────── */
function CuisineRow({ name, subtitle, desc, dishes, image, ordinal, flip, last, delay, inView, isMobile }) {
  const [imgHovered, setImgHovered] = useState(false)

  const content = (
    <motion.div
      initial={{ opacity: 0, x: flip ? 32 : -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile
          ? 'clamp(28px, 5vw, 40px) 0'
          : flip
            ? '0 0 0 clamp(32px, 4vw, 56px)'
            : '0 clamp(32px, 4vw, 56px) 0 0',
      }}
    >
      {/* Ordinal + subtitle row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        marginBottom: '16px',
      }}>
        <span style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '11px', fontWeight: 700,
          color: 'rgba(198,255,0,0.35)',
          letterSpacing: '0.12em',
        }}>
          {ordinal}
        </span>
        <div style={{ width: '24px', height: '1px', backgroundColor: 'rgba(198,255,0,0.2)' }} />
        <span style={{
          fontSize: '10px', fontWeight: 700,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: '#C6FF00',
        }}>
          {subtitle}
        </span>
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(30px, 3.8vw, 46px)',
        fontWeight: 700,
        color: '#F5F2EC',
        lineHeight: 1.1,
        letterSpacing: '-0.01em',
        marginBottom: '18px',
      }}>
        {name}
      </h3>

      {/* Thin accent rule */}
      <div style={{
        width: '40px', height: '1px',
        background: 'linear-gradient(90deg, #C6FF00 0%, transparent 100%)',
        marginBottom: '18px',
      }} />

      {/* Description */}
      <p style={{
        fontSize: 'clamp(13px, 1.4vw, 15px)',
        color: 'rgba(245,242,236,0.55)',
        lineHeight: 1.8,
        marginBottom: '26px',
        maxWidth: '420px',
      }}>
        {desc}
      </p>

      {/* Dish tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {dishes.map((d) => (
          <DishTag key={d} label={d} />
        ))}
      </div>
    </motion.div>
  )

  const imageEl = (
    <motion.div
      initial={{ opacity: 0, x: flip ? -32 : 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: delay + 0.05 }}
      onMouseEnter={() => setImgHovered(true)}
      onMouseLeave={() => setImgHovered(false)}
      style={{
        borderRadius: '14px',
        overflow: 'hidden',
        aspectRatio: isMobile ? '4/3' : '16/11',
        position: 'relative',
        boxShadow: imgHovered
          ? '0 28px 56px rgba(0,0,0,0.55)'
          : '0 12px 32px rgba(0,0,0,0.35)',
        transition: 'box-shadow 0.4s',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          transition: 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)',
          transform: imgHovered ? 'scale(1.05)' : 'scale(1)',
        }}
        onError={(e) => {
          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Crect width="800" height="500" fill="%230D3615"/%3E%3C/svg%3E'
        }}
      />
      {/* Subtle gradient overlay on image */}
      <div style={{
        position: 'absolute', inset: 0,
        background: imgHovered
          ? 'linear-gradient(135deg, rgba(198,255,0,0.04) 0%, transparent 60%)'
          : 'none',
        transition: 'background 0.4s',
        pointerEvents: 'none',
      }} />
    </motion.div>
  )

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '0' : 'clamp(32px, 5vw, 72px)',
      alignItems: 'center',
      paddingTop:    'clamp(44px, 5vw, 72px)',
      paddingBottom: 'clamp(44px, 5vw, 72px)',
      borderBottom: !last ? '1px solid rgba(255,255,255,0.05)' : 'none',
    }}>
      {isMobile ? (
        <>
          {content}

          <div style={{ marginTop: '18px' }}>
            {imageEl}
          </div>
        </>
      ) : flip ? (
        <>
          {imageEl}
          {content}
        </>
      ) : (
        <>
          {content}
          {imageEl}
        </>
      )}
    </div>
  )
}

/* ─── Dish pill tag ──────────────────────────────────────────────────────── */
function DishTag({ label }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.03em',
        color: hovered ? '#C6FF00' : 'rgba(245,242,236,0.5)',
        backgroundColor: hovered ? 'rgba(198,255,0,0.08)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? 'rgba(198,255,0,0.25)' : 'rgba(255,255,255,0.08)'}`,
        padding: '5px 13px',
        borderRadius: '100px',
        transition: 'all 0.2s',
        cursor: 'default',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}