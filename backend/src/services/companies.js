import Companies from "../models/Companies.js";
const getAllCompaniesService = async () => await Companies.find({});

const getCompanyService = async (id) => await Companies.findById(id);

const postCompanyService = async (data) => await Companies.create(data);

const putCompanyService = async (id, data) =>
  await Companies.findByIdAndUpdate(id, data);

const deleteCompanyService = async (id) =>
  await Companies.findByIdAndDelete(id);

export {
  getAllCompaniesService,
  getCompanyService,
  postCompanyService,
  putCompanyService,
  deleteCompanyService,
};
