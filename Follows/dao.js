import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
export function findAllFollows() {
  return Database.follows;
}
export function createFollow(followerId, followeeId) {
  const newFollow = {
    _id: uuidv4(),
    follower_id: followerId,
    followee_id: followeeId,
  };
  Database.follows = [...Database.follows, newFollow];
  return newFollow;
}
export function deleteFollow(followerId, followeeId) {
  const { follows } = Database;
  Database.follows = follows.filter(
    (follow) =>
      !(follow.follower_id === followerId && follow.followee_id === followeeId)
  );
}
export function findFollowersForUser(userId) {
  const { follows, users } = Database;
  const userFollows = follows.filter((follow) => follow.followee_id === userId);
  const followers = users.filter((user) =>
    userFollows.map((follow) => follow.follower_id).includes(user._id)
  );
  return followers;
}
export function findFolloweesForUser(userId) {
  const { follows, users } = Database;
  const userFollows = follows.filter((follow) => follow.follower_id === userId);
  const followees = users.filter((user) =>
    userFollows.map((follow) => follow.followee_id).includes(user._id)
  );
  return followees;
}
