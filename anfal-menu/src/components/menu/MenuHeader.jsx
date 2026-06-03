import { motion } from 'framer-motion'
import { imageUrl } from '@/utils/imageUrl'

export default function MenuHeader({ restaurant }) {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        textAlign: 'center',
        padding: '24px 20px 0',
      }}
    >
      {/* Brand block — tight grouped unit */}
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>

        {/* Logo in subtle container */}
        {restaurant?.logo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '14px',
              backgroundColor: 'rgba(198,255,0,0.06)',
              border: '1px solid rgba(198,255,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
            }}
          >
            <img
              src={imageUrl(restaurant.logo)}
              alt={restaurant?.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </motion.div>
        )}

        {/* Restaurant name — primary focal point */}
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(24px, 6vw, 34px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          {restaurant?.name || 'Anfal Restaurant'}
        </motion.h1>

        {/* Tagline — subdued */}
        {restaurant?.tagline && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            style={{
              fontSize: '11px',
              color: 'var(--text-faint)',
              opacity: 0.7,
              letterSpacing: '0.06em',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {restaurant.tagline}
          </motion.p>
        )}
      </div>

      {/* Divider + Our Menu — compact, close to brand */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{
          marginTop: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <div style={{ width: '28px', height: '1px', backgroundColor: 'rgba(198,255,0,0.2)' }} />
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(26px, 5vw, 38px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          Our Menu
        </h2>
        <div style={{ width: '28px', height: '1px', backgroundColor: 'rgba(198,255,0,0.2)' }} />
      </motion.div>

      {/* Bottom border — merges into sticky nav */}
      <div style={{
        marginTop: '16px',
        height: '1px',
        backgroundColor: 'rgba(198,255,0,0.06)',
      }} />
    </motion.header>
  )
}