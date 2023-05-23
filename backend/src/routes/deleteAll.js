import express from "express";
import loginController from "../controllers/auth.js";
import Companies from "../models/Companies.js";
import User from "../models/User.js";
import Jobs from "../models/Jobs.js";

const router = express.Router();
const DeleteAPI = (app) => {
  router.delete("/", async (req, res) => {
    try {
      await Companies.deleteMany({});
      await User.deleteMany({});
      await Jobs.deleteMany({});
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(400).json({ ok: false });
    }
  });

  app.use("/deleteData", router);
};

export default DeleteAPI;
