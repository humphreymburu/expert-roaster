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

export async function searchExperts(query: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*, skills(*)")
    .or(
      `full_name.ilike.%${query}%,expertise_area.ilike.%${query}%,skills.name.ilike.%${query}%`
    )
    .eq("status", "approved");

  if (error) throw error;
  return data;
}

export async function uploadDocument(
  profileId: string,
  file: File,
  documentType: string
) {
  const { data, error } = await supabase.storage
    .from("documents")
    .upload(`${profileId}/${file.name}`, file);

  if (error) throw error;

  const { data: documentData, error: documentError } = await supabase
    .from("documents")
    .insert({
      profile_id: profileId,
      document_type: documentType,
      file_path: data.path,
    });

  if (documentError) throw documentError;
  return documentData;
}

export async function sendMessage(
  senderId: string,
  recipientId: string,
  content: string
) {
  const { data, error } = await supabase
    .from("messages")
    .insert({ sender_id: senderId, recipient_id: recipientId, content });

  if (error) throw error;
  return data;
}

export async function createNotification(
  profileId: string,
  content: string,
  type: string
) {
  const { data, error } = await supabase
    .from("notifications")
    .insert({ profile_id: profileId, content, type });

  if (error) throw error;
  return data;
}

export async function getExpertsBySpecialization() {
  const { data, error } = await supabase
    .from("profiles")
      .select("expertise_area, count(*)")
    .group("expertise_area");

  if (error) throw error;
  return data;
}

export async function getExpertsByRegion() {
  const { data, error } = await supabase
    .from("profiles")
    .select("region, count(*)")
    .group("region");

  if (error) throw error;
  return data;
}

export async function getExpertsByLanguage() {
  const { data, error } = await supabase.from("profiles").select("languages");

  if (error) throw error;

  const languageCounts = data.reduce((acc, profile) => {
    Object.keys(profile.languages).forEach((lang) => {
      acc[lang] = (acc[lang] || 0) + 1;
    });
    return acc;
  }, {});

  return Object.entries(languageCounts).map(([language, count]) => ({
    language,
    count,
  }));
}

export async function getSearchAnalytics(startDate, endDate) {
  const { data, error } = await supabase
    .from("search_logs")
    .select("query, count(*)")
    .gte("created_at", startDate)
    .lte("created_at", endDate)
    .group("query")
    .order("count", { ascending: false })
    .limit(10);

  if (error) throw error;
  return data;
}

export async function getMostViewedProfiles(limit = 10) {
  const { data, error } = await supabase
    .from("profile_views")
    .select("profile_id, profiles(full_name), count(*)")
    .group("profile_id, profiles(full_name)")
    .order("count", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getTopExpertsByRegion(
  region: string,
  limit: number = 10
) {
  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, years_of_experience")
    .eq("region", region)
    .order("years_of_experience", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
