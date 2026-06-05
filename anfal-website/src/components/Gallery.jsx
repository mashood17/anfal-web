import { useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { galleryImages } from '@/data/gallery'

export default function Gallery() {
  const [open,  setOpen]  = useState(false)
  const [index, setIndex] = useState(0)
  const { ref, inView }   = useScrollAnimation(0.1)

  const slides = galleryImages.map((img) => ({ src: img.src, alt: img.alt }))

  return (
    <section id="gallery" className="section-padding" style={{ backgroundColor: '#0D3615' }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="section-label" style={{ marginBottom: '12px' }}>Our Gallery</p>
          <div className="accent-line" style={{ margin: '0 auto 20px' }} />
          <h2 className="section-title">A Feast for the Eyes</h2>
        </div>

        {/* Masonry grid */}
        <div
          ref={ref}
          style={{
            columns: 'var(--gallery-cols, 2)',
            columnGap: '12px',
            '--gallery-cols': '2',
          }}
          className="gallery-grid"
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{
                breakInside: 'avoid',
                marginBottom: '12px',
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={() => { setIndex(i); setOpen(true) }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{
                  width: '100%',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.04)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%230D3615"/%3E%3Ctext x="200" y="155" text-anchor="middle" font-family="serif" font-size="32" fill="%23C6FF0030"%3E✦%3C/text%3E%3C/svg%3E'
                }}
              />
            </motion.div>
          ))}
        </div>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={index}
          styles={{
            container: { backgroundColor: 'rgba(0,0,0,0.92)' },
          }}
        />
      </div>

      <style>{`
        @media (min-width: 640px)  { .gallery-grid { --gallery-cols: 3; } }
        @media (min-width: 1024px) { .gallery-grid { --gallery-cols: 4; } }
      `}</style>
    </section>
  )
}