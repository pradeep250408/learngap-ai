/* ============================================================
   config.js — App Configuration & Constants (Multi-Department)
   ============================================================ */

const CONFIG = {
  APP_NAME: 'LearnGap AI',
  VERSION: '2.0.0',
  API_BASE: window.location.hostname === 'localhost' ? 'http://localhost:3001/api' : '/api',
  DEMO_MODE_KEY: 'learngap_demo_mode',
  SESSION_KEY: 'learngap_session',
  DEMO_PARAM: 'demo',
  DEPT_KEY: 'learngap_selected_department',
  SEEN_QUESTIONS_KEY: 'learngap_seen_questions',
};

// Mastery level thresholds
const MASTERY_LEVELS = {
  MASTERED:   { min: 90, max: 100, label: 'Mastered',       color: '#22c55e', badgeClass: 'badge-mastered',   barClass: 'bar-mastered',   icon: '✅' },
  STRONG:     { min: 75, max: 89,  label: 'Strong',          color: '#3b82f6', badgeClass: 'badge-strong',     barClass: 'bar-strong',     icon: '💪' },
  DEVELOPING: { min: 60, max: 74,  label: 'Developing',      color: '#eab308', badgeClass: 'badge-developing', barClass: 'bar-developing', icon: '📈' },
  NEEDS:      { min: 40, max: 59,  label: 'Needs Practice',  color: '#f97316', badgeClass: 'badge-needs',      barClass: 'bar-needs',      icon: '⚠️' },
  CRITICAL:   { min: 0,  max: 39,  label: 'Critical Gap',    color: '#ef4444', badgeClass: 'badge-critical',   barClass: 'bar-critical',   icon: '🔴' },
};

const DIFFICULTY_LEVELS = {
  easy:     { label: 'Easy',     badgeClass: 'badge-easy',     color: '#16a34a', score: 1 },
  medium:   { label: 'Medium',   badgeClass: 'badge-medium',   color: '#92400e', score: 2 },
  hard:     { label: 'Hard',     badgeClass: 'badge-hard',     color: '#b91c1c', score: 3 },
  advanced: { label: 'Advanced', badgeClass: 'badge-advanced', color: '#6d28d9', score: 4 },
};

// Engineering Departments List
const DEPARTMENTS = {
  CSE: 'Computer Science & Engineering',
  ECE: 'Electronics & Communication',
  EEE: 'Electrical & Electronics',
  ME: 'Mechanical Engineering',
  CE: 'Civil Engineering',
  AIDS: 'AI & Data Science',
};

