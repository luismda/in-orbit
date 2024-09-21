import request from 'supertest'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { app } from '@/http/app'
import { goals } from '@/db/schema'

describe('Create goal (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] /goals', async () => {
    const response = await request(app.server).post('/goals').send({
      title: 'New goal',
      desiredWeeklyFrequency: 3,
    })

    expect(response.status).toBe(201)

    const goalOnDatabase = await db
      .select()
      .from(goals)
      .where(eq(goals.title, 'New goal'))

    expect(goalOnDatabase).toEqual([
      expect.objectContaining({
        title: 'New goal',
        desiredWeeklyFrequency: 3,
      }),
    ])
  })
})
