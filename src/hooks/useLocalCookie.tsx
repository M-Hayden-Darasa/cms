import * as Cookies from 'js-cookie'

interface OptionsCookiesProps {
  expires: number
  path: string
}

const defaultOptions: OptionsCookiesProps = {
  expires: 7,
  path: '/',
}

export const setCookie = (
  key: string,
  value: string | number | boolean | object,
  options?: OptionsCookiesProps,
) => {
  Cookies.set(key, JSON.stringify(value), { ...defaultOptions, ...options })
}

export const getCookie = (key: string): string | number | boolean | null => {
  try {
    const rawData = Cookies.get(key)
    return rawData ? JSON.parse(rawData) : null
  } catch (error) {
    console.error('Cookie parse error:', error)
    return null
  }
}

export const removeCookie = (key: string, options?: OptionsCookiesProps) => {
  Cookies.remove(key, { ...defaultOptions, ...options })
}

export const hasCookie = (key: string): boolean => {
  return !!Cookies.get(key)
}
