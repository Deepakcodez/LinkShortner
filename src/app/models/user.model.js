import mongoose, { Schema, model, models } from "mongoose";
import URLs from "./url";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
    },
    sample:{
       type: String,
       default:"hello"
    },
    urls: {
      type: [String],
      default: [],
    },
  },

  { timestamps: true }
);

const Users = mongoose.models?.Users || model("Users", UserSchema);

export default Users;
