"use client"

import { Activity, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A step area chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

/** @type {ChartConfig} */
/**
 * @type {import("@/components/ui/chart").ChartConfig}
 */
const chartConfig = {
  desktop: {
    label: "Desktop",
    icon: Activity,
    theme: {
      light: "#0ea5e9",
      dark: "#38bdf8",
    },
  },
}

export function BasicBars() {
  return (
    <Card className="border border-slate-100 bg-white text-gray-900 shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-slate-100">
          Statistiques des emprunts
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-slate-400">
          Total de livres empruntés au cours des six derniers mois
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="dark:[&_.recharts-cartesian-axis-tick_text]:fill-slate-400 dark:[&_.recharts-cartesian-grid_line]:stroke-slate-800 [&_.recharts-cartesian-grid_line]:stroke-slate-200 [&_.recharts-cartesian-axis-tick_text]:fill-slate-500"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="desktop"
              type="step"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default BasicBars
