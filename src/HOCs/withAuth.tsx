import { useEffect } from 'react'

import type { RootState } from '@/stores'
import { useAppSelector } from '@/hooks/useRedux'
import { useRouter } from '@/hooks/useRouterReplace'
import { ADMIN_PRIVATE_ROUTES, ADMIN_PUBLIC_ROUTES } from '@/routes/routes.constant'

function withAuth<P extends React.HTMLAttributes<HTMLElement>>(Component: React.ComponentType<P>) {
  const WrapperComponent = (props: P) => {
    const { isAuth } = useAppSelector((state: RootState) => state.auth)
    const { navigate } = useRouter()

    // useEffect(() => {
    //   if (isAuth && Object.values(ADMIN_PUBLIC_ROUTES)?.includes(window.location.pathname)) {
    //     navigate(ADMIN_PRIVATE_ROUTES.DASH_BOARD)
    //   }
    // }, [isAuth, navigate])

    return <Component {...props} />
  }

  return WrapperComponent
}

export default withAuth
