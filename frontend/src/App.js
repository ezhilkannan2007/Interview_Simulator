import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Interview from "./pages/Interview";
import Practice from "./pages/Practice";
import History from "./pages/History";

function App() {
  const path = window.location.pathname;

  if (path === "/signup") return <Signup />;
  if (path === "/interview") return <Interview />;
  if (path === "/practice") return <Practice />;
  if (path === "/history") return <History />;

  return <Login />;
}

export default App;