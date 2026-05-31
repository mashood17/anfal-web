import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ListOrdered, UtensilsCrossed, Palette, LogOut } from 'lucide-react'
import useAuthStore from '@/store/authStore'

const NAV = [
  { to: '/',           label: 'Dashboard',  icon: LayoutDashboard, end: true },
  { to: '/categories', label: 'Categories', icon: ListOrdered },
  { to: '/items',      label: 'Menu Items', icon: UtensilsCrossed },
  { to: '/branding',   label: 'Branding',   icon: Palette },
]

export default function Sidebar() {
  const logout   = useAuthStore((s) => s.logout)
  const user     = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <aside className="w-56 shrink-0 flex flex-col bg-gray-900 border-r border-gray-800">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-gray-800">
        <p className="text-xs text-gray-500 uppercase tracking-widest">Admin Panel</p>
        <p className="text-white font-semibold mt-0.5">Anfal Restaurant</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-brand-accent/10 text-brand-accent font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User + logout */}
      <div className="px-4 py-4 border-t border-gray-800">
        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mt-2 text-xs text-gray-500 
                     hover:text-red-400 transition-colors"
        >
          <LogOut size={13} /> Sign out
        </button>
      </div>
    </aside>
  )
}