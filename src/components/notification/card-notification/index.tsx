import { NotificationStatusEnums, NotificationTypeEnums } from '@/helpers/enums/notification'

import ImageCommon from '@/components/ui/image'
import { Typography } from '@/components/ui/typography'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import imgLogoDefault from '@/assets/images/common/image-default.webp'

interface CardNotificationProps {
  id: number
  type: NotificationTypeEnums
  user: string
  context?: string
  time: string
  relativeTime: string
  message?: string
  status: NotificationStatusEnums
}

function CardNotification({ notification }: { notification: CardNotificationProps }) {
  return (
    <div className={`p-4 flex gap-4 rounded-lg shadow-md mb-4 m-1 cursor-pointer`}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>
          <div className="w-10 h-10">
            <ImageCommon src={imgLogoDefault} />
          </div>
        </AvatarFallback>
      </Avatar>

      <div className="w-full">
        <div className="flex justify-between gap-2">
          <div>
            <span className="font-semibold text-text-gray content-macro">{notification?.user}</span>
            {notification?.type === NotificationTypeEnums?.COMMENT && (
              <>
                {' '}
                <span className="text-text-gray content-macro">Commented</span>{' '}
                <span className="text-text-gray font-semibold content-macro">
                  {notification.context}
                </span>
              </>
            )}

            {notification.type === NotificationTypeEnums?.FOLLOW && (
              <>
                {' '}
                <span className="text-text-gray content-macro">{notification.user}</span>{' '}
                <span className="text-text-gray font-semibold content-macro">followed you</span>
              </>
            )}
          </div>
          {notification?.status === NotificationStatusEnums?.UN_READ && (
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
          )}
        </div>

        <div className="mt-1 text-sm text-gray-700">
          {notification?.type === NotificationTypeEnums?.COMMENT && (
            <>
              <span className="mt-1 italic">"{notification.message}"</span>
            </>
          )}
        </div>

        <div className="flex justify-between items-center gap-2 mt-1">
          <Typography className="text-xs text-gray-400">{notification.time}</Typography>
          <Typography className="text-sm text-gray-500">{notification.relativeTime}</Typography>
        </div>
      </div>
    </div>
  )
}

export default CardNotification
