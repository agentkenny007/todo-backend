'use strict'

const Schema = use('Schema')

class TasksTableSchema extends Schema {

  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.timestamps()
      table.string('title')
      table.boolean('complete')
      table.integer('todo_list_id')
      table.foreign('todo_list_id').references('todo_lists.id')
      table.date('due_date')
    })
  }

  down () {
    this.drop('tasks')
  }

}

module.exports = TasksTableSchema
