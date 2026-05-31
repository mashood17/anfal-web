import { motion } from 'framer-motion'
import useMenuStore from '@/store/menuStore'
import { imageUrl } from '@/utils/imageUrl'
import { formatSinglePrice, formatVariantPrices } from '@/utils/formatPrice'
import Badge    from '@/components/ui/Badge'
import FoodLabel from '@/components/ui/FoodLabel'

export default function MenuItemCard({ item }) {
  const openModal = useMenuStore((s) => s.openModal)
  const hasVariants = item.prices?.length > 1
  const isSinglePrice = item.prices?.length === 1

  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={() => openModal(item)}
      className="flex items-start gap-3 py-4 border-b border-white/5 
                 cursor-pointer group last:border-0"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && openModal(item)}
      aria-label={`View details for ${item.name}`}
    >
      {/* Text block */}
      <div className="flex-1 min-w-0 space-y-1">
        {/* Name + badges row */}
        <div className="flex items-center gap-2 flex-wrap">
          <FoodLabel type={item.food_type} />
          <h3 className="font-body font-medium text-sm text-white/90 group-hover:text-white 
                         transition-colors leading-snug">
            {item.name}
          </h3>
          {item.badge && <Badge type={item.badge} />}
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Price */}
        <div className="pt-1">
          {isSinglePrice && (
            <span className="text-sm font-semibold text-brand-accent font-body">
              {formatSinglePrice(item.prices[0].price)}
            </span>
          )}

          {hasVariants && (
            <div className="flex gap-4">
              {formatVariantPrices(item.prices).map(({ label, display }) => (
                <div key={label} className="text-center">
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">{label}</div>
                  <div className="text-sm font-semibold text-brand-accent">{display}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image */}
      {item.image && (
        <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-surface">
          <img
            src={imageUrl(item.image)}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}
    </motion.article>
  )
}