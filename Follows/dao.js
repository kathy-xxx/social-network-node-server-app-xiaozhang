import model from "./model.js";
import userModel from "../Users/model.js";
import { v4 as uuidv4 } from "uuid";
export function findAllFollows() {
  return model.find();
}
export function createFollow(followerId, followeeId) {
  const newFollow = {
    _id: uuidv4(),
    follower_id: followerId,
    followee_id: followeeId,
  };
  return model.create(newFollow);
}
export function deleteFollow(followerId, followeeId) {
  return model.deleteOne({ followee_id: followeeId, follower_id: followerId });
}
export async function findFollowersForUser(userId) {
  const userFollows = await model.find({ followee_id: userId });
  const followerIds = userFollows.map((f) => f.follower_id);
  const followers = await userModel.find({ _id: { $in: followerIds } });
  return followers;
}
export async function findFolloweesForUser(userId) {
  const userFollows = await model.find({ follower_id: userId });
  const followeeIds = userFollows.map((f) => f.followee_id);
  const followees = await userModel.find({ _id: { $in: followeeIds } });
  return followees;
}
