"use client";

import { useState } from "react";
import { Button } from "@expo/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@expo/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LogIn,
  Menu,
  User,
  ChevronDown,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { TopTitle } from "./top-title";

type HeaderProps = {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    email: string;
    role?: string;
  } | null;
};

export function Header({ isAuthenticated = false, user = null }: HeaderProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto px-8 pb-4 bg-white">
        <div className="flex h-16 items-center justify-between pt-4">
          {/* Left side - empty */}
          <div className="relative">
            <TopTitle />
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center justify-end flex-1">
            <nav className="hidden md:flex items-center space-x-8">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {/* Notifications */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-gray-100 transition-colors"
                  >
                    <Bell className="h-5 w-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                      3
                    </span>
                  </Button>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-700" />
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="text-sm font-medium text-gray-900">
                              {user?.name || "User"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {user?.role || "Expert"}
                            </span>
                          </div>
                        </div>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push("/profile")}>
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push("/dashboard")}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <LogOut className="h-4 w-4 mr-2" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    className="hover:bg-gray-100 transition-colors font-medium"
                    onClick={() => router.push("/login")}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign in
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm font-medium"
                    onClick={() => router.push("/register")}
                  >
                    <span className='text-white'>Join as Expert</span>
                  </Button>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/experts"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Find Experts</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>About</span>
            </Link>
            {!isAuthenticated && (
              <div className="space-y-2 pt-2 border-t">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    router.push("/login");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign in
                </Button>
                <Button
                  className="w-full justify-start bg-blue-600"
                  onClick={() => {
                    router.push("/register");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Join as Expert
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
