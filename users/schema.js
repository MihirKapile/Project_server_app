import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "owner"],
    },
    dateOfHire: { type: Date, default: Date.now() },
    avatar : String,
    canSeeFollowers: Boolean,
    canSeeReviews: Boolean,
    canFollow: Boolean,
  },
  { collection: "users" }
);

export default userSchema;