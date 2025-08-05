import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

import { Input } from '@/components/ui/input-common'
import { FormControl, FormItem, FormLabel } from '@/components/ui/form'

interface CommonInputFieldProps<T extends FieldValues = FieldValues> {
  field: ControllerRenderProps<T, Path<T>>
  label: string
  placeholder: string
}

export const InputField = ({ field, label, placeholder }: CommonInputFieldProps) => {
  return (
    <FormItem>
      <FormLabel className="text-text-primary">{label}</FormLabel>
      <FormControl>
        <Input placeholder={placeholder} {...field} />
      </FormControl>
    </FormItem>
  )
}
