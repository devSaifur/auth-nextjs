'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'

import { useSignUp } from './useSignUp'
import { useRouter } from 'next/navigation'

const SignUp = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: ''
  })
  const { signUp, isSigningUp } = useSignUp()

  const buttonDisable =
    user.email === '' ||
    user.password.length < 6 ||
    user.username.length < 3 ||
    isSigningUp

  function handleSubmit() {
    signUp(user, { onSuccess: () => router.push('/login') })
    setUser({ email: '', password: '', username: '' })
  }

  return (
    <div className="mx-auto mt-52 flex max-w-sm flex-col justify-center gap-2 rounded-md bg-neutral-800 px-10 py-8">
      <h1 className="mx-auto text-lg font-bold">Sign Up</h1>
      <Label htmlFor="User name">Username</Label>
      <Input
        className="border border-neutral-700"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        type="text"
      />

      <Label htmlFor="Email">Email</Label>
      <Input
        className="border border-neutral-700"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        type="email"
      />

      <Label htmlFor="Password">Password</Label>
      <Input
        className="border border-neutral-700"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="password"
      />
      <div className="my-2 flex flex-col gap-4">
        {!isSigningUp ? (
          <Button onClick={handleSubmit} disabled={buttonDisable}>
            Sign Up
          </Button>
        ) : (
          <Button disabled>
            <ReloadIcon className="h-4 mr-2 w-4 animate-spin" />
            Signing Up...
          </Button>
        )}

        <Link className="mx-auto" href="/login">
          <Button
            className="text-blue-400"
            variant="link"
            disabled={isSigningUp}
          >
            Back to Login page
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
