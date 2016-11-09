'use strict'

const User = use("App/Model/User")

class UserController {

  * create (request, response) {
    let data = request.only('email', 'name')
    let user = yield User.create(data)

    response.json(user)
  }

}

module.exports = UserController
