import type { ReactNode } from 'react'

export interface AdminMenusInterface {
  key: string
  label: string
  icon?: ReactNode
  href?: string
  childrens?: AdminMenusInterface[]
}
