import createHttpError from 'http-errors'
import JWT from 'jsonwebtoken'
import client from 'src/helpers/initRedis'
import User, { IUser } from 'src/models/user.model'

export function signAccessToken(userId: string) {
  return new Promise((resolve, reject) => {
    const payload = {
      userId
    }

    const options = {
      expiresIn: process.env.JWT_ACCESS_EXPIRESIN,
      issuer: process.env.JWT_ISS,
      audience: userId
    }

    JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET || '', options, (err: any, token: any) => {
      if (err) return reject(createHttpError.InternalServerError())

      resolve(token)
    })
  })
}

export function verifyAccessToken(req: any, res: any, next: any) {
  if (!req.headers['authorization']) return next(createHttpError.Unauthorized())

  const authHeader = req.headers['authorization']
  const bearerToken = authHeader.split(' ')
  const token = bearerToken[1]

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (err: any, payload: any) => {
    if (err) {
      const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message

      return next(createHttpError.Forbidden(message))
    }

    req.payload = payload

    next()
  })
}

export function authorizeRoles(...roles: any[]) {
  return async (req: any, res: any, next: any) => {
    const user: IUser | null = await User.findById(req.payload.userId)

    if (user)
      if (!roles.includes(user.role))
        return next(createHttpError.Unauthorized(`Role ${user.role} is not allow to access this resource.`))

    next()
  }
}

export function signRefreshToken(userId: string) {
  return new Promise((resolve, reject) => {
    const payload = {}

    const options = {
      expiresIn: process.env.JWT_REFRESH_EXPIRESIN,
      issuer: process.env.JWT_ISS,
      audience: userId
    }

    JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET || '', options, async (err: any, token: any) => {
      if (err) return reject(createHttpError.InternalServerError())

      await client
        .SET(userId, token, { EX: 365 * 24 * 60 * 60, NX: true })
        .catch((reject: any) => reject(createHttpError.InternalServerError()))

      resolve(token)
    })
  })
}

export function verifyRefreshToken(refreshToken: string) {
  return new Promise((resolve, reject) => {
    JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || '', async (err: any, payload: any) => {
      if (err) return reject(createHttpError.Unauthorized())

      const userId = payload.aud

      await client
        .GET(userId)
        .then((result) => {
          if (refreshToken === result) return resolve(userId)

          reject(createHttpError.Unauthorized())
        })
        .catch((reject: any) => reject(createHttpError.InternalServerError()))

      resolve(userId)
    })
  })
}
