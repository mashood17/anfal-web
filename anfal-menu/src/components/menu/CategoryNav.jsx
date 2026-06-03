import { useEffect, useRef, useState } from 'react'
import { motion }                       from 'framer-motion'
import useMenuStore                     from '@/store/menuStore'

export default function CategoryNav({ categories }) {
  const activeCategoryId    = useMenuStore((s) => s.activeCategoryId)
  const setActiveCategoryId = useMenuStore((s) => s.setActiveCategoryId)
  const navRef              = useRef(null)

  // IntersectionObserver — auto highlight active category on scroll
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

  // Smooth scroll active chip to center of nav bar
  useEffect(() => {
    if (!activeCategoryId || !navRef.current) return
    const nav = navRef.current
    const btn = nav.querySelector(`[data-cat="${activeCategoryId}"]`)
    if (!btn) return

    const navCenter  = nav.offsetWidth / 2
    const btnCenter  = btn.offsetLeft + btn.offsetWidth / 2
    const scrollTo   = btnCenter - navCenter

    nav.scrollTo({ left: scrollTo, behavior: 'smooth' })
  }, [activeCategoryId])

  const handleClick = (id) => {
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
        padding: '10px 0 8px',
      }}
    >
      {categories.map((cat) => {
        const isActive = cat.id === activeCategoryId
        return (
          <motion.button
            key={cat.id}
            data-cat={cat.id}
            onClick={() => handleClick(cat.id)}
            whileTap={{ scale: 0.94 }}
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
              position: 'relative',
            }}
          >
            {cat.name}
            {/* Active underline indicator */}
            {isActive && (
              <motion.span
                layoutId="nav-indicator"
                style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: '#C6FF00',
                  display: 'block',
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        )
      })}
    </nav>
  )
}