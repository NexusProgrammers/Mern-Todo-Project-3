import express from "express";
import {
  createTodo,
  deleteAllTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoController.js";

const todoRouter = express.Router();

todoRouter.route("/create").post(createTodo);

todoRouter.route("/delete/:id").delete(deleteTodo);

todoRouter.route("/all/delete").delete(deleteAllTodo);

todoRouter.route("/update/:id").patch(updateTodo);

todoRouter.route("/one/:id").get(getTodo);

todoRouter.route("/all").get(getTodos);

export default todoRouter;
