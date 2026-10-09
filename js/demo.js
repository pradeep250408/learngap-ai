/* ============================================================
   demo.js — Demo Mode: Multi-Department Sample Data
   ============================================================ */

const DEMO_STUDENT = {
  id: 'demo-alex-001',
  name: 'Alex Johnson',
  email: 'alex@demo.learngap.ai',
  department: 'CSE',
  education_level: 'undergraduate',
  programming_language: 'JavaScript',
  experience: 'intermediate',
  interests: ['Data Structures', 'Digital Electronics', 'Machine Learning'],
  created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
  streak: 7,
  totalQuestions: 147,
  totalCorrect: 112,
};

// Seed concept progress for ALL departments
const DEMO_CONCEPT_PROGRESS = [
  // ── CSE (Computer Science) ──
  { subject: 'CSE', topic: 'Data Structures', concept: 'Arrays', mastery_score: 88, accuracy: 88, attempt_count: 20, correct_count: 18, status: 'strong' },
  { subject: 'CSE', topic: 'Data Structures', concept: 'Linked List', mastery_score: 35, accuracy: 35, attempt_count: 10, correct_count: 3, status: 'critical' },
  { subject: 'CSE', topic: 'Data Structures', concept: 'Stack & Queue', mastery_score: 69, accuracy: 69, attempt_count: 10, correct_count: 7, status: 'developing' },
  { subject: 'CSE', topic: 'Data Structures', concept: 'Trees & Graphs', mastery_score: 22, accuracy: 22, attempt_count: 6, correct_count: 1, status: 'critical' },
  { subject: 'CSE', topic: 'Data Structures', concept: 'Hashing', mastery_score: 48, accuracy: 48, attempt_count: 6, correct_count: 3, status: 'needs' },
  
  { subject: 'CSE', topic: 'Operating Systems', concept: 'Process Management', mastery_score: 91, accuracy: 91, attempt_count: 18, correct_count: 17, status: 'mastered' },
  { subject: 'CSE', topic: 'Operating Systems', concept: 'Memory Management', mastery_score: 74, accuracy: 74, attempt_count: 10, correct_count: 7, status: 'developing' },
  { subject: 'CSE', topic: 'Operating Systems', concept: 'Concurrency & Deadlocks', mastery_score: 41, accuracy: 41, attempt_count: 12, correct_count: 5, status: 'needs' },
  { subject: 'CSE', topic: 'Operating Systems', concept: 'File Systems', mastery_score: 82, accuracy: 82, attempt_count: 10, correct_count: 8, status: 'strong' },

  { subject: 'CSE', topic: 'DBMS', concept: 'Relational Model', mastery_score: 95, accuracy: 95, attempt_count: 22, correct_count: 21, status: 'mastered' },
  { subject: 'CSE', topic: 'DBMS', concept: 'SQL Queries', mastery_score: 85, accuracy: 85, attempt_count: 14, correct_count: 12, status: 'strong' },
  { subject: 'CSE', topic: 'DBMS', concept: 'Normalization', mastery_score: 31, accuracy: 31, attempt_count: 16, correct_count: 5, status: 'critical' },
  { subject: 'CSE', topic: 'DBMS', concept: 'Transactions & Indexing', mastery_score: 55, accuracy: 55, attempt_count: 10, correct_count: 5, status: 'needs' },

  { subject: 'CSE', topic: 'Computer Networks', concept: 'OSI Model', mastery_score: 78, accuracy: 78, attempt_count: 12, correct_count: 9, status: 'strong' },
  { subject: 'CSE', topic: 'Computer Networks', concept: 'TCP/IP Protocol', mastery_score: 67, accuracy: 67, attempt_count: 10, correct_count: 7, status: 'developing' },
  { subject: 'CSE', topic: 'Computer Networks', concept: 'IP Addressing & Subnetting', mastery_score: 39, accuracy: 39, attempt_count: 12, correct_count: 4, status: 'critical' },
  { subject: 'CSE', topic: 'Computer Networks', concept: 'Routing Algorithms', mastery_score: 52, accuracy: 52, attempt_count: 8, correct_count: 4, status: 'needs' },

  // ── ECE (Electronics & Communication) ──
  { subject: 'ECE', topic: 'Digital Electronics', concept: 'Logic Gates & Boolean Algebra', mastery_score: 92, accuracy: 92, attempt_count: 14, correct_count: 13, status: 'mastered' },
  { subject: 'ECE', topic: 'Digital Electronics', concept: 'Combinational Circuits', mastery_score: 76, accuracy: 76, attempt_count: 12, correct_count: 9, status: 'strong' },
  { subject: 'ECE', topic: 'Digital Electronics', concept: 'Sequential Circuits & Flip-Flops', mastery_score: 33, accuracy: 33, attempt_count: 15, correct_count: 5, status: 'critical' },
  { subject: 'ECE', topic: 'Digital Electronics', concept: 'Counters & Registers', mastery_score: 58, accuracy: 58, attempt_count: 10, correct_count: 6, status: 'needs' },

  { subject: 'ECE', topic: 'Signals & Systems', concept: 'Continuous & Discrete Signals', mastery_score: 84, accuracy: 84, attempt_count: 12, correct_count: 10, status: 'strong' },
  { subject: 'ECE', topic: 'Signals & Systems', concept: 'Fourier Series & Transform', mastery_score: 42, accuracy: 42, attempt_count: 14, correct_count: 6, status: 'needs' },
  { subject: 'ECE', topic: 'Signals & Systems', concept: 'Laplace Transform', mastery_score: 29, accuracy: 29, attempt_count: 10, correct_count: 3, status: 'critical' },

  { subject: 'ECE', topic: 'Microprocessors', concept: '8085 Architecture', mastery_score: 88, accuracy: 88, attempt_count: 16, correct_count: 14, status: 'strong' },
  { subject: 'ECE', topic: 'Microprocessors', concept: '8086 Instruction Set', mastery_score: 61, accuracy: 61, attempt_count: 10, correct_count: 6, status: 'developing' },
  { subject: 'ECE', topic: 'Microprocessors', concept: 'Interrupt Handling', mastery_score: 45, accuracy: 45, attempt_count: 10, correct_count: 4, status: 'needs' },

  // ── EEE (Electrical & Electronics) ──
  { subject: 'EEE', topic: 'Circuit Theory', concept: 'Kirchhoff Laws', mastery_score: 94, accuracy: 94, attempt_count: 18, correct_count: 17, status: 'mastered' },
  { subject: 'EEE', topic: 'Circuit Theory', concept: 'Network Theorems', mastery_score: 72, accuracy: 72, attempt_count: 12, correct_count: 8, status: 'developing' },
  { subject: 'EEE', topic: 'Circuit Theory', concept: 'AC Circuit Analysis', mastery_score: 38, accuracy: 38, attempt_count: 11, correct_count: 4, status: 'critical' },

  { subject: 'EEE', topic: 'Electrical Machines', concept: 'Transformers', mastery_score: 86, accuracy: 86, attempt_count: 15, correct_count: 13, status: 'strong' },
  { subject: 'EEE', topic: 'Electrical Machines', concept: 'Three-Phase Induction Motors', mastery_score: 54, accuracy: 54, attempt_count: 10, correct_count: 5, status: 'needs' },

  // ── ME (Mechanical Engineering) ──
  { subject: 'ME', topic: 'Thermodynamics', concept: 'Laws of Thermodynamics', mastery_score: 91, accuracy: 91, attempt_count: 20, correct_count: 18, status: 'mastered' },
  { subject: 'ME', topic: 'Thermodynamics', concept: 'Gas Power Cycles', mastery_score: 65, accuracy: 65, attempt_count: 12, correct_count: 8, status: 'developing' },
  { subject: 'ME', topic: 'Thermodynamics', concept: 'Refrigeration Cycles', mastery_score: 34, accuracy: 34, attempt_count: 10, correct_count: 3, status: 'critical' },

  { subject: 'ME', topic: 'Fluid Mechanics', concept: 'Bernoulli Equation', mastery_score: 82, accuracy: 82, attempt_count: 14, correct_count: 11, status: 'strong' },
  { subject: 'ME', topic: 'Fluid Mechanics', concept: 'Viscous Flow in Pipes', mastery_score: 48, accuracy: 48, attempt_count: 10, correct_count: 4, status: 'needs' },

  // ── CE (Civil Engineering) ──
  { subject: 'CE', topic: 'Structural Analysis', concept: 'Trusses & Cables', mastery_score: 89, accuracy: 89, attempt_count: 16, correct_count: 14, status: 'strong' },
  { subject: 'CE', topic: 'Structural Analysis', concept: 'Shear Force & Bending Moment', mastery_score: 75, accuracy: 75, attempt_count: 12, correct_count: 9, status: 'strong' },
  { subject: 'CE', topic: 'Structural Analysis', concept: 'Indeterminate Structures', mastery_score: 36, accuracy: 36, attempt_count: 11, correct_count: 4, status: 'critical' },

  // ── AIDS (AI & Data Science) ──
  { subject: 'AIDS', topic: 'Machine Learning', concept: 'Supervised Learning', mastery_score: 93, accuracy: 93, attempt_count: 20, correct_count: 18, status: 'mastered' },
  { subject: 'AIDS', topic: 'Machine Learning', concept: 'Unsupervised Learning', mastery_score: 79, accuracy: 79, attempt_count: 14, correct_count: 11, status: 'strong' },
  { subject: 'AIDS', topic: 'Machine Learning', concept: 'Overfitting & Regularization', mastery_score: 37, accuracy: 37, attempt_count: 12, correct_count: 4, status: 'critical' },

  { subject: 'AIDS', topic: 'Deep Learning', concept: 'Artificial Neural Networks', mastery_score: 85, accuracy: 85, attempt_count: 15, correct_count: 13, status: 'strong' },
  { subject: 'AIDS', topic: 'Deep Learning', concept: 'Convolutional Neural Networks (CNN)', mastery_score: 51, accuracy: 51, attempt_count: 10, correct_count: 5, status: 'needs' },
  { subject: 'AIDS', topic: 'Deep Learning', concept: 'Recurrent Neural Networks (RNN)', mastery_score: 28, accuracy: 28, attempt_count: 10, correct_count: 2, status: 'critical' },
];

