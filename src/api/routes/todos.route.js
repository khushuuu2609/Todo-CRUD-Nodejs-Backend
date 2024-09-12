import express from "express";
import todosController from "../controllers/todos.controller.js";

const todoRoutes = express.Router()
todoRoutes.post("/",todosController.addTodo)
todoRoutes.get("/",todosController.getAllTodos)
todoRoutes.get("/:id",todosController.getTodoById)
todoRoutes.delete("/:id",todosController.deleteTodo)
todoRoutes.patch("/:id",todosController.updateTodo)

export default todoRoutes;