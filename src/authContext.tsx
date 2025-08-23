import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import {
  clearTokens,
  getAccessToken,
  saveAccessToken,
  saveRefreshToken,
} from './shared/api/token'
import { API_ENDPOINTS } from './shared/api/endpoint'
import { workTechApi } from './shared/api/workTechHttpClient'

// TODO: брать из типов, сгенерированных для апи
export interface UserDataDto {
  /** ИД пользователя */
  userId: string
  /** ИД последнего проекта */
  lastProjectId?: string
  /**
   * Фамилия пользователя
   * @example "Пин"
   */
  lastName: string
  /**
   * Имя пользователя
   * @example "Ян"
   */
  firstName: string
  /**
   * Отчество пользователя, при наличии
   * @example "Сигизмундович"
   */
  middleName?: string
  /**
   * Email пользователя
   * @example "user@gmail.com"
   */
  email: string
  /**
   * Номер телефона пользователя
   * @example 89999999999
   */
  phone?: string
  /**
   * Дата рождения пользователя
   * @format date
   * @example "2020-01-01"
   */
  birthDate?: string
  /**
   * Флаг активации
   * @example true
   */
  active?: boolean
  /**
   * Пол пользователя
   * @example "MALE"
   */
  gender?: string
  /** Роли пользователя */
}

export interface LoginResponseDTO {
  accessToken?: string
  refreshToken?: string
}
// TODO: перенести файл в другое место
export interface AuthState {
  isAuthenticated: boolean
  user: UserDataDto | null
  login: ({
    userName,
    password,
  }: {
    userName: string
    password: string
  }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDataDto | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // получаем данные о пользователе на старте приложения
  useEffect(() => {
    async function getCurrentUser() {
      const token = getAccessToken()

      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const response = await workTechApi.get<UserDataDto>(
          API_ENDPOINTS.USERS.PROFILE(),
        )

        if (response.data) {
          setUser(response.data)
          setIsAuthenticated(true)
        } else {
          clearTokens()
        }
      } catch (e) {
        console.log(e)
        clearTokens()
      } finally {
        setIsLoading(false)
      }
    }

    getCurrentUser()
  }, [])

  const login = useCallback(
    async ({ userName, password }: { userName: string; password: string }) => {
      const loginResponse = await workTechApi.post<LoginResponseDTO>(
        API_ENDPOINTS.AUTH.LOGIN(),
        {
          email: userName,
          password: password,
        },
      )

      if (loginResponse.status < 200 || loginResponse.status >= 400) {
        throw new Error('Authentication failed')
      }

      saveAccessToken(loginResponse.data.accessToken!)
      saveRefreshToken(loginResponse.data.refreshToken!)

      const userResponse = await workTechApi.get<UserDataDto>(
        API_ENDPOINTS.USERS.PROFILE(),
      )

      if (userResponse.status >= 200 && userResponse.status < 300) {
        setUser(userResponse.data)
        setIsAuthenticated(true)
      } else {
        throw new Error('Authentication failed')
      }
    },
    [],
  )

  const logout = useCallback(() => {
    setUser(null)
    setIsAuthenticated(false)
    clearTokens()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
