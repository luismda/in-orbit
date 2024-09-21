import request from 'supertest'

import { app } from '@/http/app'
import { delay } from 'test/utils/delay'
import { makeGoal } from 'test/factories/make-goal'
import { makeGoalCompletion } from 'test/factories/make-goal-completion'

describe('Get week pending goals (E2E)', () => {
  beforeAll(async () => {
    await app.ready()

    await delay(200)
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /pending-goals', async () => {
    const [firstGoal, secondGoal, thirdGoal] = await Promise.all([
      makeGoal({ desiredWeeklyFrequency: 3 }),
      makeGoal(),
      makeGoal(),
    ])

    await Promise.all([
      makeGoalCompletion({ goalId: firstGoal.id }),
      makeGoalCompletion({ goalId: firstGoal.id }),
    ])

    const response = await request(app.server).get('/pending-goals').send()

    expect(response.status).toBe(200)

    expect(response.body).toEqual({
      pendingGoals: expect.arrayContaining([
        expect.objectContaining({
          id: firstGoal.id,
          title: firstGoal.title,
          desiredWeeklyFrequency: 3,
          completionCount: 2,
        }),
        expect.objectContaining({
          id: secondGoal.id,
          title: secondGoal.title,
          desiredWeeklyFrequency: secondGoal.desiredWeeklyFrequency,
          completionCount: 0,
        }),
        expect.objectContaining({
          id: thirdGoal.id,
          title: thirdGoal.title,
          desiredWeeklyFrequency: thirdGoal.desiredWeeklyFrequency,
          completionCount: 0,
        }),
      ]),
    })
  })
})
