import { z } from 'zod'
import type { TFunction } from 'i18next'
import { PASSWORD_REGEX } from '@/utils/regex'

const defaultValueSignIn = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  temsConditions: false,
}

const signInSchema = (t: TFunction) => {
  return z
    .object({
      firstName: z.string().nonempty({
        message: t('please-enter-your-first-name'),
      }),
      lastName: z.string().nonempty({
        message: t('please-enter-your-last-name'),
      }),
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
      confirmPassword: z
        .string()
        .nonempty({
          message: t('please-enter-your-confirm-password'),
        })
        .regex(PASSWORD_REGEX, {
          message: t('password-is-not-formatted-correctly'),
        }),
      temsConditions: z.boolean().optional(),
    })
    .refine((values) => values?.password === values?.confirmPassword, {
      message: t('passwords-do-not-match'),
      path: ['confirmPassword'],
    })
}

export { defaultValueSignIn, signInSchema }
