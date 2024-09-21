import request from 'supertest'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { app } from '@/http/app'
import { goalCompletions } from '@/db/schema'
import { makeGoal } from 'test/factories/make-goal'
import { makeGoalCompletion } from 'test/factories/make-goal-completion'

describe('Create goal completion (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] /completions (success)', async () => {
    const goal = await makeGoal()

    const response = await request(app.server).post('/completions').send({
      goalId: goal.id,
    })

    expect(response.status).toBe(201)

    const goalCompletionsOnDatabase = await db
      .select()
      .from(goalCompletions)
      .where(eq(goalCompletions.goalId, goal.id))

    expect(goalCompletionsOnDatabase).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        goalId: goal.id,
        createdAt: expect.any(Date),
      }),
    ])
  })

  test('[POST] /completions (error)', async () => {
    const goal = await makeGoal({
      desiredWeeklyFrequency: 1,
    })

    await makeGoalCompletion({
      goalId: goal.id,
    })

    const response = await request(app.server).post('/completions').send({
      goalId: goal.id,
    })

    expect(response.status).toBe(500)

    const goalCompletionsOnDatabase = await db
      .select()
      .from(goalCompletions)
      .where(eq(goalCompletions.goalId, goal.id))

    expect(goalCompletionsOnDatabase).toHaveLength(1)
  })
})
