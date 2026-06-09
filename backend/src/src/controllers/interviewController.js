const pool = require('../config/db');
const { generateQuestion, generateFeedback } = require('../services/aiService');


// ✅ START INTERVIEW
const startInterview = async (req, res) => {
  const { userId, topic, difficulty, score } = req.body;

  let connection;

  try {
    connection = await pool.getConnection();

    // Save interview
    const [result] = await connection.execute(
      `INSERT INTO interviews (user_id, topic, difficulty, score, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [userId || null, topic, difficulty, score]
    );

    // Generate question
    const question = await generateQuestion(topic, difficulty);

    return res.status(201).json({
      interviewId: result.insertId,
      question,
      difficulty
    });

  } catch (error) {
    console.error('Start interview error:', error);
    return res.status(500).json({ message: 'Unable to start interview' });
  } finally {
    if (connection) connection.release();
  }
};


// ✅ SUBMIT ANSWER
const submitAnswer = async (req, res) => {
  const { interviewId, question, answer, userId, topic } = req.body;

  if (!interviewId || !question || !answer) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  let connection;

  try {
    connection = await pool.getConnection();

    // 🔹 Get feedback object
    const aiFeedback = await generateFeedback(question, answer);

    // 🔹 Save response
    const [result] = await connection.execute(
      `INSERT INTO responses (interview_id, question, answer, feedback, score, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [
        interviewId,
        question,
        answer,
        aiFeedback.feedback,
        aiFeedback.score
      ]
    );

    // 🔥 WEAK TOPIC LOGIC
    if (aiFeedback.score < 5 && userId && topic) {

      const [existing] = await connection.execute(
        `SELECT * FROM weak_topics WHERE user_id = ? AND topic = ?`,
        [userId, topic]
      );

      if (existing.length > 0) {
        // update mistake count
        await connection.execute(
          `UPDATE weak_topics SET mistake_count = mistake_count + 1 WHERE user_id = ? AND topic = ?`,
          [userId, topic]
        );
      } else {
        // insert new weak topic
        await connection.execute(
          `INSERT INTO weak_topics (user_id, topic, mistake_count)
           VALUES (?, ?, 1)`,
          [userId, topic]
        );
      }
    }

    return res.json({
      message: 'Answer evaluated',
      feedback: aiFeedback.feedback,
      score: aiFeedback.score,
      improvement: aiFeedback.improvement,
      responseId: result.insertId
    });

  } catch (error) {
    console.error('Submit answer error:', error);
    return res.status(500).json({ message: 'Unable to evaluate answer' });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  startInterview,
  submitAnswer
};