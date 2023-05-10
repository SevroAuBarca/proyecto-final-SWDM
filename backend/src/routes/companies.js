import express from "express";
import {
  deleteCompany,
  getAllCompanies,
  getCompany,
  postCompany,
  putCompany,
} from "../controllers/companies.js";

const router = express.Router();

const CompaniesAPI = (app) => {
  router
    .get("/", getAllCompanies)
    .get("/:id", getCompany)
    .post("/", postCompany)
    .put("/:id", putCompany)
    .delete("/:id", deleteCompany);

  app.use("/companies", router);
};

export default CompaniesAPI;
