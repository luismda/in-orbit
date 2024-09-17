import { useQuery } from '@tanstack/react-query'

import { getPendingGoals } from '../get-pending-goals'

export function usePendingGoals() {
  return useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60 * 1, // 1 minute
  })
}
