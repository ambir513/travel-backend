import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const Users = mongoose.model("Users", UserSchema);
