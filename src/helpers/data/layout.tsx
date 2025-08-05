import type { AdminMenusInterface } from '@/models/layout.model'

import { ADMIN_PRIVATE_ROUTES } from '@/routes/routes.constant'

import icTables from '@/assets/icons/layout/ic-tables.svg'
import icBilling from '@/assets/icons/layout/ic-billing.svg'
import icCheckout from '@/assets/icons/layout/ic-checkout.svg'
import icBusiness from '@/assets/icons/layout/ic-business.svg'

const adminMenus: AdminMenusInterface[] = [
  {
    key: 'dash-board',
    label: 'dash-board',
    icon: icBusiness,
    href: ADMIN_PRIVATE_ROUTES?.DASH_BOARD,
  },
  {
    key: 'tables',
    label: 'tables',
    icon: icTables,
    href: ADMIN_PRIVATE_ROUTES?.TABLES,
  },
  {
    key: 'billing',
    label: 'billing',
    icon: icBilling,
    childrens: [
      {
        key: 'checkout',
        label: 'checkout',
        icon: icCheckout,
        href: ADMIN_PRIVATE_ROUTES?.CHECKOUT,
      },
    ],
  },
]

export { adminMenus }
