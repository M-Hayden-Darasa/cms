import type { AuthorsTableEnums, ProjectStatusEnums } from '@/helpers/enums/tables'

export interface AuthorsTableInterface {
  id: number
  author: AuthorColumnInterface
  function: FunctionColumnInterface
  status: AuthorsTableEnums
  employed: string
}

export interface AuthorColumnInterface {
  name: string
  avatar?: string
  email: string
}

export interface FunctionColumnInterface {
  manager: string
  organization: string
}

export interface ProjectsTableInterface {
  id: number
  project: ProjectInterface
  budget: number
  status: ProjectStatusEnums
  completion: number
}

export interface ProjectInterface {
  name: string
  logo: string
}
