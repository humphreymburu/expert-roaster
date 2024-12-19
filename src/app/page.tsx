import { useState } from 'react'
import { Button } from '@expo/components/ui/button'
import { Card } from '@expo/components/ui/card'
import { Search, Shield, Globe, CheckCircle, ChevronRight, Star, Users } from 'lucide-react'
import { Header } from '@expo/components/main-header'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-white to-gray-50">
        <div className="relative h-[calc(100vh-4rem)]">
          {" "}
          {/* 4rem accounts for header height */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          <div className="container mx-auto h-full px-4 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-4xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Connect with Expert Talent On Demand
              </h1>

              <p className="max-w-[700px] text-gray-600 text-lg md:text-xl">
                Access a curated network of verified experts across various
                fields. Find the perfect match for your project needs.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="h-12 px-6">
                    Register as Expert
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/resources/experts">
                  <Button size="lg" variant="outline" className="h-12 px-6">
                    Browse Experts
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}