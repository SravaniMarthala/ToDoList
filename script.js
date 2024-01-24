document.addEventListener('DOMContentLoaded', function() {

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    updateTaskList(tasks);
  });
  
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    if (taskInput.value.trim() === '') {
      alert('Please enter a valid task.');
      return;
    }
  
    const task = {
      text: taskInput.value.trim(),
      timestamp: new Date().getTime()
    };
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  
    updateTaskList(tasks);
  
  
    taskInput.value = '';
  }
  
  function deleteTask(timestamp) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.timestamp !== timestamp);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  
    updateTaskList(tasks);
  }
  
  function updateTaskList(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
  
    tasks.forEach(task => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span class="task-text" onclick="toggleTaskCompletion(this)">${task.text}</span>
        <button class="delete-button" onclick="deleteTask(${task.timestamp})">Delete</button>
      `;
      
      if (task.completed) {
        listItem.classList.add('completed-task');
      }
  
      taskList.appendChild(listItem);
    });
  }
  
  function toggleTaskCompletion(spanElement) {
    spanElement.classList.toggle('completed-task');
  
    // Update the tasks array in localStorage with completion status
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskText = spanElement.textContent;
    const taskToUpdate = tasks.find(task => task.text === taskText);
  
    if (taskToUpdate) {
      taskToUpdate.completed = !taskToUpdate.completed;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
  
  
  function toggleTodoList() {
    const todoLogo = document.getElementById('todoLogo');
    const backIcon = document.getElementById('backIcon');
    const todoListContainer = document.getElementById('todoListContainer');
    
    if (todoListContainer.style.display === 'none' || todoListContainer.style.display === '') {
      todoListContainer.style.display = 'block';
      todoLogo.style.display = 'none';
      backIcon.style.display = 'inline';
    }
  }
  
  
  function goBack() {
    const todoLogo = document.getElementById('todoLogo');
    const backIcon = document.getElementById('backIcon');
    const todoListContainer = document.getElementById('todoListContainer');
    
    todoListContainer.style.display = 'none';
    todoLogo.style.display = 'inline';
    backIcon.style.display = 'none';
  }
  