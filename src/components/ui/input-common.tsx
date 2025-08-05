import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ReactSVG } from 'react-svg'

import Image from './image'

import icEye from '@/assets/icons/common/ic-eye.svg'
import icSearch from '@/assets/icons/common/ic-search.svg'
import icEyeOff from '@/assets/icons/common/ic-eye-off.svg'

interface InputPropsInterface extends React.ComponentProps<'input'> {
  isPassword?: boolean
  isPrefix?: boolean
  prefixIcon?: string
  isSuffix?: boolean
  suffixIcon?: string
  type?: string
  classNameParent?: string
}

function Input({
  className,
  type,
  isPassword = false,
  isPrefix = false,
  isSuffix = false,
  prefixIcon,
  suffixIcon,
  classNameParent,
  ...props
}: InputPropsInterface) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

  const inputType = isPassword ? (isShowPassword ? 'text' : 'password') : type || 'text'

  function handleShowPassword(): void {
    setIsShowPassword((prev: boolean) => !prev)
  }

  return (
    <div
      className={cn(
        'flex items-center border border-bd-input bg-background-input rounded-extrasmall h-11 px-2',
        classNameParent,
      )}
    >
      {isPrefix && (
        <ReactSVG
          src={prefixIcon || icSearch}
          width={16}
          height={16}
          className="text-background-dark mr-2"
        />
      )}
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-placeholder selection:bg-primary selection:text-primary-foreground flex-1 min-w-0 bg-transparent text-text-dark outline-none file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm placeholder:text-sm',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        {...props}
      />
      {isPassword && (
        <Image
          src={isShowPassword ? icEye : icEyeOff}
          className="cursor-pointer"
          onClick={handleShowPassword}
        />
      )}
      {isSuffix && (
        <ReactSVG
          src={suffixIcon || icSearch}
          width={16}
          height={16}
          className="text-background-dark"
        />
      )}
    </div>
  )
}

export { Input }
