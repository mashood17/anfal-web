import { useQuery } from '@tanstack/react-query'
import { getAdminCategories, getAdminItems } from '@/api/menu'
import { useNavigate } from 'react-router-dom'

const card = {
  backgroundColor: '#111827',
  border: '1px solid #1f2937',
  borderRadius: '12px',
  padding: '20px',
}

export default function DashboardPage() {
  const { data: categories = [] } = useQuery({ queryKey: ['admin-cats'],  queryFn: getAdminCategories })
  const { data: items = [] }      = useQuery({ queryKey: ['admin-items'], queryFn: getAdminItems })
  const featured                  = items.filter((i) => i.badge === 'best_seller')
  const navigate                  = useNavigate()

  const stats = [
    { label: 'Categories', value: categories.length },
    { label: 'Menu Items', value: items.length },
    { label: 'Featured',   value: featured.length },
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 600, color: '#f9fafb' }}>Dashboard</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Welcome back</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {stats.map(({ label, value }) => (
          <div key={label} style={card}>
            <p style={{ fontSize: '32px', fontWeight: 700, color: '#f9fafb' }}>{value}</p>
            <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={card}>
        <p style={{ fontSize: '14px', fontWeight: 500, color: '#f9fafb', marginBottom: '12px' }}>
          Quick actions
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { label: 'Manage Categories', path: '/categories' },
            { label: 'Manage Items',      path: '/items' },
            { label: 'Edit Branding',     path: '/branding' },
          ].map(({ label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#d1d5db',
                fontSize: '13px',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#374151'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}