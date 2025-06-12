import express from "express";
import mongoose from "mongoose";
import router from "./routers";

const app = express();

// database
mongoose.connect("mongodb://localhost:27017/tutor");

// middleware

app.use(express.json());

// router
app.use("/api", router);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
