import Jobs from "../models/Jobs.js";
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
