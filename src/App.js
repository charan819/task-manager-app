import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./services/firebase";
import Login from "./pages/Login";
import KanbanBoard from "./components/KanbanBoard";
import Navbar from "./components/Navbar";

const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <KanbanBoard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
