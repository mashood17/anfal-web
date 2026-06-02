import { motion } from 'framer-motion'
import { imageUrl } from '@/utils/imageUrl'

export default function MenuHeader({ restaurant }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="container-menu"
      style={{ paddingTop: '28px', paddingBottom: '20px' }}
    >
      <div className="flex items-center gap-4">
        {restaurant?.logo && (
          <img
            src={imageUrl(restaurant.logo)}
            alt={restaurant?.name}
            style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
          />
        )}
        <div>
          <h1
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(20px, 4vw, 28px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
            }}
          >
            {restaurant?.name || 'Anfal Restaurant'}
          </h1>
          {restaurant?.tagline && (
            <p
              style={{
                fontSize: '12px',
                color: 'var(--text-faint)',
                letterSpacing: '0.05em',
                marginTop: '2px',
              }}
            >
              {restaurant.tagline}
            </p>
          )}
        </div>
      </div>
    </motion.header>
  )
}