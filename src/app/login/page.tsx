'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import Link from 'next/link'
import { ReloadIcon } from '@radix-ui/react-icons'

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [isSigningUp, setIsSigningUp] = useState(false)

  const buttonDisable = user.email === '' || user.password.length < 6

  function handleSubmit() {
    console.log(user)
  }

  return (
    <div className="mx-auto mt-52 flex max-w-sm flex-col justify-center gap-2 rounded-sm bg-neutral-800 px-10 py-8">
      <h1 className="mx-auto text-lg font-bold">Login</h1>

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
            Login
          </Button>
        ) : (
          <Button disabled>
            <ReloadIcon className="h-4 mr-2 w-4 animate-spin" />
            Logging in...
          </Button>
        )}

        <Link className="mx-auto" href="/signup">
          <Button className="text-blue-400" variant="link">
            Visit Sign Up page
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Login
