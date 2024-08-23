// Selecting DOM elements
const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');

// Task array to hold all tasks
let tasks = [];

// Add task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(task);
        taskInput.value = '';
        renderTasks();
    }
});

// Render tasks
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    let filteredTasks = tasks;

    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="actions">
                <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        // Mark task as completed
        li.querySelector('.complete-btn').addEventListener('click', () => {
            task.completed = !task.completed;
            renderTasks(filter);
        });

        // Edit task
        li.querySelector('.edit-btn').addEventListener('click', () => {
            const newText = prompt('Edit your task:', task.text);
            if (newText !== null) {
                task.text = newText.trim();
                renderTasks(filter);
            }
        });

        // Delete task
        li.querySelector('.delete-btn').addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks(filter);
        });

        taskList.appendChild(li);
    });
}

// Filter tasks
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        renderTasks(filter);
    });
});
