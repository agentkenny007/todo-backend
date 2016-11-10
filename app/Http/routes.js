'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')
Route.get('/example', 'TodoListController.example')

// User routes
Route.post('/user/register', 'UserController.register')
Route.post('/user/login', 'UserController.register')
Route.get('/users/:user_id', 'UserController.show').middleware('auth')
Route.put('/users/:user_id', 'UserController.update')
Route.delete('/users/:user_id', 'UserController.destroy')

// Todo List routes
Route.get('/users/:user_id/todo-lists', 'TodoListController.index')
Route.post('/users/:user_id/todo-lists', 'TodoListController.create')
Route.get('/users/:user_id/todo-lists/:list_id', 'TodoController.show')
Route.put('/users/:user_id/todo-lists/:list_id', 'TodoController.update')
Route.delete('/users/:user_id/todo-lists/:list_id', 'TodoController.destroy')

// Task routes
Route.get('/users/:user_id/todo-lists/:list_id/tasks', 'TaskController.index')
Route.post('/users/:user_id/todo-lists/:list_id/task/:task_id', 'TaskController.create')
Route.put('/users/:user_id/todo-lists/:list_id/task/:task_id', 'TaskController.update')
Route.delete('/users/:user_id/todo-lists/:list_id/task/:task_id', 'TaskController.destroy')
