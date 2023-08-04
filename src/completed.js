function updateTaskStatus(status, taskIndex, tasksLocal) {
  for (let i = 0; i < tasksLocal.length; i += 1) {
    if (tasksLocal[i].index === (taskIndex)) {
      tasksLocal[i].completed = status;
    }
  }

  const taskList = document.getElementById('task-list');
  const listItem = taskList.childNodes[taskIndex - 1];
  const checkboxInput = listItem.getElementsByClassName('checkbox')[0];
  if (status) {
    checkboxInput.classList.add('completed');
    checkboxInput.checked = true;
  } else {
    checkboxInput.classList.remove('completed');
    checkboxInput.checked = false;
  }
  localStorage.setItem('tasks', JSON.stringify(tasksLocal));
  return tasksLocal;
}

function arrangeIndexes(tasksLocal) {
  for (let i = 0; i < tasksLocal.length; i += 1) {
    tasksLocal[i].index = (i + 1);
  }
  return tasksLocal;
}

function deleteCompletedTasks(tasksLocal) {
  const taskCheckbox = document.querySelectorAll('.checkbox');
  taskCheckbox.forEach((cb) => {
    if (cb.checked) {
      const li = cb.parentNode;
      li.remove();
    }
  });
  tasksLocal = tasksLocal.filter((tr) => tr.completed !== true);
  arrangeIndexes(tasksLocal);
  localStorage.setItem('tasks', JSON.stringify(tasksLocal));
  return tasksLocal;
}

function updateTaskText(value, index, tasksLocal) {
  tasksLocal[index - 1].name = value;
  localStorage.setItem('tasks', JSON.stringify(tasksLocal));

  const taskList = document.getElementById('task-list');
  const listItem = taskList.childNodes[index - 1];
  const taskInput = listItem.getElementsByClassName('task-text')[0];
  taskInput.textContent = value;
}

export {
  updateTaskStatus, deleteCompletedTasks, updateTaskText, arrangeIndexes,
};
