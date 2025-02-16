import React, { useState } from "react";
import KanbanBoard from "../components/KanbanBoard";
import TaskEditModal from "../components/TaskEditModal"; // ✅ Import the modal
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedTasks } from "../features/tasksSlice"; // ✅ Removed sorting actions


const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const selectedTasks = useSelector((state) => state.tasks.tasks.filter((task) => task.isSelected));

  // ✅ Control Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // ✅ Handle Edit Click
  const handleEditClick = () => {
    if (selectedTasks.length === 0) return;
    setIsEditModalOpen(true);
  };

  // ✅ Handle Delete Click with Confirmation
  const handleDeleteClick = () => {
    if (
      selectedTasks.length > 0 &&
      window.confirm(`Are you sure you want to delete ${selectedTasks.length} task(s)?`)
    ) {
      dispatch(deleteSelectedTasks());
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold text-center md:text-left">📌 Task Dashboard</h1>

        {/* ✅ Show Edit & Delete Buttons Only When Tasks Are Selected */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
          {selectedTasks.length > 0 && (
            <>
              <button
                onClick={handleEditClick}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm sm:text-base"
              >
                ✏️ Edit Selected ({selectedTasks.length})
              </button>

              <button
                onClick={handleDeleteClick}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm sm:text-base"
              >
                🗑 Delete Selected ({selectedTasks.length})
              </button>
            </>
          )}
        </div>
      </div>

      {/* ✅ Task Board */}
      <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded shadow-md">
        <KanbanBoard />
      </div>

      {/* ✅ Edit Modal */}
      {isEditModalOpen && <TaskEditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />}
    </div>
  );
};

export default Dashboard;
