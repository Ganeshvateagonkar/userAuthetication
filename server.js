import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import requireAuth from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
const app = express();
import userAuthRoute from "./routes/userAuthRoute.js";
import currentUser from "./middleware/currentUser.js";
dotenv.config();
connectDB();
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.get("*", currentUser);
app.use("/required", requireAuth, (req, res) => {
  res.render("required");
});
app.use("/", userAuthRoute);

app.listen(3000, console.log("server is running on port 3000"));
