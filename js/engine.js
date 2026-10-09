/* ============================================================
   engine.js — Adaptive Learning Engine (Multi-Department)
   ============================================================ */

function calculateMasteryScore({ accuracy, attemptCount, correctCount, difficultyHistory = [], recentAttempts = [] }) {
  const accuracyScore = accuracy;
  const consistencyScore = Math.min(100, attemptCount * 5);

  let difficultyScore = 50;
  if (difficultyHistory.length > 0) {
    const weightedCorrect = difficultyHistory.reduce((sum, attempt) => {
      const weight = DIFFICULTY_LEVELS[attempt.difficulty]?.score || 1;
      return sum + (attempt.isCorrect ? weight * 25 : 0);
    }, 0);
    const maxWeight = difficultyHistory.reduce((sum, a) => sum + (DIFFICULTY_LEVELS[a.difficulty]?.score || 1) * 25, 0);
    difficultyScore = maxWeight > 0 ? Math.min(100, (weightedCorrect / maxWeight) * 100) : 50;
  }

  let recentScore = 50;
  if (recentAttempts.length > 0) {
    const last5 = recentAttempts.slice(-5);
    recentScore = (last5.filter(a => a.isCorrect).length / last5.length) * 100;
  }

  return Math.min(100, Math.max(0, Math.round(
    accuracyScore   * 0.50 +
    consistencyScore * 0.20 +
    difficultyScore  * 0.20 +
    recentScore      * 0.10
  )));
}

function getNextDifficulty(mastery, recentResults = []) {
  const last3 = recentResults.slice(-3);
  const allCorrect = last3.length >= 3 && last3.every(r => r.isCorrect);
  const allWrong   = last3.length >= 2 && last3.every(r => !r.isCorrect);

  if (mastery < 40) {
    return allWrong ? 'easy' : 'easy';
  } else if (mastery < 60) {
    if (allCorrect) return 'medium';
    if (allWrong)   return 'easy';
    return 'easy';
  } else if (mastery < 75) {
    if (allCorrect) return 'hard';
    if (allWrong)   return 'easy';
    return 'medium';
  } else if (mastery < 90) {
    if (allCorrect) return 'hard';
    if (allWrong)   return 'medium';
    return 'medium';
  } else {
    if (allCorrect) return 'advanced';
    return 'hard';
  }
}

function getPrioritizedConcepts(conceptProgress, sessionHistory = []) {
  const now = Date.now();

  return [...conceptProgress]
    .map(concept => {
      const masteryScore = concept.mastery_score;
      const lastAttempt  = concept.last_attempt_at ? new Date(concept.last_attempt_at).getTime() : 0;
      const hoursSinceLast = (now - lastAttempt) / 3600000;

      const urgency = 100 - masteryScore;
      const freshnessBonus = Math.min(20, hoursSinceLast * 0.5);
      const spacedBonus = (masteryScore >= 40 && masteryScore <= 70) ? 10 : 0;

      return {
        ...concept,
        priority: urgency + freshnessBonus + spacedBonus,
      };
    })
    .sort((a, b) => b.priority - a.priority);
}

function selectNextConcept(conceptProgress, sessionHistory = []) {
  if (!conceptProgress || !conceptProgress.length) return null;
  const prioritized = getPrioritizedConcepts(conceptProgress, sessionHistory);

  const recentConcepts = sessionHistory.slice(-3).map(h => h.concept);
  const topConcept = prioritized[0];
  const altConcept = prioritized.find(c => !recentConcepts.includes(c.concept));

  const lastThree = recentConcepts.filter(c => c === topConcept?.concept);
  if (lastThree.length >= 3 && altConcept) return altConcept;

  return topConcept || prioritized[0];
}

class AdaptiveSession {
  constructor(studentId, conceptProgress) {
    this.studentId = studentId;
    this.conceptProgress = conceptProgress || [];
    this.sessionHistory = [];
    this.questionsSeen = new Set();
    this.consecutiveCorrect = 0;
    this.consecutiveWrong = 0;
    this.sessionStart = Date.now();
  }

  getCurrentConcept() {
    return selectNextConcept(this.conceptProgress, this.sessionHistory);
  }

  getCurrentDifficulty(concept) {
    const progress = this.conceptProgress.find(c => c.concept === concept?.concept);
    const recentForConcept = this.sessionHistory
      .filter(h => h.concept === concept?.concept)
      .slice(-3);
    return getNextDifficulty(progress?.mastery_score || 50, recentForConcept);
  }

