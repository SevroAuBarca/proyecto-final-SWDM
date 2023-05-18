import bcrypt from "bcrypt";
import {
  deleteCompanyService,
  getAllCompaniesService,
  getCompanyService,
  postCompanyService,
} from "../services/companies.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";

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

const putFollowers = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const company = await getCompanyService(id);
    if (company) {
      company.seguidores = company.seguidores + 1;
      company.save();
      res.status(200).json({ message: "usuario actualizado", body: user });
    } else {
      res.status(200).json({ message: "No hay datos" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};

const putFollowing = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const company = await getCompanyService(id);
    if (company) {
      company.seguidores = company.seguidos + 1;
      company.save();
      res.status(200).json({ message: "usuario actualizado", body: user });
    } else {
      res.status(200).json({ message: "No hay datos" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};

const putProfileImageCompany = async (req, res) => {
  const {
    params: { id },
  } = req;
  console.log(req);
  try {
    const company = await getCompanyService(id);
    if (company) {
      if (company.imagen_perfil.public_id) {
        await deleteImage(company.imagen_perfil.public_id);
      }
      if (req.file) {
        const image = await uploadImage(req.file.path);
        req.body.imagen_perfil = image;
      }
      company.imagen_perfil = req.body.imagen_perfil;

      await company.save();
      res.status(200).json({ message: "usuario actualizado", body: company });
    } else {
      res.status(200).json({ message: "No hay datos" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};

const putCoverImageCompany = async (req, res) => {
  const {
    params: { id },
  } = req;
  console.log(req.file, id);

  try {
    const company = await getCompanyService(id);
    if (company) {
      if (company.imagen_portada.public_id) {
        await deleteImage(company.imagen_portada.public_id);
      }
      if (req.file) {
        const image = await uploadImage(req.file.path);
        console.log(image);
        req.body.imagen_portada = image;
      }
      company.imagen_portada = req.body.imagen_portada;

      company
        .save()
        .then((user) => {
          // If everything goes as planed
          //use the retured user document for something
          return res
            .status(200)
            .json({ message: "usuario actualizado", body: user });
        })
        .catch((error) => {
          //When there are errors We handle them here
          console.log(error);
          res.status(400).send("Bad Request");
        });
      // res.status(200).json({ message: "usuario actualizado", body: company });
    } else {
      res.status(200).json({ message: "No hay datos" });
    }
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

export {
  getAllCompanies,
  getCompany,
  postCompany,
  putCompany,
  deleteCompany,
  putCoverImageCompany,
  putProfileImageCompany,
  putFollowing,
  putFollowers,
};
