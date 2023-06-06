import { createSlice } from "@reduxjs/toolkit";
import {
  createTodo,
  deleteAllTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../../services/todoService";

const initialState = {
  createTodoLoading: false,
  createTodoError: null,
  deleteTodoError: null,
  deleteTodoLoading: false,
  deleteAllTodoLoading: false,
  deleteAllTodoError: null,
  updateTodoLoading: false,
  updateTodoError: null,
  getTodosLoading: false,
  getTodosError: null,
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearCreateTodoError: (state) => {
      state.createTodoError = null;
    },
    clearDeleteTodoError: (state) => {
      state.deleteTodoError = null;
    },
    cleartDeleteAllTodosError: (state) => {
      state.deleteAllTodoError = null;
    },
    clearUpdateTodoError: (state) => {
      state.updateTodoError = null;
    },
    clearGetTodosError: (state) => {
      state.getTodosError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.createTodoLoading = true;
        state.createTodoError = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.createTodoLoading = false;
        state.todos = action.payload;
        state.createTodoError = null;
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.createTodoLoading = false;
        state.createTodoError = action.error.message;
      })
      .addCase(getTodos.pending, (state) => {
        state.getTodosLoading = true;
        state.getTodosError = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.getTodosLoading = false;
        state.todos = action.payload;
        state.getTodosError = null;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.getTodosLoading = false;
        state.getTodosError = action.error.message;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.deleteTodoLoading = true;
        state.deleteTodoError = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.deleteTodoLoading = false;
        state.todos = action.payload;
        state.deleteTodoError = null;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.deleteTodoLoading = false;
        state.deleteTodoError = action.error.message;
      })
      .addCase(deleteAllTodo.pending, (state) => {
        state.deleteAllTodoLoading = true;
        state.deleteAllTodoError = null;
      })
      .addCase(deleteAllTodo.fulfilled, (state, action) => {
        state.deleteAllTodoLoading = false;
        state.todos = action.payload;
        state.deleteAllTodoError = null;
      })
      .addCase(deleteAllTodo.rejected, (state, action) => {
        state.deleteAllTodoLoading = false;
        state.deleteAllTodoError = action.error.message;
      })
      .addCase(updateTodo.pending, (state) => {
        state.updateTodoLoading = true;
        state.updateTodoError = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.updateTodoLoading = false;
        state.todos = action.payload;
        state.updateTodoError = null;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.updateTodoLoading = false;
        state.updateTodoError = action.error.message;
      });
  },
});

export const {
  clearCreateTodoError,
  clearDeleteTodoError,
  cleartDeleteAllTodosError,
  clearUpdateTodoError,
  clearGetTodosError,
} = todoSlice.actions;

export default todoSlice.reducer;
