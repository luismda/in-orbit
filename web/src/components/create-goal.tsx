import { z } from 'zod'
import { Loader, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from './ui/radio-group'

import { useCreateGoal } from '@/http/hooks/use-create-goal'

const createGoalFormSchema = z.object({
  title: z.string().trim().min(1, 'Informe a atividade que deseja realizar'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

type CreateGoalFormSchema = z.infer<typeof createGoalFormSchema>

export function CreateGoal() {
  const { mutate: createGoal, isPending: isCreatingGoal } = useCreateGoal()

  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalFormSchema>({
      disabled: isCreatingGoal,
      resolver: zodResolver(createGoalFormSchema),
    })

  function handleCreateGoal(data: CreateGoalFormSchema) {
    const { title, desiredWeeklyFrequency } = data

    createGoal(
      {
        title,
        desiredWeeklyFrequency,
      },
      {
        onSuccess: () => {
          reset()
        },
      }
    )
  }

  return (
    <DialogContent>
      <div className="h-full flex flex-col gap-6 p-8 overflow-auto md:overflow-hidden">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>

            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que{' '}
            <span className="underline underline-offset-4">te fazem bem</span> e
            que você quer continuar praticando toda semana.
          </DialogDescription>
        </div>

        <form
          className="flex-1 flex flex-col justify-between gap-6"
          onSubmit={handleSubmit(handleCreateGoal)}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>

              <Input
                autoFocus
                id="title"
                placeholder="Praticar exercícios, meditar, etc..."
                {...register('title')}
              />

              {!!formState.errors.title?.message && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm tracking-tight leading-normal">
                Quantas vezes na semana?
              </span>

              <Controller
                control={control}
                defaultValue={3}
                name="desiredWeeklyFrequency"
                render={({ field: { value, onChange, ...rest } }) => (
                  <RadioGroup
                    {...rest}
                    value={value.toString()}
                    onValueChange={onChange}
                  >
                    <RadioGroupItem value="1">
                      <RadioGroupIndicator />
                      <span className="text-zinc-300 text-sm font-medium leading-none">
                        1x na semana
                      </span>
                      <span className="text-lg leading-none">🥱</span>
                    </RadioGroupItem>

                    <RadioGroupItem value="2">
                      <RadioGroupIndicator />
                      <span className="text-zinc-300 text-sm font-medium leading-none">
                        2x na semana
                      </span>
                      <span className="text-lg leading-none">🙂</span>
                    </RadioGroupItem>

                    <RadioGroupItem value="3">
                      <RadioGroupIndicator />
                      <span className="text-zinc-300 text-sm font-medium leading-none">
                        3x na semana
                      </span>
                      <span className="text-lg leading-none">😎</span>
                    </RadioGroupItem>

                    <RadioGroupItem value="4">
                      <RadioGroupIndicator />
                      <span className="text-zinc-300 text-sm font-medium leading-none">
                        4x na semana
                      </span>
                      <span className="text-lg leading-none">😜</span>
                    </RadioGroupItem>

                    <RadioGroupItem value="5">
                      <RadioGroupIndicator />
                      <span className="text-zinc-300 text-sm font-medium leading-none">
                        5x na semana
                      </span>
                      <span className="text-lg leading-none">🤨</span>
                    </RadioGroupItem>

                    <RadioGroupItem value="6">
                      <RadioGroupIndicator />
                      <span className="text-zinc-300 text-sm font-medium leading-none">
                        6x na semana
                      </span>
                      <span className="text-lg leading-none">🤯</span>
                    </RadioGroupItem>

                    <RadioGroupItem value="7">
                      <RadioGroupIndicator />
                      <span className="text-zinc-300 text-sm font-medium leading-none">
                        Todos dias da semana
                      </span>
                      <span className="text-lg leading-none">🔥</span>
                    </RadioGroupItem>
                  </RadioGroup>
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button
                variant="secondary"
                className="flex-1"
                disabled={isCreatingGoal}
              >
                Fechar
              </Button>
            </DialogClose>

            <Button className="flex-1" type="submit" disabled={isCreatingGoal}>
              {isCreatingGoal && (
                <Loader className="size-4 text-violet-50 animate-spin" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
