import mongoose from 'mongoose'
// Interface team type
export interface ITeam extends mongoose.Document {
  name: string
  points?: number
  year: string
  createByUser: string
  createdAt: Date
  updatedAt: Date
}
// Model team validation
export const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The name field must be required.']
  },
  points: {
    type: Number,
    default: 0
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
// Return team model
const Team = mongoose.model<ITeam>('team', teamSchema)
export default Team
