import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QR_MENU_URL  = 'https://anfal-qr-menu.vercel.app'
const HERO_IMAGES  = [
  '/images/hero/h1.jpg',
  '/images/hero/h2.jpg',
  '/images/hero/h3.jpg',
  '/images/hero/h4.jpg',
]

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } },
  item: {
    initial:  { opacity: 0, y: 28 },
    animate:  { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  },
}

export default function Hero() {
  const [idx, setIdx] = useState(0)

    useEffect(() => {
    const timer = setInterval(() => {
        setIdx((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 4000)

    return () => clearInterval(timer)
    }, [])

  const scrollToSpecialties = (e) => {
  e.preventDefault()

  document
    .getElementById('specialties')
    ?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
}

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

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: isMobile ? '85svh' : '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: isMobile ? '70px' : '30px',
        paddingBottom: isMobile ? '40px' : '80px',
      }}
    >
      {/* Image slider */}
      <AnimatePresence mode="sync">
        <motion.img
          key={idx}
          src={HERO_IMAGES[idx]}
          alt=""
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1    }}
          exit={{   opacity: 0               }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 0,
          }}
          onError={(e) => { e.target.style.display = 'none' }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: [
          'linear-gradient(105deg, rgba(10,46,18,0.58) 0%, rgba(10,46,18,0.55) 50%, rgba(10,46,18,0.25) 100%)',
          'linear-gradient(0deg, rgba(10,46,18,0.92) 0%, transparent 50%)',
        ].join(', '),
      }} />

      {/* Content */}
      <div
        className="container"
        style={{
          position: 'relative', zIndex: 2,
          paddingTop:    isMobile ? '70px' : '120px', 
          paddingBottom: isMobile ? '40px' : '80px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
            maxWidth: isMobile ? '100%' : '760px',
            margin: '0 auto',
        }}
      >
        <motion.div
          variants={stagger.container}
          
          initial="initial"
          animate="animate"
          style={{ display: 'flex', flexDirection: 'column', gap: '0',textAlign: 'center',}}
        >
          <motion.span variants={stagger.item} className="label" style={{ marginBottom: '16px' }}>
            Welcome to
          </motion.span>

          <motion.h1
            variants={stagger.item}
            style={{
              fontFamily:    '"Playfair Display", serif',
              fontSize: isMobile
            ? 'clamp(48px, 12vw, 64px)'
            : 'clamp(64px, 7vw, 88px)',
              fontWeight:    700,
              color:         '#F5F2EC',
              lineHeight:    0.92,
              letterSpacing: '-0.025em',
              marginBottom:  '16px',
              textShadow: '0 4px 30px rgba(0,0,0,0.35)',
            }}
          >
            Anfal<br /><span style={{ color: '#C6FF00',  }}>Restaurant</span>
          </motion.h1>

          <motion.p
            variants={stagger.item}
            style={{
              fontFamily:    '"Playfair Display", serif',
              fontSize:      'clamp(16px, 2vw, 22px)',
              fontWeight:    400,
              fontStyle:     'italic',
              color:         'rgba(245,242,236,0.75)',
              marginBottom:  '20px',
              textShadow: '0 2px 12px rgba(0,0,0,0.25)',
            }}
          >
            A World of Flavors in Your Hands
          </motion.p>

          <motion.p
            variants={stagger.item}
            style={{
              fontSize:     'clamp(13px, 1.4vw, 15px)',
              color:        'rgba(245,242,236,0.78)',
              lineHeight:   1.8,
              maxWidth: isMobile ? '100%' : '560px',
                marginLeft: 'auto',
                marginRight: 'auto',
              marginBottom: '40px',
            }}
          >
            Discover authentic flavors, freshly prepared dishes, and exceptional dining experiences crafted for families, food lovers, and every special occasion.
          </motion.p>

          <motion.div
            variants={stagger.item}
            style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}
          >
            <a href="#specialties" onClick={scrollToSpecialties} target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{
                minWidth: isMobile ? '130px' : '170px',
            }}
            >
              <>
            Our Specialties&nbsp;›
            </>
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
               target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{
                minWidth: isMobile ? '130px' : '170px',
            }}
            >
              <>
                Find Us&nbsp;›
                </>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide indicators — bottom right */}
      <div
        style={{
          position: 'absolute', bottom: isMobile ? '24px' : '32px',
            right: isMobile ? 'auto' : '32px',
            left: isMobile ? '50%' : 'auto',
            transform: isMobile ? 'translateX(-50%)' : 'none',
          zIndex: 2, display: 'flex', gap: '6px', alignItems: 'center',
        }}
      >
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width:           i === idx ? '24px' : '6px',
              height:          '6px',
              borderRadius:    '3px',
              backgroundColor: i === idx ? '#C6FF00' : 'rgba(198,255,0,0.25)',
              border:          'none',
              cursor:          'pointer',
              padding:         0,
              transition:      'all 0.3s ease',

            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}