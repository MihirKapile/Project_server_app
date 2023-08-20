import mongoose from "mongoose";
import restaurantSchema from "./schema.js";

const restaurantModel = mongoose.model("restaurants", restaurantSchema);

export default restaurantModel;