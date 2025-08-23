import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {
  clearTokens,
  getAccessToken,
  saveAccessToken,
  saveRefreshToken,
} from '../../shared/api/token'
import { API_ENDPOINTS } from '../../shared/api/endpoint'
import { workTechApi } from '../../shared/api/workTechHttpClient'

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

interface AuthState {
  isAuthenticated: boolean
  user: UserDataDto | null
  isLoading: boolean
  login: ({
    userName,
    password,
  }: {
    userName: string
    password: string
  }) => Promise<void>
  logout: () => void
  getCurrentUser: () => Promise<void>
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      isLoading: true,

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      getCurrentUser: async () => {
        const token = getAccessToken()

        if (!token) {
          set({ isLoading: false })
          return
        }

        try {
          const response = await workTechApi.get<UserDataDto>(
            API_ENDPOINTS.USERS.PROFILE(),
          )

          if (response.data) {
            set({ user: response.data, isAuthenticated: true })
          } else {
            clearTokens()
            set({ user: null, isAuthenticated: false })
          }
        } catch (e) {
          console.log(e)
          clearTokens()
          set({ user: null, isAuthenticated: false })
        } finally {
          set({ isLoading: false })
        }
      },

      login: async ({
        userName,
        password,
      }: {
        userName: string
        password: string
      }) => {
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
          set({ user: userResponse.data, isAuthenticated: true })
        } else {
          throw new Error('Authentication failed')
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
        clearTokens()
      },
    }),
    {
      name: 'auth-store',
    },
  ),
)
