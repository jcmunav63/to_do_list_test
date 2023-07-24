import './style.css';
/* global loadTasksFromLocalStorage */

// const tasksLocal = [{ index: 1, name: 'Buy groceries at Walmart', completed: false },
//   { index: 2, name: 'Pay the internet service', completed: true },
//   { index: 3, name: 'Fix the laptop', completed: false },
//   { index: 4, name: 'Hire a carpenter', completed: false }];

const tasksLocal = [];

window.loadTasksFromLocalStorage = () => {
  const text = JSON.stringify(tasksLocal);
  localStorage.setItem('tasks', text);
};

const createTaskElement = (task) => {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-row');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;

  const taskText = document.createElement('span');
  taskText.classList.add('task-text');
  taskText.textContent = task.name;
  if (task.completed) {
    taskText.classList.add('completed-task');
  }

  const moreIcon = document.createElement('span');
  moreIcon.classList.add('more-icon');

  const deleteIcon = document.createElement('span');
  deleteIcon.classList.add('delete-icon');
  deleteIcon.innerHTML = '&#128465;';

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskText);
  taskItem.appendChild(moreIcon);
  taskItem.appendChild(deleteIcon);

  return taskItem;
};

const displayTasks = () => {
  const taskList = document.getElementById('task-list');
  if (tasksLocal.length > 0) {
    tasksLocal.forEach((task) => {
      const taskElement = createTaskElement(task);
      taskList.appendChild(taskElement);
    });
  }
};

loadTasksFromLocalStorage();
displayTasks();
