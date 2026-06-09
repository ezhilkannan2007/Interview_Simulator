import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";

const API = "http://localhost:5000/api/interview";

function History() {
  const [history, setHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`${API}/history/${user.id}`)
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(() => setHistory([]));
  }, []);

  return (
    <div className="dashboard">

      <div className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li onClick={()=>window.location.href="/interview"}>Dashboard</li>
          <li onClick={()=>window.location.href="/practice"}>Practice</li>
          <li>History</li>
        </ul>
      </div>

      <div className="main">

        <div className="topbar glass">
          <h2>History</h2>
        </div>

        <div className="center-content">
          <div className="card">

            <h3>Previous Attempts</h3>

            {history.length === 0 && <p>No data</p>}

            {history.map((item, i) => (
              <div key={i} className="feedback">
                <p><b>Q:</b> {item.question}</p>
                <p><b>Score:</b> {item.score}</p>
                <p><b>Feedback:</b> {item.feedback}</p>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}

export default History;