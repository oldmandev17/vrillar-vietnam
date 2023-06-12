import mongoose from 'mongoose'
// Interface driver type
export interface IDriver extends mongoose.Document {
  name: string
  nationality: string
  points?: number
  team: string
  year: string
  createByUser: string
  createdAt: Date
  updatedAt?: Date
}
// Model driver validation
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
// Return driver model
const Driver = mongoose.model<IDriver>('driver', driverSchema)
export default Driver
