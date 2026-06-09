const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const testRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoutes');
const interviewRoutes = require('./routes/interviewRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/api/test', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'AI Interview Simulator backend', version: '0.1.0' });
});

module.exports = app;
