const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const { register: registerService, login: loginService } = require('../services/auth')
const register = async (req, res) => {

  const [token, user] = await registerService(req.body)
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}


const login = async (req, res) => {
  const { email, password } = req.body
  
  const [token,user] = await loginService(req.body)

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
  register,
  login,
}
