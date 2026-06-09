import React, { useState } from "react";
import "../styles/dashboard.css";

const API = "http://localhost:5000/api/interview";

function Practice() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [interviewIds, setInterviewIds] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔹 START / NEW QUESTION
  const startPractice = async (selectedTopic) => {
    setTopic(selectedTopic);

    const res = await fetch(`${API}/start`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        userId: user.id,
        topic: selectedTopic,
        difficulty: "easy",
        score: 0
      })
    });

    const data = await res.json();

    // Add new question
    setQuestions([...questions, data.question]);
    setAnswers([...answers, ""]);
    setFeedbacks([...feedbacks, ""]);
    setInterviewIds([...interviewIds, data.interviewId]);

    setCurrentIndex(questions.length);
  };

  // 🔹 HANDLE ANSWER CHANGE
  const handleAnswerChange = (value) => {
    const updated = [...answers];
    updated[currentIndex] = value;
    setAnswers(updated);
  };

  // 🔹 SUBMIT ANSWER
  const submitAnswer = async () => {
    const res = await fetch(`${API}/answer`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        interviewId: interviewIds[currentIndex],
        question: questions[currentIndex],
        answer: answers[currentIndex],
        userId: user.id,
        topic
      })
    });

    const data = await res.json();

    const updated = [...feedbacks];
    updated[currentIndex] = data.feedback;
    setFeedbacks(updated);
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li onClick={()=>window.location.href="/interview"}>Dashboard</li>
          <li>Practice</li>
          <li onClick={()=>window.location.href="/history"}>History</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="main">

        <div className="topbar glass">
          <h2>Practice</h2>
        </div>

        <div className="center-content">
          <div className="card">

            {/* SELECT SUBJECT */}
            {!topic && (
              <>
                <h3>Select Subject</h3>

                <button onClick={()=>startPractice("DSA")}>DSA</button>
                <button onClick={()=>startPractice("OS")}>OS</button>
                <button onClick={()=>startPractice("DBMS")}>DBMS</button>
              </>
            )}

            {/* QUESTION VIEW */}
            {questions.length > 0 && (
              <>
                <h3>{topic} Question {currentIndex + 1}</h3>

                <p>{questions[currentIndex]}</p>

                <textarea
                  placeholder="Type your answer..."
                  value={answers[currentIndex]}
                  onChange={(e)=>handleAnswerChange(e.target.value)}
                />

                <button onClick={submitAnswer}>Submit</button>

                {/* FEEDBACK */}
                {feedbacks[currentIndex] && (
                  <div className="feedback">
                    <p>{feedbacks[currentIndex]}</p>
                  </div>
                )}

                {/* NAVIGATION */}
                <div style={{display:"flex", gap:"10px"}}>
                  <button
                    disabled={currentIndex === 0}
                    onClick={()=>setCurrentIndex(currentIndex - 1)}
                  >
                    ⬅ Previous
                  </button>

                  <button onClick={()=>startPractice(topic)}>
                    ➕ New Question
                  </button>

                  <button
                    disabled={currentIndex === questions.length - 1}
                    onClick={()=>setCurrentIndex(currentIndex + 1)}
                  >
                    Next ➡
                  </button>
                </div>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Practice;