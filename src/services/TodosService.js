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

    if (!todo) throw new Error(`No todo at id: ${todoId}`) // did you find one?
    if (userId != todo.creatorId) throw new Forbidden(`That's not your purse, 🦵 I don't know you!`) // for todos you should only be able to see your own things, so we would throw a forbidden request if someone tried to access something that doesn't belong to them.
    return todo
  }
  // Take in the id of the todo we want to change, the updated data from the body, and the user's id
  async updateTodo(todoId, updateData, userId) {
    const originalTodo = await dbContext.Todos.findById(todoId) // get the original from the db

    if (!originalTodo) throw new Error(`No todo to update at id: ${todoId}`) // verify the id used was good
    if (userId != originalTodo.creatorId) throw new Forbidden("Can't update that, it doesn't belong to you!") // verify they are allowed to edit it


    // Many different ways to edit properties on the object
    if (updateData.description) originalTodo.description = updateData.description
    // originalTodo.description = updateData.description || originalTodo.description // check for falsey, numbers like 0 or bools for false will fail
    // NOTE use this for edits
    originalTodo.completed = updateData.completed ?? originalTodo.completed // null check, works similar to || but only changes values why they are undefined or null

    // FIXME just kidding this actually doesn't work well. I was getting to fancy, sorry yall
    // originalTodo.completed ??= updateData.completed

    await originalTodo.save() // save changes to database
    return originalTodo // return the now changed update to the controller so it can respond
  }
  async deleteTodo(todoId, userId) {
    const todoToDelete = await dbContext.Todos.findById(todoId)
    if (!todoToDelete) throw new Error(`No todo at id: ${todoId}`) // did you find one?
    if (todoToDelete.creatorId != userId) throw new Forbidden("You cannot delete that, it's not yours")
    await todoToDelete.deleteOne()
    return `${todoToDelete.description} was deleted` // what to send back when they delete something? how about a message letting them know it's gone!
  }
}


export const todosService = new TodosService()
