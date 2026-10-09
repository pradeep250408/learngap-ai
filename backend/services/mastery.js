// backend/services/mastery.js

function calculateMasteryScore({ accuracy, attemptCount, correctCount, difficultyPerformance = 50, recentPerformance = 50 }) {
  // Formula: accuracy * 0.50 + consistency * 0.20 + difficultyPerformance * 0.20 + recentPerformance * 0.10
  const consistency = Math.min(100, attemptCount * 5);
  
  const score = Math.round(
    (accuracy * 0.50) +
    (consistency * 0.20) +
    (difficultyPerformance * 0.20) +
    (recentPerformance * 0.10)
  );

  return Math.min(100, Math.max(0, score));
}

function classifyMastery(score) {
  if (score >= 90) return 'Mastered';
  if (score >= 75) return 'Strong';
  if (score >= 60) return 'Developing';
  if (score >= 40) return 'Needs Practice';
  return 'Critical Gap';
}

module.exports = {
  calculateMasteryScore,
  classifyMastery
};
