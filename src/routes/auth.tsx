import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthPage } from '../page/auth[TEMPORAL]'

export const Route = createFileRoute('/auth')({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || '/',
  }),
  beforeLoad: ({ context, search }) => {
    // если залогинен, то отправляем его либо на главную, либо туда куда хотел зайти
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect })
    }
  },
  component: PageComponent,
})

function PageComponent() {
  const { redirect } = Route.useSearch()

  return <AuthPage redirect={redirect} />
}