// Activity Feed (Multi-department)
const DEMO_ACTIVITY = [
  { type: 'correct', title: 'Answered "Process Management" question correctly', time: new Date(Date.now() - 1800000).toISOString(), concept: 'Process Management' },
  { type: 'incorrect', title: 'Missed a Subnetting question in Computer Networks', time: new Date(Date.now() - 3600000).toISOString(), concept: 'IP Addressing & Subnetting' },
  { type: 'correct', title: 'Answered "Relational Model" DBMS question correctly', time: new Date(Date.now() - 7200000).toISOString(), concept: 'Relational Model' },
  { type: 'system', title: '🎯 Department switched to Computer Science', time: new Date(Date.now() - 86400000).toISOString(), concept: null },
  { type: 'incorrect', title: 'Missed a Normalization question in DBMS', time: new Date(Date.now() - 90000000).toISOString(), concept: 'Normalization' },
  { type: 'correct', title: 'Answered "Logic Gates" ECE question correctly', time: new Date(Date.now() - 172800000).toISOString(), concept: 'Logic Gates & Boolean Algebra' },
];

const DEMO_STORAGE_KEY = 'learngap_demo_data';

function getDemoData(deptCode) {
  const selectedDept = deptCode || getSelectedDepartment();
  let data = lsGet(DEMO_STORAGE_KEY);
  
  if (!data) {
    data = {
      student: { ...DEMO_STUDENT, department: selectedDept },
      conceptProgress: DEMO_CONCEPT_PROGRESS.map(c => ({ ...c })),
      activity: [...DEMO_ACTIVITY],
      sessionAttempts: [],
      lastUpdated: new Date().toISOString(),
    };
    lsSet(DEMO_STORAGE_KEY, data);
  }

  // Filter progress for selected department
  const filteredProgress = data.conceptProgress.filter(c => c.subject === selectedDept);
  
  return {
    ...data,
    conceptProgress: filteredProgress.length > 0 ? filteredProgress : getDepartmentDefaultProgress(selectedDept),
    allDepartmentProgress: data.conceptProgress
  };
}

