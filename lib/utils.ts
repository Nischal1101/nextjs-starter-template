import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function backendUrl(path: string) {
  if (path.startsWith('/')) {
    path = path.substring(1)
  }

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const formattedBaseUrl = baseUrl?.endsWith('/') ? baseUrl : `${baseUrl}/`

  return `${formattedBaseUrl}${path}`
}

export function filterEmptyParams(
  params?: Record<string, any>,
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(params || {}).filter(([_, v]) => v != null && v !== ''),
  )
}

export function slugify(str: string) {
  return str.toLowerCase().replace(/ /g, '-')
}

export function truncate(str: string, length: number) {
  return str?.length > length ? str?.substring(0, length) + '...' : str
}