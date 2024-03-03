import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'todos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().primary()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.string('description').notNullable()
      table.boolean('done').notNullable().defaultTo(false)
      table.timestamp('done_at', { useTz: true }).nullable()
      table.string('user_id').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
