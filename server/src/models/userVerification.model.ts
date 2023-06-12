import mongoose from 'mongoose'

// Interface user verification type
export interface IUserVerification extends mongoose.Document {
  userId: string
  uniqueString: string
  createdAt: Date
  expiresAt: Date
}
// Model user verification validation
export const userVerificaionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'The field user id must be required.']
  },
  uniqueString: {
    type: String,
    required: [true, 'The field unique string must be required.']
  },
  createdAt: {
    type: Date,
    required: [true, 'The field created at must be required.']
  },
  expiresAt: {
    type: Date,
    required: [true, 'The field exprires at must be required.']
  }
})
// Return user verification model
const UserVerification = mongoose.model<IUserVerification>('userVerification', userVerificaionSchema)
export default UserVerification
