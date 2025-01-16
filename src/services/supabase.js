import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://xbhxdqwcajlmybkazgku.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiaHhkcXdjYWpsbXlia2F6Z2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NDE0NzMsImV4cCI6MjA1MjQxNzQ3M30.MrnqmI2vo1PlOjAfgeN7RapWGe3mZbg9HjSta4kbnko";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
