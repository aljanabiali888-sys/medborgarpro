import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uaaoqiguomptoewgthd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhYW9xaWd1b21wdG9ld2d0aGQiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNDQ5NDIxMywiZXhwIjoyMDUwMDcwMjEzfQ.r8nLcIPSmfnTyzgc8dJwnc6cel6TqyUBGenZRkjA_w'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
