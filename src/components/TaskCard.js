import React from "react";
import { useDrag } from "react-dnd";

const TaskCard = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`task-card p-3 m-2 rounded cursor-pointer 
        ${isDragging ? "opacity-50" : "opacity-100"} 
        text-white font-semibold`} /* Ensure text is bold */
    >
      {task.name}
    </div>
  );
};

export default TaskCard;
