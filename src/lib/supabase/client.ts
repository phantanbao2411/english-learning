import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wuuscwudktnlfkodaddk.supabase.co";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1dXNjd3Vka3RubGZrb2RhZGRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4MjA0OTAsImV4cCI6MjEwNjM5NjQ5MH0.tBgVGOhFsKNGaiApwflym4qaqd5cO3To68eRWYQyCSA";

  return createBrowserClient(url, key);
}
