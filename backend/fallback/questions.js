// backend/fallback/questions.js (Multi-Department & Detailed Q&A Bank)

const FALLBACK_QUESTIONS = [
  // ── CSE ──
  {
    id: 'fb-cse-1',
    subject: 'CSE', topic: 'Data Structures', concept: 'Arrays', difficulty: 'easy',
    question: 'What is the time complexity of accessing an element in an array by index?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
    correctAnswer: 'C',
    explanation: 'Array index lookup calculates the physical memory offset directly: Address = BaseAddress + (Index * ElementSize). This takes O(1) constant time regardless of array length.',
    keyTakeaway: 'Arrays provide O(1) random access by index due to contiguous memory allocation.'
  },
  {
    id: 'fb-cse-2',
    subject: 'CSE', topic: 'Data Structures', concept: 'Linked List', difficulty: 'medium',
    question: 'Which of the following operations takes O(1) time in a Singly Linked List with a head and tail pointer?',
    options: ['Insertion at head', 'Deletion at tail', 'Searching an element', 'Accessing by index k'],
    correctAnswer: 'A',
    explanation: 'Inserting at head simply updates the new node pointer to head and updates head reference, taking O(1) time. Deleting at tail requires finding the second-to-last node, taking O(n) in singly linked lists.',
    keyTakeaway: 'Insertion at head/tail takes O(1) time in Linked Lists, but accessing by index requires O(n) traversal.'
  },
  {
    id: 'fb-cse-3',
    subject: 'CSE', topic: 'DBMS', concept: 'SQL Queries', difficulty: 'easy',
    question: 'Which SQL clause is used to filter query results AFTER aggregating with GROUP BY?',
    options: ['WHERE', 'HAVING', 'ORDER BY', 'FILTER'],
    correctAnswer: 'B',
    explanation: 'WHERE filters rows before grouping occurs, whereas HAVING filters aggregated groups created by GROUP BY (e.g. HAVING COUNT(*) > 5).',
    keyTakeaway: 'Use WHERE for row filtering and HAVING for aggregated group filtering.'
  },
  {
    id: 'fb-cse-4',
    subject: 'CSE', topic: 'DBMS', concept: 'Normalization', difficulty: 'hard',
    question: 'A table is in 3NF (Third Normal Form) if it is in 2NF and has no:',
    options: ['Multivalued dependencies', 'Transitive dependencies', 'Partial dependencies', 'Redundant rows'],
    correctAnswer: 'B',
    explanation: '3NF removes transitive functional dependencies (X -> Y and Y -> Z => X -> Z, where X is candidate key). Every non-prime attribute must depend directly on a candidate key.',
    keyTakeaway: '3NF eliminates transitive dependencies; 2NF eliminates partial dependencies.'
  },
  {
    id: 'fb-cse-5',
    subject: 'CSE', topic: 'Operating Systems', concept: 'Process Management', difficulty: 'medium',
    question: 'What is a Deadlock condition in Operating Systems?',
    options: ['When a process uses 100% CPU', 'When two or more processes are blocked waiting for resources held by each other', 'When a process terminates abruptly', 'When memory is full'],
    correctAnswer: 'B',
    explanation: 'Deadlock occurs when 4 Coffman conditions hold: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait. Processes freeze infinitely.',
    keyTakeaway: 'Deadlocks require Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait.'
  },

  // ── ECE ──
  {
    id: 'fb-ece-1',
    subject: 'ECE', topic: 'Digital Electronics', concept: 'Logic Gates & Boolean Algebra', difficulty: 'easy',
    question: 'Which logic gate outputs HIGH (1) only when all of its inputs are HIGH (1)?',
    options: ['OR gate', 'NAND gate', 'AND gate', 'XOR gate'],
    correctAnswer: 'C',
    explanation: 'An AND gate evaluates boolean conjunction (Y = A · B). It produces 1 only when A = 1 and B = 1.',
    keyTakeaway: 'AND gate requires all inputs to be 1 for output to be 1.'
  },
  {
    id: 'fb-ece-2',
    subject: 'ECE', topic: 'Digital Electronics', concept: 'Sequential Circuits & Flip-Flops', difficulty: 'medium',
    question: 'Which flip-flop converts the race-around condition of a JK flip-flop into a predictable toggle?',
    options: ['SR Flip-Flop', 'Master-Slave JK Flip-Flop', 'D Flip-Flop', 'T Flip-Flop'],
    correctAnswer: 'B',
    explanation: 'In a standard JK flip-flop, when J=1 & K=1 and clock pulse width is larger than propagation delay, output toggles uncontrollably (race-around). Master-Slave triggers on clock edge to eliminate this.',
    keyTakeaway: 'Master-Slave configuration eliminates the race-around condition in JK flip-flops.'
  },
  {
    id: 'fb-ece-3',
    subject: 'ECE', topic: 'Signals & Systems', concept: 'Fourier Series & Transform', difficulty: 'hard',
    question: 'What is the Fourier Transform of a continuous Dirac Delta function δ(t)?',
    options: ['0', '1', 'δ(f)', 'e^(-jωt)'],
    correctAnswer: 'B',
    explanation: 'The integral of δ(t) · e^(-jωt) dt over (-∞, ∞) equals e^0 = 1. A spike in time domain yields uniform frequency content across all frequencies.',
    keyTakeaway: 'Fourier Transform of a unit impulse δ(t) is constant 1 across all frequencies.'
  },

  // ── EEE ──
  {
    id: 'fb-eee-1',
    subject: 'EEE', topic: 'Circuit Theory', concept: 'Kirchhoff Laws', difficulty: 'easy',
    question: 'Kirchhoff’s Current Law (KCL) is based on the conservation of which fundamental physical quantity?',
    options: ['Energy', 'Charge', 'Momentum', 'Voltage'],
    correctAnswer: 'B',
    explanation: 'KCL states that total current entering a node equals total current leaving it (∑ I = 0), enforcing conservation of electric charge.',
    keyTakeaway: 'KCL enforces Conservation of Charge; KVL enforces Conservation of Energy.'
  },
  {
    id: 'fb-eee-2',
    subject: 'EEE', topic: 'Electrical Machines', concept: 'Transformers', difficulty: 'medium',
    question: 'Why is transformer core laminated in electrical power applications?',
    options: ['To reduce copper losses', 'To reduce eddy current losses', 'To reduce hysteresis losses', 'To increase mechanical strength'],
    correctAnswer: 'B',
    explanation: 'Laminations with insulating varnish break up circulating current loops in the iron core, drastically reducing Eddy Current Losses (P_e ∝ t²).',
    keyTakeaway: 'Laminations reduce eddy current loss; Silicon steel material reduces hysteresis loss.'
  },

  // ── ME ──
  {
    id: 'fb-me-1',
    subject: 'ME', topic: 'Thermodynamics', concept: 'Laws of Thermodynamics', difficulty: 'easy',
    question: 'Which law of thermodynamics defines the concept of Temperature?',
    options: ['Zeroth Law', 'First Law', 'Second Law', 'Third Law'],
    correctAnswer: 'A',
    explanation: 'The Zeroth Law states that if systems A and B are in thermal equilibrium with system C, then A and B are in thermal equilibrium with each other, defining temperature as a scalar property.',
    keyTakeaway: 'Zeroth Law defines Temperature; First Law enforces Energy Conservation.'
  },
  {
    id: 'fb-me-2',
    subject: 'ME', topic: 'Fluid Mechanics', concept: 'Bernoulli Equation', difficulty: 'medium',
    question: 'Bernoulli’s equation represents conservation of energy along a streamline for which type of fluid flow?',
    options: ['Viscous & compressible', 'Inviscid & incompressible', 'Rotational & unsteady', 'Turbulent & compressible'],
    correctAnswer: 'B',
    explanation: 'Bernoulli’s equation (P + 0.5ρv² + ρgh = const) assumes inviscid (zero friction), incompressible (constant density), steady, and irrotational flow.',
    keyTakeaway: 'Bernoulli applies to steady, incompressible, inviscid flow along a streamline.'
  },

  // ── CE ──
  {
    id: 'fb-ce-1',
    subject: 'CE', topic: 'Structural Analysis', concept: 'Trusses & Cables', difficulty: 'easy',
    question: 'In a statically determinate plane truss with m members and j joints, what is the relation between m and j?',
    options: ['m = 2j - 3', 'm = 3j - 2', 'm = j + 3', 'm = 2j + 1'],
    correctAnswer: 'A',
    explanation: 'For a statically determinate plane truss, equilibrium equations at j joints yield 2j equations, minus 3 support reactions: m = 2j - 3.',
    keyTakeaway: 'Plane truss determinacy condition: m = 2j - 3.'
  },
  {
    id: 'fb-ce-2',
    subject: 'CE', topic: 'Structural Analysis', concept: 'Shear Force & Bending Moment', difficulty: 'medium',
    question: 'What is the point called where the Bending Moment changes sign along a beam?',
    options: ['Point of maximum shear', 'Point of contraflexure', 'Neutral axis', 'Yield point'],
    correctAnswer: 'B',
    explanation: 'The point of contraflexure (or inflection) occurs where the bending moment curve crosses zero and changes sign (from sagging to hogging or vice-versa).',
    keyTakeaway: 'Point of contraflexure is where bending moment M = 0 and changes sign.'
  },

  // ── AIDS ──
  {
    id: 'fb-aids-1',
    subject: 'AIDS', topic: 'Machine Learning', concept: 'Supervised Learning', difficulty: 'easy',
    question: 'Which machine learning algorithm is commonly used for Classification problems?',
    options: ['K-Means Clustering', 'Logistic Regression', 'Principal Component Analysis (PCA)', 'Apriori Algorithm'],
    correctAnswer: 'B',
    explanation: 'Logistic Regression uses the sigmoid function σ(z) = 1/(1+e^-z) to map real-valued inputs into probability range [0,1] for binary or multiclass classification.',
    keyTakeaway: 'Logistic Regression is a supervised classification algorithm despite "regression" in its name.'
  },
  {
    id: 'fb-aids-2',
    subject: 'AIDS', topic: 'Deep Learning', concept: 'Artificial Neural Networks', difficulty: 'medium',
    question: 'Which activation function is most widely used in hidden layers of Deep Neural Networks to mitigate Vanishing Gradient?',
    options: ['Sigmoid', 'TanH', 'ReLU (Rectified Linear Unit)', 'Step Function'],
    correctAnswer: 'C',
    explanation: 'ReLU f(x) = max(0, x) has derivative = 1 for x > 0, preventing gradients from shrinking exponentially during backpropagation in deep networks.',
    keyTakeaway: 'ReLU prevents vanishing gradient problem in deep hidden layers.'
  }
];

function getFallback(subject, concept, difficulty) {
  const filtered = FALLBACK_QUESTIONS.filter(q => 
    (!subject || q.subject.toLowerCase() === subject.toLowerCase()) &&
    (!concept || q.concept.toLowerCase() === concept.toLowerCase()) &&
    (!difficulty || q.difficulty.toLowerCase() === difficulty.toLowerCase())
  );

  if (filtered.length > 0) {
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  const subjectFiltered = FALLBACK_QUESTIONS.filter(q => (!subject || q.subject.toLowerCase() === subject.toLowerCase()));
  if (subjectFiltered.length > 0) {
    return subjectFiltered[Math.floor(Math.random() * subjectFiltered.length)];
  }

  return FALLBACK_QUESTIONS[Math.floor(Math.random() * FALLBACK_QUESTIONS.length)];
}

function getAllQuestionsAndAnswers(subject, concept) {
  return FALLBACK_QUESTIONS.filter(q => 
    (!subject || q.subject.toLowerCase() === subject.toLowerCase()) &&
    (!concept || q.concept.toLowerCase() === concept.toLowerCase())
  );
}

module.exports = {
  FALLBACK_QUESTIONS,
  getFallback,
  getAllQuestionsAndAnswers
};
