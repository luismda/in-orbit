import { api } from '@/lib/axios'

export type GetSummaryResponse = {
  completed: number
  total: number
  goalsPerDay: Record<
    string,
    {
      id: string
      title: string
      completedAt: string
    }[]
  > | null
}

export async function getSummary(): Promise<GetSummaryResponse> {
  const { data } = await api.get('/summary')

  return data.summary
}
