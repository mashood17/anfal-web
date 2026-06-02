import { useRef }       from 'react'
import { motion,
         useInView }    from 'framer-motion'
import MenuItemRow      from './MenuItemRow'
import { imageUrl }     from '@/utils/imageUrl'

const itemVariants = {
  hidden:  { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.3, delay: i * 0.04, ease: 'easeOut' }
  }),
}

export default function CategorySection({ category, items, index }) {
  const ref    = useRef(null)

  // once: true is correct for the SECTION reveal
  // but we must not gate items on this — items use their own trigger
  const inView = useInView(ref, { once: true, amount: 0.05 })

  const isDesktopImageRight = index % 2 === 0

  

  if (!items.length) return null

  return (
    <section
      id={`cat-${category.id}`}
      ref={ref}
      style={{
        borderBottom: '1px solid rgba(198,255,0,0.06)',
        paddingBottom: '48px',
        marginBottom: '48px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: category.banner ? 'minmax(0,1fr) 380px' : '1fr',
          gap: '48px',
          alignItems: 'start',
        }}
        className="lg-grid-override"
      >
        {category.banner && !isDesktopImageRight && (
          <CategoryImage category={category} />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {/* Category header */}
          <div style={{ marginBottom: '24px' }}>
            <p className="category-label">{getCategoryGroup(category.name)}</p>
            <h2 className="category-title" style={{ marginTop: '4px' }}>
              {category.name}
            </h2>
            {category.description && (
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--text-faint)',
                  marginTop: '8px',
                  fontStyle: 'italic',
                }}
              >
                {category.description}
              </p>
            )}
          </div>

          {/* Items — NOT gated on inView, render immediately when data exists */}
          <div>
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

        {category.banner && isDesktopImageRight && (
          <CategoryImage category={category} />
        )}
      </div>
    </section>
  )
}

function CategoryImage({ category }) {
  return (
    <div
      className="category-image-desktop"
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        height: '320px',
        position: 'sticky',
        top: '120px',
      }}
    >
      <img
        src={imageUrl(category.banner)}
        alt={category.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        loading="lazy"
      />
    </div>
  )
}

function VariantHeader({ items }) {
  const multiItem = items.find((i) => i.prices?.length > 1)
  if (!multiItem) return null
  const labels = multiItem.prices.map((p) => p.label)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '20px',
        paddingBottom: '8px',
        borderBottom: '1px solid rgba(198,255,0,0.08)',
        marginBottom: '4px',
      }}
    >
      {labels.map((label) => (
        <span
          key={label}
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--text-faint)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            minWidth: '32px',
            textAlign: 'center',
          }}
        >
          {label}
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

function hasVariants(items) {
  return items.some((i) => i.prices?.length > 1)
}