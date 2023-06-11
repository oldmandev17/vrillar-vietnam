import dotenv from 'dotenv'
import path from 'path'
import { createClient } from 'redis'

dotenv.config({ path: path.resolve(__dirname, '..', `configs/.env.${process.env.NODE_ENV}`) })

const client: ReturnType<typeof createClient> = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST
  }
})

client.connect()

client.on('connect', () => {
  console.log('Client connected to redis...')
})

client.on('ready', () => {
  console.log('Client connected to redis and ready to use...')
})

client.on('error', (err) => {
  console.log(err.message)
})

client.on('end', () => {
  console.log('Client disconnected from redis')
})

client.on('SIGINT', () => {
  client.quit()
})

export = client
