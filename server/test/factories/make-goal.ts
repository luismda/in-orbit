import dayjs from 'dayjs'
import { faker } from '@faker-js/faker'

import { db } from '@/db'
import { goals } from '@/db/schema'

interface MakeGoalData {
  title: string
  desiredWeeklyFrequency: number
  createdAt: Date
}

export async function makeGoal(override?: Partial<MakeGoalData>) {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const result = await db
    .insert(goals)
    .values({
      title: faker.lorem.words({ min: 1, max: 3 }),
      desiredWeeklyFrequency: faker.number.int({ min: 1, max: 7 }),
      createdAt: faker.date.between({
        from: firstDayOfWeek,
        to: lastDayOfWeek,
      }),
      ...override,
    })
    .returning()

  const goal = result[0]

  return goal
}
