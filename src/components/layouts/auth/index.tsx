import imgBackgroundAuth from '@/assets/images/layout/img-auth-background.webp'

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="max-container bg-cover bg-center w-full h-full"
      style={{
        backgroundImage: `url(${imgBackgroundAuth})`,
      }}
    >
      <div className="container flex py-10 items-center">
        <div className="basis-1/2 max-large-mobile:basis-0"></div>
        <div className="basis-1/2 max-large-mobile:basis-full bg-gray-500/40 backdrop-blur-sm rounded-large h-fit">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
