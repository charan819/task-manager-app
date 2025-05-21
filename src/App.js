import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./services/firebase";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;

  return (
  <Router>
  <Navbar />                     
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
  </Routes>
</Router>
  );
};

export default App;
