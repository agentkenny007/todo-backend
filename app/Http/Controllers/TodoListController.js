'use strict'

const TodoList = use("App/Model/TodoList")
const User = use("App/Model/User")

class TodoListController {

  * create (request, response){
    let userId = request.param('user_id')
    if (!yield User.find(userId))
        return response.status(404).json({ error: "User not found." })
    const data = request.only('name')
    data.user_id = userId

    const todoList = yield TodoList.create(data)
    response.status(201).json(todoList)
  }

  * destroy(request, response){
    const todoList = yield TodoList.find(request.param('list_id'))

    yield todoList.delete()
    response.json(todoList)
  }

  * index (request, response){
    let userId = request.param('user_id')
    if (!yield User.find(userId))
        return response.status(404).json({ error: "User not found." })
    const lists = yield TodoList.findBy('user_id', userId)

    if (lists) response.json(lists)
    else response.status(404).json({ error: "No lists found for this user." })
  }

  * show (request, response){
    const todoList = yield TodoList.find(request.param('list_id'))

    if (todoList) response.json(todoList)
    else response.status(404).json({ error: "List not found." })
  }

  * update(request, response){
      const todoList = yield TodoList.find(request.param('list_id'))

      if (todoList){
          todoList.fill(request.only('name'))
          yield todoList.save()
          response.json(todoList)
      } else response.status(404).json({ error: "List not found." })
  }
}

module.exports = TodoListController
