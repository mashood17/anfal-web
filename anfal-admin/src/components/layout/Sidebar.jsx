import { NavLink, useNavigate } from 'react-router-dom'
import useAuthStore from '@/store/authStore'

const NAV = [
  { to: '/',            label: 'Dashboard',   end: true },
  { to: '/categories',  label: 'Categories'              },
  { to: '/items',       label: 'Menu Items'              },
  { to: '/branding',    label: 'Branding'                },
]

const sidebarStyle = {
  width: '220px',
  minHeight: '100vh',
  backgroundColor: '#111827',
  borderRight: '1px solid #1f2937',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
}

const logoAreaStyle = {
  padding: '24px 20px',
  borderBottom: '1px solid #1f2937',
}

const navStyle = {
  flex: 1,
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
}

const footerStyle = {
  padding: '16px',
  borderTop: '1px solid #1f2937',
}

export default function Sidebar() {
  const logout   = useAuthStore((s) => s.logout)
  const user     = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <aside style={sidebarStyle}>
      <div style={logoAreaStyle}>
        <p style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Admin Panel
        </p>
        <p style={{ color: '#f9fafb', fontWeight: 600, marginTop: '4px' }}>
          Anfal Restaurant
        </p>
      </div>

      <nav style={navStyle}>
        {NAV.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            style={({ isActive }) => ({
              display: 'block',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'all 0.15s',
              backgroundColor: isActive ? 'rgba(198,255,0,0.1)' : 'transparent',
              color: isActive ? '#C6FF00' : '#9ca3af',
              fontWeight: isActive ? 500 : 400,
            })}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div style={footerStyle}>
        <p style={{ fontSize: '12px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {user?.email}
        </p>
        <button
          onClick={handleLogout}
          style={{
            marginTop: '8px',
            fontSize: '12px',
            color: '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
          onMouseOver={(e) => e.target.style.color = '#f87171'}
          onMouseOut={(e) => e.target.style.color = '#6b7280'}
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}