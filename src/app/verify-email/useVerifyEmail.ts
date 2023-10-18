import { toast } from '@/components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

function useVerifyEmail() {
  const { mutate: verifyEmail, isLoading: isVerifying } = useMutation({
    mutationFn: async (token: { token: string }) => {
      const response = await axios.post('/api/auth/verify-email', token)
      return response.data
    },

    onError: (err) => {
      toast({
        variant: 'destructive',
        title:
          'There was some problem while verifying email please try agin later'
      })

      if (err instanceof Error) {
        console.error(err.message)
      }
    }
  })

  return { verifyEmail, isVerifying }
}

export { useVerifyEmail }
