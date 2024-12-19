import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://reaeekxqwsfrslmtfbah.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlYWVla3hxd3NmcnNsbXRmYmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMDQ5MDUsImV4cCI6MjA0ODg4MDkwNX0.UvknpiCopKB7CcGTbJQ3r-B0pJLKEGsRipaMPPpZKPM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getUserRole(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data?.role;
}
