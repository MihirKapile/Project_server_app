import * as dao from "./dao.js";

function FollowsRoutes(app) {
  const userFollowsAnotherUser = async (req, res) => {
    const follower = req.session.currentUser._id;
    const followed = req.params.followed;
    const follow = await dao.userFollowsAnotherUser(follower, followed);
    res.json(follow);
  };

  const getFollowedUsers = async (req, res) => {
    const follower = req.params.userId;
    const followed = await dao.getFollowedUsers(follower);
    res.json(followed);
  };

  const getFollowers = async (req, res) => {
    const followed = req.params.userId;
    const followers = await dao.getFollowers(followed);
    res.json(followers);
  };

  app.post("/api/follow/:followed", userFollowsAnotherUser);
  app.get("/api/users/:userId/followed", getFollowedUsers);
  app.get("/api/users/:userId/followers", getFollowers);
}

export default FollowsRoutes;