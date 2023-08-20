import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    joined: Date,
    entries: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

export default User;
