const express = require('express')
const {getAllUser,signupUser,loginUser} = require('../controllers/user-controller')
//const {getAllUser,signupUser,loginUser} = require('../service/user-service')

const router = express.Router()

router.get('/',getAllUser)
router.post('/register',signupUser).post('/login',loginUser)


module.exports = router