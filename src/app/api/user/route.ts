import { NextRequest, NextResponse } from 'next/server'
import { connect } from '@/app/db/dbConfig'
import { getTokenData } from '@/app/helpers/getTokenData'
import User from '@/app/models/userModel'

connect()

export async function GET(request: NextRequest) {
  try {
    const userId = await getTokenData(request)
    const user = await User.findOne({ _id: userId }).select('-password')

    return NextResponse.json(user)
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }
    console.error(err)
  }
}
