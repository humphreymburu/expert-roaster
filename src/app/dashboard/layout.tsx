import { Inter } from "next/font/google";
import { ThemeProvider } from "@expo/components/theme-provider";
import { Toaster } from "@expo/components/ui/toaster";
import { Header } from "@expo/components/header";
import type { Metadata } from "next";
import { Sidebar } from "@expo/components/sidebar";
import { Breadcrumbs } from "@expo/components/breadcrump";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expert Roster System",
  description:
    "A comprehensive platform for managing and discovering expert profiles",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
