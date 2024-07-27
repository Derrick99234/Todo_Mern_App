import { Response } from "express";
import User from "../models/user.model";
import { CustomRequest } from "../middleware/verifyJWT";
import Todo from "../models/todo.model";

const create_Todo = async (req: CustomRequest, res: Response) => {
  const id = req.id;
  const user = await User.findOne({ _id: id });
  const { todoName, dueDate, priority } = req.body;

  if (!user)
    return res.status(403).json({ error: true, message: "user need to login" });

  if (!todoName) {
    return res
      .status(400)
      .json({ error: true, message: "Todo name is Required" });
  }

  if (!dueDate) {
    return res
      .status(400)
      .json({ error: true, message: "Due data is Required" });
  }

  try {
    const todo = new Todo({
      todoName,
      dueDate,
      priority,
      author: user._id,
    });

    await todo.save();

    return res.json({
      error: false,
      todo,
      message: "Todo added successfully",
    });
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: `Internal server Error: ${e}`,
    });
  }
};

// edit Todo
const edit_Todo = async (req: CustomRequest, res: Response) => {
  const todoID = req.params.todoID;
  const { todoName, dueDate, priority, status } = req.body;

  const id = req.id;
  const user = await User.findOne({ _id: id });

  if (!user)
    return res.status(403).json({ error: true, message: "user need to login" });

  try {
    const todo = await Todo.findOne({ _id: todoID, author: user._id });

    if (!todo) {
      return res.status(400).json({
        error: true,
        message: "Todo not found",
      });
    }

    if (todoName) todo.todoName = todoName;
    if (dueDate) todo.dueDate = dueDate;
    if (priority) todo.priority = priority;
    if (status) todo.status = status;

    await todo.save();
    res.json({
      error: false,
      todo,
      message: "Note updated successfully",
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      message: "Internal server Error",
    });
  }
};

// get all Todo
const get_Todo = async (req: CustomRequest, res: Response) => {
  const id = req.id;
  const user = await User.findOne({ _id: id });

  if (!user)
    return res.status(403).json({ error: true, message: "user need to login" });

  try {
    const todo = await Todo.find({ author: user._id });

    return res.json({
      error: false,
      todo,
      message: "All Todo Retrived succcessfully",
    });
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: "Internal Server error",
    });
  }
};

// Delete Todo
const delete_Todo = async (req: CustomRequest, res: Response) => {
  const id = req.id;
  const user = await User.findOne({ _id: id });
  const todoID = req.params.todoID;

  try {
    if (!user)
      return res
        .status(403)
        .json({ error: true, message: "user need to login" });
    const todo = await Todo.findOne({ _id: todoID, author: user._id });

    if (!todo) {
      return res.status(404).json({ error: true, message: "Todo not found" });
    }

    await Todo.deleteOne({ _id: todoID, author: user._id });

    return res.json({
      error: false,
      message: "Todo deleted successfully",
    });
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export { create_Todo, get_Todo, edit_Todo, delete_Todo };
