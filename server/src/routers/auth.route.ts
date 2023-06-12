import { Router } from 'express'
import { getProfile, login, logout, refreshToken, register, verifyEmail } from 'src/controllers/auth.controller'
import { verifyAccessToken } from 'src/middlewares/jwtHelper'

const authRouter = Router()
// Register: .../auth/register with input req.body include name, email, password and confirmPassword field
authRouter.route('/register').post(register)
// Verify email: .../auth/verify/:userId/:uniqueString
authRouter.route('/verify/:userId/:uniqueString').get(verifyEmail)
// Login: .../auth/login with input req.body include email and password field
authRouter.route('/login').post(login)
// Refresh token: .../auth/refresh-token with input req.body include refreshToken field
authRouter.route('/refresh-token').post(refreshToken)
// Logout: .../auth/logout with input req.body include refreshToken field
authRouter.route('/logout/:refreshToken').delete(logout)
// Get profile: .../auth/me with req.header include accessToken
authRouter.route('/me').get(verifyAccessToken, getProfile)
// Return auth router
export default authRouter