function getDepartmentDefaultProgress(deptCode) {
  const deptCurriculum = CURRICULUM[deptCode] || CURRICULUM.CSE;
  const list = [];
  
  Object.entries(deptCurriculum).forEach(([topic, concepts]) => {
    concepts.forEach(concept => {
      list.push({
        subject: deptCode,
        topic,
        concept,
        mastery_score: Math.floor(Math.random() * 50) + 30, // 30–80 initial
        accuracy: 60,
        attempt_count: 5,
        correct_count: 3,
        status: 'developing'
      });
    });
  });
  
  return list;
}

function saveDemoData(data) {
  data.lastUpdated = new Date().toISOString();
  lsSet(DEMO_STORAGE_KEY, data);
}

function resetDemoData() {
  localStorage.removeItem(DEMO_STORAGE_KEY);
  clearSeenQuestions();
  return getDemoData();
}

function computeOverallMastery(conceptProgress) {
  if (!conceptProgress || !conceptProgress.length) return 0;
  const sum = conceptProgress.reduce((acc, c) => acc + c.mastery_score, 0);
  return Math.round(sum / conceptProgress.length);
}

function computeTopicMastery(conceptProgress) {
  const topics = {};
  conceptProgress.forEach(c => {
    if (!topics[c.topic]) topics[c.topic] = [];
    topics[c.topic].push(c.mastery_score);
  });

  return Object.entries(topics).map(([topic, scores]) => ({
    topic,
    mastery: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    color: TOPIC_COLORS[topic] || '#6366f1',
  }));
}

