import { Routes, Route, Navigate } from 'react-router-dom'
import MenuPage  from '@/pages/MenuPage'
import NotFound  from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/"       element={<MenuPage slug="anfal" />} />
      <Route path="/:slug"  element={<MenuPage />} />
      <Route path="*"       element={<NotFound />} />
    </Routes>
  )
}