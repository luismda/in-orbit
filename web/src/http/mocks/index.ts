import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { createGoalMock } from './create-goal-mock'
import { getSummaryMock } from './get-summary-mock'
import { getPendingGoalsMock } from './get-pending-goals-mock'
import { createGoalCompletionMock } from './create-goal-completion-mock'

export const worker = setupWorker(
  createGoalMock,
  getSummaryMock,
  getPendingGoalsMock,
  createGoalCompletionMock
)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
