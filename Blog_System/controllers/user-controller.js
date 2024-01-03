//const  mongoose  = require('mongoose');
//const User = require('../models/user');
//const bcrypt = require('bcryptjs')

const {getAllUser:getAllUserService,
        signupUser:signupUserService,
        loginUser:loginUserService} = require('../service/user-service')

const getAllUser = async (req, res) => {
    const users = await getAllUserService(req.body)
    return res.status(200).json({ users })
}
const signupUser = async (req, res) => {
   const user = await signupUserService(req.body)
    return res.status(200).json({ user })
}

const loginUser = async (req, res) => {
    
const existingUser = await loginUserService(req.body)
  
    return res.status(200).json({existingUser})

}

module.exports = {
    getAllUser,
    signupUser,
    loginUser,
}
