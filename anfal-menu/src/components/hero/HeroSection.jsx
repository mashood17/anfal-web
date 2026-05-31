import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { imageUrl } from '@/utils/imageUrl'

// Framer Motion variants — defined outside component for stability
const textVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const imageVariants = {
  enter:  { opacity: 0, scale: 1.05 },
  center: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: 'easeOut' } },
  exit:   { opacity: 0, transition: { duration: 0.8 } },
}

export default function HeroSection({ restaurant }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const images = restaurant?.settings?.hero_images || []

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIdx((i) => (i + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">

      {/* Background slider */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentIdx}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <img
            src={imageUrl(images[currentIdx])}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Dark overlay — gradient from bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="space-y-4"
        >
          {restaurant?.logo && (
            <motion.img
              variants={textVariants}
              src={imageUrl(restaurant.logo)}
              alt={restaurant.name}
              className="h-16 sm:h-20 mx-auto object-contain mb-2"
            />
          )}

          <motion.h1
            variants={textVariants}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide text-white"
          >
            {restaurant?.name || 'Anfal Restaurant'}
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="font-body text-sm sm:text-base tracking-[0.25em] uppercase text-brand-accent"
          >
            {restaurant?.tagline || 'A World of Flavors in Your Hands'}
          </motion.p>

          <motion.div variants={textVariants} className="pt-4">
            <a
              href="#menu"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('[data-menu-start]')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-block px-8 py-3 border border-brand-accent text-brand-accent 
                         font-body text-sm tracking-widest uppercase
                         hover:bg-brand-accent hover:text-brand-dark
                         transition-all duration-300"
            >
              Explore Menu
            </a>
          </motion.div>
        </motion.div>

        {/* Slide indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-8 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIdx ? 'w-6 bg-brand-accent' : 'bg-white/30'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}