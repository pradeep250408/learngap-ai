-- ============================================================
-- LearnGap AI — Seed Data (Demo Student Alex)
-- ============================================================

-- Insert Demo Student Alex
INSERT INTO students (id, name, email, education_level, programming_language)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Alex Johnson',
  'alex@demo.learngap.ai',
  'undergraduate',
  'JavaScript'
) ON CONFLICT (email) DO NOTHING;

-- Insert Initial Concept Progress for Alex
INSERT INTO concept_progress (student_id, topic, concept, mastery_score, accuracy, attempt_count, correct_count, status)
VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Arrays', 'Array Basics', 88, 88, 20, 18, 'strong'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Arrays', 'Traversal', 72, 72, 15, 11, 'developing'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Arrays', 'Sorting', 31, 31, 16, 5, 'critical'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Arrays', '2D Arrays', 42, 42, 10, 4, 'needs'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Loops', 'For Loop', 95, 95, 22, 21, 'mastered'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Functions', 'Recursion', 44, 44, 14, 6, 'needs')
ON CONFLICT (student_id, topic, concept) DO NOTHING;
