import { useState, useEffect, useRef, useCallback } from 'react'

type UseRequestReturn<T> = {
  response: T | null
  isLoading: boolean
  isError: boolean
  error: Error | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  run: (...args: any[]) => Promise<void>
  abort: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRequest<T, A extends any[]>(
  asyncFunction: (...args: A) => Promise<T>,
): UseRequestReturn<T> {
  const [response, setResponse] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const abortController = useRef<AbortController | null>(null)

  const run = useCallback(
    async (...args: A) => {
      setIsLoading(true)
      setIsError(false)
      setError(null)

      abortController.current?.abort() // отменяем предыдущий запрос
      const controller = new AbortController()
      abortController.current = controller

      try {
        const result = await asyncFunction(...args)
        if (!controller.signal.aborted) {
          setResponse(result)
        }
      } catch (err) {
        if (controller.signal.aborted) return
        setIsError(true)
        setError(new Error(String(err)))
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    },
    [asyncFunction],
  )

  const abort = useCallback(() => {
    abortController.current?.abort()
    setIsLoading(false)
  }, [])

  useEffect(() => {
    return () => {
      abortController.current?.abort()
    }
  }, [])

  return { response, isLoading, isError, error, run, abort }
}
