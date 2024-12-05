import { useState } from 'react'
import { Button } from '@expo/components/ui/button'
import { Card } from '@expo/components/ui/card'
import { Search, Shield, Globe, CheckCircle, ChevronRight, Star, Users } from 'lucide-react'

function SearchExperts() {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="flex items-center p-2 bg-white rounded-lg shadow-lg border border-gray-100">
        <Search className="h-5 w-5 text-gray-400 ml-3" />
        <input
          type="text"
          placeholder="Search experts by skill or domain..."
          className="w-full px-4 py-3 focus:outline-none text-gray-600"
        />
        <Button className="mr-2">
          Search
        </Button>
      </div>
    </div>
  )
}

function ExpertStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {[
        { number: "500+", label: "Verified Experts", icon: Users },
        { number: "50k+", label: "Successful Projects", icon: CheckCircle },
        { number: "4.9/5", label: "Average Rating", icon: Star },
      ].map((stat, i) => (
        <div key={i} className="flex items-center justify-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
            <stat.icon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-left">
            <p className="text-2xl font-bold text-gray-900">{stat.number}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
        
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full text-blue-700 text-sm font-medium mb-4">
              <Star className="h-4 w-4" />
              <span>Trusted by leading organizations worldwide</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Connect with Expert Talent On Demand
            </h1>
            
            <p className="max-w-[700px] text-gray-600 text-lg md:text-xl">
              Access a curated network of verified experts across various fields. 
              Find the perfect match for your project needs.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="h-12 px-6">
                Register as Expert
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6">
                Browse Experts
              </Button>
            </div>
          </div>

          <div className="mt-16">
            <SearchExperts />
          </div>

          <div className="mt-24">
            <ExpertStats />
          </div>

          <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Verified Experts",
                description: "Every expert undergoes a rigorous verification process for credentials and expertise validation",
                icon: CheckCircle,
                color: "blue"
              },
              {
                title: "Global Network",
                description: "Access diverse talent from around the world, bringing unique perspectives to your projects",
                icon: Globe,
                color: "green"
              },
              {
                title: "Secure Platform",
                description: "Enterprise-grade security ensuring your data and communications remain protected",
                icon: Shield,
                color: "purple"
              }
            ].map((feature, i) => (
              <Card key={i} className="p-6 border-none shadow-md hover:shadow-lg transition-shadow">
                <div className={`h-12 w-12 rounded-lg bg-${feature.color}-50 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-24 text-center">
            <Button size="lg" variant="outline" className="h-12 px-6">
              View All Features
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}