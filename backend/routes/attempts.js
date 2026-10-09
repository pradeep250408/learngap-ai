// backend/routes/attempts.js
const express = require('express');
const router = express.Router();
const { getSupabase } = require('../services/supabase');

router.post('/', async (req, res) => {
  const { studentId, questionId, selectedAnswer, isCorrect, timeTaken, concept, topic } = req.body;
  const supabase = getSupabase();

  if (supabase) {
    try {
      await supabase.from('attempts').insert([{
        student_id: studentId,
        question_id: questionId,
        selected_answer: selectedAnswer,
        is_correct: isCorrect,
        time_taken: timeTaken
      }]);
    } catch (err) {
      console.error('Supabase insert failed:', err.message);
    }
  }

  res.json({ success: true });
});

module.exports = router;
