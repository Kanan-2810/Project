
const { getAllUser: getAllUserService,
    signupUser: signupUserService,
    loginUser: loginUserService } = require('../service/user-service')

const getAllUser = async (req, res) => {
    const result = await getAllUserService(req.body)
    if(result.success)
    {
    return res.status(200).json({ users:result.users })
    }
    return res.status(200).json({ message : result.message })
}
const signupUser = async (req, res) => {
    const result = await signupUserService(req.body);

    if (result.success) {
        return res.status(200).json({ user: result.user });
    } else {
        return res.status(404).json({ message: result.message });
    }
};

const loginUser = async (req, res) => {

    const result = await loginUserService(req.body)
    if (result.success) {
        return res.status(200).json({ existingUser:result.existingUser })

    } else {
        return res.status(404).json({ message:result.message })
    }

}

module.exports = {
    getAllUser,
    signupUser,
    loginUser,
}
