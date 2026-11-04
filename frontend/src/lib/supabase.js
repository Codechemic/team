import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// .env 에 두 값이 있으면 Supabase 사용, 없으면 null → mock 데이터로 동작
export const supabase = url && key && !url.includes('xxxxxxxx') ? createClient(url, key) : null;
export const USE_SUPABASE = !!supabase;
