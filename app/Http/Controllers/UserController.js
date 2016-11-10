'use strict'

const   User = use("App/Model/User"),
        Hash = use('Hash')


class UserController {

  * register (request, response){
      const input = request.only('username', 'email', 'password', 'avatar_url')
      input.password = yield Hash.make(input.password)
      const user = yield User.create(input)
      console.log(input)

      response.json(user)
  }

  * login (request, response){
      const input = request.only('username', 'email', 'password')
      try {
        const user = yield User.findBy('email', input.email)
        if (!user) user = yield User.findBy('username', input.username)
        if (!user) throw new Error('User not found.')

        const verify = yield Hash.verify(input.password, user.password)
        if (!verify) throw new Error('Incorrect password.')

        user.access_token = yield request.auth.generate(user)
        return response.json(user)
      } catch(e){
        return response.status(401).json({ error: e.message })
      }
    }

  * show (request, response){
      let userId = request.param('user_id')
      const user = yield User.find(userId)

      if (user)
        if (user.private)
            if (request.authUser) response.json(request.authUser)
            else response.status(403).json({ error: "You are not authorized to view this user." })
        else response.json(user)
      else response.status(404).json({ error: "No such user." })
  }

  * update(request, response){
      let userId = request.param('user_id')
      const user = yield User.find(userId)

      if (user){
          if (user !== request.authUser)
            return response.status(403).json({ error: "You are not authorized to edit settings for this user." })
          const input = request.only('username', 'email', 'password', 'avatar_url')
          if (input.password) input.password = yield Hash.make(input.password)
          user.fill(input)
          yield user.save()
          response.json(user)
      } else response.status(404).json({ error: "User not found." })
  }

}

module.exports = UserController
