"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type DevicesByStatusChartProps = {
  chartData: {
    name: string;
    devices: number;
  }[];
};

export default function DevicesByGroupChart({ chartData }: DevicesByStatusChartProps) {
  return (
    <ChartContainer config={{ devices: { label: "Devices", color: "var(--chart-1)" } }} className="max-h-64 w-full">
      <BarChart accessibilityLayer data={chartData} layout="horizontal">
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" tickMargin={10} tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" className="capitalize" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="devices" fill="var(--color-devices)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
