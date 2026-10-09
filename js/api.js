/* ============================================================
   api.js — Multi-Department API & Non-Repeating Question Bank
   ============================================================ */

// Comprehensive Question Bank across CSE, ECE, EEE, ME, CE, AIDS
const QUESTION_BANK = [
  // ── CSE: Data Structures ──
  {
    id: 'cse-ds-1',
    subject: 'CSE', topic: 'Data Structures', concept: 'Arrays', difficulty: 'easy',
    question: 'What is the time complexity of accessing an array element by index?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
    correctAnswer: 'C',
    explanation: 'Array index lookup calculates the physical memory offset directly: BaseAddress + (Index * ElementSize). This takes O(1) constant time.'
  },
  {
    id: 'cse-ds-2',
    subject: 'CSE', topic: 'Data Structures', concept: 'Arrays', difficulty: 'medium',
    question: 'In a 2D array matrix[R][C] stored in Row-Major order, how is the offset of matrix[i][j] calculated?',
    options: ['i + j', 'i * C + j', 'j * R + i', '(i + j) * C'],
    correctAnswer: 'B',
    explanation: 'Row-Major ordering stores complete rows sequentially. Moving down i rows skips (i * C) elements, then adding j gets the column position.'
  },
  {
    id: 'cse-ds-3',
    subject: 'CSE', topic: 'Data Structures', concept: 'Linked List', difficulty: 'easy',
    question: 'What is the primary advantage of a Singly Linked List over a contiguous Array?',
    options: ['O(1) random index access', 'Dynamic size with efficient insertion/deletion without shifting', 'Lower memory overhead per element', 'Faster cache locality'],
    correctAnswer: 'B',
    explanation: 'Linked lists allow nodes to be allocated dynamically in non-contiguous memory, enabling O(1) insertion/deletion at known locations without array shifting.'
  },
  {
    id: 'cse-ds-4',
    subject: 'CSE', topic: 'Data Structures', concept: 'Linked List', difficulty: 'medium',
    question: 'Which algorithm technique is optimal for detecting a cycle in a Linked List?',
    options: ['Binary Search', 'Floyd’s Cycle Detection (Tortoise and Hare)', 'Breadth-First Search', 'Divide and Conquer'],
    correctAnswer: 'B',
    explanation: 'Floyd’s algorithm uses two pointers moving at different speeds (slow moves 1 step, fast moves 2 steps). If a cycle exists, they will meet in O(n) time and O(1) space.'
  },
  {
    id: 'cse-ds-5',
    subject: 'CSE', topic: 'Data Structures', concept: 'Stack & Queue', difficulty: 'easy',
    question: 'Which data structure operates on a Last-In, First-Out (LIFO) order?',
    options: ['Queue', 'Stack', 'Array', 'Heap'],
    correctAnswer: 'B',
    explanation: 'A Stack follows LIFO: the last item pushed onto the stack is the first item popped out (like a stack of books).'
  },

  // ── CSE: DBMS ──
  {
    id: 'cse-dbms-1',
    subject: 'CSE', topic: 'DBMS', concept: 'SQL Queries', difficulty: 'easy',
    question: 'Which SQL clause is used to filter query results after aggregating with GROUP BY?',
    options: ['WHERE', 'HAVING', 'ORDER BY', 'FILTER'],
    correctAnswer: 'B',
    explanation: 'WHERE filters rows before grouping, whereas HAVING filters aggregated groups created by GROUP BY.'
  },
  {
    id: 'cse-dbms-2',
    subject: 'CSE', topic: 'DBMS', concept: 'Normalization', difficulty: 'medium',
    question: 'A table is in 3NF (Third Normal Form) if it is in 2NF and has no:',
    options: ['Partial functional dependencies', 'Transitive functional dependencies', 'Multi-valued dependencies', 'Duplicate rows'],
    correctAnswer: 'B',
    explanation: '3NF requires that no non-prime attribute is transitively dependent on the primary key (i.e. A -> B and B -> C).'
  },
  {
    id: 'cse-dbms-3',
    subject: 'CSE', topic: 'DBMS', concept: 'Relational Model', difficulty: 'easy',
    question: 'What is a Primary Key in a relational database?',
    options: ['A key that allows null values', 'A key that uniquely identifies each row and cannot be null', 'Any column with text values', 'A key used only for foreign relations'],
    correctAnswer: 'B',
    explanation: 'A Primary Key uniquely identifies each tuple/row in a relation and strictly forbids NULL values.'
  },

  // ── ECE: Digital Electronics ──
  {
    id: 'ece-de-1',
    subject: 'ECE', topic: 'Digital Electronics', concept: 'Logic Gates & Boolean Algebra', difficulty: 'easy',
    question: 'Which logic gate outputs HIGH (1) only when all of its inputs are HIGH (1)?',
    options: ['OR gate', 'NAND gate', 'AND gate', 'XOR gate'],
    correctAnswer: 'C',
    explanation: 'An AND gate requires all inputs to be true (1) to produce a 1 output.'
  },
  {
    id: 'ece-de-2',
    subject: 'ECE', topic: 'Digital Electronics', concept: 'Combinational Circuits', difficulty: 'medium',
    question: 'How many select lines are required for a 16:1 Multiplexer (MUX)?',
    options: ['2', '3', '4', '8'],
    correctAnswer: 'C',
    explanation: 'A multiplexer with 2^n inputs requires n select lines. Since 2^4 = 16, a 16:1 MUX needs 4 select lines.'
  },
  {
    id: 'ece-de-3',
    subject: 'ECE', topic: 'Digital Electronics', concept: 'Sequential Circuits & Flip-Flops', difficulty: 'medium',
    question: 'What happens in a JK Flip-Flop when both J and K inputs are set to 1?',
    options: ['No change', 'Output is set to 0', 'Output is set to 1', 'Output toggles (complements)'],
    correctAnswer: 'D',
    explanation: 'When J=1 and K=1, the JK Flip-Flop enters the toggle mode, inverting its previous output on every clock pulse.'
  },

  // ── ECE: Signals & Systems ──
  {
    id: 'ece-sig-1',
    subject: 'ECE', topic: 'Signals & Systems', concept: 'Fourier Series & Transform', difficulty: 'medium',
    question: 'The Fourier Transform converts a signal from which domain to which domain?',
    options: ['Time domain to Frequency domain', 'Frequency domain to Spatial domain', 'Laplace domain to Z domain', 'Digital to Analog'],
    correctAnswer: 'A',
    explanation: 'The Fourier Transform decomposes a time-domain signal into its constituent frequency-domain spectral components.'
  },

  // ── EEE: Circuit Theory ──
  {
    id: 'eee-ct-1',
    subject: 'EEE', topic: 'Circuit Theory', concept: 'Kirchhoff Laws', difficulty: 'easy',
    question: 'Kirchhoff’s Current Law (KCL) is based on the conservation of which quantity?',
    options: ['Energy', 'Charge', 'Momentum', 'Voltage'],
    correctAnswer: 'B',
    explanation: 'KCL states that total current entering a junction equals total current leaving it, enforcing conservation of electric charge.'
  },
  {
    id: 'eee-ct-2',
    subject: 'EEE', topic: 'Circuit Theory', concept: 'Network Theorems', difficulty: 'medium',
    question: 'Thevenin’s Theorem replaces any linear two-terminal circuit with:',
    options: ['A single current source in parallel with a resistor', 'A single voltage source in series with an equivalent resistance', 'Two ideal voltage sources', 'A transformer'],
    correctAnswer: 'B',
    explanation: 'Thevenin’s equivalent consists of a single voltage source Vth in series with an equivalent resistance Rth.'
  },

  // ── ME: Thermodynamics ──
  {
    id: 'me-thermo-1',
    subject: 'ME', topic: 'Thermodynamics', concept: 'Laws of Thermodynamics', difficulty: 'easy',
    question: 'Which law of thermodynamics defines the concept of Temperature?',
    options: ['Zeroth Law', 'First Law', 'Second Law', 'Third Law'],
    correctAnswer: 'A',
    explanation: 'The Zeroth Law states that if systems A and B are in thermal equilibrium with C, they are in equilibrium with each other, establishing temperature.'
  },
  {
    id: 'me-thermo-2',
    subject: 'ME', topic: 'Thermodynamics', concept: 'Gas Power Cycles', difficulty: 'medium',
    question: 'The theoretical cycle for spark-ignition (petrol) engines is the:',
    options: ['Diesel Cycle', 'Otto Cycle', 'Rankine Cycle', 'Brayton Cycle'],
    correctAnswer: 'B',
    explanation: 'The Otto Cycle (constant-volume heat addition) is the ideal thermodynamic cycle for spark-ignition internal combustion engines.'
  },

  // ── CE: Structural Analysis ──
  {
    id: 'ce-struct-1',
    subject: 'CE', topic: 'Structural Analysis', concept: 'Trusses & Cables', difficulty: 'easy',
    question: 'In a perfect plane truss with m members and j joints, what is the relation between m and j?',
    options: ['m = 2j - 3', 'm = 3j - 2', 'm = j + 3', 'm = 2j + 1'],
    correctAnswer: 'A',
    explanation: 'For a statically determinate plane truss, the number of members m and joints j satisfy m = 2j - 3.'
  },

  // ── AIDS: Machine Learning ──
  {
    id: 'aids-ml-1',
    subject: 'AIDS', topic: 'Machine Learning', concept: 'Supervised Learning', difficulty: 'easy',
    question: 'Which machine learning algorithm is commonly used for Classification problems?',
    options: ['K-Means Clustering', 'Logistic Regression', 'Principal Component Analysis (PCA)', 'Apriori Algorithm'],
    correctAnswer: 'B',
    explanation: 'Logistic Regression uses a sigmoid function to output probabilities for categorical target variables (classification).'
  },
  {
    id: 'aids-ml-2',
    subject: 'AIDS', topic: 'Machine Learning', concept: 'Overfitting & Regularization', difficulty: 'medium',
    question: 'What is L1 Regularization (Lasso) specifically effective for?',
    options: ['Increasing model capacity', 'Feature selection by driving weights to exactly zero', 'Preventing underfitting', 'Accelerating gradient descent'],
    correctAnswer: 'B',
    explanation: 'L1 regularization adds absolute weight values to the loss function, producing sparse models where unimportant weights become zero.'
  },
  {
    id: 'aids-dl-1',
    subject: 'AIDS', topic: 'Deep Learning', concept: 'Convolutional Neural Networks (CNN)', difficulty: 'medium',
    question: 'What is the primary function of a Pooling layer in a Convolutional Neural Network?',
    options: ['Increase spatial dimensions', 'Downsample feature maps and reduce spatial complexity', 'Apply non-linear activations', 'Compute gradient loss'],
    correctAnswer: 'B',
    explanation: 'Pooling (e.g. Max Pooling) reduces the spatial dimensions (width and height) of feature maps, reducing parameters and computation.'
  }
];

