import { useQuery } from '@tanstack/react-query'
import { getMenuItems } from '@/api/menu'

export function useMenuItems(restaurantId) {
  return useQuery({
    queryKey:  ['items', restaurantId],
    queryFn:   () => getMenuItems(restaurantId),
    staleTime: 1000 * 30,    // 30 sec — live menu updates
    enabled:   !!restaurantId,
  })
}