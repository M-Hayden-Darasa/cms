import { z } from 'zod'
import type { TFunction } from 'i18next'
import { PASSWORD_REGEX } from '@/utils/regex'

const defaultValueSignIn = {
  email: '',
  password: '',
  rememberMe: false,
}

const signInSchema = (t: TFunction) => {
  return {
    email: z
      .string()
      .nonempty({
        message: t('please-enter-your-email'),
      })
      .email({
        message: t('email-address-is-not-formatted-correctly'),
      }),
    password: z
      .string()
      .nonempty({
        message: t('please-enter-your-password'),
      })
      .regex(PASSWORD_REGEX, {
        message: t('password-is-not-formatted-correctly'),
      }),
    rememberMe: z.boolean().optional(),
  }
}

export { defaultValueSignIn, signInSchema }
