const express = require('express')
const {getAllUser,signupUser,loginUser} = require('../controllers/user-controller')
const router = express.Router()

router.get('/',getAllUser)
router.post('/register',signupUser).post('/login',loginUser)


module.exports = router