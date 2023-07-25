import './style.css';

import createTaskElement from './adddelupd.js';

/* global tasksLocal */
let tasksLocal = [];

window.loadTasksToLocalStorage = () => {
  const text = JSON.stringify(tasksLocal);
  localStorage.setItem('tasks', text);
};

const displayTaskElement = (task) => {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-row');

  const taskIndex = document.createElement('span');
  taskIndex.classList.add('task-index');
  taskIndex.value = task.index;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;

  const taskText = document.createElement('input');
  taskText.classList.add('task-text');
  taskText.value = task.name;
  if (task.completed) {
    taskText.classList.add('completed-task');
  }

  const moreIcon = document.createElement('span');
  moreIcon.classList.add('more-icon');

  const deleteIcon = document.createElement('span');
  deleteIcon.classList.add('delete-icon');
  // deleteIcon.classList.add('hide');
  deleteIcon.innerHTML = '&#128465;';

  taskItem.appendChild(taskIndex);
  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskText);
  taskItem.appendChild(moreIcon);
  taskItem.appendChild(deleteIcon);

  activateMoreListeners();
  activateDeleteListeners();
  // activateInputListeners();

  return taskItem;
};

function activateMoreListeners() {
  let moreBtn = document.querySelectorAll('.more-icon');
  moreBtn.forEach((mb, taskIndex) => {
    mb.addEventListener('click', () => {
      deleteIcon(taskIndex).classList.remove('hide');
    });
  });
};

// function createTaskElement(taskName) {
//   const index = tasksLocal.length + 1;
//   const complete = false;
//   const taskString = { index, name: taskName, completed: complete };
//   tasksLocal.push(taskString);
//   localStorage.setItem('tasks', JSON.stringify(tasksLocal));
// }

document.getElementById('add-task-btn').addEventListener('click', () => {
  const taskInput = document.getElementById('task-input');
  const taskName = taskInput.value.trim();
  if (taskName !== '') {
    createTaskElement(taskName, tasksLocal);
    document.location.reload();
    taskInput.value = '';
  }
});

const displayTasks = () => {
  const taskList = document.getElementById('task-list');
  if (tasksLocal.length > 0) {
    tasksLocal.forEach((task) => {
      const taskElement = displayTaskElement(task);
      taskList.appendChild(taskElement);
    });
  }
};

const loadTasksFromLocalStorage = () => {
  tasksLocal = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
};

window.onload = () => {
  loadTasksFromLocalStorage();
  displayTasks();
};
