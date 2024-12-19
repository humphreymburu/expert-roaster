interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  period?: string;
}

export function StatsCard({ title, value, trend, period }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 border">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        {period && (
          <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1">
            {period}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <h2 className="text-2xl font-semibold">{value}</h2>
        {trend && (
          <span
            className={`text-sm ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            } flex items-center`}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  );
}
