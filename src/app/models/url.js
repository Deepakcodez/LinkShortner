import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const URLSchema = new Schema(
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
    clickes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const URLs = models?.URLs || model("URLs", URLSchema);

export default URLs;
