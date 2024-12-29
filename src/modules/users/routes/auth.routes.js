import express from 'express'
import { registerUser, loginUser, logoutUser, profileUser } from '../controllers/auth.controller.js'
import { authRequired } from '../../../middlewares/jwt.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login',loginUser)
router.post('/logout', authRequired,logoutUser)
router.get('/profile', authRequired, profileUser)

export default router