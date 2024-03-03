import { HttpContext } from '@adonisjs/core/http'
import Todo from '../models/todo.js'
import db from '@adonisjs/lucid/services/db'

export default class TodosController {
  async index({ view, request, auth }: HttpContext) {
    let done = request.qs().done

    if (done !== 'true' && done !== 'false') {
      done = undefined
    }

    if (!auth.user?.id) {
      return view.render('pages/todos', {
        todos: [],
        total: 0,
      })
    }

    const todos = await Todo.query()
      .where({
        userId: auth.user.id,
        ...(done ? { done: done === 'true' } : {}),
      })
      .orderBy('created_at', 'desc')

    return view.render('pages/todos', {
      todos: todos.map((todo) => todo.toView()),
      total: todos.length,
      filters: {
        done,
      },
    })
  }

  async create({ request, view, auth, response }: HttpContext) {
    const { description } = request.body()

    const todo = await Todo.create({ description, userId: auth.user?.id || 'unknown' })

    response.header('HX-Trigger-After-Swap', 'watch-count-todos')
    return view.render('components/todo', { todo: todo.toView() })
  }

  async remove({ params, response }: HttpContext) {
    const todo = await Todo.findOrFail(params.id)

    await todo.delete()

    response.header('HX-Trigger-After-Swap', 'watch-count-todos')
    response.status(200)
  }

  async markAsDone({ params, view, response }: HttpContext) {
    let todo = await Todo.findOrFail(params.id)
    todo.markAsDone(true)
    todo = await todo.save()

    response.header('HX-Trigger-After-Swap', 'watch-count-todos')
    return view.render('components/todo', { todo: todo.toView() })
  }

  async markAsUndone({ params, view, response }: HttpContext) {
    let todo = await Todo.findOrFail(params.id)
    todo.markAsDone(false)
    todo = await todo.save()

    response.header('HX-Trigger-After-Swap', 'watch-count-todos')
    return view.render('components/todo', { todo: todo.toView() })
  }

  async count({ view, auth, request }: HttpContext) {
    let done = request.qs().done

    if (done !== 'true' && done !== 'false') {
      done = undefined
    }

    const total = await db
      .from('todos')
      .count('*', 'total')
      .where({ user_id: auth.user!.id, ...(done ? { done: done === 'true' } : {}) })
      .first()

    return view.render('components/counter', { total: total.total })
  }
}
