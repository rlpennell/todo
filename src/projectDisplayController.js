import events from './eventsBus';
import { domCache, cacheElements, createElement } from './projectFormController';


function initProjectDisplay() {
  events.on('newProject', drawProject)
}

function clearDisplay(target) {
  while (target.firstChild){
    target.removeChild(target.firstChild);
  }
}

function drawProject(object) {
  domCache.addBtn.classList.remove('disabled');
  domCache.projectsWindow.removeChild(domCache.createProject);
  createElement('div', domCache.projectsWindow, object.id, {'class': 'project'});
  cacheElements([object.id]);

  const target = domCache[`${object.id}`];
  createElement('h2', target, 'none', {'class': 'project-title'}, object.title);
  createElement('p', target, 'none', {'class': 'project-due-date'}, object.dueDate);
  createElement('p', target, 'none', {'class': `priority-${object.priority}`}, object.priority);
  createElement('p', target, 'none', {'class': 'project-decription'}, object.description);
  if(object.tasks) { displayTasks(object.tasks, object, target) }
  createElement('p', target, 'none', {'class': 'project-notes'}, object.notes);
}

function displayTasks(tasks, project, target) {
  tasks.forEach(task => {
    task.parent = project.id;
    task.identifier = `${task.project}-${tasks.indexOf(task)}`;
    createElement('div', target, `${task.project}-${task.id}`, {'class': 'project-task-container'});
    const container = document.getElementById(`${task.project}-${task.id}`);
    createElement('input', container, task.id, {'type': 'checkbox', 'class': 'task', 'name': tasks.indexOf(task)});
    createElement('label', container, 'none', {'for': tasks.indexOf(task)}, task.task);
    console.log(task);
  });
  events.emit('addTaskEvents', target);
}

function displayTags(tags, target) {
  let classNum = 0;
  tags.forEach(tag => {
    let name;
    if (tag[0] === ' ') {
      name  = tag.slice(1);
    } else {
      name = tag;
    }
    createElement('p', target, 'none', {'class': `${name} ${classNum}`}, tag);
    if (classNum === 5) {
      classNum = 0;
    } else {
      classNum++;
    }
  });
}

export default initProjectDisplay;