function getWeakestConcepts(conceptProgress, limit = 5) {
  return [...conceptProgress]
    .sort((a, b) => a.mastery_score - b.mastery_score)
    .slice(0, limit);
}

function getStrongestConcepts(conceptProgress, limit = 5) {
  return [...conceptProgress]
    .sort((a, b) => b.mastery_score - a.mastery_score)
    .slice(0, limit);
}

function updateConceptMastery(allProgress, concept, topic, subject, isCorrect, difficulty) {
  let item = allProgress.find(c => c.concept === concept && c.topic === topic);
  if (!item) {
    item = {
      subject: subject || getSelectedDepartment(),
      topic,
      concept,
      mastery_score: 50,
      accuracy: 50,
      attempt_count: 0,
      correct_count: 0,
      status: 'developing'
    };
    allProgress.push(item);
  }

  item.attempt_count++;
  if (isCorrect) item.correct_count++;

  const accuracy = (item.correct_count / item.attempt_count) * 100;
  const difficultyBonus = isCorrect ? (DIFFICULTY_LEVELS[difficulty]?.score || 1) * 2 : 0;
  const recencyWeight = isCorrect ? 6 : -4;

  item.accuracy = Math.round(accuracy);
  item.mastery_score = Math.min(100, Math.max(0, Math.round(
    accuracy * 0.50 +
    (item.attempt_count > 5 ? 15 : item.attempt_count * 3) * 0.20 +
    difficultyBonus * 0.20 +
    recencyWeight * 0.10 +
    item.mastery_score * 0.10
  )));
  item.last_attempt_at = new Date().toISOString();

  const level = getMasteryLevel(item.mastery_score);
  item.status = level.key.toLowerCase();
  return item;
}

