import express from "express";
import {
  deleteJobs,
  getAllJobs,
  getJob,
  postJobs,
  putJobs,
} from "../controllers/jobs.js";

const router = express.Router();

const JobsAPI = (app) => {
  //las rutas para hacer la llamada a la api, este es la de jobs
  router
    .get("/", getAllJobs)
    .get("/:id", getJob)
    .post("/", postJobs)
    .put("/:id", putJobs)
    .delete("/:id", deleteJobs);

  app.use("/jobs", router);
};

export default JobsAPI;
