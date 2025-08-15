import { createFileRoute } from '@tanstack/react-router'
import { MainPage } from '../page/main'

export const Route = createFileRoute('/')({
  component: MainPage,
})
