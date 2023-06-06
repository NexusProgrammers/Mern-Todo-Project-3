import Todo from "../models/todoModel.js";
import expressAsyncHandler from "express-async-handler";

// create todo
export const createTodo = expressAsyncHandler(async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "please provide required fields",
      });
    }
    const todo = await Todo.create({
      name,
      description,
    });
    res.status(201).json({
      success: true,
      message: "todo created",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// delete todo
export const deleteTodo = expressAsyncHandler(async (req, res) => {
  try {
    const todoId = req.params.id;

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "todo not found",
      });
    }
    await todo.deleteOne({ _id: todoId });

    res.status(200).json({
      success: true,
      message: "todo deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// delete all todo
export const deleteAllTodo = expressAsyncHandler(async (req, res) => {
  try {
    await Todo.deleteMany();

    res.status(200).json({
      success: true,
      message: "All todos deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// update todo
export const updateTodo = expressAsyncHandler(async (req, res) => {
  try {
    const todoId = req.params.id;
    const { name, description } = req.body;

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "todo not found",
      });
    }

    await Todo.findByIdAndUpdate(todoId, { name, description });

    res.status(200).json({
      success: true,
      message: "todo updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// get single todo
export const getTodo = expressAsyncHandler(async (req, res) => {
  try {
    const todoId = req.params.id;

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "todo not found",
      });
    }

    res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// get all todo
export const getTodos = expressAsyncHandler(async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json({
      success: true,
      todos:todos.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
