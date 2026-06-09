// 🔹 LOCAL QUESTIONS (fallback instead of AI)

const QUESTION_BANK = {
  DSA: {
    easy: [
      "What is a stack and how does it work?",
      "Explain difference between array and linked list.",
      "What is time complexity?"
    ],
    medium: [
      "Explain how binary search works.",
      "What is a hash table and collision handling?",
      "Explain recursion with example."
    ],
    hard: [
      "Design LRU Cache.",
      "Explain time complexity of merge sort.",
      "Solve longest substring without repeating characters."
    ]
  }
};

// 🔹 Generate Question
const generateQuestion = async (topic, difficulty) => {
  try {
    const topicData = QUESTION_BANK[topic];

    if (!topicData) return "Topic not found";

    const questions = topicData[difficulty] || topicData["easy"];

    return questions[Math.floor(Math.random() * questions.length)];

  } catch (error) {
    console.error("Question Error:", error);
    return "Failed to generate question";
  }
};

// 🔹 Generate Feedback (OBJECT FORMAT ✅)
const generateFeedback = async (question, answer) => {
  try {
    if (!answer || answer.length < 10) {
      return {
        score: 3,
        feedback: "Answer too short",
        improvement: "Explain more with examples"
      };
    }

    if (answer.length < 50) {
      return {
        score: 6,
        feedback: "Basic answer",
        improvement: "Add more explanation and examples"
      };
    }

    return {
      score: 8,
      feedback: "Good answer",
      improvement: "Add edge cases for better clarity"
    };

  } catch (error) {
    console.error("Feedback Error:", error);
    return {
      score: 0,
      feedback: "Error generating feedback",
      improvement: "Try again"
    };
  }
};

module.exports = {
  generateQuestion,
  generateFeedback
};