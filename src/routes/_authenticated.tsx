import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/auth',
        search: {
          // чтобы после логина отправить пользователя на ту страницу, куда он хотел зайти
          redirect: location.href,
        },
      })
    }
  },
  component: () => <Outlet />,
})
