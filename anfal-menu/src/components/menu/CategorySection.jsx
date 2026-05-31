import { useRef, useEffect } from 'react'
import MenuItemCard from './MenuItemCard'

export default function CategorySection({ category, items }) {
  const ref = useRef(null)

  // Register this element so CategoryNav IntersectionObserver can find it
  return (
    <section
      id={`category-${category.id}`}
      ref={ref}
      aria-label={category.name}
    >
      {/* Category header */}
      <div className="mb-6">
        {category.banner && (
          <div className="relative h-32 sm:h-40 rounded-xl overflow-hidden mb-4">
            <img
              src={category.banner}
              alt={category.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h2 className="font-display text-2xl font-bold text-white tracking-wide">
                {category.name}
              </h2>
              {category.description && (
                <p className="text-xs text-white/60 tracking-widest uppercase mt-0.5">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        )}

        {!category.banner && (
          <div className="pb-3 border-b border-white/10">
            <h2 className="font-display text-2xl font-semibold text-white accent-underline pb-2">
              {category.name}
            </h2>
            {category.description && (
              <p className="text-xs text-white/40 tracking-widest uppercase mt-2">
                {category.description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Items */}
      <div>
        {items.length === 0 ? (
          <p className="text-sm text-white/30 py-4">No items available</p>
        ) : (
          items.map((item) => <MenuItemCard key={item.id} item={item} />)
        )}
      </div>
    </section>
  )
}