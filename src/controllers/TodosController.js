import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { todosService } from "../services/TodosService.js";
import { logger } from "../utils/Logger.js";


export class TodosController extends BaseController {
  constructor() {
    super('api/todos')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo) // all routes below this .use, must be authorized.
      .post('', this.createTodo)
      .get('', this.getMyTodos)
      .get('/:todoId', this.getOneTodo)
      .put('/:todoId', this.updateTodo)
  }

  async createTodo(request, response, next) {
    try {
      const todoData = request.body
      const userInfo = request.userInfo
      todoData.creatorId = userInfo.id
      const todo = await todosService.createTodo(todoData)
      response.send(todo)
    } catch (error) {
      next(error)
    }
  }

  async getMyTodos(request, response, next) {
    try {
      const userInfo = request.userInfo
      const todos = await todosService.getMytodos(userInfo.id)
      response.send(todos)
    } catch (error) {
      next(error)
    }
  }

  async getOneTodo(request, response, next) {
    try {
      const todoId = request.params.todoId
      const userInfo = request.userInfo
      const todo = await todosService.getOneTodo(todoId, userInfo.id)
      response.send(todo)
    } catch (error) {
      next(error)
    }
  }

  async updateTodo(request, response, next) {
    try {
      const todoId = request.params.todoId
      const updateData = request.body
      const userInfo = request.userInfo
      // updateData.id = todoId
      // updateData.creatorId = userInfo.id
      // const updatedTodo = await todosService.updateTodo(updateData)
      const updatedTodo = await todosService.updateTodo(todoId, updateData, userInfo.id)
      response.send(updatedTodo)
    } catch (error) {
      next(error)
    }
  }
}
