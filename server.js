import express from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import register from "./controllers/register.js";
import signin from "./controllers/signin.js";
import profile from "./controllers/profile.js";
import image from "./controllers/image.js";
import clarifai from "./controllers/clarifai.js";
import mongoose from "mongoose";
import User from "./models/User.js";
import Login from "./models/Login.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

mongoose.connect(process.env.DB_URI).then(() => {
  console.log("Connected to database!");
});

// Use the cors middleware with appropriate options
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});
app.use(express.json());

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, Login, User, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, Login, User, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, User);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, User);
});

app.post("/clarifai", (req, res) => {
  clarifai.handleApiCall(req, res);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
