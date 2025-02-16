import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, setSortBy, toggleSortOrder } from "../features/tasksSlice"; // ✅ Sorting actions
import TaskForm from "./TaskForm";
import Column from "./Column";

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const sortBy = useSelector((state) => state.tasks.sortBy);
  const sortOrder = useSelector((state) => state.tasks.sortOrder);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const statuses = ["To Do", "In Progress", "Done"];

  // ✅ Sorting Logic (Only Date & Name)
  const sortTasks = (tasks) => {
    return [...tasks].sort((a, b) => {
      let valueA, valueB;

      if (sortBy === "dueDate") {
        valueA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        valueB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      } else {
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
      }

      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });
  };

  return (
    <div className="max-w-full mx-auto overflow-x-auto">
      <TaskForm />
      <div className="flex justify-end p-2">
        {/* ✅ Sorting Options (Inside Task Board) */}
        <select
          className="p-2 bg-gray-500 text-white rounded"
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
        >
          <option value="name">Sort by Name</option>
          <option value="dueDate">Sort by Due Date</option>
        </select>
        <button
          className="ml-2 p-2 bg-gray-500 text-white rounded"
          onClick={() => dispatch(toggleSortOrder())}
        >
          🔄 {sortOrder === "asc" ? "Asc" : "Desc"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 p-5">
        {statuses.map((status) => (
          <Column
            key={status}
            status={status}
            tasks={sortTasks(tasks.filter((task) => task.status === status))}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
