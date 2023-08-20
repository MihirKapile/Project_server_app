import mongoose from "mongoose";
import followsSchema from "./schema.js";

const followsModel = mongoose.model("follows", followsSchema);

export default followsModel;