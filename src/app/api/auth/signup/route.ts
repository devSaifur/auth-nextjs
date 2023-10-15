import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

import User from '@/app/models/userModel'
import { connect } from '@/app/db/dbConfig'

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
      async function createUser() {
        const user = new User({
          username,
          email,
          password: hash
        })
        const savedUser = await user.save()

        console.log(savedUser)
        return NextResponse.json(
          { message: 'User created successfully' },
          { status: 200 }
        )
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
