import bcrypt from "bcrypt";
import {
  deleteCompanyService,
  getAllCompaniesService,
  getCompanyService,
  postCompanyService,
} from "../services/companies.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";
//metodo para obtener todos las compañias
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
//metodo para obtener una compañia

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
//metodo para postear una compañia, encripta la contraseña dada con bcrypt
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
//metodo para actualizar compañia

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
//metodo para poner los seguidores (puede cambiar)

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
//metodo para poner los seguidos (puede cambiar)

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
//metodo para añadir la imagen de perfil de la compañia, usando el servicio de cloudinart para guardar la imagen
const putProfileImageCompany = async (req, res) => {
  const {
    params: { id },
  } = req;
  console.log(req);
  try {
    const company = await getCompanyService(id);
    if (company) {
      //si ya hay imagen guardada la elimina para poner la que se mando del request
      if (company.imagen_perfil.public_id) {
        await deleteImage(company.imagen_perfil.public_id);
      }
      //req.files detecta si hay un archivo imagen en la propiedad files del request
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

//metodo para añadir la imagen de portada del usuario, usando el servicio de cloudinart para guardar la imagen
const putCoverImageCompany = async (req, res) => {
  const {
    params: { id },
  } = req;
  console.log(req.file, id);

  try {
    const company = await getCompanyService(id);
    if (company) {
      //si ya hay imagen guardada la elimina para poner la que se mando del request
      if (company.imagen_portada.public_id) {
        await deleteImage(company.imagen_portada.public_id);
      }
      //req.files detecta si hay un archivo imagen en la propiedad files del request
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
//metodo para eliminar compañia (puede cambiar)

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
