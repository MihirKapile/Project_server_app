import mongoose from "mongoose";

const restaurantReviewsSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurants",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    restaurantId: String,
    reviews: String,
  },
  {
    collection: "restaurantReviews",
  }
);

export default restaurantReviewsSchema;