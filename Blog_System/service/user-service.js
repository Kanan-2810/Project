const User = require('../models/user');
const  mongoose  = require('mongoose');
const bcrypt = require('bcryptjs')

const getAllUser = async (req,res,next)=>
{
    let users;
    try {
        users = await User.find();
    }
    catch (error) {
        console.log(error);
    }
    if (!users) {
        return res.status(404).json({ message: "user not found" })
    }
    return users;
}

const signupUser = async (req,res,next) =>
{
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email })

    } catch (error) {
        console.log(error);
    }
    if (existingUser) {
        return res.status(404).json({ message: "User is already here" })
    }
    const hashedPassword = bcrypt.hashSync(password)

    const user = new User({
        name, 
        email, 
        password: hashedPassword,
        blogs:[]
    })
    try {
        await user.save()

    } catch (error) {
        console.log(error);
    }
    return user
}

const loginUser = async (req, res, next) => 
{
    const { email, password } = req.body
    let existingUser;
    try {
        existingUser = await User.findOne({ email })

    } catch (error) {
        console.log(error);
    }
    
    if (!existingUser) {
        return res.status(404).json({message:'User Not Found'})
    }
    const iscorrectPassword = bcrypt.compareSync(password,existingUser.password)
    if (!iscorrectPassword) {
        return res.status(404).json({ message: "Incorrect Password" })
    }
    return existingUser;
}

module.exports = {
    getAllUser,
    signupUser,
    loginUser,
}
