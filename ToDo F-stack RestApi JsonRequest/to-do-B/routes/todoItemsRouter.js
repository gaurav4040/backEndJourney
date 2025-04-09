const express = require('express');

const todoItemsRouter = express.Router();

const todoItemsController = require('../controller/todoItemsController');


todoItemsRouter.get("/",todoItemsController.getTodoItems);
todoItemsRouter.post("/",todoItemsController.createTodoItem);
todoItemsRouter.delete("/:id",todoItemsController.deleteTodoItems);
todoItemsRouter.put("/:id/completed",todoItemsController.markCompleted);

module.exports = todoItemsRouter;