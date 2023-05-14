import {
  deleteUserService,
  getAllUsersService,
  getUserService,
  postUserService,
} from "../services/users.js";
import bcrypt from "bcrypt";

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
const postUser = async (req, res) => {
  const { body } = req;
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
const loginUser = async (req, res) => {};

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

export { getAllUsers, getUser, postUser, loginUser, putUser, deleteUser };
