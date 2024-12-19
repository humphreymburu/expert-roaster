"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any; // For any additional properties
}


export interface ExpertStats {
  total: number;
  active: number;
  projectsCompleted: number;
  averageResponseRate: number;
  growthData: ChartDataPoint[];
  expertiseData: ChartDataPoint[];
  trends: {
    expertGrowth: number;
    activeGrowth: number;
    projectsGrowth: number;
    responseRateGrowth: number;
  };
}

interface ExpertsChartProps {
  data: ChartDataPoint[];
}



export function ExpertsChart({ data }: ExpertsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}