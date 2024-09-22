import dayjs from 'dayjs'
import { http, HttpResponse } from 'msw'

import type { GetSummaryResponse } from '../get-summary'

type GetSummaryMockResponse = {
  summary: GetSummaryResponse
}

export const getSummaryMock = http.get<never, never, GetSummaryMockResponse>(
  '/summary',
  () => {
    const firstDayOfWeek = dayjs().startOf('week')

    return HttpResponse.json({
      summary: {
        total: 9,
        completed: 2,
        goalsPerDay: {
          [firstDayOfWeek.format('YYYY-MM-DD')]: [
            {
              id: 'goal-1',
              title: 'Nadar',
              completedAt: firstDayOfWeek
                .set('hour', 9)
                .set('minutes', 27)
                .toISOString(),
            },
            {
              id: 'goal-2',
              title: 'Estudar idiomas',
              completedAt: firstDayOfWeek
                .set('hour', 10)
                .set('minutes', 49)
                .toISOString(),
            },
          ],
        },
      },
    })
  }
)
