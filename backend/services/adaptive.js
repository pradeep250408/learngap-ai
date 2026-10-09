// backend/services/adaptive.js

const { getFallback } = require('../fallback/questions');
const { generateQuestionWithAI } = require('./gemini');

async function getNextAdaptiveQuestion({ studentId, concept, difficulty, excludeIds = [] }) {
  // If concept is provided, try generating an AI question or fallback
  const question = await generateQuestionWithAI({
    concept,
    difficulty: difficulty || 'medium',
    studentMastery: 40
  });

  return question;
}

module.exports = {
  getNextAdaptiveQuestion
};
