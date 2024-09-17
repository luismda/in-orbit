import { api } from '@/lib/axios'

export type GetPendingGoalsResponse = {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}[]

export async function getPendingGoals(): Promise<GetPendingGoalsResponse> {
  const { data } = await api.get('/pending-goals')

  return data.pendingGoals
}