// ── Multi-Department Question & Answer Database ──
const DEMO_QUESTIONS_DATABASE = [
  // CSE
  {
    id: 'cse-arr-1',
    subject: 'CSE', topic: 'Data Structures', concept: 'Arrays', difficulty: 'easy',
    question: 'What is the time complexity of accessing an array element by index?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
    correctAnswer: 'C',
    explanation: 'Array index lookup calculates physical memory offset directly: Memory Address = BaseAddress + (Index * ElementSize). This formula executes in O(1) constant time.',
    keyTakeaway: 'Arrays provide O(1) random access by index due to contiguous memory allocation.'
  },
  {
    id: 'cse-arr-2',
    subject: 'CSE', topic: 'Data Structures', concept: 'Arrays', difficulty: 'medium',
    question: 'What is the space complexity of inserting an element into a dynamic array of size N when resizing occurs?',
    options: ['O(1) amortized', 'O(N) space', 'O(N²)', 'O(log N)'],
    correctAnswer: 'A',
    explanation: 'When dynamic array capacity doubles, copying takes O(N) time once in a while. Over N insertions, total work is O(N), giving an average (amortized) cost of O(1) per insertion.',
    keyTakeaway: 'Dynamic array insertion has an amortized O(1) time complexity.'
  },
  {
    id: 'cse-ll-1',
    subject: 'CSE', topic: 'Data Structures', concept: 'Linked List', difficulty: 'easy',
    question: 'Which operation is more efficient in a Singly Linked List compared to an Array?',
    options: ['Random access by index', 'Insertion at the head (beginning)', 'Binary search', 'Memory overhead per node'],
    correctAnswer: 'B',
    explanation: 'Inserting at the head of a linked list involves re-pointing the new node to head (O(1)), whereas inserting at the beginning of an array requires shifting all N elements (O(N)).',
    keyTakeaway: 'Linked lists allow O(1) insertion at head without element shifting.'
  },
  {
    id: 'cse-sql-1',
    subject: 'CSE', topic: 'DBMS', concept: 'SQL Queries', difficulty: 'easy',
    question: 'Which SQL clause is used to filter aggregated query results after GROUP BY?',
    options: ['WHERE', 'HAVING', 'ORDER BY', 'FILTER'],
    correctAnswer: 'B',
    explanation: 'WHERE filters individual rows prior to grouping, while HAVING filters aggregate groups (e.g. HAVING COUNT(*) > 5).',
    keyTakeaway: 'Use WHERE for individual rows and HAVING for aggregated group filters.'
  },

  // ECE
  {
    id: 'ece-gate-1',
    subject: 'ECE', topic: 'Digital Electronics', concept: 'Logic Gates & Boolean Algebra', difficulty: 'easy',
    question: 'Which logic gate produces a HIGH (1) output only when all of its inputs are HIGH (1)?',
    options: ['OR gate', 'NAND gate', 'AND gate', 'XOR gate'],
    correctAnswer: 'C',
    explanation: 'An AND gate performs logical multiplication (Y = A · B). It yields 1 only when A = 1 and B = 1.',
    keyTakeaway: 'AND gate requires all inputs to be 1 for a 1 output.'
  },
  {
    id: 'ece-ff-1',
    subject: 'ECE', topic: 'Digital Electronics', concept: 'Sequential Circuits & Flip-Flops', difficulty: 'medium',
    question: 'How is the race-around condition avoided in a JK flip-flop?',
    options: ['Using a lower supply voltage', 'Using Master-Slave configuration or edge triggering', 'Using an OR gate at input', 'Increasing clock frequency'],
    correctAnswer: 'B',
    explanation: 'When J=1 & K=1, output toggles indefinitely while clock remains high. A Master-Slave structure splits operation into two clock phases so toggle happens exactly once per clock edge.',
    keyTakeaway: 'Master-Slave configuration eliminates the race-around toggling condition.'
  },

  // EEE
  {
    id: 'eee-kcl-1',
    subject: 'EEE', topic: 'Circuit Theory', concept: 'Kirchhoff Laws', difficulty: 'easy',
    question: 'Kirchhoff’s Current Law (KCL) is based on the law of conservation of:',
    options: ['Energy', 'Charge', 'Momentum', 'Voltage'],
    correctAnswer: 'B',
    explanation: 'KCL states that the algebraic sum of currents entering a node equals zero (∑ I = 0). Since current is charge per time (dq/dt), it enforces Conservation of Charge.',
    keyTakeaway: 'KCL enforces Conservation of Charge; KVL enforces Conservation of Energy.'
  },

  // ME
  {
    id: 'me-thermo-1',
    subject: 'ME', topic: 'Thermodynamics', concept: 'Laws of Thermodynamics', difficulty: 'easy',
    question: 'Which law of thermodynamics forms the basis of Temperature measurement?',
    options: ['Zeroth Law', 'First Law', 'Second Law', 'Third Law'],
    correctAnswer: 'A',
    explanation: 'The Zeroth Law states that if systems A and B are in thermal equilibrium with system C, they are in thermal equilibrium with each other, establishing temperature as a measurable property.',
    keyTakeaway: 'Zeroth Law defines Thermal Equilibrium and Temperature.'
  },

  // CE
  {
    id: 'ce-truss-1',
    subject: 'CE', topic: 'Structural Analysis', concept: 'Trusses & Cables', difficulty: 'easy',
    question: 'What is the determinacy relationship between members (m) and joints (j) in a plane truss?',
    options: ['m = 2j - 3', 'm = 3j - 2', 'm = j + 3', 'm = 2j + 1'],
    correctAnswer: 'A',
    explanation: 'In a statically determinate 2D plane truss, 2 equations of equilibrium per joint give 2j total equations. Subtracting 3 support reaction equations gives m = 2j - 3.',
    keyTakeaway: 'Plane truss determinacy equation: m = 2j - 3.'
  },

  // AIDS
  {
    id: 'aids-ml-1',
    subject: 'AIDS', topic: 'Machine Learning', concept: 'Supervised Learning', difficulty: 'easy',
    question: 'Which algorithm is commonly used for binary classification tasks in Supervised Learning?',
    options: ['K-Means Clustering', 'Logistic Regression', 'PCA', 'Apriori'],
    correctAnswer: 'B',
    explanation: 'Logistic Regression uses the sigmoid function σ(z) = 1/(1+e^-z) to squeeze outputs between 0 and 1, representing class probability.',
    keyTakeaway: 'Logistic Regression produces continuous probabilities for categorical classification targets.'
  }
];

