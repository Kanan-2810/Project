const express = require('express')
const {registerUser} = require('../controllers/user-controller')

const router = express.Router()

router.post('/Register',registerUser)

module.exports = router