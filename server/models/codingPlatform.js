import mongoose from "mongoose";

const Schema = mongoose.Schema;

const codingPlatformSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    platformUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CodingPlatform = mongoose.model("CodingPlatform", codingPlatformSchema);

export default CodingPlatform;
