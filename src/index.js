import './style.css';
/* global loadTasksFromLocalStorage */

// const tasksLocal = [{ index: 1, name: 'Buy groceries at Walmart', completed: false },
//   { index: 2, name: 'Pay the internet service', completed: true },
//   { index: 3, name: 'Fix the laptop', completed: false },
//   { index: 4, name: 'Hire a carpenter', completed: false }];

let tasksLocal = [];

window.loadTasksToLocalStorage = () => {
  const text = JSON.stringify(tasksLocal);
  localStorage.setItem('tasks', text);
};

window.loadTasksFromLocalStorage = () => {
  tasksLocal = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
};

const displayTaskElement = (task) => {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-row');

  const tIndex = document.createElement('span');
  tIndex.classList.add('task-index');
  tIndex.value = task.index;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;

  const taskText = document.createElement('input');
  taskText.classList.add('task-text');
  taskText.value = task.name;
  if (task.completed) {
    taskText.classList.add('completed-task');
  };

  const moreIcon = document.createElement('span');
  moreIcon.classList.add('more-icon');

  const deleteIcon = document.createElement('span');
  deleteIcon.classList.add('delete-icon');
  deleteIcon.innerHTML = '&#128465;';

  taskItem.appendChild(tIndex);
  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskText);
  taskItem.appendChild(moreIcon);
  taskItem.appendChild(deleteIcon);

  return taskItem;
};

function createTaskElement(name1) {
  const index = tasksLocal.length + 1;
  const complete = false;
  const taskString = `{ index: ${index}, name: ${name1}, completed: ${complete}}`;
  tasksLocal.push(taskString);
  localStorage.setItem('tasks', JSON.stringify(tasksLocal));
}

document.getElementById('add-task-btn').addEventListener('click', () => {
  const taskInput = document.getElementById('task-input');
  const taskName = taskInput.value.trim();
  if (taskName !== '') {
    // const newTask = TaskManager.addTask(taskName);
    // const newTaskElement = createTaskElement(newTask);
    // taskList.appendChild(newTaskElement);
    createTaskElement(taskName);
    document.location.reload();
    taskInput.value = '';
  };
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

window.onload = () => {
  loadTasksFromLocalStorage();
  displayTasks();
  // loadTasksToLocalStorage();
};
