// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard

const { login: loginService, dashboard: dashboardService } = require('../Services/main')

const login = async (req, res) => {
  //console.log(req);

  const token = await loginService(req.body)
  

  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {

  const luckyNumber = await dashboardService(req.body)
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}

module.exports = {
  login,
  dashboard,
}
