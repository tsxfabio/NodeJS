// Para a criação do arquivo de teste é preciso nomea-lo com a extensão .spec.ts ou .test.ts

import { app } from '../src/app'
import { test, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

test('GET /transactions', async () => {
  const response = await request(app.server).post('/transactions').send({
    title: 'Teste',
    amount: 1000,
    type: 'credit',
  })

  expect(response.status).toEqual(201)
})
