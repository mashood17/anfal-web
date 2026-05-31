import { useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import useMenuStore from '@/store/menuStore'

// Install: npm install use-debounce
export default function SearchBar() {
  const setSearchQuery = useMenuStore((s) => s.setSearchQuery)
  const searchQuery    = useMenuStore((s) => s.searchQuery)

  const debounced = useDebouncedCallback((value) => {
    setSearchQuery(value)
  }, 250)

  return (
    <div className="relative py-2">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>

      <input
        type="search"
        placeholder="Search menu..."
        onChange={(e) => debounced(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-full
                   pl-9 pr-4 py-2 text-sm text-white placeholder-white/30
                   focus:outline-none focus:border-brand-accent/50
                   transition-colors"
        aria-label="Search menu items"
      />

      {searchQuery && (
        <button
          onClick={() => { setSearchQuery(''); debounced.cancel() }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 
                     hover:text-white/60 transition-colors text-lg leading-none"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  )
}