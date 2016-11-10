'use strict'

const Task = use("App/Model/Task")

class TaskController {

    * create (request, response){
      let userId = request.param('id')
      let listId = request.param('list_id')
      const data = request.only('title', 'due_date', 'complete')
      data.todo_list_id = listId

      const task = yield Task.create(data)
      response.status(201).json(task)
    }

    * delete (request, response){
      let taskId = request.param('task_id')
      const task = yield Task.find(taskId)
      if (task){
        task.delete()
        response.status(204).json({ success: "Task removed sucessfully." })
      } else response.status(404).json({ error: "No task to remove." })
    }

    * index (request, response){
      let listId = request.param('list_id')
      const tasks = yield Task.findBy('list_id', listId)

      if (tasks) response.json(viewTasks)
      else response.status(404).json({ error: 'No tasks available.' })
    }

    * update (request, response){
      let taskId = request.param('task_id')
      const input = request.only('title', 'due_date', 'complete')
      const task = yield Task.find(taskId)

      if (task){
          task.fill(input)
          yield task.save()
          response.status(204).json(task)
      } else response.status(404).json({ error: "Task not found." })
    }

}

module.exports = TaskController
