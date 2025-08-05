export interface ValuesFormSignIn {
  email: string
  password: string
  rememberMe?: boolean
}

export interface ValuesFormSignUp {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  temsConditions?: boolean
}

export interface ValuesFormForgotPassword {
  email: string
}

export interface ValuesFormOtpCode {
  verifyOtpCode: string
}

export interface ValuesFormCreateNewPassword {
  password: string
  confirmPassword: string
}

export interface UserInfoInterface {
  useName: string
  email: string
}

export interface InitialAuthInterface {
  isAuth: boolean
  userInfo: UserInfoInterface
}
