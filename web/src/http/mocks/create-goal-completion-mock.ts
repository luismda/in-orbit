import { http, HttpResponse } from 'msw'

type CreateGoalCompletionMockBody = {
  goalId: string
}

export const createGoalCompletionMock = http.post<
  never,
  CreateGoalCompletionMockBody
>('/completions', async ({ request }) => {
  const { goalId } = await request.json()

  if (goalId === 'error-goal-id') {
    return new HttpResponse(null, { status: 400 })
  }

  return new HttpResponse(null, { status: 201 })
})
