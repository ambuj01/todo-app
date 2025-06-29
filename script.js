let tasks = [];

function saveTasksToLocalStorage() 
{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks()
{
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks)
    {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(taskValue => renderTask(taskValue));
    }
}

function renderTask(taskValue, completed = false) 
{
    const taskList = document.getElementById("task-list");
    const li = document.createElement("li");
    
    li.innerHTML = `
        <span class="task-text ${completed ? 'completed' : ''}" onclick="toggleComplete(this, '${taskValue}')">${taskValue}</span>
        <button class="delete-btn" onclick="removeTask(this, '${taskValue}')">X</button>
    `;

    taskList.appendChild(li);
}

function addtask() 
{
    let taskInput = document.getElementById("task-input");
    let taskValue = taskInput.value.trim();

    if (taskValue === "") 
    {
        alert("Please enter a task!!");
        return;
    }

    if (tasks.some(task => task.toLowerCase() === taskValue.toLowerCase()))
        {
        alert("Task already exists!")
        return;
    }


    tasks.push(taskValue);
    saveTasksToLocalStorage();
    renderTask(taskValue);

    taskInput.value = "";
}

function toggleComplete(span, taskValue) 
{
    span.classList.toggle("completed");
    
}

function toggleMode() {
    const isDark = document.getElementById("mode-toggle").checked;
    
    if (isDark) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

function removeTask(button, taskValue)
{
    let taskItem = button.parentElement;
    taskItem.remove();

    tasks = tasks.filter(task => task !== taskValue);
    saveTasksToLocalStorage();
}