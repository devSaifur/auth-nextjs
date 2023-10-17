import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import User from '../models/userModel'

export async function sendEmail(params: {
  email: string
  emailType: 'VERIFY' | 'RESET'
  userId: string
}) {
  try {
    //creating hashed token
    const hashedToken = await bcrypt.hash(params.userId, 10)

    if (params.emailType === 'VERIFY') {
      await User.findByIdAndUpdate(params.userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000
      })
    } else if (params.emailType === 'RESET') {
      await User.findByIdAndUpdate(params.userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000
      })
    }

    //send email
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER_ID,
        pass: process.env.MAILTRAP_PASS
      }
    })
    const mailOptions = {
      from: 'saifur-rahman@mail.com',
      to: params.email,
      subject:
        params.emailType === 'VERIFY'
          ? 'Verify your email'
          : 'Reset your password',
      html: `<p>Click here <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken} to ${
        params.emailType === 'VERIFY'
          ? 'verify your email'
          : 'reset your password'
      }`
    }

    const mailRes = await transport.sendMail(mailOptions)
    return mailRes
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      console.log(error)
    }
  }
}
