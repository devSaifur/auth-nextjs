import { NextRequest, NextResponse } from 'next/server'
import { connect } from '@/app/db/dbConfig'
import User from '@/app/models/userModel'

connect()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

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
    await user.save()

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
