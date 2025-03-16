import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Users } from "../models/user.models.js";
import bcrypt from "bcrypt";

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (name == "" || email == "" || password == "") {
    return res
      .status(401)
      .json({ status: "FAILED", message: "All fields are mandatory" });
  } else if (name.length <= 2) {
    return res.status(401).json({ status: "FAILED", message: "Invalid Name" });
  } else if (!/^[\w.-]+@gmail\.com$/.test(email)) {
    return res.status(401).json({ status: "FAILED", message: "Invalid Email" });
  } else if (password.length <= 5) {
    return res
      .status(401)
      .json({ status: "FAILED", message: "Enter a Strong Password" });
  }

  const userExist = await Users.findOne({ email });
  if (userExist) {
    return res
      .status(401)
      .json({ status: "FAILED", message: "User already Exist" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new Users({
    name,
    email,
    password: hashedPassword,
  });
  await user.save();
  res
    .status(201)
    .json({ status: "SUCCESS", message: "Successfull create, login now" });
});

const login = asyncHandler(async (req, res) => {
  const { email, pass } = req.body;

  const userExist = await Users.findOne({ email });
  if (!userExist) {
    return res
      .status(401)
      .json({ status: "FAILED", message: "User is not Found, Register now" });
  }
  const { password } = userExist;
  const id = userExist._id.toString();
  const compare = bcrypt.compare(pass, password);
  if (compare) {
    const secretKey = process.env.TOKEN_KEY;
    const token = jwt.sign(
      {
        userid: id,
        name: userExist.name,
        email: userExist.email,
      },
      secretKey,
      { expiresIn: "30d" }
    );
    return res.status(201).json({ status: "SUCCESS", token: token });
  } else {
    return res
      .status(401)
      .json({ status: "FAILED", message: "invalid password" });
  }
});

const verifyToken = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const secretKey = process.env.TOKEN_KEY;
  const decoded = jwt.verify(token, secretKey);
  return res.status(401).json({ status: "SUCCESS", message: decoded });
});

export { signup, login, verifyToken };
