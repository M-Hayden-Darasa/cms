import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

//Eng
import enCommon from './commons/en.json'
import enLayout from '../../components/layouts/locales/en.json'
import enSignIn from '../../container/auth/sign-in/locales/en.json'
import enSignUp from '../../container/auth/sign-up/locales/en.json'
import enForgotPassword from '../../container/auth/forgot-password/locales/en.json'
import enNotification from '../../components/notification/locales/en.json'
import enTables from '../../container/admin/tables/locales/en.json'

//Vi
import viCommon from './commons/vi.json'
import viLayout from '../../components/layouts/locales/vi.json'
import viSignIn from '../../container/auth/sign-in/locales/vi.json'
import viSignUp from '../../container/auth/sign-up/locales/vi.json'
import viForgotPassword from '../../container/auth/forgot-password/locales/vi.json'
import viNotification from '../../components/notification/locales/vi.json'
import viTables from '../../container/admin/tables/locales/vi.json'

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        layout: enLayout,
        signIn: enSignIn,
        signUp: enSignUp,
        forgotPassword: enForgotPassword,
        notification: enNotification,
        tables: enTables,
      },
      vi: {
        common: viCommon,
        layout: viLayout,
        signIn: viSignIn,
        signUp: viSignUp,
        forgotPassword: viForgotPassword,
        notification: viNotification,
        tables: viTables,
      },
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
