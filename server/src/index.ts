import express from 'express'
import cros from 'cors'
import morgan from 'morgan'
import createHttpError from 'http-errors'
import path from 'path'
import dotenv from 'dotenv'
import authRouter from './routers/auth.route'
import driverRouter from './routers/driver.route'
import raceRouter from './routers/race.route'
import teamRouter from './routers/team.route'
import { date } from 'joi'
// Config environment file
dotenv.config({ path: path.resolve(__dirname, '..', `./src/configs/.env.${process.env.NODE_ENV}`) })
// Use mongo database
require('src/helpers/initMogondb')
// Use redis cluter
require('src/helpers/initRedis')
// Create app
const app = express()
// Use app service
app.use(
  cros({
    credentials: true
  })
)
app.use(express.json())
app.use(morgan('dev'))
app.use('/auth', authRouter)
app.use('/driver', driverRouter)
app.use('/team', teamRouter)
app.use('/race', raceRouter)
app.use(async (req, res, next) => {
  next(createHttpError.NotFound())
})
app.use(
  (
    err: { status: any; message: any },
    req: any,
    res: { status: (arg0: any) => void; send: (arg0: { error: { status: any; message: any } }) => void },
    next: any
  ) => {
    res.status(err.status || 500)
    res.send({
      error: {
        status: err.status || 500,
        message: err.message
      }
    })
  }
)
// Application port
const PORT = process.env.PORT || 5000
// Application running
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT} in ${process.env.NODE_ENV} mode.`)
})

