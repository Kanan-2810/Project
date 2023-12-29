const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const
  { getAllJobs: getAlljobsService,
    getJob: getJobService,
    createJob: createJobService,
    updateJob: updateJobService,
    deleteJob: deleteJobService
  } = require('../services/jobs')

const getAllJobs = async (req, res) => {
  
  const jobs = await getAlljobsService(req)
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}
const getJob = async (req, res) => {

  const job = await getJobService(req)
  res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
  console.log('req: ', req.user);
  const job = await createJobService(req)


  // res.json(req.user)
  res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
  const job = await updateJobService(req)

  res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
  const job = await deleteJobService(req)

  res.status(StatusCodes.OK).send()
}

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
}
