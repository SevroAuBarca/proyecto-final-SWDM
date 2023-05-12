import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginUserService } from "../services/users.js";
import { loginCompanyService } from "../services/companies.js";
const loginController = async (req, res) => {
  const body = req.body;
  let user;
  user = await loginUserService(body.usuario);
  if (!user) {
    user = await loginCompanyService(body.usuario);
  }
  const passwordCorrect =
    user === null ? false : bcrypt.compare(body.contraseña, user.contraseña);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.nombre_usuario || user.nombre_compañia,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({
    token,
    username: user.nombre_usuario || user.nombre_compañia,
    id: user.id,
    contratista: user.contratista,
  });
};

export default loginController;
