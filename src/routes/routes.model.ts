import type { ComponentType } from 'react'

export interface RouterElementInterface {
  key: string
  path: string
  component: ComponentType
  name: string
}
