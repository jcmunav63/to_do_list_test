function createTaskElement(taskName, tasksLocal) {
  const index = tasksLocal.length + 1;
  const complete = false;
  const taskString = { index, name: taskName, completed: complete };
  tasksLocal.push(taskString);
  localStorage.setItem('tasks', JSON.stringify(tasksLocal));

  const taskList = document.getElementById('task-list');
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-row');
  const taskIndex = document.createElement('span');
  taskIndex.classList.add('task-index');
  taskIndex.value = index;
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');
  const taskText = document.createElement('input');
  taskText.classList.add('task-text');
  taskText.value = taskName;
  const moreIcon = document.createElement('span');
  moreIcon.classList.add('more-icon');
  const deleteIcon = document.createElement('span');
  deleteIcon.classList.add('delete-icon');
  deleteIcon.classList.add('hide');
  deleteIcon.innerHTML = '&#128465;';
  taskItem.appendChild(taskIndex);
  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskText);
  taskItem.appendChild(moreIcon);
  taskItem.appendChild(deleteIcon);

  taskList.appendChild(taskItem);
  return tasksLocal;
}

function arrangeIndexes(tasksLocal) {
  for (let i = 0; i < tasksLocal.length; i += 1) {
    tasksLocal[i].index = (i + 1);
  }
  return tasksLocal;
}

function deleteTaskElement(tasksLocal, delBtn) {
  const parent = delBtn.parentNode;
  let taskIndex = parent.getElementsByClassName('task-index')[0].value;
  tasksLocal = tasksLocal.filter((tr) => tr.index !== taskIndex);
  console.log(tasksLocal);
  const li = delBtn.parentNode;
  li.remove();
  arrangeIndexes(tasksLocal);
  localStorage.setItem('tasks', JSON.stringify(tasksLocal));
  return tasksLocal;
}

function updateTaskText(value, index, tasksLocal) {
  tasksLocal[index - 1].name = value;
  localStorage.setItem('tasks', JSON.stringify(tasksLocal));
  return tasksLocal;
}

export { createTaskElement, deleteTaskElement, updateTaskText };
