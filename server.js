import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
const app = express();
import userAuthRoute from "./routes/userAuthRoute.js";
dotenv.config();
connectDB();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use("/", userAuthRoute);

app.listen(3000, console.log("server is running on port 3000"));
