import mongoose from 'mongoose'

export interface IDriver extends mongoose.Document {
  name: string
  nationality: string
  points?: number
  team: string
  createByUser: string
  createdAt: Date
  updatedAt?: Date
}

export const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The field name must be required.']
  },
  nationality: {
    type: String,
    required: [true, 'The field nationality must be required.']
  },
  points: {
    type: Number,
    default: 0
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'team',
    required: [true, 'The field team must be required.']
  },
  createByUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'The field create by user must be required.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
})

const Driver = mongoose.model<IDriver>('driver', driverSchema)

export default Driver
