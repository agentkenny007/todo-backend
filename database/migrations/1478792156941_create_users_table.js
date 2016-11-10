'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', table => {
      table.increments()
      table.string('avatar_url')
      table.string('username', 80).unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.boolean('private').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
