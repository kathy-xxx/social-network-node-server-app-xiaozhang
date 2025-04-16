import * as dao from "./dao.js";
import * as favoriteDao from "../Favorites/dao.js";
import * as followDao from "../Follows/dao.js";
export default function UserRoutes(app) {
  const createUser = (req, res) => {};
  const deleteUser = (req, res) => {};
  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => {
    const userId = req.params.userId;
    const user = await dao.findUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };
  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }
    console.log("Update user:", req.body);
    res.json(currentUser);
  };
  const signup = async (req, res) => {
    console.log("Signup request body:", req.body);
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      console.log("Signup failed: Username already in use:", req.body.username);
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    console.log("Signup successful. New user created:", currentUser);
    res.json(currentUser);
  };
  const signin = async (req, res) => {
    console.log("Signin request body:", req.body);
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      console.log("Signin successful. Current user:", currentUser);
      res.json(currentUser);
    } else {
      console.log("Signin unsussessful.");
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };
  const signout = (req, res) => {
    req.session.destroy();
    console.log("Signout successful!");
    res.sendStatus(200);
  };
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  const favorite = async (req, res) => {
    const { bookId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newFavorite = await favoriteDao.createFavorite(currentUser._id, bookId);
    console.log("Add favorite:", currentUser._id, bookId);
    res.json(newFavorite);
  };
  const unfavorite = async (req, res) => {
    const { bookId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const status = await favoriteDao.deleteFavorite(currentUser._id, bookId);
    console.log("Delete favorite:", currentUser._id, bookId);
    res.json(status);
  };
  const findFavorites = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const favorites = await favoriteDao.findFavoritesByUser(currentUser._id);
    res.json(favorites);
  };
  const follow = async (req, res) => {
    const { followeeId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newFollow = await followDao.createFollow(currentUser._id, followeeId);
    console.log("Add follow:", currentUser._id, followeeId);
    res.json(newFollow);
  };
  const unfollow = async (req, res) => {
    const { followeeId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const status = await followDao.deleteFollow(currentUser._id, followeeId);
    console.log("Delete follow:", currentUser._id, followeeId);
    res.json(status);
  };
  const findFollowersForUser = async (req, res) => {
    const { userId } = req.params;
    const followers = await followDao.findFollowersForUser(userId);
    res.json(followers);
  };
  const findFolloweesForUser = async (req, res) => {
    const { userId } = req.params;
    const followees = await followDao.findFolloweesForUser(userId);
    res.json(followees);
  };
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.post("/api/users/favorite/:bookId", favorite);
  app.delete("/api/users/favorite/:bookId", unfavorite);
  app.get("/api/users/favorites", findFavorites);
  app.post("/api/users/follow/:followeeId", follow);
  app.delete("/api/users/follow/:followeeId", unfollow);
  app.get("/api/users/:userId/followers", findFollowersForUser);
  app.get("/api/users/:userId/followees", findFolloweesForUser);
}
