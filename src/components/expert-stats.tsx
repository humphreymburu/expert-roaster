'use client'

import { Card } from '@expo/components/ui/card'
import { Users, Globe, Award, BookOpen } from 'lucide-react'

export function ExpertStats() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <Users className="h-6 w-6 text-primary" />
          <div>
            <h3 className="text-2xl font-bold">2,500+</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Verified Experts</p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <Globe className="h-6 w-6 text-primary" />
          <div>
            <h3 className="text-2xl font-bold">150+</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Countries</p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <Award className="h-6 w-6 text-primary" />
          <div>
            <h3 className="text-2xl font-bold">50+</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Expertise Areas</p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <BookOpen className="h-6 w-6 text-primary" />
          <div>
            <h3 className="text-2xl font-bold">10,000+</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Projects Completed</p>
          </div>
        </div>
      </Card>
    </div>
  )
}