import { Summary } from './components/summary'
import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { EmptyGoals } from './components/empty-goals'
import { LoadingGoals } from './components/loading-goals'

import { useSummary } from './http/hooks/use-summary'

export function App() {
  const { data, isLoading: isLoadingSummary } = useSummary()

  if (isLoadingSummary) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingGoals />
      </div>
    )
  }

  return (
    <Dialog>
      {!!data && data.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}
