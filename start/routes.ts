/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const TodosController = () => import('../app/controllers/todos_controller.js')
const AuthController = () => import('../app/controllers/auth_controller.js')

router.get('/auth/github/redirect', [AuthController, 'githubRedirect'])
router.get('/auth/github/callback', [AuthController, 'githubCallback'])

router
  .group(() => {
    router.get('/', [TodosController, 'index']).as('todos')
    router.post('/todos', [TodosController, 'create']).as('todos.create')
    router.delete('/todos/:id', [TodosController, 'remove']).as('todos.remove')
    router.post('/todos/:id/mark_as_done', [TodosController, 'markAsDone']).as('todos.mark-as-done')
    router
      .post('/todos/:id/mark_as_undone', [TodosController, 'markAsUndone'])
      .as('todos.mark-as-undone')

    router.get('/todos/count', [TodosController, 'count']).as('todos.count')
  })
  .use(middleware.auth())
