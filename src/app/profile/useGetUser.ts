import { toast } from '@/components/ui/use-toast'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

function useGetUser() {
  const { data: user, isLoading: isGettingUser } = useQuery({
    queryKey: ['User'],
    queryFn: async () => {
      const res = await axios.get('api/user')
      return res.data as User
    },
    onError: (err) => {
      if (err instanceof Error) {
        console.error(err.message)
      }
      toast({
        variant: 'destructive',
        title:
          'There was some problem while getting user data please try agin later'
      })
    }
  })

  return { user, isGettingUser }
}

export interface User {
  username: string
  email: string
  isVerified: boolean
  role: 'user' | 'admin'
  _id: string
}

export { useGetUser }
