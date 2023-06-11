import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'
import client from 'src/helpers/initRedis'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from 'src/middlewares/jwtHelper'
import User, { IUser } from 'src/models/user.model'
import UserVerification, { IUserVerification } from 'src/models/userVerification.model'
import { sendVerificationEmail } from 'src/utils/sendEmail'
import { authLoginSchema, authRegisterSchema } from 'src/utils/validationSchema'

export async function register(req: any, res: any, next: any) {
  try {
    const result = await authRegisterSchema.validateAsync(req.body)

    const existUser: IUser | null = await User.findOne({ email: result.email })

    if (existUser) throw createHttpError.Conflict(`${result.email} is already been registered.`)

    const newUser: IUser = await User.create({
      ...result,
      role: 'user',
      verified: false
    })

    await sendVerificationEmail(newUser._id, newUser.email, res, next)
  } catch (error: any) {
    if (error.isJoi === true) error.status = 422
    next(error)
  }
}

export async function verifyEmail(req: any, res: any, next: any) {
  try {
    const { userId, uniqueString } = req.params

    const userVerification: IUserVerification | null = await UserVerification.findOne({ userId })

    if (!userVerification) throw createHttpError.NotFound('User not exist or verified already.')

    const { expiresAt, uniqueString: hashedUniqueString } = userVerification

    const expires: any = new Date(expiresAt)

    if (expires < Date.now()) {
      await User.deleteOne({ _id: userId })

      throw createHttpError.NotAcceptable('User verifycation is expired.')
    } else {
      const isMatch = await bcrypt.compare(uniqueString, hashedUniqueString)

      if (!isMatch) throw createHttpError.Unauthorized('Username/password not exist')

      await User.updateOne({ _id: userId }, { verified: true })

      await UserVerification.deleteOne({ userId })

      res.status(200).send('Verify successful')
    }
  } catch (error: any) {
    next(error)
  }
}

export async function login(req: any, res: any, next: any) {
  try {
    const result = await authLoginSchema.validateAsync(req.body)

    const userExist = await User.findOne({ email: result.email })

    if (!userExist) throw createHttpError.NotFound('User not registerd')

    if (!userExist.verified) throw createHttpError.BadRequest("Email hasn't been verified yet. Check your inbox.")

    const isMatch = await userExist.isValidPassword(result.password)

    if (!isMatch) throw createHttpError.Unauthorized('Username/password not valid')

    const accessToken = await signAccessToken(userExist.id)
    const refreshToken = await signRefreshToken(userExist.id)

    res.status(200).json({ accessToken, refreshToken })
  } catch (error: any) {
    if (error.isJoi === true) next(createHttpError.BadRequest('Invalid Username/Password'))

    next(error)
  }
}

export async function refreshToken(req: any, res: any, next: any) {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) throw createHttpError.BadRequest()

    const userId: string = (await verifyRefreshToken(refreshToken)) as string

    const accessToken = await signAccessToken(userId)
    const newRefreshToken = await signRefreshToken(userId)

    res.status(200).json({ accessToken: accessToken, refreshToken: newRefreshToken })
  } catch (error) {
    next(error)
  }
}

export async function logout(req: any, res: any, next: any) {
  try {
    const { refreshToken } = req.params

    if (!refreshToken) throw createHttpError.BadRequest()

    const userId: string = (await verifyRefreshToken(refreshToken)) as string

    client.DEL(userId).catch((next: any) => next(createHttpError.InternalServerError()))

    res.sendStatus(204)
  } catch (error: any) {
    next(error)
  }
}

export async function getProfile(req: any, res: any, next: any) {
  try {
    const userExist: IUser | null = await User.findById(req.payload.userId)

    if (!userExist) throw createHttpError.NotFound('User does not exist.')

    res.status(200).json({
      profile: userExist
    })
  } catch (error: any) {
    next(error)
  }
}
