import React from "react";
import { useDrag } from "react-dnd";
import { FaExclamationTriangle, FaCheckCircle, FaSyncAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleTaskSelection } from "../features/tasksSlice";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  if (!task || !task.id) {
    return null; 
  }

  const today = new Date().setHours(0, 0, 0, 0);
  const taskDueDate = task.dueDate ? new Date(task.dueDate).setHours(0, 0, 0, 0) : null;

  let bgColor = "bg-gray-500";
  let textColor = "text-white";
  let label = null;
  let isOverdue = taskDueDate !== null && taskDueDate < today;

  if (!isOverdue) {
    if (taskDueDate === null) {
      bgColor = "bg-gray-500";
    } else if (taskDueDate === today) {
      bgColor = "bg-yellow-500";
      textColor = "text-black font-bold";
    } else {
      bgColor = "bg-purple-500";
    }
  }

  if (task.status === "To Do") {
    if (isOverdue) {
      bgColor = "bg-red-500";
      textColor = "text-white font-bold";
      label = (
        <span className="flex items-center gap-2 text-white font-bold mt-1">
          <FaExclamationTriangle className="text-xl" />
          Overdue Task!
        </span>
      );
    }
  } else if (task.status === "In Progress") {
    bgColor = "bg-blue-500";
    label = (
      <span className="flex items-center gap-2 text-white font-bold">
        <FaSyncAlt className="text-xl animate-spin" /> Work in Progress
      </span>
    );
    if (isOverdue) {
      label = (
        <span className="flex items-center gap-2 text-white font-bold mt-1">
          <FaSyncAlt className="text-xl animate-spin" />
          In Progress - Previously Overdue
        </span>
      );
    }
  } else if (task.status === "Done") {
    bgColor = "bg-green-600";
    label = (
      <span className="flex items-center gap-2 text-white font-bold">
        <FaCheckCircle className="text-xl" /> Completed!
      </span>
    );
    if (isOverdue) {
      label = (
        <span className="flex items-center gap-2 text-white font-bold mt-1">
          <FaCheckCircle className="text-xl" />
          Completed - Previously Overdue
        </span>
      );
    }
  }

  const handleSelect = () => {
    dispatch(toggleTaskSelection(task.id));
  };

  return (
    <div
      ref={drag}
      className={`w-full sm:w-auto p-3 m-2 rounded cursor-pointer font-semibold text-sm sm:text-base ${bgColor} ${textColor} 
        ${isDragging ? "opacity-50" : "opacity-100 "} flex flex-col gap-2`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.isSelected || false}
          onChange={handleSelect}
          className="mr-2"
        />
        <p className="truncate max-w-[80%] sm:max-w-full">{task.name}</p>
      </div>

      {task.dueDate && (
        <p className="text-xs sm:text-sm">
          Due:{" "}
          <span className={isOverdue ? "font-bold underline decoration-white" : ""}>
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </p>
      )}
      {label}
    </div>
  );
};

export default TaskCard;
