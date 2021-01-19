import events from "./eventsBus";

function initEventHandlers() {
  events.on('addButtonCreated', addButtonEvents);
  events.on('projectFormCreated', projectFormEvents);
  events.on('tagBtnCreated', tagBtnEvents);
  events.on('taskBtnCreated', taskBtnEvents);
  events.on('taskInputCreated', taskInputEvents);
  events.on('addTaskBtnCreated', addTaskBtnEvents);
  events.on('addTaskEvents', addTaskEvents);
  events.on('addTagEvents', addTagEvents);
  events.on('closeFormCreated', closeFormEvents);
}

function addButtonEvents(){
  const addBtn = document.getElementById('add');
  addBtn.addEventListener('click', () => {
    events.emit('addNewProject');
  });
}

function projectFormEvents(button) {
  button.addEventListener('click', () => {
    events.emit('checkInputs');
  });
}

function tagBtnEvents(button) {
  button.addEventListener('click', () => {
    events.emit('createTag');
  });
}

function taskBtnEvents(button) {
  button.addEventListener('click', () => {
    events.emit('createTask');
  });
}

function taskInputEvents(input){
  input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      events.emit('createTask');
    }
  });
}

function addTaskBtnEvents(button){
  button.addEventListener('click', () => {
    events.emit('createTaskForm', button);
  });
}

function addTaskEvents(checkbox) {
  checkbox.addEventListener('click', () => {
    events.emit('taskComplete', checkbox);
  })
}

function addTagEvents() {
  const tags = Array.from(document.getElementsByClassName('delete-tag'));
  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      events.emit('removeTag', tag);
    });
  });
}

function closeFormEvents(button) {
  button.addEventListener('click', () => {
    events.emit('closeForm', button.parentNode);
  });
}

export default initEventHandlers;