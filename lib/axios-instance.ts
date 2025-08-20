import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Routes that should not show toast notifications
const SUPPRESS_TOAST_ROUTES = [
  '/users/me/',
  '/charting/drawings/',
  '/charting/drawing-templates/',
  '/charting/study-templates/',
  '/charting/chart-templates/',
  '/timeseries/live-stock-data',
  '/llm/portfolio-insight/',
]

export function suppressToast(config = {}) {
  return {
    ...config,
    _suppressToast: true,
  }
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let message = 'Something went wrong'
    console.log(error)
    if (error.response) {
      if (error.response.data) {
        const data = error.response.data as { message?: string; error?: string }
        if (data.message) {
          message = data.message
        } else if (data.error) {
          message = data.error
        } else {
          switch (error.response.status) {
            case 500:
              message = 'Internal server error'
              break
            case 401:
              message = 'Unauthorized'
              break
            case 403:
              message = 'Forbidden'
              break
            case 404:
              message = 'Not found'
              break
            default:
              message = 'Something went wrong'
              break
          }
        }
      }
    } else if (error.request) {
      message = 'No response received from server'
    } else {
      message = error.message
    }

    const url = error.config?.url || ''
    const isRouteSupressed = SUPPRESS_TOAST_ROUTES.some((route) =>
      url.includes(route),
    )
    const isExplicitlySuppressed =
      error.config && (error.config as any)._suppressToast === true

    if (!isRouteSupressed && !isExplicitlySuppressed) {
      toast.error(message, {
        duration: 9000,
      })
    }

    return Promise.reject({ ...error, message })
  },
)