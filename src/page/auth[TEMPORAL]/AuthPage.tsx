import { useState } from 'react'
import style from './style.module.css'
import { workTechApi } from '../../shared/api/workTechHttpClient'
import { API_ENDPOINTS } from '../../shared/api/endpoint'
import {
  clearTokens,
  saveAccessToken,
  saveRefreshToken,
} from '../../shared/api/token'
import { useNavigate } from '@tanstack/react-router'

export function AuthPage() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await workTechApi.post(API_ENDPOINTS.AUTH.LOGIN(), {
      email: login,
      password: password,
    })

    if (!response.data.accessToken || !response.data.refreshToken) {
      clearTokens()
      throw new Error('no tokens in response on refresh')
    }

    saveAccessToken(response.data.accessToken!)
    saveRefreshToken(response.data.refreshToken!)
    console.log({ result: response })
    navigate({
      to: '/',
    })
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
    </div>
  )
}
