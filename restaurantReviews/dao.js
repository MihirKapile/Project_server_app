import restaurantReviewsModel from "./model.js";

export const getUserReviewsRestaurant = (userId, restaurantId) =>
  restaurantReviewsModel.findOne({ user: userId, restaurantId });
export const userReviewsRestaurant = (user, restaurant, restaurantId, reviews) =>
  restaurantReviewsModel.create({ user, restaurant, restaurantId, reviews });
export const userUnlikesRestaurant = (userId, restaurantId) =>
  restaurantReviewsModel.deleteOne({ user: userId, restaurant: restaurantId });
export const getReviewsForUser = (userId) =>
  restaurantReviewsModel.find({ user: userId }).populate("restaurant", "name");
export const getReviewsForRestaurant = (restaurantId) =>
  restaurantReviewsModel.find({ restaurantId }).populate("user");