  recordAnswer(concept, topic, isCorrect, difficulty, questionId) {
    this.questionsSeen.add(questionId);
    this.sessionHistory.push({ concept, topic, isCorrect, difficulty, questionId, timestamp: Date.now() });

    if (isCorrect) {
      this.consecutiveCorrect++;
      this.consecutiveWrong = 0;
    } else {
      this.consecutiveCorrect = 0;
      this.consecutiveWrong++;
    }

    if (isDemoMode()) {
      const currentDept = getSelectedDepartment();
      const demoData = getDemoData(currentDept);
      const updatedItem = updateConceptMastery(demoData.allDepartmentProgress || demoData.conceptProgress, concept, topic, currentDept, isCorrect, difficulty);

      demoData.activity.unshift({
        type: isCorrect ? 'correct' : 'incorrect',
        title: isCorrect
          ? `Answered "${concept}" question correctly`
          : `Missed a ${concept} question`,
        time: new Date().toISOString(),
        concept,
      });
      if (demoData.activity.length > 20) demoData.activity = demoData.activity.slice(0, 20);

      saveDemoData(demoData);
      this.conceptProgress = demoData.conceptProgress.filter(c => c.subject === currentDept);
    }
  }

  getGapAlert() {
    if (this.consecutiveWrong >= 2) {
      const current = this.getCurrentConcept();
      return {
        show: true,
        concept: current?.concept,
        message: `Learning gap detected in ${current?.concept}. System is adjusting question difficulty.`,
      };
    }
    return { show: false };
  }

  getImprovementAlert() {
    if (this.consecutiveCorrect >= 2) {
      return {
        show: true,
        message: 'Great progress! Increasing difficulty for higher mastery.',
      };
    }
    return { show: false };
  }

  getStats() {
    const total = this.sessionHistory.length;
    const correct = this.sessionHistory.filter(h => h.isCorrect).length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { total, correct, incorrect: total - correct, accuracy };
  }

  getMasteryUpdates() {
    const conceptsUpdated = [...new Set(this.sessionHistory.map(h => h.concept))];
    return conceptsUpdated.map(concept => {
      const progress = this.conceptProgress.find(c => c.concept === concept);
      const attempts = this.sessionHistory.filter(h => h.concept === concept);
      const correct = attempts.filter(a => a.isCorrect).length;
      const change = correct > 0 ? Math.round((correct / attempts.length) * 12) : -6;
      return { concept, score: progress?.mastery_score || 0, change };
    });
  }
}

function generateRecommendations(conceptProgress) {
  if (!conceptProgress || !conceptProgress.length) return [];
  const weakest = getWeakestConcepts(conceptProgress, 3);

  return weakest.map((concept, idx) => {
    const level = getMasteryLevel(concept.mastery_score);
    const sequence = [];

    if (concept.mastery_score < 40) {
      sequence.push(`Review ${concept.concept} core concepts`);
      sequence.push('Solve 3 easy practice questions');
      sequence.push('Solve 3 medium practice questions');
    } else if (concept.mastery_score < 60) {
      sequence.push(`Target common ${concept.concept} misconceptions`);
      sequence.push('Solve 3 medium practice questions');
      sequence.push('Attempt 1 challenge problem');
    } else {
      sequence.push(`Reinforce ${concept.concept} with advanced problems`);
    }

    return {
      concept: concept.concept,
      topic: concept.topic,
      accuracy: concept.accuracy,
      mastery: concept.mastery_score,
      level,
      priority: idx + 1,
      sequence,
      reason: level.key === 'CRITICAL'
        ? `Your accuracy is ${concept.accuracy}% — this is a critical gap for your department.`
        : `Your accuracy is ${concept.accuracy}% — practice to increase mastery.`,
    };
  });
}

function generateRoadmap(conceptProgress) {
  if (!conceptProgress || !conceptProgress.length) return [];
  const dept = getSelectedDepartment();
  const deptCurriculum = CURRICULUM[dept] || CURRICULUM.CSE;
  const roadmap = [];

  Object.keys(deptCurriculum).forEach(topic => {
    const concepts = conceptProgress.filter(c => c.topic === topic);
    const topicMastery = concepts.length
      ? Math.round(concepts.reduce((a, b) => a + b.mastery_score, 0) / concepts.length)
      : 0;

    let status, nodeClass;
    if (topicMastery >= 90) { status = 'mastered'; nodeClass = 'mastered'; }
    else if (topicMastery >= 60) { status = 'in-progress'; nodeClass = 'in-progress'; }
    else if (topicMastery >= 30) { status = 'needs'; nodeClass = 'needs'; }
    else { status = 'upcoming'; nodeClass = 'upcoming'; }

    const icons = { mastered: '✅', 'in-progress': '🟡', needs: '🔴', upcoming: '⚪' };
    roadmap.push({ topic, mastery: topicMastery, status, nodeClass, icon: icons[status], concepts });
  });

  return roadmap;
}
