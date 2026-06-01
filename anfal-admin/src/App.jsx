import { Routes, Route, Navigate } from 'react-router-dom'
import useAuthStore   from '@/store/authStore'
import AdminLayout    from '@/components/layout/AdminLayout'
import LoginPage      from '@/pages/LoginPage'
import DashboardPage  from '@/pages/DashboardPage'
import CategoriesPage from '@/pages/CategoriesPage'
import ItemsPage      from '@/pages/ItemsPage'
import BrandingPage   from '@/pages/BrandingPage'

function ProtectedRoute({ children }) {
  const token = useAuthStore((s) => s.token)
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}