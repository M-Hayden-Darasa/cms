import { cva, type VariantProps } from 'class-variance-authority'

export const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'headline-extralarge',
      h2: 'headline-large',
      h3: 'headline-medium',
      h4: 'headline-small',
      h5: 'headline-extrasmall-semibold',
      p: 'content-macro',
    },
    textColor: {
      default: 'text-text-gray',
    },
    textAlign: {
      left: 'text-left',
      right: 'text-right',
      center: 'text-center',
    },
    fontWeight: {
      thin: 'font-thin',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
  },
  defaultVariants: {
    textColor: 'default',
    variant: 'p',
    fontWeight: 'medium',
  },
})

export type TypographyVariantProps = VariantProps<typeof typographyVariants>
