import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [user] = useAuthState(auth);

  return user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default Home;
