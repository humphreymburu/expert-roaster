export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string
          email: string
          avatar_url: string | null
          bio: string | null
          expertise_areas: string[]
          languages: string[]
          certifications: Json[]
          years_of_experience: number
          country: string
          region: string
          is_verified: boolean
          skills: string[]
          documents: Json[]
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          full_name: string
          email: string
          avatar_url?: string | null
          bio?: string | null
          expertise_areas?: string[]
          languages?: string[]
          certifications?: Json[]
          years_of_experience?: number
          country: string
          region: string
          is_verified?: boolean
          skills?: string[]
          documents?: Json[]
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string
          email?: string
          avatar_url?: string | null
          bio?: string | null
          expertise_areas?: string[]
          languages?: string[]
          certifications?: Json[]
          years_of_experience?: number
          country?: string
          region?: string
          is_verified?: boolean
          skills?: string[]
          documents?: Json[]
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}