"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Button } from "@expo/components/ui/button";
import { Input } from "@expo/components/ui/input";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import debounce from "lodash/debounce";

export function SearchHeader({ total }: { total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }
      });

      return newSearchParams.toString();
    },
    [searchParams]
  );

  const handleSearch = debounce((term: string) => {
    startTransition(() => {
      const queryString = createQueryString({
        q: term || null,
        page: "1",
      });
      router.push(`${pathname}?${queryString}`);
    });
  }, 300);

  return (
    <div className="bg-white rounded-lg border p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              defaultValue={searchParams?.get("q") ?? ""}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
              placeholder="Search experts..."
            />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-600">
            {total} Expert{total !== 1 ? "s" : ""}
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Expert
          </Button>
        </div>
      </div>
    </div>
  );
}
