import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-center px-4">
      <p className="font-display text-8xl font-bold text-brand-accent/20 select-none">404</p>
      <h1 className="font-display text-2xl font-semibold text-white mt-2">Page not found</h1>
      <p className="text-sm text-white/40 mt-2 mb-6">
        The menu page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 border border-brand-accent text-brand-accent text-sm 
                   tracking-widest uppercase hover:bg-brand-accent hover:text-brand-dark 
                   transition-all duration-300"
      >
        Back to Menu
      </Link>
    </div>
  )
}