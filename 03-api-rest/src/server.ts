import fastify from 'fastify'
import { knex } from './database'

const server = fastify()

server.get('/', async (request, reply) => {
  const table = await knex('sqlite_schema').select('*')
  return { message: 'Hello World', table }
})

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running on port 3333')
  })
