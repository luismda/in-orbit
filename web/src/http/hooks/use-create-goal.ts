import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createGoal } from '../create-goal'

export function useCreateGoal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ['summary'] }),
        queryClient.invalidateQueries({ queryKey: ['pending-goals'] }),
      ])
    },
  })
}
