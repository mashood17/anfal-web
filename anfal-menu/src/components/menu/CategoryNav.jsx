import { useEffect, useRef } from 'react'
import useMenuStore from '@/store/menuStore'

export default function CategoryNav({ categories }) {
  const activeCategoryId = useMenuStore((s) => s.activeCategoryId)
  const setActiveCategoryId = useMenuStore((s) => s.setActiveCategoryId)
  const navRef = useRef(null)

  // Intersection Observer: auto-highlight active category on scroll
  useEffect(() => {
    const observers = []

    categories.forEach((cat) => {
      const el = document.getElementById(`category-${cat.id}`)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveCategoryId(cat.id)
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [categories, setActiveCategoryId])

  // Auto-scroll active pill into view on mobile
  useEffect(() => {
    if (!activeCategoryId || !navRef.current) return
    const activeBtn = navRef.current.querySelector(`[data-id="${activeCategoryId}"]`)
    activeBtn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeCategoryId])

  const scrollTo = (id) => {
    document.getElementById(`category-${id}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      ref={navRef}
      data-menu-start
      className="flex gap-1 overflow-x-auto py-3 scrollbar-hide 
                 sm:justify-center sm:flex-wrap"
      aria-label="Menu categories"
    >
      {categories.map((cat) => {
        const isActive = cat.id === activeCategoryId
        return (
          <button
            key={cat.id}
            data-id={cat.id}
            onClick={() => scrollTo(cat.id)}
            className={`
              shrink-0 px-4 py-1.5 rounded-full text-xs font-body font-medium
              tracking-wide transition-all duration-200
              ${isActive
                ? 'bg-brand-accent text-brand-dark'
                : 'text-white/60 hover:text-white border border-white/10 hover:border-white/30'
              }
            `}
          >
            {cat.name}
          </button>
        )
      })}
    </nav>
  )
}