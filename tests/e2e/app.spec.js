import { expect, test } from '@playwright/test';

test('fluxo principal do Deu Bom funciona de ponta a ponta', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'DEU BOM!!' })).toBeVisible();
  await expect(page.getByText('SALDO ATUAL')).toBeVisible();

  await page.getByRole('button', { name: '+ Nova Transacao' }).click();
  await expect(page.getByRole('heading', { name: 'Nova Transacao' })).toBeVisible();
  await page.getByLabel('Descricao').fill('Teste acesso mobile');
  await page.getByLabel('Valor').fill('123.45');
  await page.getByLabel('Tipo').selectOption('income');
  await page.getByLabel('Categoria').selectOption('Freelance');
  await page.getByLabel('Data').fill('2026-05-16');
  await page.getByRole('button', { name: 'Salvar transacao' }).click();
  await expect(page.getByText('Teste acesso mobile')).toBeVisible();

  await page.getByRole('button', { name: 'Ver todas >' }).click();
  await expect(page.getByRole('heading', { name: 'Transacoes' })).toBeVisible();
  await page.getByLabel('Buscar transacoes').fill('Teste acesso');
  await expect(page.getByText('1 transacoes encontradas')).toBeVisible();

  await page.getByLabel('Selecionar Teste acesso mobile').check();
  await expect(page.getByText('1 item selecionado(s)')).toBeVisible();
  await page.getByRole('button', { name: 'Categorizar' }).click();
  await page.getByLabel('Categoria').selectOption('Contas');
  await page.getByRole('button', { name: 'Aplicar categoria' }).click();
  await expect(page.getByTestId(/transaction-/).filter({ hasText: 'Teste acesso mobile' }).getByText('Contas')).toBeVisible();

  await page.getByLabel('Selecionar Teste acesso mobile').check();
  await page.getByRole('button', { name: 'Deletar' }).click();
  await expect(page.getByText('Teste acesso mobile')).toHaveCount(0);

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exportar' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toContain('deu-bom-transacoes');

  await page.getByRole('button', { name: 'Abrir analise' }).click();
  await expect(page.getByRole('heading', { name: 'Analise' })).toBeVisible();
  await expect(page.getByText('Gastos por Categoria')).toBeVisible();
  await page.getByRole('button', { name: 'Ver Transacoes' }).click();
  await expect(page.getByRole('heading', { name: 'Transacoes' })).toBeVisible();

  expect(errors).toEqual([]);
});
