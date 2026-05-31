import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useMenuStore from '@/store/menuStore'
import { imageUrl } from '@/utils/imageUrl'
import { formatSinglePrice, formatVariantPrices } from '@/utils/formatPrice'
import Badge    from '@/components/ui/Badge'
import FoodLabel from '@/components/ui/FoodLabel'

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
}

const modalVariants = {
  hidden:  { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 30, stiffness: 300 } },
  exit:    { opacity: 0, y: '100%', transition: { duration: 0.2 } },
}

export default function ItemModal() {
  const item      = useMenuStore((s) => s.selectedItem)
  const closeModal = useMenuStore((s) => s.closeModal)

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [closeModal])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = item ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [item])

  const hasVariants = item?.prices?.length > 1

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Sheet — slides up from bottom on mobile, centered on desktop */}
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed z-50 bg-surface rounded-t-2xl sm:rounded-2xl
                       bottom-0 left-0 right-0
                       sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2
                       sm:left-1/2 sm:-translate-x-1/2 sm:w-[480px]
                       max-h-[85vh] overflow-y-auto"
          >
            {/* Handle bar (mobile) */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Image */}
            {item.image && (
              <div className="w-full h-56 sm:h-64 overflow-hidden sm:rounded-t-2xl">
                <img
                  src={imageUrl(item.image)}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-5 space-y-3">
              {/* Title row */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FoodLabel type={item.food_type} />
                    {item.badge && <Badge type={item.badge} />}
                  </div>
                  <h2 id="modal-title" className="font-display text-xl font-semibold text-white">
                    {item.name}
                  </h2>
                </div>

                <button
                  onClick={closeModal}
                  className="shrink-0 w-8 h-8 flex items-center justify-center 
                             rounded-full bg-white/10 hover:bg-white/20 transition-colors
                             text-white/60 text-lg leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-sm text-white/60 leading-relaxed">
                  {item.description}
                </p>
              )}

              {/* Price */}
              <div className="pt-2">
                {!hasVariants && item.prices?.[0] && (
                  <span className="text-2xl font-bold text-brand-accent font-body">
                    {formatSinglePrice(item.prices[0].price)}
                  </span>
                )}

                {hasVariants && (
                  <div className="flex gap-6">
                    {formatVariantPrices(item.prices).map(({ label, display }) => (
                      <div key={label} className="text-center">
                        <div className="text-xs text-white/40 uppercase tracking-widest mb-1">{label}</div>
                        <div className="text-xl font-bold text-brand-accent">{display}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}