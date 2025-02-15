import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../features/tasksSlice";
import TaskForm from "./TaskForm";
import Column from "./Column"; // ✅ Make sure this import is correct!

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const statuses = ["To Do", "In Progress", "Done"];

  return (
    <div className="max-w-4xl mx-auto">
      <TaskForm />
      <div className="flex gap-4 p-5">
        {statuses.map((status) => (
          <Column key={status} status={status} tasks={tasks.filter(task => task.status === status)} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
