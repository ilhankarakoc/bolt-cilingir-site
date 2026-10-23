import { createClient } from '@supabase/supabase-js';

// Tamamen sizin projenize uygun ve Vite uyumlu hale getirdik
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);