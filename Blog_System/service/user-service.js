const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const getAllUser = async (req, res, next) => {
    let users
    try {
       users = await User.find();
    }
    catch (error) {
        console.log(error);
    }
    if (!users || users.length === 0) {
        return { status: false, message: "User not found" };
    } else {
        return { status: true, users };
    }
}

const signupUser = async (req) => {
    const { name, email, password } = req;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log(error);
        return { success: false, message: "An error occurred while checking for existing user." };
    }

    if (existingUser) {
        return { success: false, message: "User is already here" };
    }

    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: []
    });

    try {
        await user.save();
        return { success: true, user };
    } catch (error) {
        console.log(error);
        return { success: false, message: "An error occurred while saving the user." };
    }
};


const loginUser = async (req, res, next) => {
    const { email, password } = req
    let existingUser;
    try {
        existingUser = await User.findOne({ email })

    } catch (error) {
        console.log(error);
    }

    if (!existingUser) {
        return { success: false, message: 'User Not Found' }
    }
    const iscorrectPassword = bcrypt.compareSync(password, existingUser.password)
    if (!iscorrectPassword) {
        return { status: false, message: "Incorrect Password" }
    }
    return { success: true, existingUser };
}

module.exports = {
    getAllUser,
    signupUser,
    loginUser,
}
