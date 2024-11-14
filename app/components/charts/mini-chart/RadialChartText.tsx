"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

export const description = "A radial chart with text"



type RadialChartTextProps = {
    title:string;
    count:number;
    percentage:number;
    sub:string;
    variant:'danger'|'default'|'success'
}

export function RadialChartText({
    title,
    count,
    percentage,
    sub,
    variant = 'default'
}:RadialChartTextProps) {
    const fillColor = variant === 'danger' && 'red' || variant === 'success' && 'green' || 'gray'

    const chartData = [
        { browser: "safari", visitors: 200, fill: count ? fillColor : 'gray' },
      ]
      
      const chartConfig = {
        visitors: {
          label: "Visitors",
        },
        safari: {
          label: "Safari",
          color: "hsl(var(--chart-2))",
        },
      } satisfies ChartConfig

  return (
    <Card className="flex flex-col border-none border-b-0">
      <CardHeader className="items-center pb-0">
        <CardTitle className="capitalize text-lg text-slate-500">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-28 h-28 "
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={percentage}
            innerRadius={40} outerRadius={60}
          >
            
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy -5}
                          className="fill-foreground text-lg font-bold"
                        >
                          {count}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 10}
                          className="fill-muted-foreground text-sm capitalize" 
                        >
                          {sub}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
   
    </Card>
  )
}