const User = require('../models/uesr')

const registerUser = async (req, res, next) => {
    //console.log(req.body);
    const { name, email, password } = req
  // console.log(' { name, email , password } : ', { name, email, password });
    let exsistingUser;
    try {
        exsistingUser = await User.findOne({ email })
    } catch (error) {
        console.log('error: ', error);
    }
    if (exsistingUser) {
        
     return res.starus(404).json({ message: "User is already registerd ...." })
    }
    const user = new User({ name, email, password })
    try {
        await user.save();
    } catch (error) {
        console.log('error: ', error);

    }
    return user;

}

module.exports = { registerUser }