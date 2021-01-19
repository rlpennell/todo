import events from './eventsBus'
import { domCache, cacheElements, createElement, createInputFields } from './projectFormController';

function initTaskController() {
  events.on('createTaskForm', createTaskForm);
  events.on('createTask', createTask);
}

function createTaskForm(button) {
  const parent = button.parentNode;
  button.classList.add('disabled');

  if(!domCache.taskForm) {
    createElement('div', parent, 'task-form', {'class': 'task-form'});
    cacheElements(['task-form']);

    const container = domCache.taskForm;
    createInputFields(['task', 'due-date'], container);
    createElement('button', container, 'add-task', {'type': 'button'}, 'add task')
    cacheElements(['task', 'add-task']);
    events.emit('taskBtnCreated', domCache.addTask);
  }

}

class Task {
  constructor(task, parent) {
    this.task = task;
    this.parent = parent;
    this.complete = false;
  }

  set identifier(id) {
    this.id = id;
  }
}

function createTask() {
  const value = domCache.task.value;
  if (value) {
    if (domCache.task.classList.contains('empty')) { domCache.task.classList.remove('empty') }
    const parent = domCache.task.parentElement.parentElement.parentElement.id;
    const newTask = new Task(value, parent);
    console.log(newTask);
    events.emit('addNewTask', new Task(value, parent));
    domCache.task.value = '';
  } else {
    domCache.task.classList.add('empty');
  }
}

export default initTaskController;