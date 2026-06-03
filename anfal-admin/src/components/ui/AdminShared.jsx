// ── Shared small components ───────────────────────────────────

export function IconBtn({ onClick, label, hoverColor, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{ padding: '7px', background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', borderRadius: '6px', fontSize: '15px', lineHeight: 1 }}
      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.color = hoverColor }}
      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6b7280' }}
    >
      {children}
    </button>
  )
}

export function SearchInput({ value, onChange, placeholder }) {
  return (
    <div style={{ position: 'relative' }}>
      <svg
        style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#4b5563', pointerEvents: 'none' }}
        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%', padding: '10px 36px 10px 36px',
          backgroundColor: '#111827', border: '1px solid #1f2937',
          borderRadius: '10px', color: '#f9fafb', fontSize: '13px', outline: 'none',
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#C6FF00' }}
        onBlur={(e) => { e.currentTarget.style.borderColor = '#1f2937' }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
            width: '20px', height: '20px', backgroundColor: '#1f2937', border: 'none',
            borderRadius: '50%', color: '#9ca3af', cursor: 'pointer', fontSize: '11px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >✕</button>
      )}
    </div>
  )
}

export function EmptyState({ message }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 0' }}>
      <p style={{ fontSize: '13px', color: '#6b7280' }}>{message}</p>
    </div>
  )
}