import mongoose from "mongoose";
import restaurantReviewsSchema from "./schema.js";

const restaurantReviewsModel = mongoose.model("restaurantReviews", restaurantReviewsSchema);

export default restaurantReviewsModel;