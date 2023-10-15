import { toast } from '@/components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

function useLogout(redirect: () => void) {
  const { mutate: logout, isLoading: isLoggingOut } = useMutation({
    mutationKey: ['Logout'],
    mutationFn: async () => {
      const response = await axios.get('api/auth/logout')
      return response
    },
    onError: (err) => {
      if (err instanceof Error) {
        console.error(err.message)
      }
      toast({
        variant: 'destructive',
        title: 'There was some problem while logging out please try agin later'
      })
    },
    onSuccess: () => {
      toast({
        title: 'Logged out successfully'
      })
      redirect()
    }
  })
  return { logout, isLoggingOut }
}

export { useLogout }
