import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, max: 100 },
    lastName: { type: String, required: false, max: 100 },
    email: { type: String, required: true, max: 100, unique: true, trim: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId && !this.githubId; // Password required if not using Google or GitHub login
      },
    },
    googleId: { type: String, required: false },
    githubId: { type: String, required: false },
    image: { type: String, required: false },
    codingPlatforms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodingPlatform",
      },
    ],
    solvedProblems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],
  },
  { timestamps: true }
);

// Virtual for user's full name
userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

// Virtual for user's URL
userSchema.virtual("url").get(function () {
  return "/api/users/" + this._id;
});

//Export model
export default mongoose.model("User", userSchema);
