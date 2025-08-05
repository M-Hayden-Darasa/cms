import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'
import { tabsNotification } from '@/helpers/data/notification'
import { mockupNotifications } from '@/helpers/mocks/notification'
import { NotificationStatusEnums, TabsNotificationEnums } from '@/helpers/enums/notification'
import { TAB_NOTIFICATION_ACTIVE_DEFAULT } from '@/constants/notification.constant'
import type { NotificationInterface, TabsNotificationInterface } from '@/models/notification.model'

import { Typography } from '../ui/typography'
import CardNotification from './card-notification'

function Notification() {
  const { t } = useTranslation('notification')

  const [activeTab, setActiveTab] = useState<string>(TAB_NOTIFICATION_ACTIVE_DEFAULT)

  const renderNotificationContent = useMemo(() => {
    console.log(activeTab)

    switch (activeTab) {
      case TabsNotificationEnums?.VIEW_ALL:
        return mockupNotifications?.map((item: NotificationInterface) => (
          <CardNotification key={item?.id} notification={item} />
        ))
      case TabsNotificationEnums?.READ:
        return mockupNotifications
          ?.filter((item: NotificationInterface) => item?.status === NotificationStatusEnums?.READ)
          ?.map((item: NotificationInterface) => (
            <CardNotification key={item?.id} notification={item} />
          ))
      case TabsNotificationEnums?.UN_READ:
        return mockupNotifications
          ?.filter(
            (item: NotificationInterface) => item?.status === NotificationStatusEnums?.UN_READ,
          )
          ?.map((item: NotificationInterface) => (
            <CardNotification key={item?.id} notification={item} />
          ))

      default:
        return
    }
  }, [activeTab])

  return (
    <div>
      <div className="flex gap-2 justify-between">
        <Typography fontWeight="semibold">{t('your-notification')}</Typography>
        <Typography className="cursor-pointer hover:underline">{t('mark-all-as-read')}</Typography>
      </div>

      <div className="flex space-x-2 bg-gray-100 p-2 py-1 rounded-md mt-5 w-fit">
        {tabsNotification.map((tab: TabsNotificationInterface) => (
          <button
            key={tab?.key}
            onClick={() => setActiveTab(tab?.label)}
            className={cn(
              `px-3 py-1 rounded-md text-sm font-medium flex items-center space-x-1 cursor-pointer`,
              activeTab === tab.label ? 'bg-background shadow' : '',
            )}
          >
            <Typography fontWeight="semibold">
              {t(`${tab?.label}`)}
              {tab?.count && (
                <span className="bg-gray-200 ml-2 p-1 rounded-[4px]">{tab?.count}</span>
              )}
            </Typography>
          </button>
        ))}
      </div>

      <div className="max-h-100 h-full overflow-y-scroll mt-6">{renderNotificationContent}</div>
    </div>
  )
}

export default Notification
