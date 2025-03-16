import express from "express";
import auth from "./routes/auth.routes.js";

const app = express();
app.use(express.json());

app.use("/", auth);

export default app;
