import { z } from 'zod'

const defaultValueSearch = {
  search: '',
}

const searchSchema = () => {
  return z.object({
    search: z.string(),
  })
}

export { defaultValueSearch, searchSchema }
