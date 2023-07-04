// O knex (nesse caso chamado de 'setupKnex') é uma função que recebe um objeto de configuração para o Knex.
// O Knex é uma interface que nos ajuda no auto-complete.
// Para cada banco de dados existe uma configuração diferente, que pode ser vista em: https://knexjs.org/guide/#configuration-options
// É uma das primeiras configurações a serem feitas para o Knex funcionar.

import 'dotenv/config'
import { knex as setupKnex, Knex } from 'knex'
import { env } from '../env/env'

export const knexConfig: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    directory: './database/migrations',
    extension: 'ts',
  },
}

export const knex = setupKnex(knexConfig)
