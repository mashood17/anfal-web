import { useRef }           from 'react'
import { motion, useInView } from 'framer-motion'
import MenuItemRow           from './MenuItemRow'
import { categoryImageUrl }  from '@/utils/imageUrl'

const itemVariants = {
  hidden:  { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.3, delay: i * 0.04, ease: 'easeOut' }
  }),
}

export default function CategorySection({ category, items, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })

  // Even index = image left, odd index = image right
  const imageLeft = index % 2 === 0

  if (!items.length) return null

  return (
   <section
    id={`cat-${category.id}`}
    ref={ref}
    className="category-section-gap"
    style={{
      borderBottom: '1px solid rgba(198,255,0,0.06)',
      paddingBottom: '40px',   // reduced from 48px
      marginBottom: '40px',    // reduced from 48px
    }}
  >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: category.banner ? '320px 1fr' : '1fr',
          gap: '40px',
          alignItems: 'center',
          direction: category.banner && !imageLeft ? 'rtl' : 'ltr',
        }}
        className="lg-grid-override"
      >
        {/* Image — always first in DOM, direction:rtl flips it visually */}
        {category.banner && (
          <div style={{ direction: 'ltr' }}>
            <CategoryImage category={category} />
          </div>
        )}

        {/* Text block */}
        <motion.div
          style={{ direction: 'ltr' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div style={{ marginBottom: '24px' }}>
            <p className="category-label">{getCategoryGroup(category.name)}</p>
            <h2 className="category-title" style={{ marginTop: '4px' }}>
              {category.name}
            </h2>
            {category.description && (
              <p style={{
                fontSize: '13px',
                color: 'var(--text-faint)',
                marginTop: '8px',
                fontStyle: 'italic',
              }}>
                {category.description}
              </p>
            )}
          </div>

          <div>
            <VariantHeader items={items} />

            {items.map((item, i) => (
              <motion.div
                key={item.id}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <MenuItemRow item={item} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function CategoryImage({ category }) {
  return (
    <div
      className="category-image-desktop"
      style={{
        borderRadius: '10px',
        overflow: 'hidden',
        aspectRatio: '1 / 1',
        boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
        width: '100%',          // fills the 320px grid column exactly
      }}
    >
      <img
        src={categoryImageUrl(category.banner)}
        alt={category.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        loading="lazy"
      />
    </div>
  )
}

function VariantHeader({ items }) {
  const multiItem = items.find((i) => i.prices?.length > 1)

  if (!multiItem) return null

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '18px',
        marginBottom: '12px',
        paddingBottom: '10px',
        borderBottom: '1px solid rgba(198,255,0,0.08)',
      }}
    >
      {multiItem.prices.map((p) => (
        <span
          key={p.label}
          style={{
            minWidth: '32px',
            textAlign: 'center',
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--text-faint)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {p.label}
        </span>
      ))}
    </div>
  )
}

function getCategoryGroup(name) {
  const n = name.toLowerCase()
  if (n.includes('soup') || n.includes('salad')) return 'Starters'
  if (n.includes('starter') || n.includes('chinese') || n.includes('veg start') || n.includes('roll') || n.includes('tandoori')) return 'Starters'
  if (n.includes('biryani') || n.includes('biriyani') || n.includes('rice') || n.includes('noodle') || n.includes('bread')) return 'Main Course'
  if (n.includes('chicken') || n.includes('mutton') || n.includes('fish') || n.includes('afghani')) return 'Main Course'
  if (n.includes('veg dish') || n.includes('gravy')) return 'Main Course'
  if (n.includes('juice') || n.includes('ice cream') || n.includes('scoop')) return 'Beverages & Desserts'
  return 'Menu'
}