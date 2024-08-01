"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_Todo = exports.edit_Todo = exports.get_Todo = exports.create_Todo = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const todo_model_1 = __importDefault(require("../models/todo.model"));
const create_Todo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    const user = yield user_model_1.default.findOne({ _id: id });
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
        const todo = new todo_model_1.default({
            todoName,
            dueDate,
            priority,
            author: user._id,
        });
        yield todo.save();
        return res.json({
            error: false,
            todo,
            message: "Todo added successfully",
        });
    }
    catch (e) {
        return res.status(500).json({
            error: true,
            message: `Internal server Error: ${e}`,
        });
    }
});
exports.create_Todo = create_Todo;
// edit Todo
const edit_Todo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoID = req.params.todoID;
    const { todoName, dueDate, priority, status } = req.body;
    const id = req.id;
    const user = yield user_model_1.default.findOne({ _id: id });
    if (!user)
        return res.status(403).json({ error: true, message: "user need to login" });
    try {
        const todo = yield todo_model_1.default.findOne({ _id: todoID, author: user._id });
        if (!todo) {
            return res.status(400).json({
                error: true,
                message: "Todo not found",
            });
        }
        if (todoName)
            todo.todoName = todoName;
        if (dueDate)
            todo.dueDate = dueDate;
        if (priority)
            todo.priority = priority;
        if (status)
            todo.status = status;
        yield todo.save();
        res.json({
            error: false,
            todo,
            message: "Note updated successfully",
        });
    }
    catch (e) {
        res.status(500).json({
            error: true,
            message: "Internal server Error",
        });
    }
});
exports.edit_Todo = edit_Todo;
// get all Todo
const get_Todo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    const user = yield user_model_1.default.findOne({ _id: id });
    if (!user)
        return res.status(403).json({ error: true, message: "user need to login" });
    try {
        const todo = yield todo_model_1.default.find({ author: user._id });
        return res.json({
            error: false,
            todo,
            message: "All Todo Retrived succcessfully",
        });
    }
    catch (e) {
        return res.status(500).json({
            error: true,
            message: "Internal Server error",
        });
    }
});
exports.get_Todo = get_Todo;
// Delete Todo
const delete_Todo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    const user = yield user_model_1.default.findOne({ _id: id });
    const todoID = req.params.todoID;
    try {
        if (!user)
            return res
                .status(403)
                .json({ error: true, message: "user need to login" });
        const todo = yield todo_model_1.default.findOne({ _id: todoID, author: user._id });
        if (!todo) {
            return res.status(404).json({ error: true, message: "Todo not found" });
        }
        yield todo_model_1.default.deleteOne({ _id: todoID, author: user._id });
        return res.json({
            error: false,
            message: "Todo deleted successfully",
        });
    }
    catch (e) {
        return res.status(500).json({
            error: true,
            message: "Internal server error",
        });
    }
});
exports.delete_Todo = delete_Todo;
