// backend/routes/questions.js
const express = require('express');
const router = express.Router();
const { getNextAdaptiveQuestion } = require('../services/adaptive');

router.post('/next', async (req, res) => {
  try {
    const { studentId, concept, difficulty, excludeIds } = req.body;
    const question = await getNextAdaptiveQuestion({ studentId, concept, difficulty, excludeIds });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
