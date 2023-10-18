import { connect } from '@/app/db/dbConfig'
import User from '@/app/models/userModel'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body
    console.log(token)

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() }
    })

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
    }

    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined
    const savedUser = await user.save()
    console.log(savedUser)

    return NextResponse.json({
      message: 'User verified successfully',
      success: true
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }
}
