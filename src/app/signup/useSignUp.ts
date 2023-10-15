import { useToast } from '@/components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const useSignUp = () => {
  const { toast } = useToast()

  const { mutate: signUp, isLoading: isSigningUp } = useMutation({
    mutationKey: ['signUp'],
    mutationFn: async (user: User) => {
      const response = await axios.post('/api/auth/signup', user)
      return response.data
    },

    onSuccess: () => {
      toast({
        title: 'User has been created successfully.'
      })
    },
    onError: (error) => {
      console.error(error)

      toast({
        variant: 'destructive',
        title: 'User creation failed',
        description:
          'Username or email might already be in use try different ones'
      })
    }
  })

  return { signUp, isSigningUp }
}

interface User {
  email: string
  password: string
  username: string
}

export { useSignUp }
