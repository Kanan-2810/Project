const Job = require('../models/Job')



const getAllJobs = async (req) => {

  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')

  return jobs
}
const getJob = async (req) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  })
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  return job
}
const createJob = async (req) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  return job
}
const updateJob = async (req) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty')
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  return job
}
const deleteJob = async (req,) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  })
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  return job

}
module.exports =
{
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
}