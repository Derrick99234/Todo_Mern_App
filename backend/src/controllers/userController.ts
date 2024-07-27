import { Request, Response } from "express";
import User from "../models/user.model";

import { CustomRequest } from "../middleware/verifyJWT";
const getUser = async (req: CustomRequest, res: Response) => {
  const user = req.id; // Access user information from the request object

  // Use the user information to perform operations
  try {
    const isUser = await User.findOne({ _id: user });

    if (!isUser) {
      return res.sendStatus(401);
    }

    return res.json({
      user: {
        fullname: isUser.fullname,
        email: isUser.email,
        _id: isUser._id,
      },
      message: "This is from the backend just now",
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default getUser;
