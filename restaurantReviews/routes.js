import * as reviewsDao from "./dao.js";
import * as restaurantDao from "../restaurants/dao.js";

function RestaurantReviewsRoutes(app) {
  const userReviewsRestaurant = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const userId = currentUser._id;
    const restaurantId = req.params["restaurantId"];
    const reviewsText = req.body.reviews;

    /*
    const reviews = await reviewsDao.getUserReviewsRestaurant(userId, restaurantId);
    if (reviews) {
      res.sendStatus(200);
      return;
    }
    */

    let restaurant = await restaurantDao.getRestaurantByRestaurantId(restaurantId);
    if (!restaurant) {
      restaurant = await restaurantDao.createRestaurant(req.body);
    }

    const actualReviews = await reviewsDao.userReviewsRestaurant(
      userId,
      restaurant._id,
      restaurantId,
      reviewsText,
    );
    res.json(actualReviews);
  };

  const getReviewsForUser = async (req, res) => {
    const userId = req.params.userId;
    const reviews = await reviewsDao.getReviewsForUser(userId);
    res.json(reviews);
  };
  const getReviewsForRestaurant = async (req, res) => {
    const restaurantId = req.params.restaurantId;
    const reviews = await reviewsDao.getReviewsForRestaurant(restaurantId);
    res.json(reviews);
  };
  app.get("/api/restaurants/:restaurantId/reviews", getReviewsForRestaurant);
  app.get("/api/users/:userId/reviews", getReviewsForUser);
  app.post("/api/restaurants/:restaurantId/reviews", userReviewsRestaurant);
}

export default RestaurantReviewsRoutes;