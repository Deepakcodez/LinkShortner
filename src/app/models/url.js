import mongoose, { Schema, model } from "mongoose";

const URLSchema = new mongoose.Schema(
  {
    shortURL: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHostory: [
      {
        timestamp: {
          type: Number,
        },
      },
    ],
  },
  { timestamp: true }
);


const URLs =  models.URLs || model("URLs", URLSchema);

export default URLs;