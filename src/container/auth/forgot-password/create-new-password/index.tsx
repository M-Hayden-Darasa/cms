import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from '@/hooks/useRouterReplace'
import { defaultValueSignIn, signInSchema } from './schema'
import { ADMIN_PUBLIC_ROUTES } from '@/routes/routes.constant'
import type { ValuesFormCreateNewPassword } from '@/models/auth.model'

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

function CreateNewPassword() {
  const { t } = useTranslation('forgotPassword')
  const { navigate } = useRouter()

  const formSchema = signInSchema(t)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValueSignIn,
  })

  function handleCreateNewPassword(values: ValuesFormCreateNewPassword) {
    console.log('Form submitted with values:', values)
  }

  function handleSignIn() {
    navigate(ADMIN_PUBLIC_ROUTES?.SIGN_IN)
  }

  return (
    <div className="p-10 max-tablet:px-6">
      <div className="flex items-center justify-center mb-10">
        <Typography className="text-label text-5xl" fontWeight="bold">
          {t('create-new-password.create-new-password')}
        </Typography>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateNewPassword)} className="space-y-5">
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

          <Button
            content={t('create-new-password.create-new-password')}
            size="lg"
            isSuffix
            className="mb-4"
            type="submit"
          />
        </form>
      </Form>

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

export default CreateNewPassword
