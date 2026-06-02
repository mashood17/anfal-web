import { useQuery } from '@tanstack/react-query'
import { getRestaurant } from '@/api/menu'

export function useRestaurant(slug) {
  return useQuery({
    queryKey:  ['restaurant', slug],
    queryFn:   () => getRestaurant(slug),
    staleTime: 1000 * 60 * 10,  // 10 min — restaurant data rarely changes
    enabled:   !!slug,
  })
}