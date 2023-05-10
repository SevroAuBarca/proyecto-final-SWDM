import "dotenv/config";
import express from "express";
import cors from "cors";
import UsersAPI from "./src/routes/users.js";
import CompaniesAPI from "./src/routes/companies.js";
import JobsAPI from "./src/routes/jobs.js";
import connection from "./src/database/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection();

UsersAPI(app);
CompaniesAPI(app);
JobsAPI(app);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});