import { api } from '@/lib/axios'

export async function createGoalCompletion(goalId: string) {
  await api.post('/completions', {
    goalId,
  })
}
