import createHttpError from 'http-errors'
import JWT from 'jsonwebtoken'
import client from 'src/helpers/initRedis'
import User, { IUser } from 'src/models/user.model'

// Sign access token by jsonwebtoken
export function signAccessToken(userId: string) {
  return new Promise((resolve, reject) => {
    // Payload jwt
    const payload = {
      userId
    }
    //  Option jwt
    const options = {
      expiresIn: process.env.JWT_ACCESS_EXPIRESIN,
      issuer: process.env.JWT_ISS,
      audience: userId
    }
    // Sign token by payload, secret key and options
    JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET || '', options, (err: any, token: any) => {
      if (err) return reject(createHttpError.InternalServerError())
      // Return access token
      resolve(token)
    })
  })
}
// Verify access token
export function verifyAccessToken(req: any, res: any, next: any) {
  // Check req.headers['authorization] exist
  if (!req.headers['authorization']) return next(createHttpError.Unauthorized())
  // Get access token from header
  const authHeader = req.headers['authorization']
  const bearerToken = authHeader.split(' ')
  const token = bearerToken[1]
  // Verify access token by secret key
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (err: any, payload: any) => {
    if (err) {
      const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
      return next(createHttpError.Forbidden(message))
    }
    // Return req.payload = payload access token = userId
    req.payload = payload

    next()
  })
}
// Authorize user
export function authorizeRoles(...roles: any) {
  return async (req: any, res: any, next: any) => {
    // Find user by req.payload.userId
    const user: IUser | null = await User.findById(req.payload.userId)
    // Check user exist and role
    if (user)
      if (!roles.includes(user.role)) {
        return next(createHttpError.Unauthorized(`Role ${user.role} is not allow to access this resource.`))
      }

    next()
  }
}
// Sign refresh token by jsonwebtoken
export function signRefreshToken(userId: string) {
  return new Promise((resolve, reject) => {
    // Payload jwt
    const payload = {}
    // Option jwt
    const options = {
      expiresIn: process.env.JWT_REFRESH_EXPIRESIN,
      issuer: process.env.JWT_ISS,
      audience: userId
    }
    // Sign token by payload, secret key and options
    JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET || '', options, async (err: any, token: any) => {
      if (err) return reject(createHttpError.InternalServerError())
      // Save refresh token to redis cluter with key userId
      await client
        .SET(userId, token, { EX: 365 * 24 * 60 * 60, NX: true })
        .catch((reject: any) => reject(createHttpError.InternalServerError()))
      // Return refresh token
      resolve(token)
    })
  })
}
// Verify refresh token
export function verifyRefreshToken(refreshToken: string) {
  return new Promise((resolve, reject) => {
    // Verify refresh token by secret key
    JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || '', async (err: any, payload: any) => {
      if (err) return reject(createHttpError.Unauthorized())
      // Get userId from payload.aud refresh token
      const userId = payload.aud
      // Get refresh token from redis cluter by userId
      await client
        .GET(userId)
        .then((result) => {
          // Return userId if refresh token from input equal refresh token from redis cluter
          if (refreshToken === result) return resolve(userId)
          // Return unauthorized if not equal
          reject(createHttpError.Unauthorized())
        })
        .catch((reject: any) => reject(createHttpError.InternalServerError()))
      // Return userId
      resolve(userId)
    })
  })
}
