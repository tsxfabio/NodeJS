import { Knex } from 'knex'

// Método UP é responsável pelo o que será feito quando rodarmos o comando knex migrate:latest
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.string('title').notNullable()
    table.decimal('amount', 10, 2).notNullable()
    // O uso da função 'knex.fn.now()' é para que o Knex use a função de data e hora do banco de dados que está sendo usado.
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

// Método DOWN é responsável por desafazer o que foi feito anteriormente com o método up. Executado com usamos o comando knex migrate:rollback
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}
