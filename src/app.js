import express from "express";
import auth from "./routes/auth.routes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", auth);

export default app;
