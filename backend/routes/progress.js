// backend/routes/progress.js
const express = require('express');
const router = express.Router();
const { getSupabase } = require('../services/supabase');

router.get('/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('concept_progress')
        .select('*')
        .eq('student_id', studentId);

      if (!error && data && data.length > 0) {
        return res.json({ conceptProgress: data });
      }
    } catch (e) {
      console.warn('Supabase fetch failed, returning mock/empty');
    }
  }

  // Fallback
  return res.json({ conceptProgress: [] });
});

module.exports = router;
