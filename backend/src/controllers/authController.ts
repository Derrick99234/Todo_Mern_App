import { Request, Response } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const create_acct = async (req: Request, res: Response) => {
  const { fullname, email, password } = req.body;

  if (!fullname) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is required" });
  }

  if (!email) {
    return res.status(400).json({
      error: true,
      message: "User email is required for registration",
    });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Please provide a valid password" });
  }

  try {
    const isUser = await User.findOne({ email });

    if (isUser) {
      console.log(isUser);
      return res.json({
        error: true,
        message: "User already exists",
      });
    }

    const hashedPwd = bcryptjs.hashSync(password, 10);

    const user = new User({
      fullname,
      email,
      password: hashedPwd,
    });

    await user.save();

    return res.json({
      error: false,
      user,
      message: "Registration Successful",
    });
  } catch (e) {
    return res.json({
      error: true,
      e,
      message: "internal server error",
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      error: true,
      message: "User email is required for registration",
    });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Please provide a valid password" });
  }

  console.log("Access Token Secret:", process.env.ACCESS_SECRET_TOKEN);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ error: true, message: "Account does not exist" });
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ error: true, message: "Password is incorrect" });
    }

    const maxAge = 60 * 60 * 2;
    const secret = process.env.ACCESS_SECRET_TOKEN;

    if (!secret) {
      throw new Error("Secret key is not defined in environment variables.");
    }

    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: maxAge,
    });

    return res
      .status(200)
      .json({ error: false, message: "Login successful", user, token });
  } catch (error) {
    console.error("Login Error:", error); // Log the error to console
    return res.status(500).json({
      error: true,
      message: "Something went wrong",
      err: error,
    });
  }
};

export { create_acct, login };
