import { http, HttpResponse } from 'msw'

import type { GetPendingGoalsResponse } from '../get-pending-goals'

type GetPendingGoalsMockResponse = {
  pendingGoals: GetPendingGoalsResponse
}

export const getPendingGoalsMock = http.get<
  never,
  never,
  GetPendingGoalsMockResponse
>('/pending-goals', () => {
  return HttpResponse.json({
    pendingGoals: [
      {
        id: 'goal-1',
        title: 'Nadar',
        desiredWeeklyFrequency: 2,
        completionCount: 1,
      },
      {
        id: 'goal-2',
        title: 'Estudar idiomas',
        desiredWeeklyFrequency: 1,
        completionCount: 1,
      },
      {
        id: 'goal-3',
        title: 'Ler um livro',
        desiredWeeklyFrequency: 4,
        completionCount: 0,
      },
    ],
  })
})
