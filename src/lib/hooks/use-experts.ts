'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']

export function useExperts() {
  const [experts, setExperts] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  async function loadExperts() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setExperts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load experts'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadExperts()
  }, [])

  async function verifyExpert(id: string) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_verified: true })
        .eq('id', id)

      if (error) throw error
      await loadExperts()
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to verify expert'))
    }
  }

  return { experts, loading, error, verifyExpert, loadExperts }
}