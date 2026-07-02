import { createClient } from '@supabase/supabase-js';

// Đọc URL và Anon Key từ biến môi trường của Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase environment variables are missing! Local mock state or configuration will be required.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
