import { ADMIN_PUBLIC_ROUTES } from './routes.constant'

import SignIn from '@/container/auth/sign-in'
import SignUp from '@/container/auth/sign-up'
import ForgotPassword from '@/container/auth/component/forgot-password'

import type { RouterElementInterface } from './routes.model'

const routes_admin_public: RouterElementInterface[] = [
  {
    key: 'auth-sign-in',
    path: ADMIN_PUBLIC_ROUTES?.SIGN_IN,
    component: SignIn,
    name: 'auth-sign-in',
  },
  {
    key: 'auth-sign-up',
    path: ADMIN_PUBLIC_ROUTES?.SIGN_UP,
    component: SignUp,
    name: 'auth-sign-up',
  },
  {
    key: 'auth-forgot-password',
    path: ADMIN_PUBLIC_ROUTES?.FORGOT_PASSWORD,
    component: ForgotPassword,
    name: 'auth-forgot-password',
  },
]

export { routes_admin_public }
