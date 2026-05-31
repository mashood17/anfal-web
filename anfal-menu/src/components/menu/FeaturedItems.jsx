import { motion } from 'framer-motion'
import useMenuStore from '@/store/menuStore'
import { imageUrl } from '@/utils/imageUrl'
import { formatSinglePrice } from '@/utils/formatPrice'
import Badge from '@/components/ui/Badge'
import FoodLabel from '@/components/ui/FoodLabel'

export default function FeaturedItems({ items = [] }) {
  const openModal = useMenuStore((s) => s.openModal)

  if (!items.length) return null

  return (
    <section className="py-10 border-b border-white/5">
      <div className="section-container">
        <h2 className="font-display text-2xl font-semibold text-white mb-6 accent-underline pb-2">
          Featured Items
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.slice(0, 6).map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              onClick={() => openModal(item)}
              className="bg-surface rounded-xl overflow-hidden cursor-pointer group"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openModal(item)}
              aria-label={`View details for ${item.name}`}
            >
              <div className="relative h-32 sm:h-40 overflow-hidden">
                <img
                  src={imageUrl(item.image)}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {item.badge && (
                  <div className="absolute top-2 left-2">
                    <Badge type={item.badge} />
                  </div>
                )}
              </div>

              <div className="p-3 space-y-1">
                <div className="flex items-center gap-1.5">
                  <FoodLabel type={item.food_type} />
                  <h3 className="text-xs font-medium text-white/90 truncate leading-snug">
                    {item.name}
                  </h3>
                </div>
                {item.prices?.[0] && (
                  <p className="text-sm font-semibold text-brand-accent">
                    {formatSinglePrice(item.prices[0].price)}
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}