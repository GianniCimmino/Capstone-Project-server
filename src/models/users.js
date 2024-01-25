import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  favoriteDance: {
    type: String,
  },
});

export const User = new mongoose.model("users", userSchema);
