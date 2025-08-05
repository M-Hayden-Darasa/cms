import { z } from 'zod'
import type { TFunction } from 'i18next'

const defaultValueSignIn = {
  verifyOtpCode: '',
}

const signInSchema = (t: TFunction) => {
  return {
    verifyOtpCode: z.string().nonempty({
      message: t('verify-code.please-enter-your-code'),
    }),
  }
}

export { defaultValueSignIn, signInSchema }
