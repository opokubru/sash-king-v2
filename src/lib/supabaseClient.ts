// lib/supabaseClient.ts
import { variables } from '@/utils/env';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = variables.SUPABASE_URL!;
const supabaseKey = variables.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
