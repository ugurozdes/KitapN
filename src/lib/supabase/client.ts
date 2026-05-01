import { createClient } from '@supabase/supabase-js';

console.log('🔌 Supabase Client Initializing...');
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log('Config URL:', supabaseUrl ? 'Found' : 'MISSING');
console.log('Config Key:', supabaseAnonKey ? 'Found' : 'MISSING');

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('❌ Missing Supabase environment variables! Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log('🔌 Supabase Client Created');
