let tasks = []; // Array to store tasks

// Load tasks from local storage on page load
window.onload = () => {
    let storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTaskList();
    }
}

// Function to add a new task
function addTask() {
    let newTask = document.getElementById('newTask').value;
    if (newTask !== "") {
        tasks.push({ task: newTask, completed: false });
        document.getElementById('newTask').value = "";
        renderTaskList();
        saveTasksToLocalStorage();
    }
}

// Function to render the task list on the page
function renderTaskList() {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = ""; // Clear existing list
    tasks.forEach((task, index) => {
        let li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.task}</span> 
            <button class="edit-btn" onclick="editTask(${index})">Edit</button> 
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Function to edit a task
function editTask(index) {
    let newTask = prompt("Edit task:", tasks[index].task);
    if (newTask) {
        tasks[index].task = newTask;
        renderTaskList();
        saveTasksToLocalStorage();
    }
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTaskList();
    saveTasksToLocalStorage();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listeners for button clicks
document.getElementById('addTaskBtn').addEventListener('click', addTask);

//Key points:
//Local Storage:
//the localStorage.setItem and localStorage.getItem methods are used to store and retrieve the task array in the browser's local storage.
//Data Structure:
//The tasks array stores each task 
//as an object with a task property (the task text) and a completed property (to track completion status, if needed).