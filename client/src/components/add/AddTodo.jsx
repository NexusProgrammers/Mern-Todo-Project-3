import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTodo } from "../../services/todoService";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { toast } from "react-hot-toast";

const AddTodo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createTodoLoading } = useSelector((state) => state.todos);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const { name, description } = formData;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !description) {
      return toast.error("Please provide required fields");
    }
    await dispatch(createTodo({ formData, navigate }));
  };

  return (
    <form
      className="flex flex-col items-center justify-center h-screen xs:px-12 sm:px-20 md:px-32 lg:px-40 xl:px-64"
      onSubmit={handleSubmit}
    >
      <div className="p-24 shadow-lg rounded-md hover:shadow-2xl bg-white w-full flex flex-col gap-12">
        <div className="relative z-0 w-full group">
          <TextField
            name="name"
            label="Name"
            id="name"
            value={name}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div className="relative z-0 w-full group">
          <Textarea
            id="description"
            placeholder="Description"
            name="description"
            value={description}
            minRows={4}
            maxRows={12}
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        title="add"
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        {createTodoLoading ? (
          <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin white:border-white-800"></div>
        ) : (
          <span>Add</span>
        )}
      </button>
    </form>
  );
};

export default AddTodo;
