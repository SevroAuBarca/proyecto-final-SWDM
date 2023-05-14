import bcrypt from "bcrypt";
import {
  deleteCompanyService,
  getAllCompaniesService,
  getCompanyService,
  postCompanyService,
} from "../services/companies.js";

const getAllCompanies = async (req, res) => {
  try {
    const companies = await getAllCompaniesService();
    if (companies) {
      res.status(200).json({ message: "usuarios", body: companies });
    } else {
      res.status(200).json({ message: "No hay datos" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};

const getCompany = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const company = await getCompanyService(id);
    if (company) {
      res.status(200).json({ message: "usuarios", body: company });
    } else {
      res.status(200).json({ message: "No hay datos" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};
const postCompany = async (req, res) => {
  const { body } = req;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.contraseña, saltRounds);
  body.contraseña = passwordHash;
  body.seguidos = 0;
  body.seguidores = 0;
  body.contratista = true;
  body.imagen_perfil = "";
  body.imagen_portada = "";
  body.trabajos = [];
  try {
    const company = await postCompanyService(body);
    if (company) {
      res.status(200).json({ message: "contraseña", body: company });
    } else {
      res.status(200).json({ message: "No hay datos" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};
const putCompany = async (req, res) => {
  const { body } = req;
  const {
    params: { id },
  } = req;
  try {
    const company = await getCompanyService(id);
    if (body.nombre_compañia) company.nombre_compañia = body.nombre_compañia;

    if (body.pais) company.pais = body.pais;

    if (body.informacion) company.informacion = body.informacion;

    await company.save();

    res.status(200).json({ message: "compañia actualizada", body: company });
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};
const deleteCompany = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const company = await deleteCompanyService(id);

    res.status(200).json({ message: "compañia eliminada", body: company });
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};

export { getAllCompanies, getCompany, postCompany, putCompany, deleteCompany };
