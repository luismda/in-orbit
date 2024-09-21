import { client, db } from '@/db'
import { goalCompletions, goals } from '@/db/schema'

import { delay } from './utils/delay'

async function resetDatabase() {
  await db.delete(goalCompletions)
  await delay(50)
  await db.delete(goals)
}

beforeEach(async () => {
  await resetDatabase()
})

afterAll(async () => {
  await resetDatabase()
  await client.end()
})
