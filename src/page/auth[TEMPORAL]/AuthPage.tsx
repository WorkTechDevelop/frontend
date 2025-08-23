import { useState } from 'react'
import style from './style.module.css'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '../../authContext'

export function AuthPage({ redirect }: { redirect?: string }) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const auth = useAuth()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await auth.login({ userName: login, password })
      // отправляем его либо на главную, либо туда куда хотел зайти
      navigate({ to: redirect || '/' })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setError('Invalid username or password')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={style['auth-page-container']}>
      <form className={style['auth-form']} onSubmit={onSubmit}>
        <input
          placeholder="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">LogIn</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  )
}
