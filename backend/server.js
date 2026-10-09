// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/attempts', require('./routes/attempts'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/recommendations', require('./routes/recommendations'));

// Fallback to index.html for SPA routing if needed
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
  } else {
    res.status(404).json({ error: 'Endpoint not found' });
  }
});

app.listen(PORT, () => {
  console.log(` LearnGap AI Backend running on http://localhost:${PORT}`);
});
