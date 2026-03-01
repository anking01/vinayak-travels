import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://rzmgfgrvlzqtchcegbac.supabase.co'
const SUPABASE_KEY = 'sb_publishable_vpfR2aUJvuubZVicsHQGdA_cA91O5qK'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
