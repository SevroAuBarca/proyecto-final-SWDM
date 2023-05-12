import express from "express";
import loginController from "../controllers/auth.js";

const router = express.Router();
const AuthAPI = (app) => {
  router.post("/", loginController);

  app.use("/login", router);
};

export default AuthAPI;
