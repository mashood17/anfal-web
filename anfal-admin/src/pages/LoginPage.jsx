import { useState }    from 'react'
import { useNavigate } from 'react-router-dom'
import { login }       from '@/api/auth'
import useAuthStore    from '@/store/authStore'
import toast           from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const setAuth                 = useAuthStore((s) => s.login)
  const navigate                = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await login(email, password)
      setAuth(data)
      navigate('/')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs text-gray-500 uppercase tracking-widest">Admin</p>
          <h1 className="text-2xl font-semibold text-white mt-1">Anfal Restaurant</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5
                         text-sm text-white placeholder-gray-500
                         focus:outline-none focus:border-brand-accent/60 transition-colors"
              placeholder="admin@anfal.com"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5
                         text-sm text-white placeholder-gray-500
                         focus:outline-none focus:border-brand-accent/60 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-accent text-gray-950 font-semibold text-sm
                       py-2.5 rounded-lg hover:bg-brand-accent/90 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}