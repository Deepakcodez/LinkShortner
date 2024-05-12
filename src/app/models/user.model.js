import mongoose, { Schema, model, models } from "mongoose";

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
    password : {
      type : String,
      select : false,
    },
    urls : {
      type : String,

    }
  },
  
  { timestamp: true }
);


const Users =  models?.Users || model("Users", UserSchema);

export default Users;