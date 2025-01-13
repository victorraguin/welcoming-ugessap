// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || ''

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
)
