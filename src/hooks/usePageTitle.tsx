"use client";

import { usePathname } from "next/navigation";

export default function usePageTitle() {
  const pathname = usePathname();

  const title = pathname.split("/").filter(Boolean).pop() || "";

  return title
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
