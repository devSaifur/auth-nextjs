import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = NextResponse.json({
      message: 'Logout successful',
      success: true
    })
    // deleting existing cookies
    response.cookies.delete('token')
    return response
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return error
  }
}
