import express from "express";
import cors from "cors";
import UserController from "./users/routes.js";
import SessionController from "./session/routes.js";
import RestaurantLikesRoutes from "./restaurantLikes/routes.js";
import FollowsRoutes from "./follows/routes.js";
import session from "express-session";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
  process.env.DATA_DB || "mongodb://localhost:27017/project"
);

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  })
);
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