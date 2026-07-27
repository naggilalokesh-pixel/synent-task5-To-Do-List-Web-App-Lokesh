 // ================================
// TaskFlow - To-Do List
// ================================


// ================================
// GET HTML ELEMENTS
// ================================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const taskCount = document.getElementById("taskCount");
const remainingCount = document.getElementById("remainingCount");
const completedCount = document.getElementById("completedCount");

const clearCompletedBtn =
    document.getElementById("clearCompletedBtn");

const filterButtons =
    document.querySelectorAll(".filter-btn");


// ================================
// LOAD TASKS FROM LOCAL STORAGE
// ================================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


// ================================
// SAVE TASKS
// ================================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


// ================================
// ADD TASK
// ================================

function addTask() {

    const text = taskInput.value.trim();

    // Prevent empty tasks
    if (text === "") {

        alert("Please enter a task.");

        taskInput.focus();

        return;
    }

    // Create task object
    const newTask = {

        id: Date.now(),

        text: text,

        completed: false
    };

    // Add task to array
    tasks.push(newTask);

    // Save
    saveTasks();

    // Display
    renderTasks();

    // Clear input
    taskInput.value = "";

    taskInput.focus();
}


// ================================
// TOGGLE TASK COMPLETION
// ================================

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            return {

                ...task,

                completed: !task.completed
            };
        }

        return task;
    });

    saveTasks();

    renderTasks();
}


// ================================
// DELETE TASK
// ================================

function deleteTask(id) {

    tasks = tasks.filter(task =>
        task.id !== id
    );

    saveTasks();

    renderTasks();
}


// ================================
// UPDATE TASK STATISTICS
// ================================

function updateStats() {

    const total = tasks.length;

    const completed =
        tasks.filter(task =>
            task.completed
        ).length;

    const remaining =
        total - completed;


    // Total tasks
    taskCount.textContent =
        `${total} ${total === 1 ? "task" : "tasks"}`;


    // Remaining tasks
    remainingCount.textContent =
        `${remaining} remaining`;


    // Completed tasks
    completedCount.textContent =
        `${completed} completed`;
}


// ================================
// UPDATE EMPTY STATE
// ================================

function updateEmptyState(filteredTasks) {

    // Hide empty state when tasks exist
    if (filteredTasks.length > 0) {

        emptyState.style.display = "none";

        return;
    }


    // Show empty state
    emptyState.style.display = "block";


    const emptyTitle =
        emptyState.querySelector("h3");

    const emptyMessage =
        emptyState.querySelector("p");


    // Completed filter
    if (currentFilter === "completed") {

        emptyTitle.textContent =
            "No completed tasks";

        emptyMessage.textContent =
            "Complete a task and it will appear here.";

    }

    // Active filter
    else if (currentFilter === "active") {

        emptyTitle.textContent =
            "No active tasks";

        emptyMessage.textContent =
            "You're all caught up!";

    }

    // All tasks
    else {

        emptyTitle.textContent =
            "No tasks yet";

        emptyMessage.textContent =
            "Add your first task to get started.";
    }
}


// ================================
// RENDER TASKS
// ================================

function renderTasks() {

    // Clear current task list
    taskList.innerHTML = "";


    // Default = all tasks
    let filteredTasks = tasks;


    // Active tasks
    if (currentFilter === "active") {

        filteredTasks =
            tasks.filter(task =>
                !task.completed
            );
    }


    // Completed tasks
    else if (currentFilter === "completed") {

        filteredTasks =
            tasks.filter(task =>
                task.completed
            );
    }


    // Create each task
    filteredTasks.forEach(task => {

        // Task container
        const li =
            document.createElement("li");

        li.className = "task-item";


        // Add completed class
        if (task.completed) {

            li.classList.add("completed");
        }


        // ================================
        // CHECKBOX
        // ================================

        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className =
            "task-checkbox";

        checkbox.checked =
            task.completed;


        checkbox.addEventListener(
            "change",
            () => {

                toggleTask(task.id);

            }
        );


        // ================================
        // TASK TEXT
        // ================================

        const taskText =
            document.createElement("span");

        taskText.className =
            "task-text";

        taskText.textContent =
            task.text;


        // ================================
        // DELETE BUTTON
        // ================================

        const deleteBtn =
            document.createElement("button");

        deleteBtn.className =
            "delete-btn";

        deleteBtn.textContent =
            "Delete";


        deleteBtn.addEventListener(
            "click",
            () => {

                deleteTask(task.id);

            }
        );


        // ================================
        // ADD ELEMENTS TO TASK
        // ================================

        li.appendChild(checkbox);

        li.appendChild(taskText);

        li.appendChild(deleteBtn);


        // Add task to list
        taskList.appendChild(li);

    });


    // Empty state
    updateEmptyState(filteredTasks);


    // Statistics
    updateStats();
}


// ================================
// ADD TASK BUTTON
// ================================

addTaskBtn.addEventListener(
    "click",
    addTask
);


// ================================
// ENTER KEY TO ADD TASK
// ================================

taskInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


// ================================
// FILTER BUTTONS
// ================================

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {


            // Remove active class
            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            // Add active class
            button.classList.add(
                "active"
            );


            // Get selected filter
            currentFilter =
                button.dataset.filter;


            // Display filtered tasks
            renderTasks();

        }
    );

});


// ================================
// CLEAR COMPLETED TASKS
// ================================

clearCompletedBtn.addEventListener(
    "click",
    () => {


        // Check if completed tasks exist
        const hasCompletedTasks =
            tasks.some(task =>
                task.completed
            );


        if (!hasCompletedTasks) {

            alert(
                "There are no completed tasks to clear."
            );

            return;
        }


        // Confirmation
        const confirmClear =
            confirm(
                "Delete all completed tasks?"
            );


        if (!confirmClear) {

            return;
        }


        // Keep only active tasks
        tasks =
            tasks.filter(task =>
                !task.completed
            );


        // Save updated tasks
        saveTasks();


        // Display updated list
        renderTasks();

    }
);


// ================================
// INITIAL RENDER
// ================================

// Display saved tasks when page loads
renderTasks();