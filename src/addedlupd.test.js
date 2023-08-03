// Import the function to be tested
import { createTaskElement } from './adddelupd';
// Mock the localStorage service
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

// Assign the mock localStorage to the global object
global.localStorage = localStorageMock;

// AAA testing pattern: Arrange, Act, Assert
describe('Todo List App', () => {
  describe('createTaskElement', () => {
    // Arrange: set up any data or variables needed for the test
    let tasksLocal;

    beforeEach(() => {
      // Initialize the tasksLocal array to use in the tests
      tasksLocal = [{ index: 1, name: 'Task 1', completed: false }];
      localStorage.setItem('tasks', JSON.stringify(tasksLocal));
    });

    // Act: call the function being tested with the necessary arguments
    it('should add a new task to the tasksLocal array and update localStorage', () => {
      const newTaskName = 'Task 2';
      createTaskElement(newTaskName, tasksLocal);

      // Assert: verify the expected outcome
      expect(tasksLocal.length).toBe(2);
      expect(tasksLocal[1]).toEqual({ index: 2, name: 'Task 2', completed: false });

      // Verify that the tasksLocal array is stored correctly in localStorage
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      expect(storedTasks).toEqual(tasksLocal);
    });
  });
});