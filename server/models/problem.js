import mongoose from "mongoose";

const Schema = mongoose.Schema;

const problemSchema = new Schema(
  {
    platform: {
      type: String,
      required: true,
    },
    problemId: {
      type: String,
      required: true,
    },
    problemName: {
      type: String,
      required: true,
    },
    problemURL: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    solveCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
