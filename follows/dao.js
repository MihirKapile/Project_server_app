import followsModel from "./model.js";

export const userFollowsAnotherUser = (follower, followed) =>
  followsModel.create({ follower, followed });

export const getFollowedUsers = (follower) =>
  followsModel.find({ follower }).populate("followed");

export const getFollowers = (followed) =>
  followsModel.find({ followed }).populate("follower");