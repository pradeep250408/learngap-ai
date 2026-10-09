// backend/services/gemini.js

const { getQuestionPrompt } = require('../prompts/templates');
const { getFallback } = require('../fallback/questions');

async function generateQuestionWithAI(params) {
  const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_key_here') {
    console.log('Gemini API key missing or default, using fallback question bank');
    return getFallback(params.concept, params.difficulty);
  }

  try {
    const promptText = getQuestionPrompt(params);
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) throw new Error('Empty response from Gemini API');

    // Parse JSON
    const parsed = JSON.parse(rawText.replace(/```json/g, '').replace(/```/g, '').trim());

    // Validate structure
    if (!parsed.question || !Array.isArray(parsed.options) || parsed.options.length !== 4 || !parsed.correctAnswer || !parsed.explanation) {
      throw new Error('Invalid JSON structure returned by Gemini');
    }

    parsed.id = `ai-${Date.now()}`;
    return parsed;
  } catch (err) {
    console.error('AI question generation failed:', err.message);
    return getFallback(params.concept, params.difficulty);
  }
}

module.exports = {
  generateQuestionWithAI
};
