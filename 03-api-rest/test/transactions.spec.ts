// Para a criação do arquivo de teste é preciso nomea-lo com a extensão .spec.ts ou .test.ts
// Todo teste precisa se excluir de qualquer contexto. Ou seja, um teste não pode depender de informações outro teste.

import { app } from '../src/app'
import {
  test,
  expect,
  beforeAll,
  afterAll,
  describe,
  beforeEach,
  afterEach,
} from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
describe('Transactions Routes', () => {
  // beforeAll são funções que são executadas antes de todos os testes.
  beforeAll(async () => {
    // Aguarda o app estar pronto para então executar os testes
    await app.ready()
  })

  // beforeEach são funções que são executadas antes de cada teste.
  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  // afterAll são funções que são executadas depois de todos os testes.
  afterAll(async () => {
    // Encerra o app após todos os testes serem executados
    await app.close()
  })

  // afterEach são funções que são executadas depois de cada teste.
  afterEach(async () => {})

  test('POST /transactions', async () => {
    const response = await request(app.server).post('/transactions').send({
      title: 'Teste',
      amount: 1000,
      type: 'credit',
    })

    expect(response.status).toEqual(201)
  })

  test('GET /transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Teste',
        amount: 1000,
        type: 'credit',
      })

    const cookie = createTransactionResponse.headers['set-cookie']

    const listTransactionResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookie)
      .expect(200)

    expect(listTransactionResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'Teste',
        amount: 1000,
      }),
    ])
  })
})
