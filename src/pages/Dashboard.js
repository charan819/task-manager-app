import React, { useState } from "react";
import KanbanBoard from "../components/KanbanBoard";
import TaskEditModal from "../components/TaskEditModal"; // ✅ Import the modal
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedTasks } from "../features/tasksSlice";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const selectedTasks = useSelector((state) =>
    state.tasks.tasks.filter((task) => task.isSelected)
  );

  // ✅ Control Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // ✅ Handle Edit Click
  const handleEditClick = () => {
    if (selectedTasks.length === 0) return; // Prevents opening modal without selection
    setIsEditModalOpen(true);
  };

  // ✅ Handle Delete Click with Confirmation
  const handleDeleteClick = () => {
    if (
      selectedTasks.length > 0 &&
      window.confirm("Are you sure you want to delete the selected tasks?")
    ) {
      dispatch(deleteSelectedTasks());
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📌 Task Dashboard</h1>

        {/* ✅ Show Edit & Delete Buttons Only When Tasks Are Selected */}
        <div className="flex gap-3">
          {selectedTasks.length > 0 && (
            <>
              <button
                onClick={() => selectedTasks.length > 0 && setIsEditModalOpen(true)}
                disabled={selectedTasks.length === 0} // ✅ Prevent opening modal if nothing is selected
                className={`px-4 py-2 rounded transition ${
                selectedTasks.length > 0 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                }`}
            >
            ✏️ Edit Selected ({selectedTasks.length})
            </button>


            <button
            onClick={() => {
            if (window.confirm(`Are you sure you want to delete ${selectedTasks.length} task(s)?`)) {
            dispatch(deleteSelectedTasks());
            }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
            🗑 Delete Selected ({selectedTasks.length})
            </button>

            </>
          )}
        </div>
      </div>

      {/* ✅ Task Board */}
      <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded shadow-md">
        <KanbanBoard />
      </div>

      {/* ✅ Edit Modal */}
      {isEditModalOpen && (
        <TaskEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
