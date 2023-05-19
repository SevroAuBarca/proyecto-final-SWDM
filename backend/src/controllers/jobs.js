import {
  getCompanyService,
  getOnlyCompanyService,
  putCompanyService,
} from "../services/companies.js";
import {
  deleteJobService,
  getAllJobsService,
  getJobService,
  getOnlyJobService,
  postJobService,
  putJobService,
} from "../services/jobs.js";
import jwt from "jsonwebtoken";

//el algunas peticiones requeriras enviar tu token para autenticar que eres el usuario activo, evitando que se manipule cosas de mala manera, este se envia desde el header de authorization cuando hagas una peticion, envias un string que digga 'bearer <token>' el metodo extrae el token enviado
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};
//metodo para obtener todos los trabajos

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
//metodo para obtener un trabajo (pa que se pongan a chambear XD)

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
//metodo para postear un trabajo, verificando con el json web token que enviamos en authorization
const postJobs = async (req, res) => {
  const { body } = req;
  const token = getTokenFrom(req);
  console.log(token);
  const decodedToken = jwt.verify(token, "XD");
  console.log(decodedToken);
  //si el token no fue enviado o es invalido dara error
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  try {
    const company = await getOnlyCompanyService(decodedToken.id);
    const job = await postJobService(body);

    if (job) {
      //al crear un trabajo tendremos que enviar el id de nuestro trabajo a la compañia que lo creo, como reerencia de a quien pertenece por ejemplo, la manera facil es con el spread operator, investiguen como usarlo, esta en corto xd
      company.trabajos = [...company.trabajos, job._id];
      console.log(company);
      await company.save();
      //guardamos el id de la compañia para la referencia
      job.compania = [company.id];
      console.log(job);

      await job.save();
      res.status(200).json({ message: "Trabajo Creado", body: job });
    } else {
      res.status(200).json({ message: "No hay datos" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};

//editamos el trabajo
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
//eliminamod el trabajo
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
    const job = await getOnlyJobService(id);
    const company = await getOnlyCompanyService(decodedToken.id);
    console.log(job);
    console.log(company);
    //lo mismo que hicimos con el post lo haremos a la inversa aqui, en vez de agregar la referencia del id del tranajo, la vamos a quitar, usamos el metodo filter para eso, investiguenlo si no saben como funciona, validamos si la referencia del id del trabajo borrado es igual al de la compañia
    if (job.compania[0].toString() === company.id.toString()) {
      const jobs = company.trabajos.filter((job) => job.toString() !== id);
      company.trabajos = [...jobs];
      await company.save();
      await job.save();

      res.status(200).json({ message: "usuario eliminado", body: job });
    }
  } catch (err) {
    res.status(400).json({ message: "Error del servidor", body: err });
  }
};

export { getAllJobs, getJob, postJobs, putJobs, deleteJobs };
