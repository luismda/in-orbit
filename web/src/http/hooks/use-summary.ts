import { useQuery } from '@tanstack/react-query'

import { getSummary } from '../get-summary'

export function useSummary() {
  return useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60 * 1, // 1 minute
  })
}
