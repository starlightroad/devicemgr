"use client";

import { CircleIcon } from "lucide-react";

import { tooltipVariants } from "@heroui/styles";

import { ResponsiveContainer, Tooltip, Treemap } from "recharts";

import { CHART_CONTAINER_HEIGHT } from "@/lib/constants";

type DevicesByTypeChartProps = {
  chartData: {
    name: string;
    total: number;
  }[];
};

export default function DevicesByTypeChart({ chartData }: DevicesByTypeChartProps) {
  return (
    <ResponsiveContainer width="100%" height={CHART_CONTAINER_HEIGHT}>
      <Treemap
        width="100%"
        height={CHART_CONTAINER_HEIGHT}
        data={chartData}
        dataKey="total"
        stroke="var(--border)"
        fill="var(--accent)"
        isAnimationActive
        animationDuration={300}
        style={{
          fontWeight: 200,
        }}
      >
        <Tooltip
          cursor={{ fill: "var(--accent)", opacity: 0.04 }}
          content={(props) => {
            const { active, payload } = props;

            if (active && payload && payload.length) {
              const { name, value } = payload[0];

              return (
                <div
                  className={tooltipVariants().base({
                    className: "flex min-w-32 items-center justify-between gap-8 px-3 py-2.5",
                  })}
                >
                  <div className="flex items-center gap-2 font-normal">
                    <CircleIcon className="fill-accent stroke-accent size-2" />
                    <p className="text-muted text-sm capitalize">{name}</p>
                  </div>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              );
            }

            return null;
          }}
        />
      </Treemap>
    </ResponsiveContainer>
  );
}
