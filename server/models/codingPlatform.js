import mongoose from "mongoose";

const Schema = mongoose.Schema;

const codingPlatformSchema = new Schema(
  {
    platformName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    platformURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CodingPlatform = mongoose.model("CodingPlatform", codingPlatformSchema);

export default CodingPlatform;
