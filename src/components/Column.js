import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { updateTaskStatus } from "../features/tasksSlice";
import TaskCard from "./TaskCard"; // Ensure this is correctly imported

const Column = ({ status, tasks }) => {
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => dispatch(updateTaskStatus({ id: item.id, status })),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-1/3 p-4 rounded shadow-md transition-all ${
        isOver ? "bg-gray-300 dark:bg-gray-700" : "bg-white dark:bg-gray-900"
      }`}
    >
      <h2 className="text-lg font-bold dark:text-white">{status}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;
