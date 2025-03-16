import { Router } from "express";
import { signup, login, verifyToken } from "../controllers/auth.controller.js";
const auth = Router();

auth.post("/signup", signup);
auth.post("/login", login);
auth.post("/verify", verifyToken);

export default auth;
