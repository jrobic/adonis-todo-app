import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'

export default class AuthController {
  githubRedirect({ ally }: HttpContext) {
    return ally.use('github').redirect((request) => {
      request.scopes(['user'])
    })
  }

  async githubCallback({ ally, auth, response }: HttpContext) {
    const gh = ally.use('github')

    /**
     * User has denied access by canceling
     * the login flow
     */
    if (gh.accessDenied()) {
      return 'You have cancelled the login process'
    }

    /**
     * OAuth state verification failed. This happens when the
     * CSRF cookie gets expired.
     */
    if (gh.stateMisMatch()) {
      return 'We are unable to verify the request. Please try again'
    }

    /**
     * GitHub responded with some error
     */
    if (gh.hasError()) {
      return gh.getError()
    }

    /**
     * Access user info
     */

    const user = await gh.user()

    /**
     * Find or create the user by email
     */
    const authUser = await User.firstOrCreate(
      {
        email: user.email,
        id: user.id.toString(),
        fullName: user.name,
      },
      {
        id: user.id.toString(),
      }
    )

    await auth.use('web').login(authUser)

    return response.redirect('/')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
}
