import { useEffect }          from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useMenuStore           from '@/store/menuStore'
import { imageUrl }           from '@/utils/imageUrl'

const BADGE_CONFIG = {
  best_seller:  { label: 'Best Seller',  color: '#C6FF00',  bg: 'rgba(198,255,0,0.1)' },
  chef_special: { label: 'Chef Special', color: '#FCD34D',  bg: 'rgba(252,211,77,0.1)' },
  popular:      { label: 'Popular',      color: '#FB923C',  bg: 'rgba(251,146,60,0.1)' },
  new:          { label: 'New',          color: '#60A5FA',  bg: 'rgba(96,165,250,0.1)' },
}

export default function ItemModal() {
  const item      = useMenuStore((s) => s.selectedItem)
  const closeModal = useMenuStore((s) => s.closeModal)

  // Escape key
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [closeModal])

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = item ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [item])

  const prices    = item?.prices || []
  const isSingle  = prices.length === 1
  const isMulti   = prices.length > 1
  const badge     = item?.badge ? BADGE_CONFIG[item.badge] : null

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            style={{
              position: 'fixed', inset: 0,
              backgroundColor: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(4px)',
              zIndex: 100,
            }}
          />

          {/* Modal — bottom sheet on mobile, centered on desktop */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.98 }}
            transition={{
                type: 'spring',
                damping: 28,
                stiffness: 300,
            }}
            role="dialog"
            aria-modal="true"
            aria-label={item.name}
            style={{
              position: 'fixed',
              zIndex: 101,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#0D3615',
              borderTop: '1px solid rgba(198,255,0,0.12)',
              borderRadius: '20px 20px 0 0',
              maxHeight: '90vh',
              overflowY: 'auto',
              // Desktop: center it
            }}
            className="modal-desktop-override"
          >
            {/* Drag handle — mobile only */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
              <div
                style={{
                  width: '36px', height: '4px',
                  backgroundColor: 'rgba(198,255,0,0.2)',
                  borderRadius: '2px',
                }}
              />
            </div>

            {/* Square image — 1:1 ratio */}
            <div
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                maxHeight: '320px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src={imageUrl(item.image)}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Close button over image */}
              <button
                onClick={closeModal}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '18px',
                  lineHeight: 1,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                }}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '20px 20px 32px' }}>

              {/* Badge + food type row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                {item.food_type && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span
                      style={{
                        width: '8px', height: '8px',
                        borderRadius: '50%',
                        backgroundColor: item.food_type === 'veg' ? '#4ade80' : '#f87171',
                        display: 'inline-block',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: '11px', color: 'var(--text-faint)' }}>
                      {item.food_type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                    </span>
                  </span>
                )}

                {badge && (
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      color: badge.color,
                      backgroundColor: badge.bg,
                      border: `1px solid ${badge.color}30`,
                      borderRadius: '100px',
                      padding: '2px 8px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {badge.label}
                  </span>
                )}
              </div>

              {/* Name */}
              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(20px, 5vw, 26px)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                  marginBottom: '8px',
                }}
              >
                {item.name}
              </h2>

              {/* Description */}
              {item.description ? (
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}
                >
                  {item.description}
                </p>
              ) : (
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-faint)',
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}
                >
                  A signature dish crafted with fresh ingredients.
                </p>
              )}

              {/* Divider */}
              <div
                style={{
                  height: '1px',
                  backgroundColor: 'rgba(198,255,0,0.08)',
                  marginBottom: '16px',
                }}
              />

              {/* Price(s) */}
              {isSingle && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-faint)' }}>Price</span>
                  <span
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '24px',
                      fontWeight: 700,
                      color: '#C6FF00',
                    }}
                  >
                    ₹{Number(prices[0].price).toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {isMulti && (
                <div>
                  <p style={{ fontSize: '11px', color: 'var(--text-faint)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Pricing
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {prices.map((p) => (
                      <div
                        key={p.label}
                        style={{
                          flex: 1,
                          textAlign: 'center',
                          backgroundColor: 'rgba(198,255,0,0.05)',
                          border: '1px solid rgba(198,255,0,0.1)',
                          borderRadius: '10px',
                          padding: '12px 8px',
                        }}
                      >
                        <p
                          style={{
                            fontSize: '11px',
                            color: 'var(--text-faint)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '6px',
                          }}
                        >
                          {getLabelFull(p.label)}
                        </p>
                        <p
                          style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            color: '#C6FF00',
                            fontFamily: '"Playfair Display", serif',
                          }}
                        >
                          ₹{Number(p.price).toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Expand short labels to full words in the modal
function getLabelFull(label) {
  const map = {
    Q: 'Quarter', H: 'Half', F: 'Full',
    regular: 'Price',
    half: 'Half', full: 'Full',
  }
  return map[label] || label
}