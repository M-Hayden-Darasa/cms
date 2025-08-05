import { z } from 'zod'
import type { TFunction } from 'i18next'

const defaultValueSignIn = {
  email: '',
}

const signInSchema = (t: TFunction) => {
  return {
    email: z
      .string()
      .nonempty({
        message: t('enter-email.please-enter-your-email'),
      })
      .email({
        message: t('enter-email.email-address-is-not-formatted-correctly'),
      }),
  }
}

export { defaultValueSignIn, signInSchema }
