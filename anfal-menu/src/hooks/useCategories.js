import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/api/menu'

export function useCategories(restaurantId) {
  return useQuery({
    queryKey:  ['categories', restaurantId],
    queryFn:   () => getCategories(restaurantId),
    staleTime: 1000 * 60 * 5,   // 5 min
    enabled:   !!restaurantId,
  })
}