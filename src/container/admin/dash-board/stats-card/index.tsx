import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string
  change: string
  changeColor: string
}

function StatsCard({ title, value, change, changeColor }: StatsCardProps) {
  return (
    <div className="bg-background shadow-md rounded-large-small p-4">
      <div>
        <Typography className="text-secondary" fontWeight="semibold">
          {title}
        </Typography>
        <div className="flex gap-2 items-end mt-1">
          <Typography variant="h4" fontWeight="semibold">
            {value}
          </Typography>
          <Typography className={cn(changeColor)} fontWeight="semibold">
            {change}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default StatsCard
