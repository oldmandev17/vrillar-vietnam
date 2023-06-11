import mongoose from 'mongoose'

export interface IPasswordReset extends mongoose.Document {
  userId: string
  resetString: string
  createdAt: Date
  expiresAt: Date
}

export const passwordResetSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'The field user id must be required.']
  },
  resetString: {
    type: String,
    required: [true, 'The field reset string must be required.']
  },
  createdAt: {
    type: Date,
    required: [true, 'The field created at must be required.']
  },
  expiresAt: {
    type: Date,
    required: [true, 'The field expires at must be required.']
  }
})

const ResetPassword = mongoose.model<IPasswordReset>('passwordReset', passwordResetSchema)

export default ResetPassword
