import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasksSlice";
import { auth } from "../services/firebase"; // Import Firebase auth

const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const dispatch = useDispatch();
  const user = auth.currentUser;

  const handleAddTask = () => {
    if (!taskName.trim() || !user) return;
    dispatch(addTask({ name: taskName, status: "To Do", userId: user.uid }));
    setTaskName("");
  };

  return (
    <div className="flex gap-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <input
        type="text"
        className="border p-2 w-full rounded dark:bg-gray-900 dark:text-white dark:border-gray-600"
        placeholder="Enter task..."
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
