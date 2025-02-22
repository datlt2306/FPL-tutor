import express from "express";
import mongoose from "mongoose";

import blogRouter from "./routers/blog";

const app = express();

app.use(express.json());
// Kết nối db
mongoose.connect(`mongodb://localhost:27017/tutor`);

// routers

app.use("/api", blogRouter);

export const viteNodeApp = app;
