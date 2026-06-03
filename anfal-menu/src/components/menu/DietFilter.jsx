import { motion } from 'framer-motion'

export default function DietFilter({ active, onChange }) {
  const options = [
    { value: 'all',     label: 'All' },
    { value: 'veg',     label: 'Veg' },
    { value: 'non_veg', label: 'Non-Veg' },
  ]

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 0 6px',
      }}
    >
      {options.map((opt) => {
        const isActive = active === opt.value
        return (
          <motion.button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '4px 14px',
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: isActive ? 600 : 400,
              fontFamily: 'Inter, sans-serif',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: isActive
                ? opt.value === 'veg'
                  ? 'rgba(74,222,128,0.15)'
                  : opt.value === 'non_veg'
                  ? 'rgba(248,113,113,0.15)'
                  : 'rgba(198,255,0,0.12)'
                : 'transparent',
              color: isActive
                ? opt.value === 'veg'
                  ? '#4ade80'
                  : opt.value === 'non_veg'
                  ? '#f87171'
                  : '#C6FF00'
                : 'var(--text-faint)',
              letterSpacing: '0.04em',
            }}
          >
            {opt.value === 'veg' && (
              <span style={{ marginRight: '4px', fontSize: '8px' }}>●</span>
            )}
            {opt.value === 'non_veg' && (
              <span style={{ marginRight: '4px', fontSize: '8px' }}>●</span>
            )}
            {opt.label}
          </motion.button>
        )
      })}
    </div>
  )
}