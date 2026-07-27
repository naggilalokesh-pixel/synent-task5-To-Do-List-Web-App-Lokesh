# synent-task5-To-Do-List-Web-App-Lokesh
TaskFlow - To-Do List Web App

A simple and responsive To-Do List Web Application built using HTML, CSS, and JavaScript as part of my Web Development Internship at Synent Technologies.

The application allows users to create and manage daily tasks, mark tasks as completed, filter tasks, and store them using browser localStorage, so tasks remain available even after refreshing the page.

Features
Add new tasks
Add tasks using the Enter key
Mark tasks as completed
Unmark completed tasks
Delete individual tasks
Filter tasks by:
All
Active
Completed
Clear all completed tasks
Display total, remaining, and completed task counts
Empty-state messages based on selected filter
Data persistence using localStorage
Responsive design for desktop and mobile
Clean and user-friendly interface
Simple task animations
Technologies Used
HTML5 — Page structure
CSS3 — Styling and responsive design
JavaScript — Application functionality
localStorage — Persistent task storage
Project Structure
todo-list/
│
├── index.html
├── style.css
├── script.js
└── README.md
How It Works

When a user creates a task, JavaScript stores it inside an array and saves the updated task list to browser localStorage.

localStorage.setItem("tasks", JSON.stringify(tasks));

When the application is opened or refreshed, the saved tasks are retrieved:

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

This allows tasks to persist even after refreshing the webpage.

How to Run
Clone or download this repository.
Open the project folder in VS Code.
Open index.html using a browser or Live Server.
Enter a task and click Add Task.
Use the checkbox to mark tasks as completed.
Use the filters to view All, Active, or Completed tasks.
Refresh the page to verify that tasks remain saved.
Internship Task

Task 5: To-Do List Web App

Objective:
Build a task management application.

Requirements:

HTML
CSS
JavaScript

Required Features:

Add task
Delete task
Mark task as completed
Use localStorage
Tasks should persist after refresh
Future Improvements

Possible improvements include:

Edit existing tasks
Task due dates
Priority levels
Search functionality
Drag-and-drop task ordering
Dark mode
Author

N. Lokesh
Web Development Intern
Synent Technologies

License

This project was created for educational and internship purposes.
