import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../features/tasksSlice";

const TaskEditModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const selectedTasks = useSelector((state) =>
    state.tasks.tasks.filter((task) => task.isSelected)
  );

  const [editedTasks, setEditedTasks] = useState([]);

  // ✅ Load selected tasks into local state when modal opens
  useEffect(() => {
    if (isOpen && selectedTasks.length > 0) {
      setEditedTasks(selectedTasks.map((task) => ({
        id: task.id,
        name: task.name || "", // Ensure no undefined values
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "", // Format ISO date
      })));
    }
  }, [isOpen,JSON.stringify(selectedTasks)]); // ✅ Only runs when the modal opens
  

  // ✅ Handle Input Change
  const handleChange = (index, field, value) => {
    setEditedTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, [field]: value } : task
      )
    );
  };
  

  // ✅ Save Edited Tasks
  const handleSave = () => {
    console.log("Saving tasks:", editedTasks); // Debugging Log
    editedTasks.forEach((task) => {
      dispatch(editTask({ id: task.id, name: task.name, dueDate: task.dueDate }));
    });
    onClose(); // Close modal after saving
  };

  // ✅ Prevent rendering if no tasks are selected
  if (!isOpen || selectedTasks.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-5 rounded w-96 shadow-lg">
        <h2 className="text-lg font-bold text-white mb-4">✏ Edit Tasks</h2>

        {editedTasks.length > 0 ? (
          editedTasks.map((task, index) => (
            <div key={task.id} className="mb-4">
              <label className="block text-gray-300 text-sm mb-1">Task Name</label>
              <input
                type="text"
                value={task.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className="p-2 w-full rounded text-black"
                placeholder="Task Name"
              />
              <label className="block text-gray-300 text-sm mt-2 mb-1">Due Date</label>
              <input
                type="date"
                value={task.dueDate}
                onChange={(e) => handleChange(index, "dueDate", e.target.value)}
                className="p-2 w-full rounded text-black"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-300">No tasks selected for editing.</p>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 transition text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal;
