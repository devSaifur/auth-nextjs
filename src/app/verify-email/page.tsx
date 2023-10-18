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

  return <div>hello</div>
}

export default VerifyEmailPage
