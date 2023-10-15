'use client'
import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useLogout } from './useLogout'
import { useGetUser } from './useGetUser'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

const ProfilePage = () => {
  const router = useRouter()
  const { user, isGettingUser } = useGetUser()
  const { logout, isLoggingOut } = useLogout(redirect)

  function handleSubmit() {
    logout()
  }
  function redirect() {
    router.push('/login')
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="h-40 flex w-96 flex-col items-center justify-center rounded-md bg-neutral-700">
        <div className="flex gap-10">
          <div className={isGettingUser ? 'space-y-2' : ''}>
            {isGettingUser ? (
              <>
                <Skeleton className="h-5 w-32 bg-neutral-900" />
                <Skeleton className="h-5 w-44 bg-neutral-900" />
              </>
            ) : (
              <>
                <h1>
                  Hello{' '}
                  <span className="uppercase tracking-widest text-purple-500">
                    {user?.username},
                  </span>
                </h1>
                <p>Welcome to your profile</p>
              </>
            )}
          </div>

          <div>
            {!isLoggingOut ? (
              <Button onClick={handleSubmit} disabled={isLoggingOut}>
                Log Out
              </Button>
            ) : (
              <Button disabled>
                <ReloadIcon className="h-4 mr-2 w-4 animate-spin" />
                Logging Out...
              </Button>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Button
            disabled={isLoggingOut || isGettingUser}
            className="text-blue-500"
            variant="link"
          >
            <Link href={`profile/${user?._id}`}>See your details</Link>{' '}
          </Button>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage
