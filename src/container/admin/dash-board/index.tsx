import {
  areaChartGradientMockup,
  chartMockup,
  statsDashboardsMockup,
} from '@/helpers/mocks/dashboard'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import StatsCard from './stats-card'
import ImageCommon from '@/components/ui/image'
import { Typography } from '@/components/ui/typography'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#cb0b9f',
  },
  mobile: {
    label: 'Mobile',
    color: '#3b416f',
  },
} satisfies ChartConfig

function DashBoard() {
  return (
    <div>
      <div className="grid grid-cols-4 max-tablet:grid-cols-2 max-extrasmall-mobile:grid-cols-1 gap-6 max-tablet:gap-4 max-extrasmall-mobile:gap-2">
        {statsDashboardsMockup.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="flex gap-6 mt-6 max-tablet:gap-4 max-extrasmall-mobile:gap-2 max-tablet:mt-4 max-extrasmall-mobile:mt-2 max-large-tablet:flex-col">
        <div className="bg-background shadow-md rounded-large-small p-4 basis-2/3 flex gap-6 max-large-tablet:basis-1 max-tablet:flex-col">
          <div className="flex justify-between flex-col">
            <div>
              <Typography className="text-secondary mb-2" fontWeight="semibold">
                Built by developers
              </Typography>
              <Typography variant="h4" fontWeight="semibold" className="mb-2">
                Soft UI Dashboard
              </Typography>
              <Typography variant="h5" className="text-secondary">
                From colors, cards, typography to complex elements, you will find the full
                documentation.
              </Typography>
            </div>

            <Typography
              fontWeight="semibold"
              className="text-secondary hover:underline cursor-pointer w-fit"
            >
              Read More
            </Typography>
          </div>

          <div className="bg-custom rounded-large max-w-[300px] max-h-56 h-56 max-tablet:max-w-full max-tablet:w-full">
            <ImageCommon
              src="https://themewagon.github.io/Soft-UI-Dashboard-Tailwind/assets/img/illustrations/rocket-white.png"
              className="object-contain"
            />
          </div>
        </div>

        <div className="bg-[url('https://themewagon.github.io/Soft-UI-Dashboard-Tailwind/assets/img/ivancik.jpg')] shadow-md rounded-large-small p-4 basis-1/3 bg-cover max-large-tablet:basis-1">
          <div className="flex flex-col h-full justify-between gap-20">
            <div>
              <Typography className="text-text-light mb-2" fontWeight="semibold">
                Work with the rockets
              </Typography>
              <Typography className="text-text-light mt-4" variant="h5">
                Wealth creation is an evolutionarily recent positive-sum game. It is all about who
                take the opportunity first.
              </Typography>
            </div>
            <div>
              <Typography
                fontWeight="semibold"
                className="text-text-light hover:underline cursor-pointer w-fit"
              >
                Read More
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mt-6 max-tablet:gap-4 max-extrasmall-mobile:gap-2 max-tablet:mt-4 max-extrasmall-mobile:mt-2 max-h-100 max-large-tablet:flex-col">
        <div className="basis-1/2 max-large-tablet:basis-full h-full">
          <Card className="h-full">
            <CardHeader>
              <Typography className="mb-2" variant="h4" fontWeight="semibold">
                Bar Chart - Stacked + Legend
              </Typography>
              <Typography variant="h5" className="text-secondary">
                January - June 2024
              </Typography>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartMockup}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="desktop"
                    stackId="a"
                    fill="var(--color-desktop)"
                    radius={[0, 0, 4, 4]}
                  />
                  <Bar
                    dataKey="mobile"
                    stackId="a"
                    fill="var(--color-mobile)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        <div className="basis-1/2 h-full">
          <Card className="shadow-md">
            <CardHeader>
              <Typography className="mb-2" variant="h4" fontWeight="semibold">
                Area Chart - Gradient
              </Typography>
              <Typography variant="h5" className="text-secondary">
                Showing total visitors for the last 6 months
              </Typography>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="w-full">
                <AreaChart
                  accessibilityLayer
                  data={areaChartGradientMockup}
                  margin={{
                    left: -20,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={3} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <defs>
                    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="url(#fillMobile)"
                    fillOpacity={0.4}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="url(#fillDesktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
