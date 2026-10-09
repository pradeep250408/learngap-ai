# LearnGap AI — Personalized Learning Gap Detector 🧠

LearnGap AI is a full-stack, AI-powered web application that continuously analyzes student learning performance, identifies specific knowledge gaps, generates adaptive questions, explains answers tailored to student level, and generates a personalized learning roadmap.

---

## 🚀 Key Features

1. **Adaptive Learning Engine**: Dynamically selects question difficulty (Easy → Medium → Hard → Advanced) based on student performance and accuracy trends.
2. **Scoring & Gap Detection**: Real-time mastery calculation (0–100) using accuracy, consistency, difficulty performance, and recent attempt trends.
3. **AI Question Generation & Explanations**: Integrates with Google Gemini API to generate structured questions and personalized explanations. Features automatic fallback to a 200+ question bank if offline/unconfigured.
4. **Interactive Dashboard**: Features overall mastery metrics, progress trend line chart, topic radar chart, gap list, and AI recommendation card.
5. **Interactive Demo Mode**: Click "Try Demo" to immediately test with sample student data ("Alex") — no API keys or database setup required!
6. **Roadmap & Progress Pages**: Visual node-based learning roadmap, weekly activity heatmaps, and concept-level mastery cards.

---

## 📁 Project Structure

```
learngap-ai/
├── frontend/             # Landing page
│   └── index.html
├── auth.html             # Login & 3-Step Onboarding
├── dashboard.html        # Main Learning Dashboard
├── practice.html         # Adaptive Quiz Interface
├── gaps.html             # Learning Gap Visualization
├── progress.html         # Progress & Analytics Charts
├── roadmap.html          # AI Learning Roadmap
├── profile.html          # Student Profile & Settings
├── css/                  # Modular Vanilla CSS
│   ├── style.css         # Global design tokens, components
│   ├── dashboard.css     # Dashboard & gap layout
│   ├── quiz.css          # Adaptive quiz UI & feedback overlays
│   └── responsive.css    # Mobile responsive design
├── js/                   # Core Logic & Engine
│   ├── config.js         # Configuration & curriculum constants
│   ├── utils.js          # Toasts, loading states, helpers
│   ├── demo.js           # Demo mode & seed student data
│   ├── engine.js         # Adaptive algorithm & scoring engine
│   ├── api.js            # API client with fallback handling
│   ├── quiz.js           # Quiz session manager
│   └── dashboard.js      # Dashboard visualizations
├── backend/              # Node.js + Express API
│   ├── server.js         # Entry point
│   ├── routes/           # API endpoints (questions, attempts, progress)
│   ├── services/         # AI (Gemini), Adaptive, Mastery services
│   ├── prompts/          # AI prompt templates
│   └── fallback/         # Question bank fallback
├── database/             # PostgreSQL / Supabase scripts
│   ├── schema.sql
│   └── seed.sql
├── .env.example
├── package.json
└── README.md
```

---

## 🛠️ Quick Start

### 1. Run in Demo Mode (No setup required)
You can open `frontend/index.html` directly in your browser or serve it with any static server (e.g. `npx serve .` or VS Code Live Server). Click **"Try Demo"** to explore all features using local persistence.

### 2. Run with Node.js Backend

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and optionally set your API keys:
   ```bash
   cp .env.example .env
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open `http://localhost:3001` in your browser.

---

## ⚡ Adaptive Engine Formula

$$\text{masteryScore} = (\text{accuracy} \times 0.50) + (\text{consistency} \times 0.20) + (\text{difficultyPerformance} \times 0.20) + (\text{recentPerformance} \times 0.10)$$

### Mastery Classification
- **90–100**: Mastered ✅
- **75–89**: Strong 💪
- **60–74**: Developing 📈
- **40–59**: Needs Practice ⚠️
- **0–39**: Critical Gap 🔴
