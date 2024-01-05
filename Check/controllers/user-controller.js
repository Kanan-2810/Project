const {registerUser:registerUserService} = require('../services/user-Service')

const registerUser = async (req,res)=>
{
  console.log(req.body);
    const user = await registerUserService(req)
   
    return  res.status(404).json({user:user})

}
module.exports = {registerUser}