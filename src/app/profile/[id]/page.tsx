'use client'
import { useGetUser } from '../useGetUser'

const ProfileDetails = ({ params }: { params: { id: string } }) => {
  const { user, isGettingUser } = useGetUser()

  return (
    <main>
      <div className="flex h-screen flex-col items-center justify-center">
        {isGettingUser ? (
          'loading...'
        ) : (
          <>
            <h1>User Name: {user?.username}</h1>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
            <p>Id: {user?._id}</p>
          </>
        )}
      </div>
    </main>
  )
}

export default ProfileDetails
