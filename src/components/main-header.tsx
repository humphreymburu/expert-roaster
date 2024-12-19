"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Menu as MenuIcon, X, Globe } from "lucide-react";
import { Button } from './ui/button';
import Logo from '@expo/components/logo';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationLinks = [
    { href: "/solutions", label: "Solutions" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/resources", label: "Resources" },
  ];

  return (
    <header className="bg-white top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center space-x-1 bg-blue-50 rounded-full px-2 py-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-900 rounded-full hover:bg-white transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Button variant="ghost" size="sm" className="h-8">
                Help
              </Button>
              <div className="flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-gray-50">
                <Globe className="h-4 w-4" />
                <span>EN</span>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 h-9"
            >
              Sign up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t flex flex-col space-y-4">
                <Button variant="ghost" className="justify-center">
                  Help
                </Button>
                <div className="flex justify-center items-center space-x-2 py-2">
                  <Globe className="h-4 w-4" />
                  <span>EN</span>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                  Sign up
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
