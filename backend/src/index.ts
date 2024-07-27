import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import config from "./config.json";
import authRouter from "./routes/authRoute";
import userRouter from "./routes/userRoute";
import todoRouter from "./routes/todoRoute";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Import types from express
import { Request, Response } from "express";

mongoose
  .connect(config.connectionString)
  .then(() => console.log("MongoDB connected"))
  .catch((err: any) => console.log(err));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/app", todoRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
