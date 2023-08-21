import express from "express";
import cors from "cors";
import UserController from "./users/routes.js";
import SessionController from "./session/routes.js";
import RestaurantLikesRoutes from "./restaurantLikes/routes.js";
import FollowsRoutes from "./follows/routes.js";
import session from "express-session";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from 'axios';

dotenv.config();

mongoose.connect(
  process.env.DATA_DB || "mongodb://127.0.0.1:27017/project"
);

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  })
);

const yelpApiKey = process.env.REACT_APP_YELP_API_KEY;
const yelpApiUrl = 'https://api.yelp.com/v3/businesses/search';
const yelpApiUrl_id = 'https://api.yelp.com/v3/businesses';

//Define a route to proxy requests to Yelp API due to Yelp doesn't support CORS
app.get('/proxy/yelp', async (req, res) => {
  const { ...queryParams } = req.query;

  try {
    const response = await axios.get(`${yelpApiUrl}`, {
      headers: {
        Authorization: `Bearer ${yelpApiKey}`,
        Accept: 'application/json',
      },
      params: queryParams,
    });

      res.json(response.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  });

//Define a proxy route for searching
app.get('/proxy/yelp/:id', async (req, res) => {
  try {
    const response = await axios.get(`${yelpApiUrl_id}/${req.params.id}`, {
      headers: {
        Authorization: `Bearer ${yelpApiKey}`,
        Accept: 'application/json',
      },
    });
    res.json(response.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  });

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
  },
};
if (process.env.NODE_ENV && process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
  app.set("trust proxy", 1);
}
app.use(session(sessionOptions));
app.use(express.json());

RestaurantLikesRoutes(app);
SessionController(app);
UserController(app);
FollowsRoutes(app);
app.listen(process.env.PORT || 4000);