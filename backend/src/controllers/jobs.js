import { getCompanyService, putCompanyService } from "../services/companies.js";
import {
  deleteJobService,
  getAllJobsService,
  getJobService,
  postJobService,
  putJobService,
} from "../services/jobs.js";
import jwt from "jsonwebtoken";

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await getAllJobsService();
    if (jobs) {
      res.status(200).json({ message: "trabajos", body: jobs });
    } else {
      res.status(200).json({ message: "No hay datos" });
    }
  } catch (error) {}
};

const getJob = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const job = await getJobService(id);
    if (job) {
      res.status(200).json({ message: "trabajo", body: job });
    } else {
      res.status(200).json({ message: "No hay datos" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};
const postJobs = async (req, res) => {
  const { body } = req;
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, "XD");
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  try {
    const company = await getCompanyService(decodedToken.id);
    const job = await postJobService(body);

    if (job) {
      console.log(job);
      company.trabajos = [...company.trabajos, job._id];
      await putCompanyService(company.id, company);
      job.compania = [company.id];
      const res = await putJobService(job._id.toString(), job);
      res.status(200).json({ message: "Trabajo Creado", body: res });
    } else {
      res.status(200).json({ message: "No hay datos" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};
const putJobs = async (req, res) => {
  const { body } = req;
  const {
    params: { id },
  } = req;
  try {
    const job = await getJobService(id);
    job.titulo = body.titulo;
    job.categoria = body.categoria;
    job.habilidades = body.habilidades;
    job.salario = body.salario;
    job.tiempo = body.tiempo;
    job.descripcion = body.descripcion;

    const updatedJob = await putJobService(id, job);
    res.status(200).json({ message: "usuario actualizado", body: updatedJob });
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};
const deleteJobs = async (req, res) => {
  const {
    params: { id },
  } = req;
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, "XD");
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  try {
    const job = await getJobService(id);
    const company = await getCompanyService(decodedToken.id);
    console.log(job);
    console.log(company);
    if (job.compania.toString() === company._id.toString()) {
      const jobs = company.trabajos.filter((job) => job.toString() !== id);
      company.trabajos = [...jobs];
      await company.save();
      const job = await deleteJobService(id);

      res.status(200).json({ message: "usuario eliminado", body: job });
    }
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};

export { getAllJobs, getJob, postJobs, putJobs, deleteJobs };
