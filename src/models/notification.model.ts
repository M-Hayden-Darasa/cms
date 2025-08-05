import type { NotificationStatusEnums, NotificationTypeEnums } from '@/helpers/enums/notification'

export interface TabsNotificationInterface {
  key: string
  label: string
  count?: number
}

export interface NotificationInterface {
  id: number
  type: NotificationTypeEnums
  user: string
  context?: string
  time: string
  relativeTime: string
  message?: string
  status: NotificationStatusEnums
}
