import { Routes, Route } from 'react-router-dom'
import MenuPage  from '@/pages/MenuPage'
import NotFound  from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      {/* 
        SaaS-ready: today this is /anfal. 
        When you add Restaurant B, just add a route for /restaurant-b 
        pointing to the same MenuPage with a different slug param.
        
        Even simpler: use a dynamic route from the start.
      */}
      <Route path="/"       element={<MenuPage slug="anfal" />} />
      <Route path="/:slug"  element={<MenuPage />} />
      <Route path="*"       element={<NotFound />} />
    </Routes>
  )
}