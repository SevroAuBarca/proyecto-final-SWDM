import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  postUser,
  putCoverImageUser,
  putFollowers,
  putFollowing,
  putProfileImageUser,
  putUser,
} from "../controllers/users.js";
import { upload } from "../config/index.js";

const router = express.Router();

const UsersAPI = (app) => {
  router
    .get("/", getAllUsers)
    .get("/:id", getUser)
    .post("/", postUser)
    .put("/:id", putUser)
    .put(
      "/uploadProfileImage/:id",
      upload.single("profileImage"),
      putProfileImageUser
    )
    .put(
      "/uploadCoverImage/:id",
      upload.single("coverImage"),
      putCoverImageUser
    )
    .put("following/:id", putFollowing)
    .put("followers/:id", putFollowers)
    .delete("/:id", deleteUser);

  app.use("/users", router);
};

export default UsersAPI;