// ── Non-Repeating Question Selector ──
function getUnseenQuestion(subject, concept, difficulty) {
  const seenIds = getSeenQuestionIds();

  // Filter matching subject, concept, and difficulty
  let candidates = QUESTION_BANK.filter(q =>
    (!subject || q.subject === subject) &&
    (!concept || q.concept.toLowerCase() === concept.toLowerCase()) &&
    (!difficulty || q.difficulty.toLowerCase() === difficulty.toLowerCase())
  );

  // Filter out seen questions
  let unseen = candidates.filter(q => !seenIds.includes(q.id));

  // If no unseen matching concept/difficulty, relax difficulty constraint
  if (unseen.length === 0) {
    candidates = QUESTION_BANK.filter(q =>
      (!subject || q.subject === subject) &&
      (!concept || q.concept.toLowerCase() === concept.toLowerCase())
    );
    unseen = candidates.filter(q => !seenIds.includes(q.id));
  }

  // If still empty, relax concept constraint to department/subject
  if (unseen.length === 0) {
    candidates = QUESTION_BANK.filter(q => (!subject || q.subject === subject));
    unseen = candidates.filter(q => !seenIds.includes(q.id));
  }

  // Fallback to any unseen question
  if (unseen.length === 0) {
    unseen = QUESTION_BANK.filter(q => !seenIds.includes(q.id));
  }

  // If ALL questions have been seen, clear history and pick one
  if (unseen.length === 0) {
    clearSeenQuestions();
    unseen = QUESTION_BANK;
  }

  const selected = unseen[Math.floor(Math.random() * unseen.length)];
  recordSeenQuestionId(selected.id);
  return selected;
}

