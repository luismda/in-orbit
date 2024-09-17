import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createGoalCompletion } from '../create-goal-completion'

export function useCreateGoalCompletion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createGoalCompletion,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ['summary'] }),
        queryClient.invalidateQueries({ queryKey: ['pending-goals'] }),
      ])
    },
  })
}
