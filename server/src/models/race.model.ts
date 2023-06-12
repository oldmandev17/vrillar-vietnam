import mongoose from 'mongoose'
// Interface race typr
export interface IRace extends mongoose.Document {
  name: string
  nationality: string
  date: string
  description: string
  laps: number
  drivers?: any
  year: string
  createByUser: string
  createdAt: Date
  updatedAt?: Date
}
// Model race validation
export const raceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The field name must be required.']
  },
  nationality: {
    type: String,
    required: [true, 'The field nationality must be required.']
  },
  date: {
    type: String,
    required: [true, 'The field date must be required.']
  },
  description: {
    type: String,
    required: [true, 'The field description must be required.']
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
      name: {
        type: String,
        required: [true, 'The field name driver must be required.']
      },
      no: {
        type: Number,
        required: [true, 'The field no driver must be required.']
      },
      laps: {
        type: String,
        required: [true, 'The field laps driver must be required.']
      },
      team: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'team',
          required: [true, 'The field id team must be required.']
        },
        name: {
          type: String,
          required: [true, 'The field name team must be required.']
        }
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
  year: {
    type: String,
    required: [true, 'The field year must be required.']
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
// Return race model
const Race = mongoose.model<IRace>('race', raceSchema)
export default Race
