import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { env } from '../env/env'
import { transactionsRoutes } from '../routes/transactions'

const server = fastify()

server.register(cookie)
server.register(transactionsRoutes, {
  prefix: 'transactions',
})

server
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server is running on port 3333')
  })
