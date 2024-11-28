const addListButton = document.getElementById('addListButton');
const listNameInput = document.getElementById('listNameInput');
const taskInput = document.getElementById('taskInput');
const taskTime = document.getElementById('taskTime');
const taskList = document.getElementById('taskList');
const listSelect = document.getElementById('listSelect');
const addTaskButton = document.getElementById('addTaskButton');
const currentListName = document.getElementById('currentListName');

let lists = {};

function createList(listName) {
    if (listName.trim() === "") {
        alert("Please enter a list name.");
        return;
    }

    lists[listName] = [];

    const option = document.createElement('option');
    option.value = listName;
    option.innerText = listName;
    listSelect.appendChild(option);

    listNameInput.value = "";
}

function addTask() {
    const taskText = taskInput.value.trim();
    const taskDeadline = taskTime.value;
    const selectedList = listSelect.value;

    if (!selectedList) {
        alert("Please select a list.");
        return;
    }

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }


    const task = {
        text: taskText,
        completed: false,
        deadline: taskDeadline || null
    };


    lists[selectedList].push(task);


    taskInput.value = '';
    taskTime.value = '';

    renderTasks(selectedList);
}


function renderTasks(selectedList) {
    taskList.innerHTML = "";

    if (!selectedList) return;

    currentListName.innerText = `Tasks for "${selectedList}"`;

    lists[selectedList].forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

    
        li.innerHTML = `
            <span>${task.text} <small>${task.deadline ? `Due: ${new Date(task.deadline).toLocaleString()}` : 'No deadline'}</small></span>
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

    
        const completeBtn = li.querySelector('.complete-btn');
        completeBtn.addEventListener('click', () => {
            task.completed = !task.completed;
            renderTasks(selectedList);
        });

    
        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            const newText = prompt("Edit Task:", task.text);
            if (newText !== null) {
                task.text = newText;
                renderTasks(selectedList);
            }
        });

        
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            lists[selectedList].splice(index, 1);
            renderTasks(selectedList);
        });

        taskList.appendChild(li);
    });
}


addListButton.addEventListener('click', () => {
    const listName = listNameInput.value.trim();
    createList(listName);
});

addTaskButton.addEventListener('click', addTask)

listSelect.addEventListener('change', (event) => {
    renderTasks(event.target.value);
});
