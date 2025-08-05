import { Skeleton } from './skeleton'

import { cn } from '@/lib/utils'

import imgDefault from '@/assets/images/common/image-default.webp'

interface CommonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt?: string
  containerClassName?: string
  isLoading?: boolean
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}

const ImageCommon: React.FC<CommonImageProps> = ({
  src,
  alt = 'Image',
  containerClassName = '',
  objectFit = 'cover',
  className = '',
  isLoading = false,
  ...rest
}) => {
  // const [imgSrc, setImgSrc] = useState<string>(src || imgDefault)

  // const handleError = () => {
  //   if (imgSrc !== imgDefault) {
  //     setImgSrc(imgDefault)
  //   }
  // }

  return (
    <div className={cn('relative overflow-hidden w-full h-full', containerClassName)}>
      {isLoading ? (
        <Skeleton className="h-12 w-12 rounded-full" />
      ) : (
        <img
          src={src || imgDefault}
          alt={alt}
          // onError={handleError}
          className={cn(`w-full h-full object-${objectFit}`, className)}
          loading="lazy"
          {...rest}
        />
      )}
    </div>
  )
}

export default ImageCommon
