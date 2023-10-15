import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'

const useLogin = () => {
  const { toast } = useToast()

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationKey: ['Login'],
    mutationFn: async (user: User) => {
      const response = await axios.post('/api/auth/login', user)
      return response.data
    },

    onSuccess: () => {
      toast({
        title: 'Logged in successfully.'
      })
    },
    onError: (err) => {
      if (err instanceof Error) {
        console.error(err.message)
      }

      toast({
        variant: 'destructive',
        title: 'Failed to login',
        description:
          'Something went wrong while trying to login. Please try again later'
      })
    }
  })

  return { login, isLoggingIn }
}

interface User {
  email: string
  password: string
}

export { useLogin }
