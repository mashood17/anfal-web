import { Routes, Route } from 'react-router-dom'
import Sidebar        from './Sidebar'
import DashboardPage  from '@/pages/DashboardPage'
import CategoriesPage from '@/pages/CategoriesPage'
import ItemsPage      from '@/pages/ItemsPage'
import BrandingPage   from '@/pages/BrandingPage'

export default function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto', backgroundColor: '#030712' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
          <Routes>
            <Route index           element={<DashboardPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="items"      element={<ItemsPage />} />
            <Route path="branding"   element={<BrandingPage />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}