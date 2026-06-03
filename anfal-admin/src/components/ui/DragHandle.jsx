export default function DragHandle({ listeners, attributes }) {
  return (
    <div
      {...listeners}
      {...attributes}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
        padding: '8px 6px',
        cursor: 'grab',
        flexShrink: 0,
        opacity: 0.35,
        touchAction: 'none',
      }}
      onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
      onMouseOut={(e) => e.currentTarget.style.opacity = '0.35'}
      title="Drag to reorder"
      aria-label="Drag to reorder"
    >
      {[0, 1].map((row) => (
        <div key={row} style={{ display: 'flex', gap: '3px' }}>
          {[0, 1].map((col) => (
            <div
              key={col}
              style={{
                width: '3px', height: '3px',
                borderRadius: '50%',
                backgroundColor: '#9ca3af',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}