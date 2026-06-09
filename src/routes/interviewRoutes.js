const express = require('express');
const { startInterview, submitAnswer } = require('../controllers/interviewController');

const router = express.Router();

router.post('/start', startInterview);
router.post('/answer', submitAnswer);

module.exports = router;