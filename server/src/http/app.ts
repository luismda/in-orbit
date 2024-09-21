import fastify from 'fastify'
import fastifyCors from '@fastify/cors'

import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { createGoalRoute } from './routes/create-goal-route'
import { getWeekSummaryRoute } from './routes/get-week-summary-route'
import { getWeekPendingGoalsRoute } from './routes/get-week-pending-goals-route'
import { createGoalCompletionRoute } from './routes/create-goal-completion-route'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(getWeekSummaryRoute)
app.register(getWeekPendingGoalsRoute)
app.register(createGoalCompletionRoute)
