import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'
import client from 'src/helpers/initRedis'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from 'src/middlewares/jwtHelper'
import User, { IUser } from 'src/models/user.model'
import UserVerification, { IUserVerification } from 'src/models/userVerification.model'
import { sendVerificationEmail } from 'src/utils/sendEmail'
import { authLoginSchema, authRegisterSchema } from 'src/utils/validationSchema'

// Register
export async function register(req: any, res: any, next: any) {
  try {
    // Validation register input
    const result = await authRegisterSchema.validateAsync(req.body)
    // Find user exist
    const existUser: IUser | null = await User.findOne({ email: result.email })
    // Check user exist
    if (existUser) throw createHttpError.Conflict(`${result.email} is already been registered.`)
    // Create user
    const newUser: IUser = await User.create({
      ...result,
      role: 'user',
      verified: false
    })
    // Send verication email
    await sendVerificationEmail(newUser._id, newUser.email, res, next)
  } catch (error: any) {
    // Return error
    if (error.isJoi === true) error.status = 422
    next(error)
  }
}
// Verify email
export async function verifyEmail(req: any, res: any, next: any) {
  try {
    // Get value from req.params
    const { userId, uniqueString } = req.params
    // Find user verification exist
    const userVerification: IUserVerification | null = await UserVerification.findOne({ userId })
    // Check user verification exist
    if (!userVerification) throw createHttpError.NotFound('User not exist or verified already.')
    // Get value from user verification
    const { expiresAt, uniqueString: hashedUniqueString } = userVerification
    // Convert date ro number
    const expires: any = new Date(expiresAt)
    // Compare expires time and current time
    if (expires < Date.now()) {
      // Delete user by userId
      await User.deleteOne({ _id: userId })
      // Return error
      throw createHttpError.NotAcceptable('User verifycation is expired.')
    } else {
      // Compare bcrypt string
      const isMatch = await bcrypt.compare(uniqueString, hashedUniqueString)
      // Check bcrypt string
      if (!isMatch) throw createHttpError.Unauthorized('Username/password not exist')
      // Update verified user equal true
      await User.updateOne({ _id: userId }, { verified: true })
      // Detele user verification by userId
      await UserVerification.deleteOne({ userId })
      // Return response
      res.status(200).send('Verify successful')
    }
  } catch (error: any) {
    // Return error
    next(error)
  }
}
// Login
export async function login(req: any, res: any, next: any) {
  try {
    // Validation login input
    const result = await authLoginSchema.validateAsync(req.body)
    // Find user exist
    const userExist = await User.findOne({ email: result.email })
    // Check user exist
    if (!userExist) throw createHttpError.NotFound('User not registerd')
    // Check verified user
    if (!userExist.verified) throw createHttpError.BadRequest("Email hasn't been verified yet. Check your inbox.")
    // Compare password
    const isMatch = await userExist.isValidPassword(result.password)
    // Check password
    if (!isMatch) throw createHttpError.Unauthorized('Username/password not valid')
    // Sign access and refresh token
    const accessToken = await signAccessToken(userExist.id)
    const refreshToken = await signRefreshToken(userExist.id)
    // Return response
    res.status(200).json({ accessToken, refreshToken })
  } catch (error: any) {
    // Return error
    if (error.isJoi === true) next(createHttpError.BadRequest('Invalid Username/Password'))
    next(error)
  }
}
// Refresh token
export async function refreshToken(req: any, res: any, next: any) {
  try {
    // Get refresh token from req.body
    const { refreshToken } = req.body
    // Check refresh token exist
    if (!refreshToken) throw createHttpError.BadRequest()
    // Get userId from refresh token
    const userId: string = (await verifyRefreshToken(refreshToken)) as string
    // Sign access and refresh token
    const accessToken = await signAccessToken(userId)
    const newRefreshToken = await signRefreshToken(userId)
    // Retrun response include access and refresh token
    res.status(200).json({ accessToken: accessToken, refreshToken: newRefreshToken })
  } catch (error) {
    // Return error
    next(error)
  }
}
// Logout
export async function logout(req: any, res: any, next: any) {
  try {
    // Get refresh from req.params
    const { refreshToken } = req.params
    // Check refresh token exist
    if (!refreshToken) throw createHttpError.BadRequest()
    // Get userId from refresh token
    const userId: string = (await verifyRefreshToken(refreshToken)) as string
    // Delete refresh token from redis cluter by userId
    client.DEL(userId).catch((next: any) => next(createHttpError.InternalServerError()))
    // Return response
    res.sendStatus(204)
  } catch (error: any) {
    // Return error
    next(error)
  }
}
// Get profile
export async function getProfile(req: any, res: any, next: any) {
  try {
    // Find user exist
    const userExist: IUser | null = await User.findById(req.payload.userId)
    // Check user exist
    if (!userExist) throw createHttpError.NotFound('User does not exist.')
    // Return response
    res.status(200).json({
      profile: userExist
    })
  } catch (error: any) {
    // Return error
    next(error)
  }
}
