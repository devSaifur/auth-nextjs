const ProfilePage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1>Profile Page</h1>
      <p>This is the profile page of {params.id}</p>
    </div>
  )
}

export default ProfilePage
