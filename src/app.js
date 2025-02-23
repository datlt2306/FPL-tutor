import express from "express";
import mongoose from "mongoose";

import blogRouter from "./routers/blog";
import authRouter from "./routers/auth";

const app = express();

app.use(express.json());
// Kết nối db
mongoose.connect(`mongodb://localhost:27017/tutor`);

// routers

app.use("/", blogRouter);
app.use("/auth", authRouter);

export const viteNodeApp = app;
