import React, { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import {  useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, getTodos, updateTodo } from "../../services/todoService";

const TodoItem = ({ _id, name, description, createdAt }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { deleteTodoLoading } = useSelector((state) => state.todos);

  const createDate = new Date(createdAt);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleEditOpen = () => {
    setFormData({ name, description });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    await dispatch(updateTodo({ _id, formData }));
    await dispatch(getTodos());
    handleEditClose();
  };

  const deleteOneTodo = async () => {
    await dispatch(deleteTodo({ _id, navigate }));
    await dispatch(getTodos());
    handleDeleteClose();
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-md p-4 text-center hover:shadow-2xl w-60 h-72 relative">
        <div className="flex justify-between p-1 gap-2">
          <div>
            <span className="text-xs text-gray-600 font-medium">
              {formatDistanceToNow(createDate, {
                addSuffix: true,
                includeSeconds: true,
              }).replace("about", "")}
            </span>
          </div>
          <div>
            <button title="delete" onClick={handleDeleteOpen}>
              <FaTrashAlt className="text-red-500 cursor-pointer" />
            </button>
            <button title="edit" onClick={handleEditOpen}>
              <FaEdit className="ml-2 text-blue-500 cursor-pointer" />
            </button>
          </div>
        </div>
        <div className="py-3 overflow-hidden">
          <h3 className="text-xl font-semibold ">{name}</h3>
          <p className="overflow-hidden max-h-44">{description}</p>
        </div>
      </div>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditFormSubmit}>
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: "1rem", marginTop: "1rem" }}
            />
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: "1rem", marginTop: "1rem" }}
            />
            <DialogActions>
              <Button
                title="cancel"
                variant="outlined"
                color="primary"
                sx={{ textTransform: "none" }}
                onClick={handleEditClose}
                size="small"
              >
                Cancel
              </Button>
              <Button
                title="edit"
                sx={{ textTransform: "none" }}
                variant="outlined"
                color="success"
                type="submit"
                size="small"
                startIcon={<EditRoundedIcon fontSize="small" />}
              >
                Edit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this todo?
        </DialogContent>
        <DialogActions className="gap-4">
          <Button
            title="cancel"
            variant="outlined"
            color="primary"
            sx={{ textTransform: "none" }}
            onClick={handleDeleteClose}
            size="small"
          >
            Cancel
          </Button>
          {deleteTodoLoading ? (
            <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin dark:border-violet-800"></div>
          ) : (
            <Button
              title="delete"
              sx={{ textTransform: "none" }}
              onClick={deleteOneTodo}
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteRoundedIcon fontSize="small" />}
            >
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoItem;
