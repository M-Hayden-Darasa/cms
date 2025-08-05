import { z } from 'zod'
import Countdown from 'react-countdown'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from '@/hooks/useRouterReplace'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { defaultValueSignIn, signInSchema } from './schema'
import { ADMIN_PUBLIC_ROUTES } from '@/routes/routes.constant'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button-common'
import { Typography } from '@/components/ui/typography'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

function VerifyCode() {
  const { t } = useTranslation('forgotPassword')
  const [searchParams] = useSearchParams()
  const emailFromUrl = searchParams.get('email')
  const { navigate } = useRouter()

  const formSchema = z.object(signInSchema(t))

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValueSignIn,
  })

  function handleVerifyOtpCode() {
    navigate(ADMIN_PUBLIC_ROUTES?.CREATE_NEW_PASSWORD)
  }

  function handleSignIn() {
    navigate(ADMIN_PUBLIC_ROUTES?.SIGN_IN)
  }

  return (
    <div className="p-10 max-tablet:px-6">
      <div className="flex items-center justify-center mb-5">
        <Typography className="text-label text-5xl" fontWeight="bold">
          {t('verify-code.verify-code')}
        </Typography>
      </div>
      <div className="mb-10">
        <span>
          <span className="text-label text-xl font-bold uppercase">
            {t('verify-code.otp-code')}
          </span>{' '}
          <span className="text-label text-xl">{t('verify-code.verification')}</span>
        </span>

        <Typography className="text-label">
          {t('verify-code.we-have-sent', { email: emailFromUrl })}
        </Typography>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleVerifyOtpCode)} className="space-y-5">
          <FormField
            control={form.control}
            name="verifyOtpCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-label">{t('verify-code.otp-code')}</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup>
                      {Array(6)
                        ?.fill(0)
                        ?.map((_, index: number) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col items-center">
            <span className="text-label mb-2">
              {t('verify-code.code-expires-in')}:{' '}
              <span className="font-bold inline-block">
                <Countdown
                  date={Date.now() + 2 * 60 * 1000}
                  intervalDelay={0}
                  precision={3}
                  renderer={({ minutes, seconds }) => (
                    <div>
                      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </div>
                  )}
                />
              </span>
            </span>

            <span className="text-label">
              {t('verify-code.did-receive-code')}{' '}
              <span className="text-label mt-1 hover:underline cursor-pointer font-bold">
                {t('verify-code.resend-otp')}
              </span>
            </span>
          </div>

          <Button
            content={t('verify-code.verify')}
            size="lg"
            isSuffix
            className="mb-4"
            type="submit"
          />

          <div className="flex justify-center">
            <Typography className="text-label">
              {t('remember-your-password')}{' '}
              <span className="font-bold cursor-pointer hover:underline" onClick={handleSignIn}>
                {t('sign-in')}
              </span>
            </Typography>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default VerifyCode
