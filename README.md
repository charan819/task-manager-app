TASK MANAGER APP

A modern, responsive, and fully authenticated task management application built with React, Tailwind CSS, Firebase, and Redux Toolkit.

This app demonstrates clean architecture, modular component design, persistent state management, and a practical use of real-time Firestore integration. Built as part of a solo showcase project for the Daxwell Frontend Developer interview process.

Features

--Google Authentication (via Firebase)

--Dark Mode / Light Mode toggle with localStorage persistence

--Task Sorting: by Name or Due Date, Ascending/Descending

--Kanban-style task layout with 3 status columns: To Do, In Progress, Done

--Modular Components: Navbar, Task Form, Columns, Redux Slices

--Real-time data using Firebase Firestore

--Responsive Design for desktop, tablet, and mobile

🛠️ Technologies Used

Tool/Library   -   Purpose

React   -   UI Framework

Firebase   -   Auth & Firestore DB\

Tailwind CSS   -   Styling + Theme Responsiveness

Redux Toolkit   -   State Management

React Router   -   Routing and Navigation

React Firebase Hooks   -   Easy Firebase state sync





How to Run Locally

Clone the repository

git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app

Install dependencies

npm install

Set up Firebase config

Create a .env file in the root with the following content:

REACT_APP_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_APP_ID=your_app_id

You can get these from your Firebase console.

Run the app

npm start

Then go to http://localhost:3000 to view it in the browser.



Improvements & Future Plans

- Drag-and-drop between columns

- Due date reminders

- Task priority tags and filters

- Visual analytics of task completion

- Role-based team boards
