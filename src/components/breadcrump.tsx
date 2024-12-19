"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    // Remove any query parameters
    const pathWithoutQuery = pathname.split("?")[0];

    // Split pathname into segments
    const segments = pathWithoutQuery
      .split("/")
      .filter((segment) => segment !== "");

    // Generate breadcrumb items
    const items = segments.map((segment, index) => {
      // Build the URL for this breadcrumb
      const url = "/" + segments.slice(0, index + 1).join("/");

      // Format the label (capitalize, remove dashes/underscores)
      const label = segment
        .replace(/-/g, " ")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

      return { label, url };
    });

    // Add home to the beginning
    return [{ label: "Dashboard", url: "/" }, ...items];
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't render single breadcrumb
  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex items-center py-4 text-sm">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.url} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400 flex-shrink-0" />
          )}
          <Link
            href={breadcrumb.url}
            className={`hover:text-blue-600 transition-colors ${
              index === breadcrumbs.length - 1
                ? "text-gray-600 font-medium"
                : "text-gray-500"
            }`}
          >
            {breadcrumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
