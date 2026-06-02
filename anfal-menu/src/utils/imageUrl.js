const STORAGE_URL = import.meta.env.VITE_SUPABASE_STORAGE_URL

// Category placeholder — elegant dark green gradient SVG
const CATEGORY_PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230D3615'/%3E%3Cstop offset='100%25' stop-color='%230A2E12'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)'/%3E%3C/svg%3E`

// Item placeholder — square
const ITEM_PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230F3D18'/%3E%3Cstop offset='100%25' stop-color='%230A2E12'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='400' fill='url(%23g)'/%3E%3Ctext x='200' y='210' text-anchor='middle' font-family='Georgia,serif' font-size='48' fill='%23C6FF0030'%3E✦%3C/text%3E%3C/svg%3E`

export function imageUrl(path, type = 'item') {
  if (!path) return type === 'category' ? CATEGORY_PLACEHOLDER : ITEM_PLACEHOLDER
  if (path.startsWith('http') || path.startsWith('data:')) return path
  return `${STORAGE_URL}/${path}`
}

export function categoryImageUrl(path) {
  return imageUrl(path, 'category')
}