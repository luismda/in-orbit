import { Loader, Plus } from 'lucide-react'

import { LoadingGoals } from './loading-goals'
import { OutlineButton } from './ui/outline-button'

import { usePendingGoals } from '@/http/hooks/use-pending-goals'
import { useCreateGoalCompletion } from '@/http/hooks/use-create-goal-completion'

export function PendingGoals() {
  const { data, isLoading: isLoadingPendingGoals } = usePendingGoals()

  const {
    variables: currentGoalId,
    mutate: createGoalCompletion,
    isPending: isCreatingGoalCompletion,
  } = useCreateGoalCompletion()

  function handleCreateGoalCompletion(goalId: string) {
    createGoalCompletion(goalId)
  }

  if (isLoadingPendingGoals) {
    return (
      <div className="flex items-center justify-center h-10">
        <LoadingGoals />
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map(goal => {
        const isFullCompleted =
          goal.completionCount >= goal.desiredWeeklyFrequency

        const isLoading = isCreatingGoalCompletion && currentGoalId === goal.id

        return (
          <OutlineButton
            key={goal.id}
            disabled={isFullCompleted || isLoading}
            onClick={() => handleCreateGoalCompletion(goal.id)}
          >
            {isLoading ? (
              <Loader className="size-4 text-zinc-600 animate-spin" />
            ) : (
              <Plus className="size-4 text-zinc-600" />
            )}

            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
