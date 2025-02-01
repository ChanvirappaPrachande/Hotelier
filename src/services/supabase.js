import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://xbhxdqwcajlmybkazgku.supabase.co";

const supabaseKey =
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";//or use env 

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
