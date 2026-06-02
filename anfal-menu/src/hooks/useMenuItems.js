import { useQuery } from '@tanstack/react-query'
import { getMenuItems } from '@/api/menu'

export function useMenuItems(restaurantId) {
  return useQuery({
    queryKey:  ['items', restaurantId],
    queryFn:   () => getMenuItems(restaurantId),
    staleTime: 1000 * 60 * 2,   // 2 min
    enabled:   !!restaurantId,
  })
}