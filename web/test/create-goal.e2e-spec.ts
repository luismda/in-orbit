import { expect, test } from '@playwright/test'
import { faker } from '@faker-js/faker'

test('create goal successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Cadastrar meta' }).click()

  const goalTitle = faker.word.words({ count: { min: 1, max: 3 } })
  await page.getByPlaceholder('Praticar exercícios, meditar').fill(goalTitle)

  await page.getByRole('radio', { name: 'Todos dias da semana 🔥' }).click()

  await page.getByRole('button', { name: 'Salvar' }).click()
  await page.getByRole('button', { name: 'Fechar' }).click()

  const goalButton = page.getByText(goalTitle)

  expect(goalButton).toBeVisible()
})
