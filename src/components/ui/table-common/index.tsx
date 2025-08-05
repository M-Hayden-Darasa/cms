import type z from 'zod'
import type { FocusEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import {
  MAX_PAGE_SIZE,
  PAGE_DEFAULT,
  PAGE_KEY,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_KEY,
} from '@/constants/common.constant'
import { useAppSelector } from '@/hooks/useRedux'
import { useRouter } from '@/hooks/useRouterReplace'
import { zodResolver } from '@hookform/resolvers/zod'
import { ActionChangePageEnums } from '@/helpers/enums/common'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '../pagination'
import { Input } from '../input-common'
import { Typography } from '../typography'
import { defaultValueTable, tableSchema } from './table.schema'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'

interface TableCommonProps<T> {
  data: T[]
  columns: ColumnDef<T, unknown>[]
  totalDocs?: number
  totalRecored?: number
}

function TableCommon<T extends object>({
  data,
  columns,
  totalDocs = 100,
  totalRecored = 0,
}: TableCommonProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const { t } = useTranslation('common')
  const [searchParams] = useSearchParams()
  const { replaceState } = useRouter()
  const pageFromUrl = useAppSelector((state) => state?.routerHistory?.objectHistory)?.find(
    (item) => item?.key === PAGE_KEY,
  )?.value
  const pageSizeFromUrl = useAppSelector((state) => state?.routerHistory?.objectHistory)?.find(
    (item) => item?.key === PAGE_SIZE_KEY,
  )?.value

  const page: number = Number(pageFromUrl) || Number(searchParams.get(PAGE_KEY)) || PAGE_DEFAULT
  const pageSize: number =
    Number(pageSizeFromUrl) || Number(searchParams.get(PAGE_SIZE_KEY)) || PAGE_SIZE_DEFAULT

  const formSchema = tableSchema()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValueTable,
      pageSize: pageSize,
    },
  })

  const totalPages = Math.ceil(totalDocs / pageSize)

  const getPageNumbers = () => {
    if (totalPages <= MAX_PAGE_SIZE) {
      return [...Array(totalPages)].map((_, i) => i + 1)
    }

    const pages = []
    const half = Math.floor(MAX_PAGE_SIZE / 2)
    let start = Math.max(1, page - half)
    let end = Math.min(totalPages, page + half)

    if (page <= half) {
      end = MAX_PAGE_SIZE
    } else if (page + half >= totalPages) {
      start = totalPages - MAX_PAGE_SIZE + 1
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  console.log(page === Math.ceil(totalDocs / pageSize))

  function handleChangePage({
    pageProps,
    type,
  }: {
    pageProps?: number
    type?: ActionChangePageEnums
  }) {
    if (type === ActionChangePageEnums?.NEXT && page < Math.ceil(totalDocs / pageSize)) {
      replaceState({
        [PAGE_KEY]: page + 1,
      })
    } else if (type === ActionChangePageEnums?.PREVIOUS && page !== PAGE_DEFAULT) {
      replaceState({
        [PAGE_KEY]: page - 1,
      })
    } else if (!type) {
      replaceState({
        [PAGE_KEY]: pageProps || 1,
      })
    }
  }

  function handleChangePageSize(pageSize: number) {
    replaceState({
      [PAGE_SIZE_KEY]: pageSize,
      [PAGE_KEY]: PAGE_DEFAULT,
    })
  }

  return (
    <section>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn('text-xs uppercase font-semibold text-secondary-light')}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Form {...form}>
        <form>
          <div className="flex items-center justify-between gap-2 mt-2 max-tablet:flex-col">
            <div className="flex items-center gap-2 justify-between max-large-mobile:w-full">
              <div className="flex items-center gap-2 max-tablet:w-full">
                <Typography className="text-secondary-light">{t('total')}</Typography>
                <Typography fontWeight="semibold">{totalRecored}</Typography>
              </div>
              <div className="hidden items-center gap-2  max-large-mobile:flex min-w-44">
                <Typography>{t('lines-per-page')}</Typography>
                <FormField
                  control={form.control}
                  name="pageSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value as number}
                          type="number"
                          className="w-14"
                          min={1}
                          classNameParent="h-8"
                          onChange={(e) => {
                            const value = Number(e?.target?.value)
                            if (value > 0) {
                              field.onChange(value)
                            }
                          }}
                          onBlur={(e: FocusEvent<HTMLInputElement, Element>) =>
                            handleChangePageSize(Number(e?.target?.value))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center max-tablet:w-full justify-end">
              <div className="flex items-center gap-2 max-large-mobile:hidden">
                <Typography>{t('lines-per-page')}</Typography>
                <FormField
                  control={form.control}
                  name="pageSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value as number}
                          type="number"
                          className="w-14"
                          min={1}
                          classNameParent="h-8"
                          onChange={(e) => {
                            const value = Number(e?.target?.value)
                            if (value > 0) {
                              field.onChange(value)
                            }
                          }}
                          onBlur={(e: FocusEvent<HTMLInputElement, Element>) =>
                            handleChangePageSize(Number(e?.target?.value))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem
                    onClick={() =>
                      handleChangePage({
                        type: ActionChangePageEnums?.PREVIOUS,
                      })
                    }
                    className={cn(page === PAGE_DEFAULT ? 'cursor-not-allowed' : 'cursor-pointer')}
                  >
                    <PaginationPrevious />
                  </PaginationItem>

                  {page > 3 && totalPages > MAX_PAGE_SIZE && (
                    <>
                      <PaginationItem
                        onClick={() => handleChangePage({ pageProps: 1 })}
                        className="cursor-pointer rounded-full hover:bg-text-gray group aspect-square w-8 flex items-center justify-center"
                      >
                        <Typography className={cn('group-hover:text-text-light')}>1</Typography>
                      </PaginationItem>
                      <PaginationItem>
                        <Typography>...</Typography>
                      </PaginationItem>
                    </>
                  )}

                  {getPageNumbers().map((pageNumber) => (
                    <PaginationItem
                      key={pageNumber}
                      className={cn(
                        'cursor-pointer rounded-full hover:bg-text-gray group aspect-square w-8 flex items-center justify-center',
                        page === pageNumber && 'bg-text-gray',
                      )}
                      onClick={() => handleChangePage({ pageProps: pageNumber })}
                    >
                      <Typography
                        className={cn(
                          'group-hover:text-text-light',
                          page === pageNumber && 'text-text-light',
                        )}
                      >
                        {pageNumber}
                      </Typography>
                    </PaginationItem>
                  ))}

                  {page < totalPages - 2 && totalPages > MAX_PAGE_SIZE && (
                    <>
                      <PaginationItem>
                        <Typography>...</Typography>
                      </PaginationItem>
                      <PaginationItem
                        onClick={() =>
                          handleChangePage({ pageProps: Math.ceil(totalDocs / pageSize) })
                        }
                        className="cursor-pointer rounded-full hover:bg-text-gray group aspect-square w-8 flex items-center justify-center"
                      >
                        <Typography className={cn('group-hover:text-text-light')}>
                          {totalPages}
                        </Typography>
                      </PaginationItem>
                    </>
                  )}

                  <PaginationItem
                    className={cn(
                      page === Math.ceil(totalDocs / pageSize)
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer',
                    )}
                    onClick={() =>
                      handleChangePage({
                        type: ActionChangePageEnums?.NEXT,
                      })
                    }
                  >
                    <PaginationNext />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default TableCommon
