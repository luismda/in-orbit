import dayjs from 'dayjs'
import { CheckCircle2, Plus } from 'lucide-react'

import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { DialogTrigger } from './ui/dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { PendingGoals } from './pending-goals'
import { Progress, ProgressIndicator } from './ui/progress-bar'

import { useSummary } from '@/http/hooks/use-summary'

export function Summary() {
  const { data } = useSummary()

  if (!data) {
    return null
  }

  const firstDayOfWeek = dayjs().startOf('week').format('DD')
  const lastDayOfWeek = dayjs().endOf('week').format('DD [de] MMMM')

  const completedPercentage = Math.round((data.completed * 100) / data.total)

  const today = dayjs()
  const yesterday = today.subtract(1, 'day')

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold">
            {firstDayOfWeek} a {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm" className="h-8 w-8 p-0 md:w-auto md:px-3 md:py-1.5">
            <Plus className="size-4" />
            <span className="sr-only md:not-sr-only">Cadastrar meta</span>
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={data.completed} max={data.total}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{data.completed}</span> de{' '}
            <span className="text-zinc-100">{data.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {data.goalsPerDay !== null ? (
          Object.entries(data.goalsPerDay).map(([day, goals]) => {
            const isToday = dayjs(day).isSame(today, 'day')
            const isYesterday = dayjs(day).isSame(yesterday, 'day')

            const weekDay = dayjs(day).format('dddd')
            const formattedDate = dayjs(day).format('DD [de] MMMM')

            const weekDayName = isToday
              ? 'Hoje'
              : isYesterday
                ? 'Ontem'
                : weekDay

            return (
              <div key={day} className="flex flex-col gap-4">
                <h3 className="font-medium">
                  <span className="capitalize">{weekDayName}</span>{' '}
                  <span className="text-zinc-400 text-xs">
                    ({formattedDate})
                  </span>
                </h3>

                <ul className="flex flex-col gap-3">
                  {goals.map(goal => {
                    const time = dayjs(goal.completedAt).format('HH:mm')

                    return (
                      <li key={goal.id} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-pink-500" />
                        <span className="text-sm text-zinc-400">
                          Você completou "
                          <span className="text-zinc-100">{goal.title}</span>"
                          às <span className="text-zinc-100">{time}h</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })
        ) : (
          <p className="text-sm text-zinc-400">
            Você ainda não completou nenhuma meta essa semana.
          </p>
        )}
      </div>
    </div>
  )
}
