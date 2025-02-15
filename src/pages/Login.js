import React from "react";
import { auth, googleProvider } from "../services/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/"); // Redirect to home after login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Task Manager</h1>
      <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded">
        Login with Google
      </button>
    </div>
  );
};

export default Login;
