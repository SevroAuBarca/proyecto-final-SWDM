import Jobs from "../models/Companies.js";
const getAllJobsService = async () => await Jobs.find({});

const getJobService = async (id) => await Jobs.findById(id);

const postJobService = async (data) => await Jobs.create(data);

const putJobService = async (id, data) =>
  await Jobs.findByIdAndUpdate(id, data, {
    new: true,
  });

const deleteJobService = async (id) => await Jobs.findByIdAndDelete(id);

export {
  getAllJobsService,
  getJobService,
  postJobService,
  putJobService,
  deleteJobService,
};
