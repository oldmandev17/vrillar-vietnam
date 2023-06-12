import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import PasswordReset from 'src/models/passwordReset.model'
import UserVerification from 'src/models/userVerification.model'
import { v4 } from 'uuid'

// Create email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // user: process.env.AUTH_EMAIL,
    // pass: process.env.AUTH_PASSWORD
    user: 'nntam17052001@gmail.com',
    pass: 'bxkfwivzxpvvibgo'
  }
})
// Send email verification email register
export const sendVerificationEmail = async (_id: string, email: string, res: any, next: any) => {
  try {
    const currentUrl = 'http://127.0.0.1:5000/'

    const uniqueString = v4() + _id

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Verify your email address to complete the signup and login into your account</p><p>This link <b>expires in 6 hours</b>.</p><p>Press <a href=${
        currentUrl + 'auth/verify/' + _id + '/' + uniqueString
      }>here</a> to procced</p>`
    }

    const saltRounds = 10
    const hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds)

    await UserVerification.create({
      userId: _id,
      uniqueString: hashedUniqueString.toString(),
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000
    })

    await transporter.sendMail(mailOptions)

    res.status(200).send('Verification email sent.')
  } catch (error: any) {
    next(error)
  }
}
// Send email reset password
export const sendResetEmail = async (_id: string, email: string, redirectUrl: string, res: any, next: any) => {
  try {
    const resetString = v4() + _id

    await PasswordReset.deleteMany({ userId: _id })

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Password Reset',
      html: `<p>We heard that your lost the password.</p><p>Don't worry, use the link below to reset it.</p><p>This link <b>expires in 60 minutes</b>.</p><p>Press <a href=${
        redirectUrl + '/' + _id + '/' + resetString
      }>here</a> to procced.</p>`
    }

    const saltRounds = 10
    const hashedResetString = await bcrypt.hash(resetString, saltRounds)

    await PasswordReset.create({
      userId: _id,
      resetString: hashedResetString.toString(),
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000
    })

    await transporter.sendMail(mailOptions)

    res.status(200).send('Password reset email sent.')
  } catch (error: any) {
    next(error)
  }
}
