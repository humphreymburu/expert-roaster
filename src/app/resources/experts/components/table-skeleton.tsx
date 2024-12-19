// components/table-skeleton.tsx
export function TableSkeleton() {
  return (
    <div className="bg-white rounded-lg border animate-pulse">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 w-8">
                <div className="h-4 w-4 bg-gray-200 rounded" />
              </th>
              <th className="p-4 w-12">
                <div className="h-8 w-8 bg-gray-200 rounded-full" />
              </th>
              {[...Array(5)].map((_, i) => (
                <th key={i} className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b">
                <td className="p-4">
                  <div className="h-4 w-4 bg-gray-200 rounded" />
                </td>
                <td className="p-4">
                  <div className="h-8 w-8 bg-gray-200 rounded-full" />
                </td>
                {[...Array(5)].map((_, colIndex) => (
                  <td key={colIndex} className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 w-8 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
