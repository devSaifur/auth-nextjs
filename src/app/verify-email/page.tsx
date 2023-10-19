'use client'
import { useEffect, useState } from 'react'
import { useVerifyEmail } from './useVerifyEmail'
import { useRouter } from 'next/navigation'

function VerifyEmailPage() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const { verifyEmail } = useVerifyEmail()

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail(
        { token },
        {
          onSuccess: () => {
            router.push('/login')
          }
        }
      )
    }
  }, [token, router, verifyEmail])

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1]
    setToken(urlToken || '')
  }, [])

  return (
    <div className="flex h-screen items-center justify-center">
      Please wait, You&#39ll be redirected to login page shortly
    </div>
  )
}

export default VerifyEmailPage
