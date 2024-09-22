import { http, HttpResponse } from 'msw'

import type { CreateGoalRequest } from '../create-goal'

export const createGoalMock = http.post<never, CreateGoalRequest>(
  '/goals',
  async ({ request }) => {
    const { title } = await request.json()

    if (title === 'error-goal-title') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 201 })
  }
)
