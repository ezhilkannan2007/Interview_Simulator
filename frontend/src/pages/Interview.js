import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";

function Interview() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [scores, setScores] = useState([]);

  // 🔹 FETCH GRAPH DATA (UNCHANGED BUT NOT USED)
  const fetchScores = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/interview/history/${user.id}`);
      const data = await res.json();

      console.log("History Data:", data);

      const extractedScores = data.map(item =>
        item.score || item.response_score || item.response?.score || 0
      );

      setScores(extractedScores.slice(-5));

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchScores();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li>Dashboard</li>
          <li onClick={() => window.location.href="/practice"}>Practice</li>
          <li onClick={() => window.location.href="/history"}>History</li>
          <li onClick={() => {
            localStorage.clear();
            window.location.href="/";
          }}>Logout</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* TOPBAR */}
        <div className="topbar glass">

          <h2>Interview Assistant</h2>

          {/* PROFILE */}
          <div className="profile-container">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="profile-hover">
              <p className="profile-name">{user?.name}</p>
              <p className="profile-email">{user?.email}</p>
            </div>
          </div>

        </div>

        {/* CENTER */}
        <div className="center-content">
          <div className="card">

            <h3>Your Weak Topics</h3>

            {/* WEAK TOPICS CARDS */}
            <div style={{display:"flex", gap:"15px", flexWrap:"wrap"}}>

              <div className="weak-card">
                <p>DSA</p>
                <div className="weak-hover">
                  Practice arrays & linked lists regularly
                </div>
              </div>

              <div className="weak-card">
                <p>OS</p>
                <div className="weak-hover">
                  Focus on processes, threads, and scheduling
                </div>
              </div>

              <div className="weak-card">
                <p>DBMS</p>
                <div className="weak-hover">
                  Revise normalization and indexing concepts
                </div>
              </div>

            </div>

            <h3>Start Practice</h3>

            <button onClick={() => window.location.href="/practice"}>
              Go to Practice
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Interview;