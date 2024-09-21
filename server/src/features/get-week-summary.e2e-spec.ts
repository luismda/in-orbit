import dayjs from 'dayjs'
import request from 'supertest'

import { app } from '@/http/app'
import { delay } from 'test/utils/delay'
import { makeGoal } from 'test/factories/make-goal'
import { makeGoalCompletion } from 'test/factories/make-goal-completion'

describe('Get week summary (E2E)', () => {
  beforeAll(async () => {
    await app.ready()

    await delay(300)
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /summary', async () => {
    const [firstGoal] = await Promise.all([
      makeGoal({ desiredWeeklyFrequency: 3 }),
      makeGoal({ desiredWeeklyFrequency: 1 }),
      makeGoal({ desiredWeeklyFrequency: 2 }),
    ])

    const today = new Date()
    const formattedToday = dayjs(today).format('YYYY-MM-DD')

    const [firstCompletion, secondCompletion] = await Promise.all([
      makeGoalCompletion({ goalId: firstGoal.id, createdAt: today }),
      makeGoalCompletion({ goalId: firstGoal.id, createdAt: today }),
    ])

    const response = await request(app.server).get('/summary').send()

    expect(response.status).toBe(200)

    expect(response.body).toEqual({
      summary: {
        total: 6,
        completed: 2,
        goalsPerDay: {
          [formattedToday]: expect.arrayContaining([
            expect.objectContaining({
              id: firstCompletion.id,
              title: expect.any(String),
              completedAt: expect.stringContaining(formattedToday),
            }),
            expect.objectContaining({
              id: secondCompletion.id,
              title: expect.any(String),
              completedAt: expect.stringContaining(formattedToday),
            }),
          ]),
        },
      },
    })
  })
})
