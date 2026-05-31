const STORAGE_URL = import.meta.env.VITE_SUPABASE_STORAGE_URL

// Builds a Supabase Storage public URL
// Falls back to a local placeholder so dev works without images
export function imageUrl(path, fallback = '/placeholder-food.webp') {
  if (!path) return fallback
  if (path.startsWith('http')) return path
  return `${STORAGE_URL}/${path}`
}