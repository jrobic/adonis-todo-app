import factory from '@adonisjs/lucid/factories'
import Todo from '#models/todo'
import { DateTime } from 'luxon'

export const TodoFactory = factory
  .define(Todo, ({ faker }) => {
    const createdAt = DateTime.fromJSDate(faker.date.recent())
    const done = faker.datatype.boolean()
    return {
      id: faker.string.uuid(),
      description: faker.lorem.sentence({ min: 1, max: 3 }),
      done,
      done_at: done ? DateTime.fromJSDate(faker.date.recent()) : null,
      createdAt,
      updatedAt: createdAt,
      userId: faker.string.uuid(),
    }
  })
  .build()
