import { useParams }      from 'react-router-dom'
import { useRestaurant }  from '@/hooks/useRestaurant'
import { useCategories }  from '@/hooks/useCategories'
import { useMenuItems }   from '@/hooks/useMenuItems'
import { useSearch }      from '@/hooks/useSearch'
import useMenuStore       from '@/store/menuStore'

import CategoryNav     from '@/components/menu/CategoryNav'
import CategorySection from '@/components/menu/CategorySection'
import SearchBar       from '@/components/search/SearchBar'
import SearchResults   from '@/components/search/SearchResults'
import Footer          from '@/components/ui/Footer'
import ScrollToTop     from '@/components/ui/ScrollToTop'
import MenuHeader      from '@/components/menu/MenuHeader'

export default function MenuPage({ slug: slugProp }) {
  const { slug: slugParam } = useParams()
  const slug = slugProp || slugParam || 'anfal'

  const { data: restaurant, isLoading } = useRestaurant(slug)
  const { data: categories = [] }       = useCategories(restaurant?.id)
  const { data: items = [] }            = useMenuItems(restaurant?.id)
  const searchQuery                     = useMenuStore((s) => s.searchQuery)
  const searchResults                   = useSearch(items, categories)

  if (isLoading) return <PageLoader />

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--brand-dark)' }}>

      {/* Compact header — logo + restaurant name */}
      <MenuHeader restaurant={restaurant} />

      {/* Sticky nav + search */}
      <div
        className="sticky top-0 z-40"
        style={{
          backgroundColor: 'rgba(10,46,18,0.97)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(198,255,0,0.08)',
        }}
      >
        <div className="container-menu">
          <CategoryNav categories={categories} />
          <div className="pb-2">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Menu content */}
      <main className="container-menu py-8 sm:py-12">
        {searchQuery.trim() ? (
          <SearchResults results={searchResults} query={searchQuery} />
        ) : (
          <div className="space-y-0">
            {categories.map((cat, index) => (
              <CategorySection
                key={cat.id}
                category={cat}
                items={items.filter((i) => i.category_id === cat.id)}
                index={index}
              />
            ))}
          </div>
        )}
      </main>

      <Footer restaurant={restaurant} />
      <ScrollToTop />
    </div>
  )
}

function PageLoader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'var(--brand-dark)' }}
    >
      <div
        className="w-6 h-6 rounded-full border-2 animate-spin"
        style={{ borderColor: 'rgba(198,255,0,0.2)', borderTopColor: '#C6FF00' }}
      />
    </div>
  )
}