import { useMemo } from 'react'
import useMenuStore from '@/store/menuStore'

// Searches across name + description + category name
export function useSearch(items = [], categories = []) {
  const query = useMenuStore((s) => s.searchQuery)
  const q = query.trim().toLowerCase()

  const categoryMap = useMemo(() => {
    return Object.fromEntries(categories.map((c) => [c.id, c.name.toLowerCase()]))
  }, [categories])

  return useMemo(() => {
    if (!q) return null   // null = show full menu
    return items.filter((item) => {
      const cat = categoryMap[item.category_id] || ''
      return (
        item.name.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        cat.includes(q)
      )
    })
  }, [items, q, categoryMap])
}