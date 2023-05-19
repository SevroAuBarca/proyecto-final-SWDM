import {
  deleteUserService,
  getAllUsersService,
  getUserService,
  postUserService,
} from "../services/users.js";
import bcrypt from "bcrypt";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";
//metodo para obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    if (users) {
      res.status(200).json({ message: "usuarios", body: users });
    } else {
      res.status(200).json({ message: "No hay datos" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};
//metodo para obtener un usuario
const getUser = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await getUserService(id);
    if (user) {
      res.status(200).json({ message: "usuario", body: user });
    } else {
      res.status(200).json({ message: "No hay datos" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};
//metodo para postear un usuario, encripta la contraseña dada con bcrypt

const postUser = async (req, res) => {
  const { body } = req;
  console.log(body);
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.contraseña, saltRounds);
  body.contraseña = passwordHash;
  body.seguidos = 0;
  body.seguidores = 0;
  body.trabajos_guardados = 0;
  body.contratista = false;
  body.imagen_perfil = "";
  body.imagen_portada = "";
  try {
    const user = await postUserService(body);
    if (user) {
      res.status(200).json({ message: "usuario", body: user });
    } else {
      res.status(200).json({ message: "No hay datos" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};
//este no se usa XD
const loginUser = async (req, res) => {};
//metodo para actualizar usuario
const putUser = async (req, res) => {
  const { body } = req;
  const {
    params: { id },
  } = req;
  console.log(body);
  try {
    const user = await getUserService(id);
    console.log(user);
    if (body.nombre_completo) user.nombre_completo = body.nombre_completo;

    if (body.nombre_usuario) user.nombre_usuario = body.nombre_usuario;

    if (body.pais) user.pais = user.pais;

    if (body.informacion) user.informacion = body.informacion;

    await user.save();

    res.status(200).json({ message: "usuario actualizado", body: user });
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
    const user = await getUserService(id);
    if (user) {
      user.seguidores = user.seguidores + 1;
      user.save();
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
    const user = await getUserService(id);
    if (user) {
      user.seguidores = user.seguidos + 1;
      user.save();
      res.status(200).json({ message: "usuario actualizado", body: user });
    } else {
      res.status(200).json({ message: "No hay datos" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};
//metodo para añadir la imagen de perfil del usuario, usando el servicio de cloudinart para guardar la imagen

const putProfileImageUser = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await getUserService(id);
    if (user) {
      //si ya hay imagen guardada la elimina para poner la que se mando del request
      if (user.imagen_perfil.public_id) {
        await deleteImage(user.imagen_perfil.public_id);
      }
      //req.files detecta si hay un archivo imagen en la propiedad files del request
      if (req.file) {
        const image = await uploadImage(req.file.path);
        req.body.imagen_perfil = image;
      }
      user.imagen_perfil = req.body.imagen_perfil;

      await user.save();
      res.status(200).json({ message: "usuario actualizado", body: user });
    } else {
      res.status(200).json({ message: "No hay datos" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};
//metodo para añadir la imagen de portada del usuario, usando el servicio de cloudinart para guardar la imagen

const putCoverImageUser = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await getUserService(id);
    if (user) {
      if (user.imagen_portada.public_id) {
        await deleteImage(user.imagen_portada.public_id);
      }
      //req.files detecta si hay un archivo imagen en la propiedad files del request

      if (req.file) {
        const image = await uploadImage(req.file.path);
        req.body.imagen_portada = image;
      }
      user.imagen_portada = req.body.imagen_portada;

      await user.save();
      res.status(200).json({ message: "usuario actualizado", body: user });
    } else {
      res.status(200).json({ message: "No hay datos" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};

//metodo para eliminar usuario (puede cambiar)
const deleteUser = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await deleteUserService(id);

    res.status(200).json({ message: "usuario eliminado", body: user });
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};

export {
  getAllUsers,
  getUser,
  postUser,
  loginUser,
  putUser,
  deleteUser,
  putProfileImageUser,
  putCoverImageUser,
  putFollowers,
  putFollowing,
};
