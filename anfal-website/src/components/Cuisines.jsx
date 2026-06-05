import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const CUISINES = [
  {
    name:    'Arabian',
    icon:    '🫕',
    desc:    'Authentic Mandi, Kabuli rice, Al Faham grills and more — slow-cooked to perfection using traditional methods.',
    dishes:  ['Afghani Mandi', 'Al Faham Chicken', 'Kabuli Rice', 'Shawarma'],
  },
  {
    name:    'Indian',
    icon:    '🍛',
    desc:    'Rich gravies, fragrant biriyani and fresh tandoori breads crafted with generations of culinary tradition.',
    dishes:  ['Hydrabadi Biriyani', 'Butter Chicken', 'Paneer Butter Masala', 'Kerala Parotta'],
  },
  {
    name:    'Chinese',
    icon:    '🥢',
    desc:    'Wok-fired Indo-Chinese favourites — bold flavours, crispy textures, and the perfect spice balance.',
    dishes:  ['Chilli Chicken', 'Dragon Chicken', 'Schezwan Fried Rice', 'Manchow Soup'],
  },
]

export default function Cuisines() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section id="cuisine" className="section-padding" style={{ backgroundColor: '#0A2E12' }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <p className="section-label" style={{ marginBottom: '12px' }}>What We Serve</p>
          <div className="accent-line" style={{ margin: '0 auto 20px' }} />
          <h2 className="section-title">Signature Cuisines</h2>
        </div>

        {/* Cards */}
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {CUISINES.map(({ name, icon, desc, dishes }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{
                padding: '32px 28px',
                backgroundColor: '#0D3615',
                border: '1px solid rgba(198,255,0,0.08)',
                borderRadius: '16px',
                transition: 'border-color 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(198,255,0,0.25)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(198,255,0,0.08)'}
            >
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{icon}</div>
              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '22px', fontWeight: 700,
                color: '#F5F2EC', marginBottom: '12px',
              }}>
                {name}
              </h3>
              <p style={{
                fontSize: '14px', color: 'rgba(245,242,236,0.55)',
                lineHeight: 1.7, marginBottom: '20px',
              }}>
                {desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {dishes.map((d) => (
                  <span
                    key={d}
                    style={{
                      fontSize: '11px',
                      color: 'rgba(198,255,0,0.7)',
                      backgroundColor: 'rgba(198,255,0,0.06)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}