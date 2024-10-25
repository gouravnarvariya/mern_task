const express = require('express')
const router = express.Router()
const authController = require('../controller/auth_controller')
const verifyToken = require('../middleware/verification')

router.get('/user', verifyToken, authController.UserById)
router.post('/login' ,authController.Login )
router.post('/signup',authController.Signup )

module.exports = router

