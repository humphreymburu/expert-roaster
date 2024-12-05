'use client'

import { useState } from 'react'
import { Input } from '@expo/components/ui/input'
import { Button } from '@expo/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@expo/components/ui/select'

export function SearchExperts() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expertise, setExpertise] = useState('')
  const [region, setRegion] = useState('')

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Find Experts</h2>
      <div className="grid gap-4 md:grid-cols-4">
        <Input
          placeholder="Search by name or keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:col-span-2"
        />
        <Select value={expertise} onValueChange={setExpertise}>
          <SelectTrigger>
            <SelectValue placeholder="Expertise Area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="environment">Environment</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="education">Education</SelectItem>
          </SelectContent>
        </Select>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger>
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="africa">Africa</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
            <SelectItem value="europe">Europe</SelectItem>
            <SelectItem value="namerica">North America</SelectItem>
            <SelectItem value="samerica">South America</SelectItem>
            <SelectItem value="oceania">Oceania</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="mt-4 w-full md:w-auto">Search Experts</Button>
    </div>
  )
}