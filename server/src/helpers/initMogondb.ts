import mongoose from 'mongoose'

mongoose
  .connect(process.env.DB_URI || '', {
    dbName: process.env.DB_NAME
  })
  .then((con: { connection: { host: any } }) => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
  })
  .catch((err: { message: any }) => {
    console.log(err.message)
  })

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to database.')
})

mongoose.connection.on('error', (err) => {
  console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected.')
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(0)
})
