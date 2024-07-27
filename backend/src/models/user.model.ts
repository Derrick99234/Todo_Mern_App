import mongoose, { Document, Schema } from "mongoose";

// Define the user interface
interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  photoURL: string;
}

const UserSchema: Schema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photoURL: {
    type: String,
    default:
      "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
  },
});

// Create and export the User model
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
