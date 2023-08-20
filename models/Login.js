import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  email: String,
  hash: String,
});

const Login = mongoose.model("Login", loginSchema);

export default Login;
