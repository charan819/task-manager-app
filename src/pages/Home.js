import React from "react";
import { auth, googleProvider } from "../services/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";


const Home = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };


useEffect(() => {
  if (user) {
    navigate("/dashboard");
  }
}, [user, navigate]);


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black dark:bg-gray-900 dark:text-white relative transition-colors duration-300">
  <button
    onClick={handleLogin}
    className="absolute top-4 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md"
  >
    Login
  </button>

  <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100 transition-colors">
    🗂️ Task Manager
  </h1>
  <h2 className="text-xl mb-10 text-gray-700 dark:text-gray-300 transition-colors">
    by Sai Charan Chandra
  </h2>
</div>

  );
};

export default Home;
