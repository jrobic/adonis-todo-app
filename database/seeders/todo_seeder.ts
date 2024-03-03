import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { TodoFactory } from '../factories/todo_factory.js'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await TodoFactory.merge({ userId: '5844289' }).createMany(5000)
  }
}
