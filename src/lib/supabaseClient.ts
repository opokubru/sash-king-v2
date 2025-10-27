// lib/supabaseClient.ts
import { variables } from '@/utils/env';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = variables.VITE_SUPABASE_URL!;
const supabaseKey = variables.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Service role client for uploads (bypasses RLS)
export const supabaseAdmin = variables.VITE_SUPABASE_SERVICE_KEY
  ? createClient(supabaseUrl, variables.VITE_SUPABASE_SERVICE_KEY)
  : supabase; // Fallback to regular client if no service key
