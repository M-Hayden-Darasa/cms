import type { TFunction } from 'i18next'
import type { ColumnDef } from '@tanstack/react-table'

import { AuthorsTableEnums, ProjectStatusEnums } from '../enums/tables'
import type {
  AuthorsTableInterface,
  AuthorColumnInterface,
  FunctionColumnInterface,
  ProjectsTableInterface,
  ProjectInterface,
} from '@/models/tables'
import { cn } from '@/lib/utils'
import { colorsProgress, colorsStatus } from '../logic/tables'

import ImageCommon from '@/components/ui/image'

import { Typography } from '@/components/ui/typography'
import { Progress } from '@/components/ui/progress'

import imgLogoDefault from '@/assets/images/common/image-default.webp'

const columnsAuthorsTableMockup = (t: TFunction): ColumnDef<AuthorsTableInterface>[] => {
  return [
    {
      accessorKey: 'author',
      header: t('author'),
      cell: ({ getValue }) => {
        const author = getValue() as AuthorColumnInterface

        return (
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full">
              <ImageCommon
                src={author?.avatar || imgLogoDefault}
                alt={author?.name || ''}
                className="rounded-full"
              />
            </div>
            <div>
              <Typography fontWeight="semibold">{author?.name || ''}</Typography>
              <Typography className="text-secondary-light !text-xs">
                {author?.email || ''}
              </Typography>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'function',
      header: t('function'),
      cell: ({ getValue }) => {
        const functionValue = getValue() as FunctionColumnInterface

        return (
          <div>
            <Typography fontWeight="semibold" className="text-secondary !text-xs">
              {functionValue?.manager || ''}
            </Typography>
            <Typography className="text-secondary-light !text-xs">
              {functionValue?.organization || ''}
            </Typography>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: () => <div className="text-center w-full">{t('status')}</div>,

      cell: ({ getValue }) => {
        const employedStatus = getValue() as string
        return (
          <div className="flex items-center justify-center">
            <Typography
              fontWeight="semibold"
              className={cn(
                'text-text-light !text-xs uppercase px-[10px] py-[6px] rounded-small w-fit',
                employedStatus === AuthorsTableEnums?.OFFLINE ? 'offline-status' : 'online-status',
              )}
            >
              {employedStatus}
            </Typography>
          </div>
        )
      },
    },
    {
      accessorKey: 'employed',
      header: t('employed'),
      cell: ({ getValue }) => {
        const employedValue = getValue() as string
        return (
          <Typography fontWeight="semibold" className="text-secondary-light !text-xs">
            {employedValue}
          </Typography>
        )
      },
    },
  ]
}

const authorsTableMockup: AuthorsTableInterface[] = [
  {
    id: 1,
    author: {
      name: 'John Michael',
      avatar: 'https://themewagon.github.io/Soft-UI-Dashboard-Tailwind/assets/img/team-2.jpg',
      email: 'john@creative-tim.com',
    },
    function: {
      manager: 'Manager',
      organization: 'Organization',
    },
    status: AuthorsTableEnums.OFFLINE,
    employed: '23/04/18',
  },
  {
    id: 2,
    author: {
      name: 'Alexa Liras',
      avatar: 'https://themewagon.github.io/Soft-UI-Dashboard-Tailwind/assets/img/team-3.jpg',
      email: 'alexa@creative-tim.com',
    },
    function: {
      manager: 'Programator',
      organization: 'Developer',
    },
    status: AuthorsTableEnums.ONLINE,
    employed: '11/01/19',
  },
  {
    id: 3,
    author: {
      name: 'Laurent Perrier',
      avatar: 'https://themewagon.github.io/Soft-UI-Dashboard-Tailwind/assets/img/team-4.jpg',
      email: 'laurent@creative-tim.com',
    },
    function: {
      manager: 'Executive',
      organization: 'Projects',
    },
    status: AuthorsTableEnums.OFFLINE,
    employed: '19/09/17',
  },
  {
    id: 4,
    author: {
      name: 'Michael Levi',
      avatar: 'https://themewagon.github.io/Soft-UI-Dashboard-Tailwind/assets/img/team-2.jpg',
      email: 'michael@creative-tim.com',
    },
    function: {
      manager: 'Programator',
      organization: 'Developer',
    },
    status: AuthorsTableEnums.OFFLINE,
    employed: '24/12/08',
  },
  {
    id: 5,
    author: {
      name: 'Richard Gran',
      avatar: 'https://themewagon.github.io/Soft-UI-Dashboard-Tailwind/assets/img/team-3.jpg',
      email: 'richard@creative-tim.com',
    },
    function: {
      manager: 'Manager',
      organization: 'Executive',
    },
    status: AuthorsTableEnums.ONLINE,
    employed: '04/10/21',
  },
  {
    id: 6,
    author: {
      name: 'Miriam Eric',
      avatar: 'https://themewagon.github.io/Soft-UI-Dashboard-Tailwind/assets/img/team-4.jpg',
      email: 'Không rõ',
    },
    function: {
      manager: 'Programator',
      organization: 'Developer',
    },
    status: AuthorsTableEnums.ONLINE,
    employed: '14/09/20',
  },
]

const projectsTableMockup: ProjectsTableInterface[] = [
  {
    id: 1,
    project: {
      name: 'Spotify',
      logo: 'https://themewagon.github.io/Soft-UI-Dashboard-Tailwind/assets/img/small-logos/logo-spotify.svg',
    },
    budget: 2500,
    status: ProjectStatusEnums?.WORKING,
    completion: 60,
  },
  {
    id: 2,
    project: {
      name: 'Invision',
      logo: 'https://themewagon.github.io/Soft-UI-Dashboard-Tailwind/assets/img/small-logos/logo-invision.svg',
    },
    budget: 5000,
    status: ProjectStatusEnums?.DONE,
    completion: 100,
  },
  {
    id: 3,
    project: {
      name: 'Jira',
      logo: 'http://themewagon.github.io/Soft-UI-Dashboard-Tailwind/assets/img/small-logos/logo-jira.svg',
    },
    budget: 3400,
    status: ProjectStatusEnums?.CANCELED,
    completion: 20,
  },
  {
    id: 4,
    project: {
      name: 'Slack',
      logo: 'https://themewagon.github.io/Soft-UI-Dashboard-Tailwind/assets/img/small-logos/logo-slack.svg',
    },
    budget: 1000,
    status: ProjectStatusEnums?.DONE,
    completion: 0,
  },
  {
    id: 5,
    project: {
      name: 'Webdev',
      logo: 'https://themewagon.github.io/Soft-UI-Dashboard-Tailwind/assets/img/small-logos/logo-webdev.svg',
    },
    budget: 14000,
    status: ProjectStatusEnums?.WORKING,
    completion: 10,
  },
  {
    id: 6,
    project: {
      name: 'Adobe XD',
      logo: 'https://themewagon.github.io/Soft-UI-Dashboard-Tailwind/assets/img/small-logos/logo-xd.svg',
    },
    budget: 2300,
    status: ProjectStatusEnums?.CANCELED,
    completion: 90,
  },
]

const columnsProjectsTableMockup = (t: TFunction): ColumnDef<ProjectsTableInterface>[] => {
  return [
    {
      accessorKey: 'project',
      header: t('project'),
      cell: ({ getValue }) => {
        const project = getValue() as ProjectInterface

        return (
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full">
              <ImageCommon
                src={project?.logo || imgLogoDefault}
                alt={project?.name || ''}
                className="rounded-full"
              />
            </div>
            <Typography fontWeight="semibold">{project?.name || ''}</Typography>
          </div>
        )
      },
    },
    {
      accessorKey: 'budget',
      header: t('budget'),
      cell: ({ getValue }) => {
        const budget = getValue() as number

        return (
          <div>
            <Typography fontWeight="semibold" className="text-secondary !text-xs">
              ${budget || 0}
            </Typography>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: () => <div className="text-center w-full">{t('status')}</div>,
      cell: ({ getValue }) => {
        const projectStatus = getValue() as ProjectStatusEnums
        return (
          <div className="flex items-center justify-center">
            <Typography
              fontWeight="semibold"
              className={cn(
                'text-text-light !text-xs uppercase px-[10px] py-[6px] rounded-small w-fit border',
              )}
              style={{
                backgroundColor: colorsStatus(projectStatus)?.background,
                borderColor: colorsStatus(projectStatus)?.border,
                color: colorsStatus(projectStatus)?.text,
              }}
            >
              {projectStatus}
            </Typography>
          </div>
        )
      },
    },
    {
      accessorKey: 'completion',
      header: t('completion'),
      cell: ({ getValue }) => {
        const employedValue = getValue() as number
        return (
          <div className="flex gap-1 items-center">
            <Typography fontWeight="semibold" className="text-secondary-light !text-xs">
              {employedValue}%
            </Typography>
            <Progress
              value={employedValue}
              className="h-1"
              color="red"
              classNameProgress={colorsProgress(employedValue)}
            />
          </div>
        )
      },
    },
  ]
}

export {
  authorsTableMockup,
  columnsAuthorsTableMockup,
  projectsTableMockup,
  columnsProjectsTableMockup,
}
