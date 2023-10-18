import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

import User from '@/app/models/userModel'
import { connect } from '@/app/db/dbConfig'
import { sendEmail } from '@/app/helpers/mailer'

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { username, email, password } = reqBody

    //check user already exists or not
    const user = await User.findOne({ email })
    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // hash password
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) return NextResponse.json({ error: err.message }, { status: 500 })

      async function createUser() {
        const newUser = new User({
          username,
          email,
          password: hash
        })

        const savedUser = await newUser.save()

        await sendEmail({
          email: email,
          emailType: 'VERIFY',
          userId: savedUser._id.toString() // it need to be in string for to be hashed in the database
        })

        return NextResponse.json({
          message: 'User created successfully',
          success: true
        })
      }

      createUser()
    })

    return NextResponse.json({ email, password }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }
}
