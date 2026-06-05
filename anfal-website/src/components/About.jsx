import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const USP = [
  { icon: '🍽️', title: 'Premium Dining',      desc: 'Every dish crafted with finest ingredients and authentic recipes.' },
  { icon: '💰', title: 'Affordable Pricing',   desc: 'Luxury experience without the luxury price tag.' },
  { icon: '👨‍👩‍👧‍👦', title: 'Family Friendly',     desc: 'A warm, welcoming atmosphere for families of all sizes.' },
]

export default function About() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section id="about" className="section-padding" style={{ backgroundColor: '#0D3615' }}>
      <div className="section-container">
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* Text block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label" style={{ marginBottom: '12px' }}>Our Story</p>
            <div className="accent-line" style={{ marginBottom: '20px' }} />
            <h2 className="section-title" style={{ marginBottom: '20px' }}>
              Crafted with Passion,<br />Served with Pride
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(245,242,236,0.65)', lineHeight: 1.8, marginBottom: '16px' }}>
              Established in 2026, Anfal Restaurant was born from a deep love for authentic flavors and genuine hospitality. Located on NH 75, Soorikumeru, we bring together the finest Arabian, Indian, and Chinese cuisine under one roof.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(245,242,236,0.65)', lineHeight: 1.8, marginBottom: '32px' }}>
              Our chefs bring decades of culinary expertise, using traditional recipes and the freshest local ingredients to create dishes that feel both authentic and extraordinary.
            </p>

            {/* Cuisines tags */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Arabian', 'Indian', 'Chinese'].map((c) => (
                <span
                  key={c}
                  style={{
                    padding: '6px 16px',
                    border: '1px solid rgba(198,255,0,0.3)',
                    borderRadius: '100px',
                    fontSize: '12px',
                    color: '#C6FF00',
                    letterSpacing: '0.06em',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>

          {/* USP cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {USP.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                style={{
                  padding: '20px 24px',
                  backgroundColor: 'rgba(10,46,18,0.6)',
                  border: '1px solid rgba(198,255,0,0.08)',
                  borderRadius: '12px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: '28px', flexShrink: 0 }}>{icon}</span>
                <div>
                  <h3 style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '17px', fontWeight: 600,
                    color: '#F5F2EC', marginBottom: '6px',
                  }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(245,242,236,0.55)', lineHeight: 1.6 }}>
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}