import express from "express";
import {
  deleteCompany,
  getAllCompanies,
  getCompany,
  postCompany,
  putCompany,
  putCoverImageCompany,
  putFollowers,
  putFollowing,
  putProfileImageCompany,
} from "../controllers/companies.js";
import { upload } from "../config/index.js";

const router = express.Router();

const CompaniesAPI = (app) => {
  router
    .get("/", getAllCompanies)
    .get("/:id", getCompany)
    .post("/", postCompany)
    .put("/:id", putCompany)
    .put(
      "/uploadProfileImage/:id",
      upload.single("profileImage"),
      putProfileImageCompany
    )
    .put(
      "/uploadCoverImage/:id",
      upload.single("coverImage"),
      putCoverImageCompany
    )
    .put("following/:id", putFollowing)
    .put("followers/:id", putFollowers)
    .delete("/:id", deleteCompany);

  app.use("/companies", router);
};

export default CompaniesAPI;
