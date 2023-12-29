const User = require('../models/User')


//const { StatusCodes } = require('http-status-codes')
//const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req) => {
 
  const user = await User.create({ ...req })

  const token = await user.createJWT()
  
  return [token,user]
}
const login = async (req) => {

  const { email, password } = req

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const token = user.createJWT()
    return [token,user]
}
module.exports =
{
  register,
  login,
}