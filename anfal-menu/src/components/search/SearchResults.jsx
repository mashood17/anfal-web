import { motion } from 'framer-motion'
import MenuItemRow from '@/components/menu/MenuItemRow'

export default function SearchResults({ results, query }) {
  if (!results || results.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '64px 0' }}>
        <p style={{ fontSize: '14px', color: 'var(--text-faint)' }}>
          No dishes found for "{query}"
        </p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <p
        style={{
          fontSize: '12px',
          color: 'var(--text-faint)',
          marginBottom: '24px',
          letterSpacing: '0.05em',
        }}
      >
        {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
      </p>
      <div>
        {results.map((item) => (
          <MenuItemRow key={item.id} item={item} />
        ))}
      </div>
    </motion.div>
  )
}