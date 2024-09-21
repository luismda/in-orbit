import dayjs from 'dayjs'
import { faker } from '@faker-js/faker'

import { db } from '@/db'
import { goalCompletions } from '@/db/schema'

interface MakeGoalCompletion {
  goalId: string
  createdAt: Date
}

export async function makeGoalCompletion(
  override?: Partial<MakeGoalCompletion>
) {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const result = await db
    .insert(goalCompletions)
    .values({
      goalId: faker.string.uuid(),
      createdAt: faker.date.between({
        from: firstDayOfWeek,
        to: lastDayOfWeek,
      }),
      ...override,
    })
    .returning()

  const goalCompletion = result[0]

  return goalCompletion
}
