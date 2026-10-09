-- ============================================================
-- LearnGap AI — Database Schema (Supabase / PostgreSQL)
-- ============================================================

-- 1. Students Table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  education_level TEXT,
  programming_language TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Questions Table
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT NOT NULL DEFAULT 'Programming',
  topic TEXT NOT NULL,
  concept TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard', 'advanced')),
  question_text TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of 4 options: ["A", "B", "C", "D"]
  correct_answer TEXT NOT NULL,
  explanation TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Attempts Table
CREATE TABLE IF NOT EXISTS attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE SET NULL,
  selected_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_taken INT, -- in seconds
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Concept Progress Table
CREATE TABLE IF NOT EXISTS concept_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  subject TEXT NOT NULL DEFAULT 'Programming',
  topic TEXT NOT NULL,
  concept TEXT NOT NULL,
  mastery_score INT DEFAULT 0 CHECK (mastery_score BETWEEN 0 AND 100),
  accuracy INT DEFAULT 0,
  attempt_count INT DEFAULT 0,
  correct_count INT DEFAULT 0,
  last_attempt_at TIMESTAMPTZ,
  status TEXT DEFAULT 'critical' CHECK (status IN ('mastered', 'strong', 'developing', 'needs', 'critical')),
  UNIQUE(student_id, topic, concept)
);

-- 5. Recommendations Table
CREATE TABLE IF NOT EXISTS recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  concept TEXT NOT NULL,
  recommendation TEXT NOT NULL,
  priority INT DEFAULT 1,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
