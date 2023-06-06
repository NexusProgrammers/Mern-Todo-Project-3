import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

// create todo
export const createTodo = createAsyncThunk(
  "post/createPost",
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/todos/create`,
        formData
      );
      toast.success(response.data.message, {
        duration: 2000,
      });
      navigate("/");
      return response.data.todo;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        autoClose: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

// create todo
export const deleteTodo = createAsyncThunk(
  "post/deleteTodo",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/todos/delete/${_id}`
      );
      toast.success(response.data.message, {
        duration: 2000,
      });
      return response.data.todo;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        autoClose: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

// create todo
export const deleteAllTodo = createAsyncThunk(
  "post/deleteAllTodo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/todos/all/delete`
      );
      toast.success(response.data.message, {
        duration: 2000,
      });
      return response.data.todo;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        autoClose: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

// update todo
export const updateTodo = createAsyncThunk(
  "post/updateTodo",
  async ({ _id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/v1/todos/update/${_id}`,
        formData
      );
      toast.success(response.data.message, {
        duration: 2000,
      });
      return response.data.todo;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        autoClose: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

// get single todos
export const getTodo = createAsyncThunk(
  "post/getTodo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/todos/one/`
      );
      return response.data.todos;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        autoClose: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

// get all todos
export const getTodos = createAsyncThunk(
  "post/getTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/todos/all`
      );
      return response.data.todos;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        autoClose: 2000,
      });
      return rejectWithValue(message);
    }
  }
);
