import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginUserService } from "../services/users.js";
import { loginCompanyService } from "../services/companies.js";
//creamos un controlador para el login
const loginController = async (req, res) => {
  const { body } = req;
  console.log(body);
  let user;
  try {
    //aqui validaremos si el usuario que recibimos del body es del modelo Usuario o Compañia
    user = await loginUserService(body.usuario);
    if (!user) {
      user = await loginCompanyService(body.usuario);
    }

    //aqui validaremos si la contraseña del usuario es igual a ladel body (la contraseña del usuario en la base de datos la desencriptamos con la libreria bcrypt, que sirve para encriptar datos)
    const passwordCorrect =
      user === null ? false : bcrypt.compare(body.contraseña, user.contraseña);
    //validamos si los campos no estan vacios
    if (!(user && passwordCorrect)) {
      res.status(401).json({
        error: "invalid username or password",
      });
    }
    console.log(user);

    //crearemos un objeto para mandarlo al jsonwebtoken
    const userForToken = {
      username: user?.nombre_usuario || user?.nombre_compañia,
      id: user.id,
    };

    //jsonwebtoken es una manera de autenticar y autorizar usuarios, le enviamos los datos del usuario y este nos generara un token que podremos usar para las cosas antes mencionadas, el metodo sign crea el token utilizando un objeto con los datos que queramos mandar y una palabra secreta(puede ser la que tu quieras)
    const token = jwt.sign(userForToken, "XD");

    //se retorna el token y los datos necesarios
    res.status(200).send({
      token,
      username: user.nombre_usuario || user.nombre_compañia,
      id: user.id,
      contratista: user.contratista,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      ok: false,
    });
  }
};

export default loginController;
