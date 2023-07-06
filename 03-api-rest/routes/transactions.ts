import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../src/database'
import { randomUUID } from 'node:crypto'
import { checkSessionId } from '../middlewares/check-session-id'

export async function transactionsRoutes(server: FastifyInstance) {
  // Retorna todas as transações.
  // O preHandler é um middleware que é executado antes de qualquer rota.
  server.get(
    '/',
    { preHandler: [checkSessionId] },
    async (request, response) => {
      const sessionId = request.cookies.sessionId

      // Seleciona a tabela 'transactions' e retorna todos os registros.
      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

      // Retorna o status 200 (OK) e os registros da tabela 'transactions'.
      return response.status(200).send({ transactions })
    },
  )

  // Retorna um resumo das transações.
  server.get('/summary', { preHandler: [checkSessionId] }, async (request) => {
    const sessionId = request.cookies.sessionId

    const summary = await knex('transactions')
      .where('session_id', sessionId)
      .sum('amount', { as: 'amount' })
      .first()

    return { summary }
  })

  // Retorna uma transação com base no id.
  server.get(
    '/:id',
    { preHandler: [checkSessionId] },
    async (request, response) => {
      const getTransactionsParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const sessionId = request.cookies.sessionId
      const { id } = getTransactionsParamsSchema.parse(request.params)
      const transaction = await knex('transactions')
        .where({ id, session_id: sessionId })
        .first()
      return response.status(200).send({ transaction })
    },
  )

  // Cria uma nova transação.
  server.post('/', async (request, response) => {
    // Criação do Schema de uma transação para validar os dados recebidos.
    const createTransactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    // Validação dos dados recebidos.
    const { title, amount, type } = createTransactionSchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      response.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 Ano
      })
    }

    // Seleciona a tabela 'transactions' e insere um novo registro.
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    // Retorna o status 201 (Created) e uma mensagem de sucesso.
    return response.send(201).send()
  })
}
