import React from "react";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";

const Profile = () => {
  const [user] = useAuthState(auth);
  const tasks = useSelector((state) => state.tasks.tasks);

  if (!user) return <p>Please login to view profile.</p>;

  const totalTasks = tasks.length;
  const toDoTasks = tasks.filter((task) => task.status === "To Do").length;
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress").length;
  const completedTasks = tasks.filter((task) => task.status === "Done").length;
  const overdueTasks = tasks.filter((task) => task.dueDate && new Date(task.dueDate) < new Date()).length;
  const upcomingTasks = tasks.filter((task) => task.dueDate && new Date(task.dueDate) >= new Date() && new Date(task.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length;

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-8 items-start">

  <div className="w-full md:w-1/2 p-6 rounded-lg shadow-md">
    <div className="flex items-center space-x-4 border-b pb-4">
      <img 
        src={user.photoURL || "https://via.placeholder.com/64"} 
        alt="Profile" 
        className="w-16 h-16 rounded-full"
      />
      <div>
        <p className="text-lg font-semibold">{user.displayName || "User"}</p>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>

    <div className="mt-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        📊 Task Statistics
      </h2>
      <ul className="mt-2 divide-y divide-gray-300 text-sm">
        <li className="py-2 flex justify-between"><strong>Total Tasks:</strong> {totalTasks}</li>
        <li className="py-2 flex justify-between"><strong>To Do:</strong> {toDoTasks}</li>
        <li className="py-2 flex justify-between"><strong>In Progress:</strong> {inProgressTasks}</li>
        <li className="py-2 flex justify-between"><strong>Completed:</strong> {completedTasks}</li>
        <li className="py-2 flex justify-between"><strong>Overdue:</strong> {overdueTasks}</li>
        <li className="py-2 flex justify-between"><strong>Upcoming (Next 7 Days):</strong> {upcomingTasks}</li>
      </ul>
    </div>
  </div>

  <div className="w-full md:w-1/2 p-6 rounded-lg shadow-md">
    <p>This Task Manager helps you <strong>organize, track, and manage tasks efficiently</strong> with an intuitive Kanban board.</p>

    <h2 className="text-xl font-semibold mt-4 mb-2">🚀 Features</h2>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>📋 Create & Manage Tasks:</strong> Easily add, edit, and delete tasks.</li>
      <li><strong>📅 Due Dates:</strong> Set deadlines & sort tasks by date.</li>
      <li><strong>📝 Task Status:</strong> Categorize tasks as To Do, In Progress, or Done.</li>
      <li><strong>📊 Task Statistics:</strong> View task breakdown in your profile.</li>
      <li><strong>🎨 Light/Dark Mode:</strong> Toggle between themes.</li>
      <li><strong>🔄 Drag & Drop:</strong> Move tasks easily between columns.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-4 mb-2">📖 How to Use</h2>
    <ol className="list-decimal pl-5 space-y-2">
      <li>Click "Add Task" to create a new task.</li>
      <li>Set a due date and a status (To Do, In Progress, Done).</li>
      <li>Click on a task to edit it.</li>
      <li>Drag & drop tasks between columns to update status.</li>
      <li>Visit Profile to see task statistics and instructions.</li>
      <li>Use the Sort & Filter option to organize tasks better.</li>
    </ol>

    <p className="text-gray-600 mt-4">
      Ready to get started? 🎯 <strong>Go to your Dashboard and start organizing tasks efficiently!</strong>
    </p>
  </div>
</div>

      
  );
};

export default Profile;