// Complete Engineering Curriculum Structure
const CURRICULUM = {
  CSE: {
    'Data Structures': ['Arrays', 'Linked List', 'Stack & Queue', 'Trees & Graphs', 'Hashing'],
    'Operating Systems': ['Process Management', 'Memory Management', 'Concurrency & Deadlocks', 'File Systems'],
    'DBMS': ['Relational Model', 'SQL Queries', 'Normalization', 'Transactions & Indexing'],
    'Computer Networks': ['OSI Model', 'TCP/IP Protocol', 'IP Addressing & Subnetting', 'Routing Algorithms'],
    'Programming & OOP': ['Variables & Control Flow', 'Functions & Recursion', 'Classes & Inheritance', 'Polymorphism'],
  },
  ECE: {
    'Digital Electronics': ['Logic Gates & Boolean Algebra', 'Combinational Circuits', 'Sequential Circuits & Flip-Flops', 'Counters & Registers'],
    'Signals & Systems': ['Continuous & Discrete Signals', 'Fourier Series & Transform', 'Laplace Transform', 'Z-Transform'],
    'Microprocessors': ['8085 Architecture', '8086 Instruction Set', 'Memory Interfacing', 'Interrupt Handling'],
    'Analog Circuits': ['Diode Circuits', 'BJT & MOSFET Amplifiers', 'Op-Amps & Oscillators', 'Filters'],
    'Communication Systems': ['Amplitude Modulation', 'Frequency Modulation', 'Digital Modulation (ASK/FSK/PSK)', 'Noise & SNR'],
  },
  EEE: {
    'Circuit Theory': ['Kirchhoff Laws', 'Network Theorems', 'AC Circuit Analysis', 'Transient Response'],
    'Electrical Machines': ['Transformers', 'DC Machines', 'Three-Phase Induction Motors', 'Synchronous Machines'],
    'Control Systems': ['Transfer Functions', 'Time Domain Analysis', 'Frequency Response & Bode Plot', 'Stability & Routh-Hurwitz'],
    'Power Systems': ['Transmission Line Parameters', 'Fault Analysis', 'Load Flow Studies', 'Power System Protection'],
    'Power Electronics': ['Power Semiconductor Devices', 'Phase Controlled Rectifiers', 'Inverters', 'DC-DC Choppers'],
  },
  ME: {
    'Thermodynamics': ['Laws of Thermodynamics', 'Properties of Pure Substances', 'Gas Power Cycles', 'Refrigeration Cycles'],
    'Fluid Mechanics': ['Fluid Properties & Statics', 'Bernoulli Equation', 'Viscous Flow in Pipes', 'Dimensional Analysis'],
    'Strength of Materials': ['Stress & Strain', 'Bending & Shear Stress', 'Torsion of Shafts', 'Deflection of Beams'],
    'Theory of Machines': ['Kinematic Pairs & Linkages', 'Gears & Gear Trains', 'Flywheels & Governors', 'Mechanical Vibrations'],
    'Manufacturing Tech': ['Casting Processes', 'Metal Forming', 'Machining Operations', 'Welding & Joining'],
  },
  CE: {
    'Structural Analysis': ['Trusses & Cables', 'Shear Force & Bending Moment', 'Stiffness & Flexibility Methods', 'Indeterminate Structures'],
    'Geotechnical Engg': ['Soil Classification', 'Permeability & Seepage', 'Consolidation & Shear Strength', 'Foundation Design'],
    'Surveying': ['Chain & Compass Surveying', 'Leveling & Contouring', 'Total Station & GPS', 'Theodolite Surveying'],
    'Transportation Engg': ['Geometric Design of Highways', 'Pavement Design', 'Traffic Engineering', 'Railway Engineering'],
    'Environmental Engg': ['Water Quality & Treatment', 'Wastewater Treatment', 'Air Pollution Control', 'Solid Waste Management'],
  },
  AIDS: {
    'Machine Learning': ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation & Metrics', 'Overfitting & Regularization'],
    'Python Data Science': ['NumPy & Pandas', 'Data Preprocessing', 'Data Visualization (Matplotlib/Seaborn)', 'Exploratory Data Analysis'],
    'Deep Learning': ['Artificial Neural Networks', 'Convolutional Neural Networks (CNN)', 'Recurrent Neural Networks (RNN)', 'Optimizers & Loss Functions'],
    'NLP': ['Text Preprocessing & Tokenization', 'TF-IDF & Word Embeddings', 'Sequence Models', 'Sentiment Analysis'],
    'Computer Vision': ['Image Filtering & Edge Detection', 'Feature Extraction', 'Object Detection', 'Image Segmentation'],
  }
};

// Topic Icons
const TOPIC_ICONS = {
  // CSE
  'Data Structures': '🌐', 'Operating Systems': '💻', 'DBMS': '🗄️', 'Computer Networks': '📡', 'Programming & OOP': '⚙️',
  // ECE
  'Digital Electronics': '🔌', 'Signals & Systems': '📉', 'Microprocessors': '🎛️', 'Analog Circuits': '🔋', 'Communication Systems': '📻',
  // EEE
  'Circuit Theory': '⚡', 'Electrical Machines': '⚙️', 'Control Systems': '🎛️', 'Power Systems': '🏭', 'Power Electronics': '💡',
  // ME
  'Thermodynamics': '🔥', 'Fluid Mechanics': '🌊', 'Strength of Materials': '🏗️', 'Theory of Machines': '⚙️', 'Manufacturing Tech': '🛠️',
  // CE
  'Structural Analysis': '🏛️', 'Geotechnical Engg': '🧱', 'Surveying': '📐', 'Transportation Engg': '🛣️', 'Environmental Engg': '🌱',
  // AIDS
  'Machine Learning': '🤖', 'Python Data Science': '🐍', 'Deep Learning': '🧠', 'NLP': '💬', 'Computer Vision': '👁️',
};

