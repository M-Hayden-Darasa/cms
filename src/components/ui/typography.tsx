import type { HTMLAttributes } from 'react'
import { type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { typographyVariants } from '@/lib/variants.typography'

export type TypographyVariantProps = VariantProps<typeof typographyVariants>

interface TypographyProps extends HTMLAttributes<HTMLElement>, TypographyVariantProps {}

export function Typography({
  className,
  variant,
  children,
  textColor,
  textAlign,
  fontWeight,
  ...props
}: TypographyProps) {
  const Comp = variant || 'p'

  return (
    <Comp
      className={cn(typographyVariants({ textColor, fontWeight, variant, textAlign }), className)}
      {...props}
    >
      {children}
    </Comp>
  )
}
