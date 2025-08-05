import { lazy, Suspense, type ComponentType } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import useWithAuth from '@/HOCs/withAuth'
import { ADMIN_PRIVATE_ROUTES, ADMIN_PUBLIC_ROUTES } from './routes.constant'

// Dynamic imports
const NotFound = lazy(() => import('@/container/not-found'))
const SignIn = lazy(() => import('@/container/auth/sign-in'))
const SignUp = lazy(() => import('@/container/auth/sign-up'))
const AuthLayout = lazy(() => import('@/components/layouts/auth'))
const AdminLayout = lazy(() => import('@/components/layouts/admin'))
const DashBoard = lazy(() => import('@/container/admin/dash-board'))
const VerifyCode = lazy(() => import('@/container/auth/forgot-password/verify-code'))
const ForgotPassword = lazy(() => import('@/container/auth/forgot-password/enter-email'))
const CreateNewPassword = lazy(() => import('@/container/auth/forgot-password/create-new-password'))
const Tables = lazy(() => import('@/container/admin/tables'))

interface PublicRouterWrapProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>
}

function RouterRoot() {
  function PublicRouterWrap({ component }: PublicRouterWrapProps) {
    const WrappedComponent = useWithAuth(component)

    return (
      <AuthLayout>
        <Suspense fallback={<>...loading</>}>
          <WrappedComponent />
        </Suspense>
      </AuthLayout>
    )
  }

  function PrivateRouterWrap({ component }: PublicRouterWrapProps) {
    const WrappedComponent = useWithAuth(component)

    return (
      <AdminLayout>
        <Suspense fallback={<>...loading</>}>
          <WrappedComponent />
        </Suspense>
      </AdminLayout>
    )
  }

  return (
    <Router>
      <Routes>
        <Route
          path={ADMIN_PUBLIC_ROUTES?.SIGN_IN}
          element={<PublicRouterWrap component={SignIn} />}
        />
        <Route
          path={ADMIN_PUBLIC_ROUTES?.SIGN_UP}
          element={<PublicRouterWrap component={SignUp} />}
        />
        <Route
          path={ADMIN_PUBLIC_ROUTES?.FORGOT_PASSWORD}
          element={<PublicRouterWrap component={ForgotPassword} />}
        />
        <Route
          path={ADMIN_PUBLIC_ROUTES?.VERIFY_CODE}
          element={<PublicRouterWrap component={VerifyCode} />}
        />
        <Route
          path={ADMIN_PUBLIC_ROUTES?.CREATE_NEW_PASSWORD}
          element={<PublicRouterWrap component={CreateNewPassword} />}
        />
        <Route
          path={ADMIN_PRIVATE_ROUTES?.DASH_BOARD}
          element={<PrivateRouterWrap component={DashBoard} />}
        />
        <Route
          path={ADMIN_PRIVATE_ROUTES?.TABLES}
          element={<PrivateRouterWrap component={Tables} />}
        />
        {/* {routes_admin_public?.map((element: RouterElementInterface) => (
          <Route
            key={element?.key}
            path={element?.path}
            element={<PublicRouterWrap component={element?.component} />}
          />
        ))} */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default RouterRoot
