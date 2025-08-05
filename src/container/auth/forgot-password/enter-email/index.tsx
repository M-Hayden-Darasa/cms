import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from '@/hooks/useRouterReplace'
import type { ValuesFormForgotPassword } from '@/models/auth.model'
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
import { Input } from '@/components/ui/input-common'
import { Button } from '@/components/ui/button-common'
import { Typography } from '@/components/ui/typography'

function ForgotPassword() {
  const { t } = useTranslation('forgotPassword')
  const { navigate } = useRouter()

  const formSchema = z.object(signInSchema(t))

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValueSignIn,
  })

  console.log(new URLSearchParams(window?.location?.href))

  function handleSendOtpCode(values: ValuesFormForgotPassword) {
    navigate(`${ADMIN_PUBLIC_ROUTES?.VERIFY_CODE}?email=${decodeURI(values?.email)}`)
  }

  function handleSignIn() {
    navigate(ADMIN_PUBLIC_ROUTES?.SIGN_IN)
  }

  return (
    <div className="p-10 max-tablet:px-6">
      <div className="flex items-center justify-center mb-5">
        <Typography className="text-label text-5xl" fontWeight="bold">
          {t('enter-email.forgot-password')}
        </Typography>
      </div>

      <div className="mb-10">
        <Typography className="text-label text-xl" fontWeight="bold">
          {t('enter-email.reset-your-password')}
        </Typography>
        <Typography className="text-label">
          {t('enter-email.please-enter-your-email-address')}
        </Typography>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSendOtpCode)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-label">{t('enter-email.email')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('enter-email.enter-your-email')}
                    {...field}
                    value={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            content={t('enter-email.send')}
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

export default ForgotPassword
