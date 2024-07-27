import mongoose, { Schema, Document } from "mongoose";

interface ITodo extends Document {
  todoName: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  status: "onGoing" | "completed";
  author: object;
}

const todoSchema = new Schema<ITodo>(
  {
    todoName: { type: String, required: true },
    dueDate: { type: Date },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["onGoing", "completed"],
      default: "onGoing",
    },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);
export default Todo;