const TOPIC_COLORS = {
  'Data Structures': 'icon-indigo', 'Operating Systems': 'icon-blue', 'DBMS': 'icon-amber', 'Computer Networks': 'icon-purple', 'Programming & OOP': 'icon-green',
  'Digital Electronics': 'icon-blue', 'Signals & Systems': 'icon-purple', 'Microprocessors': 'icon-amber', 'Analog Circuits': 'icon-orange', 'Communication Systems': 'icon-indigo',
  'Circuit Theory': 'icon-amber', 'Electrical Machines': 'icon-blue', 'Control Systems': 'icon-purple', 'Power Systems': 'icon-red', 'Power Electronics': 'icon-orange',
  'Thermodynamics': 'icon-red', 'Fluid Mechanics': 'icon-blue', 'Strength of Materials': 'icon-amber', 'Theory of Machines': 'icon-purple', 'Manufacturing Tech': 'icon-green',
  'Structural Analysis': 'icon-indigo', 'Geotechnical Engg': 'icon-amber', 'Surveying': 'icon-green', 'Transportation Engg': 'icon-blue', 'Environmental Engg': 'icon-purple',
  'Machine Learning': 'icon-purple', 'Python Data Science': 'icon-green', 'Deep Learning': 'icon-indigo', 'NLP': 'icon-amber', 'Computer Vision': 'icon-blue',
};

function getMasteryLevel(score) {
  for (const [key, level] of Object.entries(MASTERY_LEVELS)) {
    if (score >= level.min && score <= level.max) return { key, ...level };
  }
  return { key: 'CRITICAL', ...MASTERY_LEVELS.CRITICAL };
}

function getSelectedDepartment() {
  return localStorage.getItem(CONFIG.DEPT_KEY) || 'CSE';
}

function setSelectedDepartment(deptCode) {
  if (DEPARTMENTS[deptCode]) {
    localStorage.setItem(CONFIG.DEPT_KEY, deptCode);
  }
}

function isDemoMode() {
  const params = new URLSearchParams(window.location.search);
  return params.get(CONFIG.DEMO_PARAM) === 'true' || localStorage.getItem(CONFIG.DEMO_MODE_KEY) === 'true';
}

function setDemoMode(val) {
  localStorage.setItem(CONFIG.DEMO_MODE_KEY, val ? 'true' : 'false');
}

function getSession() {
  try { return JSON.parse(localStorage.getItem(CONFIG.SESSION_KEY)) || null; }
  catch { return null; }
}

function setSession(data) {
  localStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify(data));
}

function clearSession() {
  localStorage.removeItem(CONFIG.SESSION_KEY);
  localStorage.removeItem(CONFIG.DEMO_MODE_KEY);
}

// Question Deduplication Tracking
function getSeenQuestionIds() {
  try { return JSON.parse(localStorage.getItem(CONFIG.SEEN_QUESTIONS_KEY)) || []; }
  catch { return []; }
}

function recordSeenQuestionId(id) {
  if (!id) return;
  const seen = getSeenQuestionIds();
  if (!seen.includes(id)) {
    seen.push(id);
    localStorage.setItem(CONFIG.SEEN_QUESTIONS_KEY, JSON.stringify(seen));
  }
}

function clearSeenQuestions() {
  localStorage.removeItem(CONFIG.SEEN_QUESTIONS_KEY);
}
