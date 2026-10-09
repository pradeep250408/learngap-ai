// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { getSupabase } = require('../services/supabase');

router.post('/register', async (req, res) => {
  const { name, email, password, education_level, experience, programming_language, interests } = req.body;
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, education_level, experience, programming_language, interests }
        }
      });
      if (error) throw error;
      return res.json({ id: data.user.id, email, name, ...data.user.user_metadata });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Fallback demo user response
  return res.json({
    id: 'user-' + Date.now(),
    name,
    email,
    education_level,
    experience,
    programming_language,
    interests,
    created_at: new Date().toISOString()
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return res.json({ id: data.user.id, email, name: data.user.user_metadata?.name || 'Student' });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Fallback
  return res.json({
    id: 'demo-alex-001',
    name: 'Alex Johnson',
    email,
    isDemo: false
  });
});

module.exports = router;
