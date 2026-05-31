import { useQuery }  from '@tanstack/react-query'
import { getAdminCategories, getAdminItems } from '@/api/menu'
import { LayoutDashboard } from 'lucide-react'

export default function DashboardPage() {
  const { data: categories = [] } = useQuery({ queryKey: ['admin-cats'],   queryFn: getAdminCategories })
  const { data: items = [] }      = useQuery({ queryKey: ['admin-items'],  queryFn: getAdminItems })
  const featured                  = items.filter((i) => i.badge === 'best_seller')

  const stats = [
    { label: 'Categories',    value: categories.length },
    { label: 'Menu Items',    value: items.length },
    { label: 'Featured',      value: featured.length },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Welcome back</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <p className="text-sm font-medium text-white mb-3">Quick actions</p>
        <div className="flex gap-3">
          <a href="/categories"
             className="text-xs px-4 py-2 bg-gray-800 hover:bg-gray-700 
                        text-gray-300 rounded-lg transition-colors">
            Manage Categories
          </a>
          <a href="/items"
             className="text-xs px-4 py-2 bg-gray-800 hover:bg-gray-700 
                        text-gray-300 rounded-lg transition-colors">
            Manage Items
          </a>
          <a href="/branding"
             className="text-xs px-4 py-2 bg-gray-800 hover:bg-gray-700 
                        text-gray-300 rounded-lg transition-colors">
            Edit Branding
          </a>
        </div>
      </div>
    </div>
  )
}