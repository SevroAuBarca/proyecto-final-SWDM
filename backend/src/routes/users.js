import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  postUser,
  putUser,
} from "../controllers/users.js";

const router = express.Router();

const UsersAPI = (app) => {
  router
    .get("/", getAllUsers)
    .get("/:id", getUser)
    .post("/signup", postUser)
    .post("/signin", loginUser)
    .put("/:id", putUser)
    .delete("/:id", deleteUser);

  app.use("/users", router);
};

export default UsersAPI;
