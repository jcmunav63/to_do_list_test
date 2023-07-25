function createTaskElement(taskName, tasksLocal) {
  const index = tasksLocal.length + 1;
  const complete = false;
  const taskString = { index, name: taskName, completed: complete };
  tasksLocal.push(taskString);
  localStorage.setItem('tasks', JSON.stringify(tasksLocal));
}

function arrangeIndexes(tasksLocal) {
  for (let i = 0; i < tasksLocal.length; i += 1) {
    tasksLocal[i].index = (i + 1);
  }
}

function deleteTaskElement(tasksLocal, parent, delBtn) {
  // const taskName = parent.getElementsByClassName('task-input')[0].value;
  const taskIndex = parent.getElementsByClassName('task-index')[0].value;
  tasksLocal = tasksLocal.filter((t) => t.index !== taskIndex);
  arrangeIndexes(tasksLocal);
  localStorage.setItem('tasks', JSON.stringify(tasksLocal));
  delBtn.classList.add('hide');
  document.location.reload();
}

export { createTaskElement, deleteTaskElement };
