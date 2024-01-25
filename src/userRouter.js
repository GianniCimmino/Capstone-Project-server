import express from "express";
import { User } from "./models/users.js";

const userRouter = express.Router();

userRouter.get("/test/"),
  async (req, res) => {
    //res.json({ message: "User router working!" });

    const user = await User.findById("65b129f65f233214abf1bd65");

    res.json(user);
  };

export default userRouter;
