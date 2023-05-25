import express from "express";
import jwt from "jsonwebtoken";
import { usersCollection } from "../db/connectDB.js";
import authMiddleware from "../Middlewares/authMiddleware.js";

const authRouter = express.Router();
const JWT_SECRET="token"

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({
        message: "Username or password is missing",
      });
    }
    const user = await usersCollection.findOne({ username });
    console.log(user)
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (password !== user.password) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign(
        {
          username,
        },
        JWT_SECRET,
        {
          expiresIn: "55s",
        }
      );

    return res.status(200).json({
      message: "Login success",
      data: {
        token:token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Login fail",
      data: null,
    });
  }
});

authRouter.get('/user',authMiddleware,async(req,res)=>{
    const users = await usersCollection.findOne({}).toArray();
    try {
        res.status(200).json({
          data: users,
        });
      } catch (err) {
        res.status(401).json({
          message: "Unauthorized",
        });
      }
})

export default authRouter