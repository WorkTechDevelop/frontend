import { createFileRoute } from '@tanstack/react-router'
import { AuthPage } from '../page/auth[TEMPORAL]'

export const Route = createFileRoute('/auth')({
  component: AuthPage,
})
