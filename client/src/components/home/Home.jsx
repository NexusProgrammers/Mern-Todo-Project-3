import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../../services/todoService";
import TodoItem from "../todoItem/TodoItem";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { deleteAllTodo } from "../../services/todoService";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { deleteAllTodoLoading } = useSelector((state) => state.todos);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTodoAll = async () => {
    await dispatch(deleteAllTodo());
    await dispatch(getTodos());
    handleClose();
  };

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const { todos } = useSelector((state) => state.todos);

  return (
    <div className="py-4">
      <div className="flex items-center justify-center ">
        {todos && todos.length > 0 ? (
          <Button
            title="delete all todo"
            onClick={handleOpen}
            sx={{ textTransform: "none" }}
            variant="outlined"
            color="error"
            startIcon={<DeleteRoundedIcon fontSize="small" />}
          >
            Delete All
          </Button>
        ) : (
          <div className="h-[78vh] w-full flex items-center justify-center flex-col gap-6">
            <p className="font-bold text-2xl ">No Todos</p>
            <Button variant="contained" sx={{ textTransform: "none" }} color="info">
              <Link to={"/add"}>
                <span>Add Todo</span>
              </Link>
            </Button>
          </div>
        )}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete all todo ?
          </DialogContent>
          <DialogActions className="gap-4">
            <Button
              title="cancel"
              variant="outlined"
              color="success"
              sx={{ textTransform: "none" }}
              onClick={handleClose}
              size="small"
            >
              Cancel
            </Button>
            {deleteAllTodoLoading ? (
              <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin dark:border-violet-800"></div>
            ) : (
              <Button
                title="delete"
                sx={{ textTransform: "none" }}
                onClick={deleteTodoAll}
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
      </div>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-20 py-6 px-8 place-items-center">
        {todos && todos.length > 0
          ? todos.map((todo) => (
              <TodoItem
                createdAt={todo.createdAt}
                _id={todo._id}
                name={todo.name}
                description={todo.description}
                key={todo._id}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Home;
