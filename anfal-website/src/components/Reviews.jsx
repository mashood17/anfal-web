import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { reviews } from '@/data/reviews'

const GOOGLE_REVIEWS_URL = 'https://share.google/zqOBWNe619tSG5G2I'

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map((s) => (
        <span key={s} style={{ color: s <= rating ? '#C6FF00' : 'rgba(198,255,0,0.2)', fontSize: '14px' }}>★</span>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [active, setActive] = useState(0)
  const { ref, inView }     = useScrollAnimation()

  return (
    <section id="reviews" className="section-padding" style={{ backgroundColor: '#0A2E12' }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <p className="section-label" style={{ marginBottom: '12px' }}>What Guests Say</p>
          <div className="accent-line" style={{ margin: '0 auto 20px' }} />
          <h2 className="section-title">Guest Reviews</h2>
        </div>

        {/* Reviews grid */}
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          {reviews.map(({ id, name, rating, date, text, avatar }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: '24px',
                backgroundColor: '#0D3615',
                border: '1px solid rgba(198,255,0,0.08)',
                borderRadius: '16px',
              }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '42px', height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(198,255,0,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 700,
                  color: '#C6FF00', flexShrink: 0,
                }}>
                  {avatar}
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#F5F2EC' }}>{name}</p>
                  <p style={{ fontSize: '11px', color: 'rgba(245,242,236,0.4)', marginTop: '2px' }}>{date}</p>
                </div>
              </div>

              <StarRating rating={rating} />

              <p style={{
                fontSize: '14px',
                color: 'rgba(245,242,236,0.65)',
                lineHeight: 1.7,
                marginTop: '12px',
                fontStyle: 'italic',
              }}>
                "{text}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <div style={{ textAlign: 'center' }}>
        <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ display: 'inline-flex' }}
          >
            See All Reviews on Google
          </a>
        </div>
      </div>
    </section>
  )
}