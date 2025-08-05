import type z from 'zod'
import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { ReactSVG } from 'react-svg'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '@/lib/utils'
import { useAppSelector } from '@/hooks/useRedux'
import { adminMenus } from '@/helpers/data/layout'
import useWindowWidth from '@/hooks/useWindowWidth'
import { useRouter } from '@/hooks/useRouterReplace'
import type { AdminMenusInterface } from '@/models/layout.model'
import { defaultValueSearch, searchSchema } from './admin.schema'
import { Sidebar, Menu, MenuItem, type MenuItemStyles, SubMenu } from 'react-pro-sidebar'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import ImageCommon from '@/components/ui/image'
import { Input } from '@/components/ui/input-common'
import Notification from '@/components/notification'
import { Typography } from '@/components/ui/typography'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import icTick from '@/assets/icons/layout/ic-tick.svg'
import icCollapsed from '@/assets/icons/layout/ic-collapsed.svg'
import icNotification from '@/assets/icons/layout/ic-notification.gif'
import imgLogoDefault from '@/assets/images/common/image-default.webp'

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation('layout')
  const { navigate } = useRouter()
  const { useName, email } = useAppSelector((state) => state.auth.userInfo)

  const formSchema = searchSchema()
  const width = useWindowWidth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValueSearch,
  })

  const menuActive = window.location.pathname?.split('/')?.pop()

  const [collapsed, setCollapsed] = useState<boolean>(false)

  useEffect(() => {
    if (width < 1024) {
      setCollapsed(true)
    }
  }, [width])

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '24px',
      color: '#344767',
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: {
      backgroundColor: 'transparent',
    },
    button: ({ open }) => ({
      background: open ? '#fff' : undefined,
    }),
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  }

  function handleActiveMenu(href: string) {
    navigate(href)
  }

  function handleCollap() {
    if (width > 1024) {
      setCollapsed((prev) => !prev)
    }
  }

  return (
    <div className={cn('flex bg-background-admin min-h-[100vh] relative')}>
      <Sidebar collapsed={collapsed} backgroundColor="#f8f9fa">
        <div className="flex flex-col my-6 ml-6 h-[calc(100vh-48px)] justify-between max-tablet:ml-3">
          <div>
            <div className="flex gap-4 items-center pb-6 border-b border-bd-input">
              <div className="w-10 h-10">
                <ImageCommon src={imgLogoDefault} />
              </div>
            </div>

            <div className="mt-4">
              <Menu menuItemStyles={menuItemStyles}>
                {adminMenus?.map((menu: AdminMenusInterface, index: number) => {
                  if (!isEmpty(menu?.childrens)) {
                    return (
                      <div
                        className={cn(
                          'max-tablet:w-[56px]',
                          menuActive === menu?.key && 'menu-active',
                          index !== 0 && 'mt-2',
                        )}
                        key={menu?.key}
                      >
                        <SubMenu
                          label={t(`${menu?.label}`)}
                          icon={<ReactSVG src={menu?.icon as string} />}
                        >
                          {menu?.childrens?.map((children) => (
                            <div
                              key={children?.key}
                              className={cn(
                                'my-2 mx-3 menu-children bg-background',
                                collapsed && 'bg-background',
                              )}
                            >
                              <MenuItem
                                icon={<ReactSVG src={children?.icon as string} />}
                                onClick={() => handleActiveMenu(children?.href as string)}
                              >
                                {t(`${children?.label}`)}
                              </MenuItem>
                            </div>
                          ))}
                        </SubMenu>
                      </div>
                    )
                  }

                  return (
                    <div
                      className={cn(
                        'max-tablet:w-[56px]',
                        menuActive === menu?.key && 'menu-active',
                        index !== 0 && 'mt-2',
                      )}
                      key={menu?.key}
                      onClick={() => handleActiveMenu(menu?.href as string)}
                    >
                      <MenuItem key={menu?.key} icon={<ReactSVG src={menu?.icon as string} />}>
                        {t(`${menu?.label}`)}
                      </MenuItem>
                    </div>
                  )
                })}
              </Menu>
            </div>
          </div>

          <div className="flex items-center justify-center mt-2 bg-background-light p-2 rounded-small">
            <div className="w-6 h-6 right-0 top-6 cursor-pointer" onClick={handleCollap}>
              <ImageCommon src={icCollapsed} />
            </div>
          </div>
        </div>
      </Sidebar>

      <main className="w-full bg-background-admin relative p-6 max-tablet:p-4 h-[100vh] overflow-y-auto">
        <div className="p-4 rounded-small flex gap-10 items-center justify-between max-large-mobile:flex-col max-large-mobile:gap-4 max-large-mobile:flex-col-reverse sticky top-0 right-0 backdrop-blur-[30px] backdrop-saturate-[100%] z-10">
          <div className="basis-2/3 max-large-mobile:w-full">
            <Form {...form}>
              <form className="space-y-5">
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={t('enter-your-search')}
                          {...field}
                          isPrefix
                          value={field.value as string}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

          <div className="flex gap-2 items-center max-large-mobile:w-full max-large-mobile:justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-7 h-7 cursor-pointer mr-4 relative">
                  <ImageCommon src={icNotification} />
                  <Badge className="h-5 w-5 p-1 rounded-full bg-error absolute -top-1 -right-1 text-[10px]">
                    10+
                  </Badge>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-100 py-5">
                <Notification />
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="relative">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>
                  <div className="w-10 h-10">
                    <ImageCommon src={imgLogoDefault} />
                  </div>
                </AvatarFallback>
              </Avatar>

              <div className="w-4 h-4 bg-background-tick rounded-full absolute -bottom-1 -right-1">
                <ImageCommon src={icTick} />
              </div>
            </div>

            <div>
              <Typography variant="h5" className="truncate">
                {useName}
              </Typography>
              <Typography className="truncate">{email}</Typography>
            </div>
          </div>
        </div>

        <div className="mt-4">{children}</div>
      </main>
    </div>
  )
}

export default AdminLayout
