import { useEffect } from 'react'
import { useAuthStore } from './authStore'

export function AuthLoader({ children }: { children: React.ReactNode }) {
  const { getCurrentUser, isLoading } = useAuthStore()

  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}
