"use client";

import { useState } from "react";
import { Card, CardContent } from "@expo/components/ui/card";
import { Button } from "@expo/components/ui/button";
import { Badge } from "@expo/components/ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Home,
  Search,
  Mail,
  Phone,
  MoreVertical,
  Plus,
  SlidersHorizontal,
  MessageSquare,
  FileText,
  Calendar,
  BarChart,
  Settings,
  LogOut,
} from "lucide-react";

const navigationItems = [
  {
    group: "Main",
    items: [
      { label: "Home", icon: Home, href: "/dashboard" },
      { label: "Profile", icon: User, href: "/profile" },
      { label: "Messages", icon: MessageSquare, href: "/messages", badge: "5" },
    ],
  },
  {
    group: "Professional",
    items: [
      { label: "Projects", icon: FileText, href: "/projects" },
      { label: "Calendar", icon: Calendar, href: "/calendar" },
      { label: "Analytics", icon: BarChart, href: "/analytics" },
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

type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  hireDate: string;
  email: string;
  phone: string;
  status: "active" | "offline";
  avatar: string;
};

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Bessie Cooper",
    role: "Project Manager",
    department: "Design Team",
    hireDate: "7/27/13",
    email: "bessie.cooper@example.com",
    phone: "(229) 555-0109",
    status: "active",
    avatar: "/api/placeholder/32/32",
  },
  {
    id: "2",
    name: "Theresa Webb",
    role: "Project Manager",
    department: "Marketing",
    hireDate: "10/28/12",
    email: "theresa.webb@example.com",
    phone: "(406) 555-0120",
    status: "offline",
    avatar: "/api/placeholder/32/32",
  },
];

export default function Dashboard() {
  const pathname = usePathname();
  const [employees] = useState<Employee[]>(mockEmployees);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Navigation */}
      <div className="w-64 bg-white border-r fixed h-screen">
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
          {navigationItems.map((group, idx) => (
            <div key={idx}>
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {group.group}
              </h3>
              <nav className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center justify-between px-3 py-2 rounded-lg text-sm
                      ${
                        pathname === item.href
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <item.icon
                        className={`h-5 w-5 mr-3 ${
                          pathname === item.href
                            ? "text-blue-700"
                            : "text-gray-400"
                        }`}
                      />
                      {item.label}
                    </div>
                    {item.badge && (
                      <Badge
                        className={`${
                          pathname === item.href ? "bg-blue-100" : ""
                        }`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* Search and Actions */}
          <div className="bg-white rounded-lg border p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1 max-w-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Shift+K to search a user"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Candidate
              </Button>
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <h2 className="text-3xl font-bold">32</h2>
              <span className="text-2xl text-gray-600">Employee</span>
            </div>
          </div>

          {/* Employee Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <Card key={employee.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="h-12 w-12 rounded-full"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                            employee.status === "active"
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{employee.name}</h3>
                        <p className="text-sm text-gray-500">{employee.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Department</span>
                      <span>{employee.department}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Hired Date</span>
                      <span>{employee.hireDate}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Mail className="h-4 w-4" />
                      <span>{employee.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Phone className="h-4 w-4" />
                      <span>{employee.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
