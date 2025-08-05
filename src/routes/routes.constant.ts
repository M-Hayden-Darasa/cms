const preRouterAuth = '/auth'
const preRouterAdmin = '/admin'

const ADMIN_PUBLIC_ROUTES = {
  SIGN_IN: `${preRouterAuth}/sign-in`,
  SIGN_UP: `${preRouterAuth}/sign-up`,
  FORGOT_PASSWORD: `${preRouterAuth}/forgot-password`,
  VERIFY_CODE: `${preRouterAuth}/verify-code`,
  CREATE_NEW_PASSWORD: `${preRouterAuth}/create-new-password`,
}

const ADMIN_PRIVATE_ROUTES = {
  DASH_BOARD: `${preRouterAdmin}/dash-board`,
  TABLES: `${preRouterAdmin}/tables`,
  CHECKOUT: `${preRouterAdmin}/checkout`,
}

export { ADMIN_PUBLIC_ROUTES, ADMIN_PRIVATE_ROUTES }
