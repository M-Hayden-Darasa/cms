import { z } from 'zod'
import type { TFunction } from 'i18next'
import { PASSWORD_REGEX } from '@/utils/regex'

const defaultValueSignIn = {
  password: '',
  confirmPassword: '',
}

const signInSchema = (t: TFunction) => {
  return z
    .object({
      password: z
        .string()
        .nonempty({
          message: t('please-enter-your-password'),
        })
        .regex(PASSWORD_REGEX, {
          message: t('password-is-not-formatted-correctly'),
        }),
      confirmPassword: z
        .string()
        .nonempty({
          message: t('please-enter-your-confirm-password'),
        })
        .regex(PASSWORD_REGEX, {
          message: t('password-is-not-formatted-correctly'),
        }),
    })
    .refine((values) => values?.password === values?.confirmPassword, {
      message: t('passwords-do-not-match'),
      path: ['confirmPassword'],
    })
}

export { defaultValueSignIn, signInSchema }
