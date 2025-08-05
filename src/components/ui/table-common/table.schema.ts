import { PAGE_DEFAULT } from '@/constants/common.constant'
import { z } from 'zod'

const defaultValueTable = {
  page: PAGE_DEFAULT,
}

const tableSchema = () => {
  return z.object({
    page: z.number(),
    pageSize: z.number(),
  })
}

export { tableSchema, defaultValueTable }
