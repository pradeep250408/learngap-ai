// backend/routes/recommendations.js
const express = require('express');
const router = express.Router();

router.get('/:studentId', (req, res) => {
  res.json([
    {
      concept: 'Sorting',
      topic: 'Arrays',
      accuracy: 31,
      reason: 'Your recent accuracy is 31%.',
      mistakes: ['Bubble Sort logic', 'Comparing adjacent elements', 'Loop boundaries'],
      sequence: [
        'Review sorting fundamentals',
        'Solve 3 easy questions',
        'Solve 3 medium questions',
        'Attempt one challenge problem'
      ]
    }
  ]);
});

module.exports = router;
