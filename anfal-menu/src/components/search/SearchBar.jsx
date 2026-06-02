import { useDebouncedCallback } from 'use-debounce'
import useMenuStore from '@/store/menuStore'

export default function SearchBar() {
  const setSearchQuery = useMenuStore((s) => s.setSearchQuery)
  const searchQuery    = useMenuStore((s) => s.searchQuery)

  const debounced = useDebouncedCallback((v) => setSearchQuery(v), 250)

  return (
    <div style={{ position: 'relative', paddingBottom: '2px' }}>
      <svg
        style={{
          position: 'absolute', left: '12px',
          top: '50%', transform: 'translateY(-50%)',
          width: '14px', height: '14px',
          color: 'var(--text-faint)', pointerEvents: 'none',
        }}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>

      <input
        type="search"
        placeholder="Search dishes..."
        onChange={(e) => debounced(e.target.value)}
        style={{
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(198,255,0,0.1)',
          borderRadius: '8px',
          padding: '8px 36px',
          fontSize: '13px',
          color: 'var(--text-primary)',
          outline: 'none',
          fontFamily: 'Inter, sans-serif',
        }}
      />

      {searchQuery && (
        <button
          onClick={() => { setSearchQuery(''); debounced.cancel() }}
          style={{
            position: 'absolute', right: '10px',
            top: '50%', transform: 'translateY(-50%)',
            color: 'var(--text-faint)', background: 'none',
            border: 'none', cursor: 'pointer', fontSize: '16px',
            lineHeight: 1,
          }}
        >×</button>
      )}
    </div>
  )
}