import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from '@/hooks/useRouterReplace'
import type { ValuesFormSignUp } from '@/models/auth.model'
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
import ImageCommon from '@/components/ui/image'
import { Checkbox } from '@/components/ui/checkbox'
import { Typography } from '@/components/ui/typography'

import icGoogle from '@/assets/icons/auth/ic-google.svg'

function SignUp() {
  const { t } = useTranslation('signUp')
  const { navigate } = useRouter()

  const formSchema = signInSchema(t)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValueSignIn,
  })

  const temsConditionsWatch = form.watch('temsConditions')

  function handleSignUp(values: ValuesFormSignUp) {
    console.log('Form submitted with values:', values)
  }

  function handleSignIn() {
    navigate(ADMIN_PUBLIC_ROUTES?.SIGN_IN)
  }

  return (
    <div className="p-10 max-tablet:px-6">
      <div className="flex items-center justify-center mb-10">
        <Typography className="text-label text-5xl" fontWeight="bold">
          {t('sign-up')}
        </Typography>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-label">{t('first-name')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('enter-your-first-name')}
                    {...field}
                    value={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-label">{t('last-name')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('enter-your-last-name')}
                    {...field}
                    value={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-label">{t('email')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('enter-your-email')}
                    {...field}
                    value={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-label">{t('password')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('enter-your-password')}
                    {...field}
                    value={field.value as string}
                    isPassword
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-label">{t('confirm-password')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('enter-your-confirm-password')}
                    {...field}
                    value={field.value as string}
                    isPassword
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2 items-center">
              <FormField
                control={form.control}
                name="temsConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox checked={field.value || false} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Typography variant="p" className="text-label">
                {t('accept-tems-conditions')}
              </Typography>
            </div>
          </div>
          <Button
            content={t('join-us')}
            size="lg"
            isSuffix
            className="mb-4"
            type="submit"
            disabled={!temsConditionsWatch}
          />
          <div className="flex justify-center mb-4 gap-4 items-center">
            <div className="w-[25%] h-[1px] bg-background" />
            <Typography className="text-label">{t('or')}</Typography>
            <div className="w-[25%] h-[1px] bg-background" />
          </div>
        </form>
      </Form>
      <Button
        customContent={
          <div className="flex items-center justify-center gap-3">
            <div className="w-9 h-9">
              <ImageCommon src={icGoogle} />
            </div>
            <Typography className="content-small">{t('sign-up-with-google')}</Typography>
          </div>
        }
        size="lg"
        className="mb-4"
      />
      <div className="flex justify-center">
        <Typography className="text-label">
          {t('already-have-an-account')}{' '}
          <span className="font-bold cursor-pointer hover:underline" onClick={handleSignIn}>
            {t('sign-in')}
          </span>
        </Typography>
      </div>
    </div>
  )
}

export default SignUp
