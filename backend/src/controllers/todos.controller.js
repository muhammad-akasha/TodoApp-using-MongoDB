import mongoose from "mongoose";
import Todos from "../models/todos.models.js";

const addTodo = (req, res) => {
  const { todo } = req.body;

  if (!todo) {
    res.status(400).json({
      message: "todo is required",
    });
    return;
  }
  Todos.create({
    todo,
  });
  res.status(201).json({
    message: "todo added to database successfully",
  });
};

// get all todo

const allTodos = async (req, res) => {
  try {
    const todos = await Todos.find({});

    if (!todos) {
      res.status(400).json({
        message: "No Todo Found!",
      });
      return;
    }

    res.status(200).json({
      todos,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

// get single todo

const getSingleTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: "ID is not MongoDB ID",
    });
    return;
  }
  const singleTodo = await Todos.findById(id);

  if (!singleTodo) {
    res.status(404).json({
      message: "No Todo Found!",
    });
    return;
  }
  res.status(200).json({
    todo: singleTodo,
  });
};
// edit todo

const updateTodoByID = async (req, res) => {
  // update Todo
  const { id } = req.params;
  const { todo } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: "ID is not MongoDB ID",
    });
    return;
  }
  if (!todo) {
    res.status(400).json({
      message: "todo is required",
    });
    return;
  }
  const updatedTodo = await Todos.findByIdAndUpdate(
    id,
    {
      todo,
    },
    { new: true, runValidators: true }
  );
  if (!updatedTodo) {
    res.status(404).json({
      message: "No Todo Found!",
    });
    return;
  }
  res.status(200).json({
    message: "Todo Updated Successfully",
    updatedTodo,
  });
};

// delete todo

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: "ID is not MongoDB ID",
    });
    return;
  }
  try {
    const todo = await Todos.findByIdAndDelete(id); // same way to delete with findOneAndDelete({_id : id})
    res.status(200).json({
      message: "Todo Deleted Successfully",
      todo,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export { addTodo, allTodos, getSingleTodo, updateTodoByID, deleteTodo };
