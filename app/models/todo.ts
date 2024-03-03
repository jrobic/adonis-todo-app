import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import crypto from 'node:crypto'

export default class Todo extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare description: string

  @column()
  declare done: boolean

  @column.dateTime()
  declare doneAt: DateTime | null

  @column()
  declare userId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(todo: Todo) {
    todo.id = crypto.randomUUID()
  }

  markAsDone(done: boolean) {
    this.done = done
    this.doneAt = done ? DateTime.local() : null
  }

  toView() {
    return {
      id: this.id,
      description: this.description,
      done: this.done,
      doneAt: this.doneAt?.toFormat('yyyy-MM-dd HH:mm'),
      createdAt: this.createdAt.toFormat('yyyy-MM-dd HH:mm'),
      updatedAt: this.updatedAt.toFormat('yyyy-MM-dd HH:mm'),
    }
  }
}