function getQuestionsForConcept(conceptName, difficulty, excludeIds = []) {
  const dept = getSelectedDepartment();
  let matches = DEMO_QUESTIONS_DATABASE.filter(q => 
    (!dept || q.subject === dept) &&
    (!conceptName || q.concept.toLowerCase() === conceptName.toLowerCase()) &&
    (!excludeIds.includes(q.id))
  );

  if (!matches.length) {
    matches = DEMO_QUESTIONS_DATABASE.filter(q => (!dept || q.subject === dept) && !excludeIds.includes(q.id));
  }

  if (!matches.length) {
    matches = DEMO_QUESTIONS_DATABASE;
  }

  const selected = matches[Math.floor(Math.random() * matches.length)];
  return { ...selected };
}

function getQuestionsAndAnswersForConcept(subject, conceptName) {
  const dept = subject || getSelectedDepartment();
  let matches = DEMO_QUESTIONS_DATABASE.filter(q => 
    (!dept || q.subject === dept) &&
    (!conceptName || q.concept.toLowerCase() === conceptName.toLowerCase() || q.topic.toLowerCase() === conceptName.toLowerCase())
  );

  if (!matches.length && conceptName) {
    // Dynamic Q&A fallback for any concept in curriculum
    matches = [
      {
        id: `qa-gen-${Date.now()}-1`,
        subject: dept,
        topic: conceptName,
        concept: conceptName,
        difficulty: 'medium',
        question: `What is a primary principle or key mechanism of ${conceptName} in ${DEPARTMENTS[dept] || dept}?`,
        options: [
          `Core structural model and state management for ${conceptName}`,
          `Linear memory allocation only`,
          `Unbounded stack frame expansion`,
          `Asynchronous thread blocking`
        ],
        correctAnswer: 'A',
        explanation: `In ${DEPARTMENTS[dept] || dept}, ${conceptName} provides the foundation for structural data organization, optimizing time complexity and resource efficiency.`,
        keyTakeaway: `${conceptName} requires understanding core functional operations and performance trade-offs.`
      },
      {
        id: `qa-gen-${Date.now()}-2`,
        subject: dept,
        topic: conceptName,
        concept: conceptName,
        difficulty: 'easy',
        question: `Which of the following best describes the primary advantage of mastering ${conceptName}?`,
        options: ['Increases algorithmic efficiency and system accuracy', 'Eliminates all runtime memory usage', 'Disables hardware interrupt handling', 'Replaces relational database schemas'],
        correctAnswer: 'A',
        explanation: `Mastering ${conceptName} improves accuracy and algorithmic efficiency during real-world engineering problem solving.`,
        keyTakeaway: `Key focus area: practice core properties of ${conceptName} to build concept mastery.`
      }
    ];
  }

  if (!matches.length) {
    matches = DEMO_QUESTIONS_DATABASE.filter(q => !dept || q.subject === dept);
  }

  return matches;
}


