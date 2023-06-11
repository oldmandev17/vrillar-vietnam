import mongoose from 'mongoose'

export interface IUserVerification extends mongoose.Document {
  userId: string
  uniqueString: string
  createdAt: Date
  expiresAt: Date
}

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

const UserVerification = mongoose.model<IUserVerification>('userVerification', userVerificaionSchema)

export default UserVerification
