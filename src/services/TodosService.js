import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"



class TodosService {

  async createTodo(todoData) {
    const todo = await dbContext.Todos.create(todoData)
    return todo
  }

  async getMytodos(userId) {
    // const todos = await dbContext.Todos.find({ completed: false }) // find all uncompleted todos
    logger.log(userId)
    const todos = await dbContext.Todos.find({ creatorId: userId }) // find all todos created by the logged in person
    return todos
  }


  async getOneTodo(todoId, userId) {
    const todo = await dbContext.Todos.findById(todoId)

    if (!todo) throw new Error(`No todo at id: ${todoId}`)
    if (userId != todo.creatorId) throw new Forbidden(`That's not your purse, 🦵 I don't know you!`)

    return todo
  }
  async updateTodo(todoId, updateData, userId) {
    const originalTodo = await dbContext.Todos.findById(todoId)

    if (!originalTodo) throw new Error(`No todo to update at id: ${todoId}`)
    if (userId != originalTodo.creatorId) throw new Forbidden("Can't update that, it doesn't belong to you!")

    if (updateData.description) originalTodo.description = updateData.description
    // originalTodo.description = updateData.description || originalTodo.description // check for falsey, numbers like 0 or bools for false will fail
    // originalTodo.completed = updateData.completed ?? originalTodo.completed // null check, works similar to || but only changes values why they are undefined or null
    originalTodo.completed ??= updateData.completed // short hand for the line above

    await originalTodo.save()
    return originalTodo
  }
}


export const todosService = new TodosService()
