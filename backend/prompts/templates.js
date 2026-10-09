// backend/prompts/templates.js

function getQuestionPrompt({ subject, topic, concept, difficulty, studentMastery, previousMistakes }) {
  return `
You are an expert AI Educator specializing in Computer Science & Programming.

Generate a high-quality, conceptual multiple-choice question tailored for a student with the following profile:

- Subject: ${subject || 'Programming'}
- Topic: ${topic || 'Arrays'}
- Concept: ${concept || 'Sorting'}
- Targeted Difficulty: ${difficulty || 'medium'}
- Student Mastery Score in this Concept: ${studentMastery || 40}%
- Known Student Weaknesses/Mistakes: ${previousMistakes ? previousMistakes.join(', ') : 'None documented yet'}

RULES:
1. Return ONLY a single valid JSON object. No Markdown formatting, no code block backticks (\`\`\`json).
2. The question must test conceptual understanding or code evaluation for ${concept}.
3. Provide 4 distinct options (A, B, C, D).
4. Provide a thorough, encouraging explanation explaining why the correct option is right and why common misconceptions lead to wrong choices.

JSON SCHEMA:
{
  "question": "Clear, concise question text",
  "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
  "correctAnswer": "A",
  "explanation": "Clear explanation of the concept and why Option A is correct.",
  "subject": "${subject || 'Programming'}",
  "topic": "${topic || 'Arrays'}",
  "concept": "${concept || 'Sorting'}",
  "difficulty": "${difficulty || 'medium'}"
}
`;
}

module.exports = {
  getQuestionPrompt
};
