import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../src/database'
import { randomUUID } from 'node:crypto'

export async function transactionsRoutes(server: FastifyInstance) {
  // Retorna todas as transações.
  server.get('/', async (request, response) => {
    // Seleciona a tabela 'transactions' e retorna todos os registros.
    const transactions = await knex('transactions').select()

    // Retorna o status 200 (OK) e os registros da tabela 'transactions'.
    return response.status(200).send({ transactions })
  })

  // Retorna uma transação com base no id.
  server.get('/:id', async (request, response) => {
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionsParamsSchema.parse(request.params)
    const transaction = await knex('transactions').where('id', id).first()
    return response.status(200).send({ transaction })
  })

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

    // Seleciona a tabela 'transactions' e insere um novo registro.
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    // Retorna o status 201 (Created) e uma mensagem de sucesso.
    return response.send(201).send()
  })
}
