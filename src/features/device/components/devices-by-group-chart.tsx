"use client";

import { CircleIcon } from "lucide-react";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { CHART_CONTAINER_HEIGHT } from "@/lib/constants";

type DevicesByStatusChartProps = {
  chartData: {
    name: string;
    devices: number;
  }[];
};

export default function DevicesByGroupChart({ chartData }: DevicesByStatusChartProps) {
  return (
    <ResponsiveContainer width="100%" height={CHART_CONTAINER_HEIGHT} className="mx-auto max-h-64 pb-0">
      <BarChart data={chartData} layout="horizontal" barCategoryGap="20%">
        <CartesianGrid horizontal vertical={false} stroke="var(--border)" />
        <XAxis
          type="category"
          dataKey="name"
          tick={true}
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <YAxis
          type="number"
          width={25}
          dataKey="devices"
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <Tooltip
          cursor={{ fill: "var(--accent)", opacity: 0.04 }}
          content={(props) => {
            const { active, payload } = props;

            if (active && payload && payload.length) {
              const { name, value, payload: pd } = payload[0];
              const groupName = pd.name;

              return (
                <div className="min-w-32 px-3 py-2.5">
                  <p className="mb-1 font-semibold">{groupName}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CircleIcon className="fill-accent stroke-accent size-2" />
                      <p className="text-muted text-sm capitalize">{name}</p>
                    </div>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                </div>
              );
            }

            return null;
          }}
        />
        <Bar dataKey="devices" fill="var(--accent)" radius={32} barSize="5%" isAnimationActive />
      </BarChart>
    </ResponsiveContainer>
  );
}
