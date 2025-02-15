import React from "react";
import KanbanBoard from "../components/KanbanBoard"; // ✅ Correct import path!
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />; // Redirect to login if not authenticated

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">📌 Task Dashboard</h1>
      <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded">
        <KanbanBoard />
      </div>
    </div>
  );
};

export default Dashboard;
