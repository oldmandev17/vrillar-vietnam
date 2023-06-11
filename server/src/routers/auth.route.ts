import { Router } from 'express'
import { getProfile, login, logout, refreshToken, register, verifyEmail } from 'src/controllers/auth.controller'
import { verifyAccessToken } from 'src/middlewares/jwtHelper'

const authRouter = Router()

authRouter.route('/register').post(register)
authRouter.route('/verify/:userId/:uniqueString').get(verifyEmail)
authRouter.route('/login').post(login)
authRouter.route('/refresh-token').post(refreshToken)
authRouter.route('/logout/:refreshToken').delete(logout)
authRouter.route('/me').get(verifyAccessToken, getProfile)

export default authRouter
