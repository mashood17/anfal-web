import { useParams } from 'react-router-dom'
import { useRestaurant } from '@/hooks/useRestaurant'
import { useCategories }  from '@/hooks/useCategories'
import { useMenuItems }   from '@/hooks/useMenuItems'
import { useSearch }      from '@/hooks/useSearch'
import useMenuStore       from '@/store/menuStore'


import HeroSection      from '@/components/hero/HeroSection'
import FeaturedItems    from '@/components/menu/FeaturedItems'
import CategoryNav      from '@/components/menu/CategoryNav'
import SearchBar        from '@/components/search/SearchBar'
import CategorySection  from '@/components/menu/CategorySection'
import ItemModal        from '@/components/menu/ItemModal'
import Footer           from '@/components/ui/Footer'
import MenuItemCard     from '@/components/menu/MenuItemCard'

export default function MenuPage({ slug: slugProp }) {
  // Support both hardcoded slug (/) and dynamic /:slug
  const { slug: slugParam } = useParams()
  const searchQuery = useMenuStore((s) => s.searchQuery)
  const slug = slugProp || slugParam || 'anfal'

  const { data: restaurant, isLoading: resLoading } = useRestaurant(slug)
  const { data: categories = [] } = useCategories(restaurant?.id)
  const { data: items = [] }      = useMenuItems(restaurant?.id)
  const selectedItem              = useMenuStore((s) => s.selectedItem)

  const searchResults = useSearch(items, categories)
  // null = no search active, show full menu
  // [] = search active but no results
  // [...] = search results

  if (resLoading) return <FullScreenLoader />

  return (
    <main>
      <HeroSection restaurant={restaurant} />
      <FeaturedItems items={items.filter((i) => i.badge === 'best_seller')} />

      <div className="sticky top-0 z-40 bg-brand-dark/95 backdrop-blur-sm border-b border-white/5">
        <div className="section-container">
          <CategoryNav categories={categories} />
          <SearchBar />
        </div>
      </div>

      <div className="section-container py-10 space-y-16">
        {searchResults !== null ? (
          // Search mode: flat list, no category grouping
          <div className="space-y-2">
            {searchResults.length === 0 ? (
                <p className="text-sm text-white/40 py-8 text-center">
                No items found for "{searchQuery}"
                </p>
            ) : (
                searchResults.map((item) => <MenuItemCard key={item.id} item={item} />)
            )}
            </div>
        ) : (
          categories.map((cat) => (
            <CategorySection
              key={cat.id}
              category={cat}
              items={items.filter((i) => i.category_id === cat.id)}
            />
          ))
        )}
      </div>

      <Footer restaurant={restaurant} />

      {selectedItem && <ItemModal item={selectedItem} />}
    </main>
  )
}

function FullScreenLoader() {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
    </div>
  )
}