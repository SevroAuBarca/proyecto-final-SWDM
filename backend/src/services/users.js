import Users from "../models/User.js";

//estos metodos sirven para obtener los datos de la base de datos, los basicos CRUD
const getAllUsersService = async () => await Users.find({});

const getUserService = async (id) => await Users.findById(id);

const postUserService = async (data) => await Users.create(data);

const loginUserService = async (username) =>
  await Users.findOne({ nombre_usuario: username });

const putUserService = async (id, data) =>
  await Users.findByIdAndUpdate(id, data);

const deleteUserService = async (id) => await Users.findByIdAndDelete(id);

export {
  getAllUsersService,
  getUserService,
  postUserService,
  loginUserService,
  putUserService,
  deleteUserService,
};
