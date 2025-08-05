import { useCallback } from 'react'

function useLocalStorage() {
  const get = useCallback((key: string) => {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (err) {
      return err
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const set = useCallback((key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      return err
    }
  }, [])

  const remove = useCallback((key: string) => {
    try {
      localStorage.removeItem(key)
    } catch (err) {
      return err
    }
  }, [])

  return {
    get,
    set,
    remove,
  }
}

export default useLocalStorage
