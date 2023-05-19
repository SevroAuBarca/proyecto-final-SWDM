import Jobs from "../models/Jobs.js";
///estos metodos sirven para obtener los datos de la base de datos, los basicos CRUD, el metodo populate sirve para obtener los datos que tienen una referencia a otro modelo, utilizando el nombre de la propiedad de dicho model
const getAllJobsService = async () =>
  await Jobs.find({}).populate("compania", {});

const getJobService = async (id) =>
  await Jobs.findById(id).populate("compania", {});

const getOnlyJobService = async (id) => await Jobs.findById(id);

const postJobService = async (data) => await Jobs.create(data);

const putJobService = async (id, data) =>
  await Jobs.findByIdAndUpdate(id, data, {
    new: true,
  }).populate("compania", {});

const deleteJobService = async (id) =>
  await Jobs.findByIdAndDelete(id).populate("compania", {});

export {
  getAllJobsService,
  getJobService,
  postJobService,
  putJobService,
  deleteJobService,
  getOnlyJobService,
};
