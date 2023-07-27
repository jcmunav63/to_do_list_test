function updateTaskStatus(status, taskIndex, tasksLocal) {
  for (let i = 0; i < tasksLocal.length; i += 1) {
    if (tasksLocal[i].index === (taskIndex)) {
      tasksLocal[i].completed = status;
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasksLocal));
}

function deleteCompletedTasks(tasksLocal) {

}

export default updateTaskStatus;