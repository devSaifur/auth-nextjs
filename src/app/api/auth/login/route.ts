import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { connect } from '@/app/db/dbConfig'
import User from '@/app/models/userModel'

connect()

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    //check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 }
      )
    }

    //check if the password is correct
    const validatePassword = await bcrypt.compare(password, user.password)
    if (!validatePassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 })
    }

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }
    //create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d'
    })

    const response = NextResponse.json({
      message: 'Login successful',
      success: true
    })
    response.cookies.set('token', token, { httpOnly: true })

    return response
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }
}
