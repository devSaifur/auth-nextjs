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
    bcrypt.hash(params.userId, 10, function (err, hash) {
      if (err) {
        console.error(err.message)
      }

      // saving hashed token to database
      async function verifyEmail() {
        if (params.emailType === 'VERIFY') {
          await User.findByIdAndUpdate(params.userId, {
            verifyToken: hash,
            verifyTokenExpiry: Date.now() + 3600000
          })
        } else if (params.emailType === 'RESET') {
          await User.findByIdAndUpdate(params.userId, {
            forgotPasswordToken: hash,
            forgotPasswordTokenExpiry: Date.now() + 3600000
          })
        }
      }
      verifyEmail()

      // sending email
      async function sendEmail() {
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
          html: `<a href=${
            process.env.DOMAIN
          }/verify-email?token=${hash}>Click here</a> to ${
            params.emailType === 'VERIFY'
              ? 'verify your email'
              : 'reset your password'
          }`
        }

        const mailRes = await transport.sendMail(mailOptions)
        return mailRes
      }
      sendEmail()
    })
  } catch (error) {
    if (error instanceof Error) {
      return console.error(error.message)
    }
  }
}
