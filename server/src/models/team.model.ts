import mongoose from 'mongoose'

export interface ITeam extends mongoose.Document {
  name: string
  points?: number
  createByUser: string
  createdAt: Date
  updatedAt: Date
}

export const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The name field must be required.']
  },
  points: {
    type: Number,
    default: 0
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

const Team = mongoose.model<ITeam>('team', teamSchema)

export default Team
