import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hzrfbwgebyxnmbgssjqv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6cmZid2dlYnl4bm1iZ3NzanF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNjI5MDksImV4cCI6MjA3NTgzODkwOX0.7JP4ry4eL4hTShmxJ4ZgIec6Xh4iPHFrPcF7koXd7AE';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and anon key are required.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
