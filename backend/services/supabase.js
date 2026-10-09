// backend/services/supabase.js

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Lazy initialization or mock fallback if Supabase credentials are missing
let supabaseClient = null;

function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_url_here') {
    return null;
  }

  if (!supabaseClient) {
    try {
      const { createClient } = require('@supabase/supabase-js');
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    } catch (e) {
      console.warn('@supabase/supabase-js not loaded or credentials default');
      supabaseClient = null;
    }
  }

  return supabaseClient;
}

module.exports = {
  getSupabase
};
