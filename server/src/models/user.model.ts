import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends mongoose.Document {
  name: string
  email: string
  password: string
  verified: boolean
  role: [string]
  createdAt: Date
  updatedAt?: Date
  isValidPassword: any
}

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ' The field name must be required.']
  },
  email: {
    type: String,
    required: [true, 'The field email must be required.'],
    unique: [true, 'The field email must be a unique.']
  },
  password: {
    type: String,
    required: [true, 'The field password must be required.']
  },
  verified: {
    type: Boolean,
    default: false,
    required: [true, 'The field verified must be required.']
  },
  role: {
    type: [String],
    required: [true, 'The field role must be required.'],
    default: 'user',
    enum: {
      values: ['user', 'admin'],
      message: 'The field role can only be user or admin.'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
})

userSchema.pre('save', async function (next: any) {
  try {
    const salt = await bcrypt.genSalt(10)
    await bcrypt.hash(this.password || '', salt).then((result) => (this.password = result))
    next()
  } catch (error: any) {
    next(error)
  }
})

userSchema.methods.isValidPassword = async function (password: string, next: any) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error: any) {
    next(error)
  }
}

const User = mongoose.model<IUser>('user', userSchema)

export default User
