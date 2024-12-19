"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@expo/components/ui/button";
import {
  ChevronDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Trash2,
  Edit,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@expo/components/ui/dropdown-menu";
import { cn } from "@expo/lib/utils";
import { toast } from 'sonner';

export function ExpertsTable({
  experts,
  currentPage,
  totalPages,
}: {
  experts: any[];
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedExperts, setSelectedExperts] = useState<string[]>([]);

  const createQueryString = (params: Record<string, string>) => {
    const current = new URLSearchParams(searchParams?.toString());
    Object.entries(params).forEach(([key, value]) => {
      current.set(key, value);
    });
    return current.toString();
  };

  const handlePageChange = (page: number) => {
    const queryString = createQueryString({ page: page.toString() });
    router.push(`${pathname}?${queryString}`);
  };

  const handleView = (id: string) => {
    router.push(`/experts/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/experts/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this expert?")) {
      try {
        const res = await fetch(`/api/experts/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error();
        router.refresh();
        toast.success("Expert deleted successfully");
      } catch {
        toast.error("Failed to delete expert");
      }
    }
  };


  return (
    <div className="bg-white rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedExperts.length === experts.length}
                  onChange={() => {
                    setSelectedExperts(
                      selectedExperts.length === experts.length
                        ? []
                        : experts.map((e) => e.id)
                    );
                  }}
                />
              </th>
              <th className="p-4 text-left">Profile</th>
              <th className="p-4 text-left">
                <div className="flex items-center">
                  Name
                  <ChevronDown className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Country</th>
              <th className="p-4 text-left">Experience</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experts.map((expert) => (
              <tr key={expert.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedExperts.includes(expert.id)}
                    onChange={() => {
                      setSelectedExperts(
                        selectedExperts.includes(expert.id)
                          ? selectedExperts.filter((id) => id !== expert.id)
                          : [...selectedExperts, expert.id]
                      );
                    }}
                  />
                </td>
                <td className="p-4">
                  <div className="relative">
                    <img
                      src={expert.avatar || `/api/placeholder/32/32`}
                      alt={expert.fullName}
                      className="h-8 w-8 rounded-full"
                    />
                    <div
                      className={cn(
                        "absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white",
                        expert.isVerified ? "bg-green-500" : "bg-gray-300"
                      )}
                    />
                  </div>
                </td>
                <td className="p-4 font-medium">{expert.fullName}</td>
                <td className="p-4 text-gray-600">{expert.email}</td>
                <td className="p-4">{expert.country || "-"}</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <span className="text-sm text-gray-600">
                      {expert.expertiseAreas}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="z-50 bg-white p-2 rounded-md shadow-lg border border-gray-200"
                    >
                      <DropdownMenuItem
                        onClick={() => handleView(expert.id)}
                        className="cursor-pointer flex items-center hover:bg-gray-100 px-3 py-2 rounded-md"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEdit(expert.id)}
                        className="cursor-pointer flex items-center hover:bg-gray-100 px-3 py-2 rounded-md"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(expert.id)}
                        className="cursor-pointer flex items-center text-red-600 hover:bg-red-50 px-3 py-2 rounded-md"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t">
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {/* Simplified pagination numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage >= totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
