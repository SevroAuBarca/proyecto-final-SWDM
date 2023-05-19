import Companies from "../models/Companies.js";
//estos metodos sirven para obtener los datos de la base de datos, los basicos CRUD, el metodo populate sirve para obtener los datos que tienen una referencia a otro modelo, utilizando el nombre de la propiedad de dicho model
const getAllCompaniesService = async () => await Companies.find({});

const getCompanyService = async (id) =>
  await Companies.findById(id).populate("trabajos", {});

const getOnlyCompanyService = async (id) => await Companies.findById(id);
const loginCompanyService = async (username) =>
  await Companies.findOne({ nombre_compañia: username });

const postCompanyService = async (data) => await Companies.create(data);

const putCompanyService = async (id, data) =>
  await Companies.findByIdAndUpdate(id, data, {
    new: true,
  });

const deleteCompanyService = async (id) =>
  await Companies.findByIdAndDelete(id);

export {
  getAllCompaniesService,
  getCompanyService,
  postCompanyService,
  putCompanyService,
  deleteCompanyService,
  loginCompanyService,
  getOnlyCompanyService,
};
