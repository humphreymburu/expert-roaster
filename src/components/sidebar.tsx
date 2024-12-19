"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Home,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from '@expo/lib/utils';

const navigationItems = [
  {
    group: "Main",
    items: [
      { label: "Home", icon: Home, href: "/" },
      { label: "Experts", icon: User, href: "/resources/experts" },
    ],
  },
  {
    group: "Account",
    items: [
      { label: "Settings", icon: Settings, href: "/settings" },
      { label: "Sign Out", icon: LogOut, href: "/logout" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r h-screen">
      {/* Logo Section */}
      <div className="p-6 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">ER</span>
          </div>
          <span className="font-semibold text-lg">Expert Roster</span>
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="px-4 py-6 space-y-8">
        {navigationItems.map((group) => (
          <div key={group.group}>
            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {group.group}
            </h3>
            <nav className="space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm",
                    pathname === item.href
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 mr-3",
                      pathname === item.href
                        ? "text-blue-700"
                        : "text-gray-400"
                    )}
                  />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </div>
  );
}
