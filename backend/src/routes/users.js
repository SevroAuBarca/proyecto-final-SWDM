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
  //las rutas para hacer la llamada a la api, este es la de usuarios, importamos la variable upload para ponerla en la ruta como un middleware, qque es el que agarrara la imagen o archivo(en este case imagen) del la request
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
