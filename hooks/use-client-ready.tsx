import { useEffect, useState } from 'react'

export function useClientReady() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}