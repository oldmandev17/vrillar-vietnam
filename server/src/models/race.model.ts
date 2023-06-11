import mongoose from 'mongoose'

export interface IRace extends mongoose.Document {
  name: string
  date: string
  laps: number
  drivers?: any
  createByUser: string
  createdAt: Date
  updatedAt?: Date
}

export const raceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The field name must be required.']
  },
  date: {
    type: Date,
    required: [true, 'The field date must be required.']
  },
  laps: {
    type: Number,
    required: [true, 'The field laps must be required.']
  },
  drivers: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'driver',
        required: [true, 'The field id driver must be required.']
      },
      no: {
        type: Number,
        required: [true, 'The field no driver must be required.']
      },
      laps: {
        type: String,
        required: [true, 'The field laps driver must be required.']
      },
      time: {
        type: String,
        required: [true, 'The field time driver must be required.']
      },
      points: {
        type: Number,
        required: [true, 'The field points driver must be required.']
      }
    }
  ],
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

const Race = mongoose.model<IRace>('race', raceSchema)

export default Race
