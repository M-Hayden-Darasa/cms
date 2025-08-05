import type { TabsNotificationInterface } from '@/models/notification.model'

const tabsNotification: TabsNotificationInterface[] = [
  {
    key: 'view-all',
    label: 'view-all',
    count: 10,
  },
  {
    key: 'read',
    label: 'read',
  },
  {
    key: 'un-read',
    label: 'un-read',
  },
]

export { tabsNotification }
