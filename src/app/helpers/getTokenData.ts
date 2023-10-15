import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function getTokenData(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || ''
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!)
    return decodedToken.id
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