// ── API Client ──
const API = {
  async getNextQuestion(studentId, concept, difficulty, excludeIds = []) {
    const department = getSelectedDepartment();
    
    if (isDemoMode()) {
      await delay(400); // Simulate AI response delay
      return getUnseenQuestion(department, concept, difficulty);
    }

    try {
      const res = await fetchWithTimeout(`${CONFIG.API_BASE}/questions/next`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, department, concept, difficulty, excludeIds }),
      }, 6000);

      if (!res.ok) throw new Error('Backend offline');
      const question = await res.json();
      recordSeenQuestionId(question.id);
      return question;
    } catch {
      return getUnseenQuestion(department, concept, difficulty);
    }
  },

  async submitAttempt(studentId, questionId, selectedAnswer, isCorrect, timeTaken, concept, topic) {
    if (isDemoMode()) {
      await delay(200);
      return { success: true };
    }

    try {
      const res = await fetchWithTimeout(`${CONFIG.API_BASE}/attempts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, questionId, selectedAnswer, isCorrect, timeTaken, concept, topic }),
      }, 5000);
      return await res.json();
    } catch {
      return { success: true };
    }
  },

  async getProgress(studentId) {
    const dept = getSelectedDepartment();
    if (isDemoMode()) {
      return getDemoData(dept);
    }

    try {
      const res = await fetchWithTimeout(`${CONFIG.API_BASE}/progress/${studentId}?department=${dept}`, {}, 5000);
      return await res.json();
    } catch {
      return getDemoData(dept);
    }
  },

  async getRecommendations(studentId) {
    const dept = getSelectedDepartment();
    const data = getDemoData(dept);
    return generateRecommendations(data.conceptProgress);
  }
};

function fetchWithTimeout(url, options = {}, timeout = 6000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
