import events from "./eventsBus";

function initEventHandlers() {
  events.on('addButtonCreated', addButtonEvents);
  events.on('projectFormCreated', projectFormEvents);
  events.on('tagBtnCreated', tagBtnEvents);
  events.on('taskBtnCreated', taskBtnEvents);
  events.on('taskInputCreated', taskInputEvents);
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

export default initEventHandlers;