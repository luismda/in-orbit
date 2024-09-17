import { Loader } from 'lucide-react'

export function LoadingGoals() {
  return (
    <>
      <Loader className="size-5 text-zinc-300 animate-spin" />
      <span className="sr-only">Carregando suas metas</span>
    </>
  )
}
