import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { useAuthStore } from './features/auth/authStore'
import { AuthLoader } from './features/auth/AuthLoader'
import { addWorkTechApiAuthMiddleware } from './features/auth/apiMiddleware'
import { workTechApiClient } from './shared/api/workTechHttpClient'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
})

function InnerApp() {
  const auth = useAuthStore()
  return <RouterProvider router={router} context={{ auth }} />
}

addWorkTechApiAuthMiddleware(workTechApiClient)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthLoader>
      <InnerApp />
    </AuthLoader>
  </StrictMode>,
)
