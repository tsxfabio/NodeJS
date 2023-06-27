import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  // Indica qual a tabela que deve ser alterada e recebe a tabela como parâmetro.
  await knex.schema.alterTable('transactions', (table) => {
    // Adiciona uma coluna na tabela transactions com o nome 'session_id' do tipo uuid.
    // Indica que o campo deve ser adicionado depois do 'id' (nem todos os bancos tem suporte para isso).
    // Cria um índice para a coluna 'session_id'. Normalmente quando um parâmetro será muito utilizado no where.
    table.uuid('session_id').after('id').index()
  })
}

export async function down(knex: Knex): Promise<void> {
  // Indica qual a tabela que deve ser alterada e recebe a tabela como parâmetro.
  await knex.schema.alterTable('transactions', (table) => {
    // Remove a coluna 'session_id' da tabela transactions.
    table.dropColumn('session_id')
  })
}
