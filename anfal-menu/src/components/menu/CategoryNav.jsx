import { useEffect, useRef } from 'react'
import { motion }            from 'framer-motion'
import useMenuStore          from '@/store/menuStore'

export default function CategoryNav({ categories }) {
  const activeCategoryId    = useMenuStore((s) => s.activeCategoryId)
  const setActiveCategoryId = useMenuStore((s) => s.setActiveCategoryId)
  const navRef              = useRef(null)

  // IntersectionObserver — auto highlight on scroll
  useEffect(() => {
    const observers = []
    categories.forEach((cat) => {
      const el = document.getElementById(`cat-${cat.id}`)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveCategoryId(cat.id) },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [categories, setActiveCategoryId])

  // Scroll active pill into view
  useEffect(() => {
    if (!activeCategoryId || !navRef.current) return
    const btn = navRef.current.querySelector(`[data-cat="${activeCategoryId}"]`)
    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeCategoryId])

  const scrollTo = (id) => {
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: 'smooth' })
    setActiveCategoryId(id)
  }

  return (
    <nav
      ref={navRef}
      className="scrollbar-hide"
      style={{
        display: 'flex',
        gap: '4px',
        overflowX: 'auto',
        padding: '12px 0 10px',
      }}
    >
      {categories.map((cat) => {
        const isActive = cat.id === activeCategoryId
        return (
          <motion.button
            key={cat.id}
            data-cat={cat.id}
            onClick={() => scrollTo(cat.id)}
            whileTap={{ scale: 0.95 }}
            style={{
              flexShrink: 0,
              padding: '6px 14px',
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: isActive ? 600 : 400,
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.02em',
              border: isActive
                ? '1px solid #C6FF00'
                : '1px solid rgba(198,255,0,0.15)',
              backgroundColor: isActive
                ? 'rgba(198,255,0,0.12)'
                : 'transparent',
              color: isActive ? '#C6FF00' : 'var(--text-faint)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {cat.name}
          </motion.button>
        )
      })}
    </nav>
  )
}