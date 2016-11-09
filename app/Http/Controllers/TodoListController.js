'use strict'

const TodoList = use("App/Model/TodoList")

class TodoListController {

  * example (request, response) {
    response.json({ message: "hello world" })
  }

  * create (request, response) {
    let userId = request.param('id')
    let data = request.only('name')
    data.user_id = userId

    let todoList = yield TodoList.create(data)
    response.status(201).json(todoList)
  }

}

module.exports = TodoListController
